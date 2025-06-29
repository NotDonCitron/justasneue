import React, { useState, useEffect } from 'react';
import { 
  Play, Pause, SkipForward, Volume2, Users, TrendingUp, 
  Check, X, Star, Clock, Music, BarChart3, Settings,
  Search, Filter, Download, Upload
} from 'lucide-react';
import { Song, SongRequest, QueueItem, Analytics, Event, EventSettings } from '../../types/request';
import { wsService } from '../../services/websocket';
import LoadingSpinner from '../LoadingSpinner';

interface DJDashboardProps {
  eventId: string;
  djId: string;
}

const DJDashboard: React.FC<DJDashboardProps> = ({ eventId, djId }) => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [pendingRequests, setPendingRequests] = useState<SongRequest[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [event, setEvent] = useState<Event | null>(null);
  const [activeTab, setActiveTab] = useState<'queue' | 'requests' | 'analytics' | 'settings'>('requests');
  const [searchFilter, setSearchFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved'>('pending');

  useEffect(() => {
    wsService.connect(eventId);

    wsService.on('currentlyPlaying', setCurrentlyPlaying);
    wsService.on('queueUpdated', setQueue);
    wsService.on('newRequest', handleNewRequest);
    wsService.on('analyticsUpdated', setAnalytics);
    wsService.on('eventUpdated', setEvent);

    // Load initial data
    loadDashboardData();

    return () => {
      wsService.disconnect();
    };
  }, [eventId, djId]);

  const loadDashboardData = async () => {
    // In production, fetch from API
    // const data = await api.getDJDashboard(eventId, djId);
    // setPendingRequests(data.requests);
    // setAnalytics(data.analytics);
    // setEvent(data.event);
  };

  const handleNewRequest = (request: SongRequest) => {
    setPendingRequests(prev => [request, ...prev]);
    
    // Show notification
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Neue Song-Anfrage', {
        body: `${request.song.title} von ${request.song.artist}`,
        icon: '/favicon.ico'
      });
    }
  };

  const approveRequest = async (requestId: string) => {
    try {
      wsService.send('approveRequest', { requestId, djId });
      
      setPendingRequests(prev => 
        prev.map(req => 
          req.id === requestId 
            ? { ...req, status: 'approved' }
            : req
        )
      );
    } catch (error) {
      console.error('Failed to approve request:', error);
    }
  };

  const rejectRequest = async (requestId: string, reason?: string) => {
    try {
      wsService.send('rejectRequest', { requestId, djId, reason });
      
      setPendingRequests(prev => 
        prev.map(req => 
          req.id === requestId 
            ? { ...req, status: 'rejected' }
            : req
        )
      );
    } catch (error) {
      console.error('Failed to reject request:', error);
    }
  };

  const addToQueue = (song: Song, priority: number = 5) => {
    wsService.send('addToQueue', { song, priority, djId });
  };

  const removeFromQueue = (queueItemId: string) => {
    wsService.send('removeFromQueue', { queueItemId, djId });
  };

  const reorderQueue = (fromIndex: number, toIndex: number) => {
    const newQueue = [...queue];
    const [removed] = newQueue.splice(fromIndex, 1);
    newQueue.splice(toIndex, 0, removed);
    
    // Update positions
    const updatedQueue = newQueue.map((item, index) => ({
      ...item,
      position: index + 1
    }));
    
    setQueue(updatedQueue);
    wsService.send('reorderQueue', { queue: updatedQueue, djId });
  };

  const playNext = () => {
    if (queue.length > 0) {
      const nextSong = queue[0].song;
      setCurrentlyPlaying(nextSong);
      setIsPlaying(true);
      
      // Remove from queue and mark as played
      wsService.send('playNext', { djId });
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    wsService.send('togglePlayPause', { isPlaying: !isPlaying, djId });
  };

  const filteredRequests = pendingRequests.filter(request => {
    const matchesSearch = searchFilter === '' || 
      request.song.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      request.song.artist.toLowerCase().includes(searchFilter.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const exportAnalytics = () => {
    if (!analytics) return;
    
    const data = {
      event: event?.name,
      date: new Date().toISOString(),
      analytics
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dj-analytics-${eventId}-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-neutral-900 border-b border-neutral-800 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">DJ Dashboard</h1>
            <p className="text-gray-400">{event?.name || 'Event'} • {event?.venue}</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-green-400">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm">Live</span>
            </div>
            
            <button
              onClick={() => {
                if ('Notification' in window && Notification.permission !== 'granted') {
                  Notification.requestPermission();
                }
              }}
              className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-sm transition-colors duration-300"
            >
              Benachrichtigungen aktivieren
            </button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-neutral-900 border-r border-neutral-800 p-6">
          <nav className="space-y-2">
            {[
              { id: 'requests', label: 'Requests', icon: Music },
              { id: 'queue', label: 'Queue', icon: Play },
              { id: 'analytics', label: 'Analytics', icon: BarChart3 },
              { id: 'settings', label: 'Settings', icon: Settings }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-300 ${
                  activeTab === id 
                    ? 'bg-red-600 text-white' 
                    : 'text-gray-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                <Icon size={20} />
                <span>{label}</span>
              </button>
            ))}
          </nav>

          {/* Currently Playing */}
          {currentlyPlaying && (
            <div className="mt-8 p-4 bg-neutral-800 rounded-lg">
              <div className="text-sm text-gray-400 mb-2">Aktuell</div>
              <div className="font-medium text-white truncate">{currentlyPlaying.title}</div>
              <div className="text-sm text-gray-400 truncate">{currentlyPlaying.artist}</div>
              
              <div className="flex items-center space-x-2 mt-4">
                <button
                  onClick={togglePlayPause}
                  className="p-2 bg-red-600 hover:bg-red-700 rounded-full transition-colors duration-300"
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                </button>
                
                <button
                  onClick={playNext}
                  className="p-2 bg-neutral-700 hover:bg-neutral-600 rounded-full transition-colors duration-300"
                >
                  <SkipForward size={16} />
                </button>
                
                <button className="p-2 bg-neutral-700 hover:bg-neutral-600 rounded-full transition-colors duration-300">
                  <Volume2 size={16} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {activeTab === 'requests' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Song Requests</h2>
                
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="text"
                      value={searchFilter}
                      onChange={(e) => setSearchFilter(e.target.value)}
                      placeholder="Suche..."
                      className="pl-9 pr-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white text-sm focus:outline-none focus:border-red-500"
                    />
                  </div>
                  
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as any)}
                    className="px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white text-sm focus:outline-none focus:border-red-500"
                  >
                    <option value="all">Alle</option>
                    <option value="pending">Wartend</option>
                    <option value="approved">Genehmigt</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                {filteredRequests.map((request) => (
                  <div key={request.id} className="bg-neutral-900 rounded-lg p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-white">{request.song.title}</h3>
                          <span className="text-sm text-gray-400">von {request.song.artist}</span>
                          {request.song.genre && (
                            <span className="px-2 py-1 bg-neutral-700 text-xs rounded">{request.song.genre}</span>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                          <span>Angefragt von {request.requestedBy}</span>
                          <span>{request.requestedAt.toLocaleTimeString('de-DE')}</span>
                          {request.moodRating && (
                            <div className="flex items-center space-x-1">
                              <Star size={14} className="text-yellow-400 fill-current" />
                              <span>{request.moodRating}/5</span>
                            </div>
                          )}
                        </div>
                        
                        {request.dedication && (
                          <div className="bg-neutral-800 p-3 rounded-lg mb-3">
                            <div className="text-sm text-gray-400 mb-1">Widmung:</div>
                            <div className="text-white">"{request.dedication}"</div>
                          </div>
                        )}
                        
                        <div className="flex items-center space-x-2 text-sm text-gray-400">
                          <Clock size={14} />
                          <span>{Math.floor(request.song.duration / 60)}:{(request.song.duration % 60).toString().padStart(2, '0')}</span>
                          {request.song.bpm && (
                            <>
                              <span>•</span>
                              <span>{request.song.bpm} BPM</span>
                            </>
                          )}
                          {request.song.energy && (
                            <>
                              <span>•</span>
                              <span>Energy: {request.song.energy}/10</span>
                            </>
                          )}
                        </div>
                      </div>
                      
                      {request.status === 'pending' && (
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => addToQueue(request.song, request.priority)}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors duration-300"
                          >
                            Zur Queue
                          </button>
                          
                          <button
                            onClick={() => approveRequest(request.id)}
                            className="p-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-300"
                          >
                            <Check size={16} />
                          </button>
                          
                          <button
                            onClick={() => rejectRequest(request.id)}
                            className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-300"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {filteredRequests.length === 0 && (
                  <div className="text-center py-12 text-gray-400">
                    <Music size={48} className="mx-auto mb-4 opacity-50" />
                    <p>Keine Requests gefunden</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'queue' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Playlist Queue</h2>
                <div className="text-sm text-gray-400">
                  {queue.length} Songs • ~{Math.floor(queue.reduce((acc, item) => acc + item.song.duration, 0) / 60)} Min
                </div>
              </div>

              <div className="space-y-3">
                {queue.map((item, index) => (
                  <div
                    key={item.id}
                    className="bg-neutral-900 rounded-lg p-4 flex items-center space-x-4"
                  >
                    <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {index + 1}
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-medium text-white">{item.song.title}</h4>
                      <p className="text-gray-400 text-sm">{item.song.artist}</p>
                    </div>
                    
                    <div className="text-sm text-gray-400">
                      {Math.floor(item.song.duration / 60)}:{(item.song.duration % 60).toString().padStart(2, '0')}
                    </div>
                    
                    {item.estimatedPlayTime && (
                      <div className="text-sm text-gray-500">
                        ~{item.estimatedPlayTime.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    )}
                    
                    <button
                      onClick={() => removeFromQueue(item.id)}
                      className="p-2 text-gray-400 hover:text-red-400 transition-colors duration-300"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
                
                {queue.length === 0 && (
                  <div className="text-center py-12 text-gray-400">
                    <Play size={48} className="mx-auto mb-4 opacity-50" />
                    <p>Queue ist leer</p>
                    <p className="text-sm mt-2">Füge Songs aus den Requests hinzu</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'analytics' && analytics && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Analytics</h2>
                <button
                  onClick={exportAnalytics}
                  className="flex items-center space-x-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors duration-300"
                >
                  <Download size={16} />
                  <span>Export</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-neutral-900 rounded-lg p-6">
                  <div className="text-2xl font-bold text-white">{analytics.totalRequests}</div>
                  <div className="text-gray-400">Total Requests</div>
                </div>
                
                <div className="bg-neutral-900 rounded-lg p-6">
                  <div className="text-2xl font-bold text-green-400">{analytics.approvedRequests}</div>
                  <div className="text-gray-400">Genehmigt</div>
                </div>
                
                <div className="bg-neutral-900 rounded-lg p-6">
                  <div className="text-2xl font-bold text-red-400">{analytics.rejectedRequests}</div>
                  <div className="text-gray-400">Abgelehnt</div>
                </div>
                
                <div className="bg-neutral-900 rounded-lg p-6">
                  <div className="text-2xl font-bold text-yellow-400">{analytics.averageMoodRating.toFixed(1)}</div>
                  <div className="text-gray-400">Ø Stimmung</div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-neutral-900 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Meistgewünschte Songs</h3>
                  <div className="space-y-3">
                    {analytics.mostRequestedSongs.slice(0, 5).map((item, index) => (
                      <div key={item.song.id} className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-white">{item.song.title}</div>
                          <div className="text-sm text-gray-400">{item.song.artist}</div>
                        </div>
                        <div className="text-red-400 font-bold">{item.count}x</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-neutral-900 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Top Genres</h3>
                  <div className="space-y-3">
                    {analytics.topGenres.slice(0, 5).map((item, index) => (
                      <div key={item.genre} className="flex items-center justify-between">
                        <div className="font-medium text-white">{item.genre}</div>
                        <div className="text-red-400 font-bold">{item.count}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h2 className="text-xl font-bold mb-6">Event Settings</h2>
              
              <div className="bg-neutral-900 rounded-lg p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Max Requests pro User
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    defaultValue={event?.settings.maxRequestsPerUser || 3}
                    className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-red-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Zeit zwischen Requests (Minuten)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    defaultValue={event?.settings.timeBetweenRequests || 5}
                    className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-red-500"
                  />
                </div>
                
                <div className="space-y-4">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      defaultChecked={event?.settings.allowDedications}
                      className="w-4 h-4 text-red-600 bg-neutral-800 border-neutral-700 rounded focus:ring-red-500"
                    />
                    <span className="text-white">Widmungen erlauben</span>
                  </label>
                  
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      defaultChecked={event?.settings.requireMoodRating}
                      className="w-4 h-4 text-red-600 bg-neutral-800 border-neutral-700 rounded focus:ring-red-500"
                    />
                    <span className="text-white">Stimmungsbewertung erforderlich</span>
                  </label>
                  
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      defaultChecked={event?.settings.autoApprove}
                      className="w-4 h-4 text-red-600 bg-neutral-800 border-neutral-700 rounded focus:ring-red-500"
                    />
                    <span className="text-white">Requests automatisch genehmigen</span>
                  </label>
                  
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      defaultChecked={event?.settings.profanityFilter}
                      className="w-4 h-4 text-red-600 bg-neutral-800 border-neutral-700 rounded focus:ring-red-500"
                    />
                    <span className="text-white">Profanity Filter aktivieren</span>
                  </label>
                </div>
                
                <button className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-300">
                  Einstellungen speichern
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DJDashboard;