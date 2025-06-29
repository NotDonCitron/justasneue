import React, { useState, useEffect, useCallback } from 'react';
import { Search, Music, Heart, Clock, Send, Star, AlertCircle, CheckCircle } from 'lucide-react';
import { Song, SongRequest, QueueItem, User } from '../../types/request';
import { musicApi } from '../../services/musicApi';
import { wsService } from '../../services/websocket';
import { ProfanityFilter } from '../../services/profanityFilter';
import LoadingSpinner from '../LoadingSpinner';

interface GuestInterfaceProps {
  eventId: string;
  userId: string;
}

const GuestInterface: React.FC<GuestInterfaceProps> = ({ eventId, userId }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Song[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [dedication, setDedication] = useState('');
  const [moodRating, setMoodRating] = useState(3);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<Song | null>(null);
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [userRequests, setUserRequests] = useState<SongRequest[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Debounced search
  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      if (query.length < 2) {
        setSearchResults([]);
        return;
      }

      setIsSearching(true);
      try {
        const results = await musicApi.searchSongs(query);
        setSearchResults(results);
      } catch (error) {
        console.error('Search failed:', error);
        showNotification('error', 'Suche fehlgeschlagen. Bitte versuche es erneut.');
      } finally {
        setIsSearching(false);
      }
    }, 300),
    []
  );

  useEffect(() => {
    debouncedSearch(searchQuery);
  }, [searchQuery, debouncedSearch]);

  // WebSocket connection
  useEffect(() => {
    wsService.connect(eventId);

    wsService.on('currentlyPlaying', setCurrentlyPlaying);
    wsService.on('queueUpdated', setQueue);
    wsService.on('requestStatusUpdated', handleRequestStatusUpdate);
    wsService.on('userUpdated', setUser);

    // Load initial data
    loadUserRequests();
    loadPopularSongs();

    return () => {
      wsService.disconnect();
    };
  }, [eventId, userId]);

  const loadUserRequests = async () => {
    // In production, fetch from API
    // const requests = await api.getUserRequests(userId, eventId);
    // setUserRequests(requests);
  };

  const loadPopularSongs = async () => {
    if (searchQuery.length === 0) {
      try {
        const popular = await musicApi.getPopularSongs();
        setSearchResults(popular.slice(0, 6));
      } catch (error) {
        console.error('Failed to load popular songs:', error);
      }
    }
  };

  const handleRequestStatusUpdate = (update: { requestId: string; status: string; message?: string }) => {
    setUserRequests(prev => 
      prev.map(req => 
        req.id === update.requestId 
          ? { ...req, status: update.status as any }
          : req
      )
    );

    if (update.message) {
      showNotification(
        update.status === 'approved' ? 'success' : 'error',
        update.message
      );
    }
  };

  const canMakeRequest = (): { canRequest: boolean; reason?: string } => {
    if (!user) return { canRequest: false, reason: 'Benutzer nicht gefunden' };
    
    if (user.isBlocked) {
      return { canRequest: false, reason: 'Du wurdest temporär blockiert' };
    }

    const recentRequests = userRequests.filter(
      req => Date.now() - req.requestedAt.getTime() < 15 * 60 * 1000 // 15 minutes
    );

    if (recentRequests.length >= 3) {
      return { canRequest: false, reason: 'Maximale Anzahl Requests erreicht (3 pro 15 Min)' };
    }

    if (user.lastRequestTime) {
      const timeSinceLastRequest = Date.now() - user.lastRequestTime.getTime();
      const minWaitTime = 5 * 60 * 1000; // 5 minutes
      
      if (timeSinceLastRequest < minWaitTime) {
        const remainingTime = Math.ceil((minWaitTime - timeSinceLastRequest) / 60000);
        return { canRequest: false, reason: `Warte noch ${remainingTime} Minuten` };
      }
    }

    return { canRequest: true };
  };

  const submitRequest = async () => {
    if (!selectedSong) return;

    const { canRequest, reason } = canMakeRequest();
    if (!canRequest) {
      showNotification('error', reason!);
      return;
    }

    // Check for profanity in dedication
    if (dedication) {
      const { hasProfanity, clean } = ProfanityFilter.filter(dedication);
      if (hasProfanity) {
        setDedication(clean);
        showNotification('error', 'Deine Widmung enthielt unangemessene Inhalte und wurde bereinigt.');
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const request: Omit<SongRequest, 'id'> = {
        song: selectedSong,
        requestedBy: userId,
        requestedAt: new Date(),
        dedication: dedication || undefined,
        status: 'pending',
        priority: 5,
        eventId,
        moodRating
      };

      // Send via WebSocket
      wsService.send('submitRequest', request);

      // Reset form
      setSelectedSong(null);
      setDedication('');
      setMoodRating(3);
      setSearchQuery('');
      
      showNotification('success', 'Request erfolgreich gesendet!');
    } catch (error) {
      console.error('Failed to submit request:', error);
      showNotification('error', 'Request konnte nicht gesendet werden.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-400';
      case 'rejected': return 'text-red-400';
      case 'played': return 'text-blue-400';
      default: return 'text-yellow-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle size={16} />;
      case 'rejected': return <AlertCircle size={16} />;
      case 'played': return <Music size={16} />;
      default: return <Clock size={16} />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
          notification.type === 'success' 
            ? 'bg-green-900 border border-green-700 text-green-100'
            : 'bg-red-900 border border-red-700 text-red-100'
        }`}>
          <div className="flex items-center space-x-2">
            {notification.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      {/* Currently Playing */}
      {currentlyPlaying && (
        <div className="bg-gradient-to-r from-red-900/30 to-purple-900/30 rounded-lg p-6 border border-red-500/30">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-neutral-800 rounded-lg flex items-center justify-center">
              {currentlyPlaying.artwork ? (
                <img src={currentlyPlaying.artwork} alt="" className="w-full h-full object-cover rounded-lg" />
              ) : (
                <Music size={24} className="text-red-500" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-red-400 text-sm font-medium">JETZT LÄUFT</span>
              </div>
              <h3 className="text-xl font-bold text-white">{currentlyPlaying.title}</h3>
              <p className="text-gray-300">{currentlyPlaying.artist}</p>
            </div>
          </div>
        </div>
      )}

      {/* Search Section */}
      <div className="bg-neutral-900 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-4">Song Request</h2>
        
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Suche nach Titel, Artist oder Album..."
            className="w-full pl-10 pr-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
          />
          {isSearching && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <LoadingSpinner size="sm" color="red" />
            </div>
          )}
        </div>

        {/* Search Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {searchResults.map((song) => (
            <div
              key={song.id}
              onClick={() => setSelectedSong(song)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                selectedSong?.id === song.id
                  ? 'border-red-500 bg-red-900/20'
                  : 'border-neutral-700 bg-neutral-800 hover:border-neutral-600'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-neutral-700 rounded-lg flex items-center justify-center">
                  {song.artwork ? (
                    <img src={song.artwork} alt="" className="w-full h-full object-cover rounded-lg" />
                  ) : (
                    <Music size={20} className="text-gray-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-white truncate">{song.title}</h4>
                  <p className="text-gray-400 text-sm truncate">{song.artist}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs bg-neutral-700 px-2 py-1 rounded">{song.genre}</span>
                    <span className="text-xs text-gray-500">{Math.floor(song.duration / 60)}:{(song.duration % 60).toString().padStart(2, '0')}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Request Form */}
        {selectedSong && (
          <div className="bg-neutral-800 rounded-lg p-6 space-y-4">
            <h3 className="text-lg font-semibold text-white">Request Details</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Widmung (optional)
              </label>
              <textarea
                value={dedication}
                onChange={(e) => setDedication(e.target.value)}
                placeholder="Eine persönliche Nachricht..."
                maxLength={200}
                className="w-full p-3 bg-neutral-700 border border-neutral-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500 resize-none"
                rows={3}
              />
              <div className="text-xs text-gray-500 mt-1">{dedication.length}/200</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Dancefloor Stimmung
              </label>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setMoodRating(rating)}
                    className={`p-2 rounded-lg transition-colors duration-300 ${
                      moodRating >= rating ? 'text-yellow-400' : 'text-gray-600'
                    }`}
                  >
                    <Star size={20} className={moodRating >= rating ? 'fill-current' : ''} />
                  </button>
                ))}
                <span className="text-sm text-gray-400 ml-2">
                  {moodRating === 1 ? 'Chill' : 
                   moodRating === 2 ? 'Entspannt' :
                   moodRating === 3 ? 'Mittel' :
                   moodRating === 4 ? 'Energisch' : 'Extrem'}
                </span>
              </div>
            </div>

            <button
              onClick={submitRequest}
              disabled={isSubmitting || !canMakeRequest().canRequest}
              className="w-full py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <LoadingSpinner size="sm" color="white" />
              ) : (
                <>
                  <Send size={18} />
                  <span>Request senden</span>
                </>
              )}
            </button>

            {!canMakeRequest().canRequest && (
              <p className="text-red-400 text-sm text-center">{canMakeRequest().reason}</p>
            )}
          </div>
        )}
      </div>

      {/* Queue */}
      {queue.length > 0 && (
        <div className="bg-neutral-900 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-4">Kommende Songs</h3>
          <div className="space-y-3">
            {queue.slice(0, 5).map((item, index) => (
              <div key={item.id} className="flex items-center space-x-3 p-3 bg-neutral-800 rounded-lg">
                <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-white">{item.song.title}</h4>
                  <p className="text-gray-400 text-sm">{item.song.artist}</p>
                </div>
                {item.estimatedPlayTime && (
                  <div className="text-xs text-gray-500">
                    ~{item.estimatedPlayTime.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* User Requests */}
      {userRequests.length > 0 && (
        <div className="bg-neutral-900 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-4">Deine Requests</h3>
          <div className="space-y-3">
            {userRequests.map((request) => (
              <div key={request.id} className="flex items-center space-x-3 p-3 bg-neutral-800 rounded-lg">
                <div className={`${getStatusColor(request.status)}`}>
                  {getStatusIcon(request.status)}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-white">{request.song.title}</h4>
                  <p className="text-gray-400 text-sm">{request.song.artist}</p>
                  {request.dedication && (
                    <p className="text-gray-500 text-xs mt-1">"{request.dedication}"</p>
                  )}
                </div>
                <div className="text-right">
                  <div className={`text-sm font-medium ${getStatusColor(request.status)}`}>
                    {request.status === 'pending' ? 'Wartend' :
                     request.status === 'approved' ? 'Genehmigt' :
                     request.status === 'rejected' ? 'Abgelehnt' : 'Gespielt'}
                  </div>
                  <div className="text-xs text-gray-500">
                    {request.requestedAt.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Debounce utility
function debounce<T extends (...args: any[]) => any>(func: T, wait: number): T {
  let timeout: NodeJS.Timeout;
  return ((...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  }) as T;
}

export default GuestInterface;