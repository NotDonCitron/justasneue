import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Download } from 'lucide-react';
import VideoPlayer from './VideoPlayer';

interface Video {
  id: string;
  title: string;
  description: string;
  src: string;
  poster: string;
  duration: string;
  category: 'performance' | 'studio' | 'behind-scenes' | 'event';
  date: string;
  venue?: string;
}

const VideoSection: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [filter, setFilter] = useState<string>('all');

  // Deine Videos - Füge hier deine MP4 Dateien hinzu
  const videos: Video[] = [
    {
      id: 'performance-1',
      title: 'Live Set @ MS Connexion Complex',
      description: 'Intensive Techno Session mit krassen Drops und Underground Vibes',
      src: '/videos/ms-connexion-set.mp4', // Ersetze mit deinem Video-Pfad
      poster: '/Images/364268621_248985811283826_4097087762299984333_n.jpg',
      duration: '15:30',
      category: 'performance',
      date: '2024-12-15',
      venue: 'MS Connexion Complex'
    },
    {
      id: 'studio-1',
      title: 'Studio Session - New Track Preview',
      description: 'Behind the Scenes beim Produzieren neuer Tracks',
      src: '/videos/studio-session.mp4',
      poster: '/Images/WhatsApp Image 2025-05-10 at 15.09.09 copy.jpeg',
      duration: '8:45',
      category: 'studio',
      date: '2024-12-10'
    },
    {
      id: 'event-1',
      title: 'Das Zimmer Mannheim Highlights',
      description: 'Die besten Momente aus dem legendären Auftritt',
      src: '/videos/das-zimmer-highlights.mp4',
      poster: '/Images/WhatsApp Image 2025-05-10 at 15.10.27 copy.jpeg',
      duration: '12:20',
      category: 'event',
      date: '2024-11-28',
      venue: 'Das Zimmer Mannheim'
    },
    {
      id: 'behind-1',
      title: 'Backstage & Setup',
      description: 'Einblicke hinter die Kulissen vor einem großen Auftritt',
      src: '/videos/backstage.mp4',
      poster: '/Images/header 2.jpeg',
      duration: '6:15',
      category: 'behind-scenes',
      date: '2024-11-20'
    }
  ];

  const filteredVideos = filter === 'all' 
    ? videos 
    : videos.filter(video => video.category === filter);

  const categories = [
    { key: 'all', label: 'Alle Videos' },
    { key: 'performance', label: 'Live Sets' },
    { key: 'studio', label: 'Studio' },
    { key: 'event', label: 'Events' },
    { key: 'behind-scenes', label: 'Behind the Scenes' }
  ];

  return (
    <div className="py-20 bg-neutral-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Video Gallery</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            Erlebe die Energie live - Auftritte, Studio-Sessions und exklusive Behind-the-Scenes Momente
          </p>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setFilter(category.key)}
                className={`px-6 py-2 rounded-lg transition-all duration-300 ${
                  filter === category.key
                    ? 'bg-red-600 text-white'
                    : 'bg-neutral-800 text-gray-300 hover:bg-neutral-700'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Video */}
        {filteredVideos.length > 0 && (
          <div className="mb-12">
            <div className="bg-black rounded-lg overflow-hidden">
              <VideoPlayer
                src={selectedVideo?.src || filteredVideos[0].src}
                poster={selectedVideo?.poster || filteredVideos[0].poster}
                title={selectedVideo?.title || filteredVideos[0].title}
                className="w-full aspect-video"
              />
              
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {selectedVideo?.title || filteredVideos[0].title}
                </h3>
                <p className="text-gray-400 mb-4">
                  {selectedVideo?.description || filteredVideos[0].description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <span>{selectedVideo?.date || filteredVideos[0].date}</span>
                    <span>{selectedVideo?.duration || filteredVideos[0].duration}</span>
                    {(selectedVideo?.venue || filteredVideos[0].venue) && (
                      <span>@ {selectedVideo?.venue || filteredVideos[0].venue}</span>
                    )}
                  </div>
                  
                  <button className="flex items-center space-x-2 text-red-500 hover:text-red-400 transition-colors duration-300">
                    <Download size={16} />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              onClick={() => setSelectedVideo(video)}
              className="group cursor-pointer bg-neutral-800 rounded-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-red-900/20"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={video.poster}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Play Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-red-600 rounded-full p-4 transform transition-all duration-300 group-hover:scale-110">
                    <Play size={24} className="text-white ml-1" />
                  </div>
                </div>
                
                {/* Duration Badge */}
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                  {video.duration}
                </div>
                
                {/* Category Badge */}
                <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                  {video.category === 'performance' ? 'LIVE' :
                   video.category === 'studio' ? 'STUDIO' :
                   video.category === 'event' ? 'EVENT' : 'BTS'}
                </div>
              </div>
              
              <div className="p-4">
                <h4 className="font-semibold text-white mb-2 group-hover:text-red-500 transition-colors duration-300">
                  {video.title}
                </h4>
                <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                  {video.description}
                </p>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{video.date}</span>
                  {video.venue && <span>{video.venue}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-red-900/20 to-purple-900/20 rounded-lg p-8 border border-red-500/20">
            <h3 className="text-2xl font-bold text-white mb-4">Mehr Videos auf YouTube</h3>
            <p className="text-gray-400 mb-6">
              Abonniere meinen YouTube-Kanal für die neuesten Sets, Tutorials und exklusive Inhalte
            </p>
            <a
              href="https://youtube.com/@justaslange"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-300"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              YouTube abonnieren
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoSection;