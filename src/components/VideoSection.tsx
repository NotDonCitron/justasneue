import React, { useState, useEffect, useRef } from 'react';
import { Play, Download } from 'lucide-react';
import VideoPlayer from './VideoPlayer';
import LazyImage from './LazyImage';
import '../styles/justas-animations.css';
import { useTranslation } from 'react-i18next';

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
  thumbnail: string;
}

const VideoSection: React.FC = () => {
  const { t } = useTranslation();
  const [videos] = useState<Video[]>([
    {
      id: '1',
      src: '/videos/justas1.mp4',
      title: 'Live Performance #1',
      thumbnail: '/Images/thumb1.jpg'
    },
    {
      id: '2',
      src: '/videos/justas2.mp4',
      title: 'Studio Session',
      thumbnail: '/Images/thumb2.jpg'
    },
    {
      id: '3',
      src: '/videos/justas3.mp4',
      title: 'Event Highlight',
      thumbnail: '/Images/thumb3.jpg'
    },
    {
      id: '4',
      src: '/videos/event-highlight.mp4',
      title: 'Festival Set',
      thumbnail: '/Images/thumb4.jpg'
    },
    {
      id: '5',
      src: '/videos/performance1.mp4',
      title: 'Club Night',
      thumbnail: '/Images/thumb5.jpg'
    },
    {
      id: '6',
      src: '/videos/studio-session.mp4',
      title: 'Behind the Scenes',
      thumbnail: '/Images/thumb6.jpg'
    }
  ]);

  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1 }
    );

    const videoCards = document.querySelectorAll('.video-card');
    videoCards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const handleVideoClick = (videoSrc: string) => {
    setSelectedVideo(videoSrc);
  };

  const closeModal = () => {
    setSelectedVideo(null);
  };

  const [filter, setFilter] = useState<string>('all');

  // Video array with only existing files
  const videoArray: Video[] = [
    {
      id: 'performance-1',
      title: 'Justas Live @ XYZ Festival',
      description: 'High-energy peak-time techno set.',
      src: '/videos/justas1.mp4',
      poster: '/Images/justas1.jpg',
      duration: '14:07',
      category: 'performance',
      date: '2024-10-05',
      venue: 'XYZ Festival',
      thumbnail: '/Images/justas1.jpg'
    },
    {
      id: 'studio-1',
      title: 'Underground Beats Creation',
      description: 'Deep dive into creating underground techno tracks in the studio',
      src: '/videos/justas2.mp4',
      poster: '/Images/justas2.jpg',
      duration: '11:23',
      category: 'studio',
      date: '2024-09-18',
      thumbnail: '/Images/justas2.jpg'
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
      venue: 'Warehouse Berlin',
      thumbnail: '/Images/justas3.jpg'
    }
  ];

  const filteredVideos = filter === 'all' 
    ? videoArray 
    : videoArray.filter(video => video.category === filter);

  const categories = [
    { key: 'all', label: t('videoSection.filterAll') },
    { key: 'performance', label: t('videoSection.filterPerformance') },
    { key: 'studio', label: t('videoSection.filterStudio') },
    { key: 'event', label: t('videoSection.filterEvent') },
    { key: 'behind-scenes', label: t('videoSection.filterBehindScenes') }
  ];

  return (
    <section ref={sectionRef} className="py-16 px-4 bg-gradient-to-br from-gray-900 to-black">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-12 scroll-reveal">
          {t('videoSection.title')}
        </h2>

        <div className="video-grid">
          {videos.map((video, index) => (
            <div
              key={video.id}
              className="video-card scroll-reveal"
              onClick={() => handleVideoClick(video.src)}
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                className="video-thumbnail"
                onError={(e) => {
                  // Fallback für fehlende Thumbnails
                  e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMzMzIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjY2IiBmb250LXNpemU9IjE0Ij5WaWRlbyBUaHVtYm5haWw8L3RleHQ+Cjwvc3ZnPg==';
                }}
              />
              <div className="video-overlay">
                <div className="play-button">
                  <div className="play-icon"></div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                <h3 className="text-white font-semibold">{video.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Video Modal */}
        {selectedVideo && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
            onClick={closeModal}
          >
            <div className="relative max-w-4xl w-full">
              <button
                onClick={closeModal}
                className="absolute -top-12 right-0 text-white text-2xl hover:text-gray-300 transition-colors"
              >
                ✕
              </button>
              <video
                src={selectedVideo}
                controls
                autoPlay
                className="w-full rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        )}

        <div className="text-center mt-12">
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
                src={filteredVideos[0].src}
                poster={filteredVideos[0].poster}
                title={filteredVideos[0].title}
                className="w-full aspect-video"
              />
              
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {filteredVideos[0].title}
                </h3>
                <p className="text-gray-400 mb-4">
                  {filteredVideos[0].description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <span>{filteredVideos[0].date}</span>
                    <span>{filteredVideos[0].duration}</span>
                    {filteredVideos[0].venue && (
                      <span>@ {filteredVideos[0].venue}</span>
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
              onClick={() => setSelectedVideo(video.src)}
              className="group cursor-pointer bg-neutral-800 rounded-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-red-900/20"
            >
              <div className="relative aspect-video overflow-hidden">
                <LazyImage
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  context="video"
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
    </section>
  );
};

export default VideoSection;