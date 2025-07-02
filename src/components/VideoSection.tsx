import React, { useState } from 'react';
import { Play, Download } from 'lucide-react';
import VideoPlayer from './VideoPlayer';
import LazyImage from './LazyImage';

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

  // Video array with only existing files
  const videos: Video[] = [
    {
      id: 'performance-1',
      title: 'Justas Live @ XYZ Festival',
      description: 'High-energy peak-time techno set.',
      src: '/videos/justas1.mp4',
      poster: '/Images/justas1.jpg',
      duration: '14:07',
      category: 'performance',
      date: '2024-10-05',
      venue: 'XYZ Festival'
    },
    {
      id: 'studio-1',
      title: 'Underground Beats Creation',
      description: 'Deep dive into creating underground techno tracks in the studio',
      src: '/videos/justas2.mp4',
      poster: '/Images/justas2.jpg',
      duration: '11:23',
      category: 'studio',
      date: '2024-09-18'
    },
    {
      id: 'event-1',
      title: 'Warehouse Party Berlin',
      description: 'Raw industrial sounds in authentic Berlin warehouse setting',
      src: '/videos/justas3.mp4',
      poster: '/Images/justas3.jpg',
      duration: '18:45',
      category: 'event',
      date: '2024-08-22',
      venue: 'Warehouse Berlin'
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
                <LazyImage
                  src={video.poster}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
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

      </div>
    </div>
  );
};

export default VideoSection;