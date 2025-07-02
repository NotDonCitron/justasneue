import React, { useState, useRef, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Calendar, MapPin, Heart, Play, Share, Link } from 'lucide-react';
import LazyImage from './LazyImage';
import VideoPlayer from './VideoPlayer';
import ProgressiveVideo from './ProgressiveVideo';
import { useTouchGestures } from '../hooks/useTouchGestures';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: 'performance' | 'studio' | 'event' | 'lifestyle';
  date: string;
  location?: string;
  likes?: number;
  caption?: string;
  isInstagram?: boolean;
  mediaType?: 'image' | 'video';
  thumbnail?: string;
}

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [instagramData, setInstagramData] = useState<any[]>([]);

  // Load Instagram data safely with dynamic import
  useEffect(() => {
    const loadInstagramData = async () => {
      try {
        const { default: data } = await import('../data/dataset_instagram-profile-posts-scraper_2025-06-29_21-56-39-977.json');
        setInstagramData(Array.isArray(data) ? data : []);
      } catch (error) {
        console.warn('Instagram data not available, using fallback data:', error);
        setInstagramData([]);
      }
    };
    
    loadInstagramData();
  }, []);

  // Local videos - ADD YOUR MP4 FILES HERE
  const localVideos: GalleryImage[] = [
    {
      id: 'video-1',
      src: '/videos/performance1.mp4', // Replace with your actual video path
      thumbnail: '/Images/364268621_248985811283826_4097087762299984333_n.jpg',
      alt: 'Live Performance Highlight',
      category: 'performance',
      date: '2025-01-15',
      location: 'MS Connexion Complex',
      mediaType: 'video',
      caption: 'Intense techno set at MS Connexion - crowd going wild!'
    },
    {
      id: 'video-2',
      src: '/videos/studio-session.mp4', // Replace with your actual video path
      thumbnail: '/Images/WhatsApp Image 2025-05-10 at 15.09.09 copy.jpeg',
      alt: 'Studio Session Behind the Scenes',
      category: 'studio',
      date: '2025-01-10',
      mediaType: 'video',
      caption: 'Working on new tracks in the studio'
    },
    {
      id: 'video-3',
      src: '/videos/event-highlight.mp4', // Replace with your actual video path
      thumbnail: '/Images/WhatsApp Image 2025-05-10 at 15.10.27 copy.jpeg',
      alt: 'Event Highlight Reel',
      category: 'event',
      date: '2025-01-05',
      location: 'Das Zimmer Mannheim',
      mediaType: 'video',
      caption: 'Best moments from recent events'
    }
  ];

  // Lokale Bilder
  const localImages: GalleryImage[] = [
    {
      id: 'local-new-1',
      src: '/images/image00003(1).jpeg',
      alt: 'Dramatic red-lit performance with professional setup',
      category: 'performance',
      date: '2025-01-25',
      location: 'Professional Studio Session',
      mediaType: 'image'
    },
    {
      id: 'local-new-2',
      src: '/images/image00001(2).jpeg',
      alt: 'Professional portrait - DJ Justas Lange',
      category: 'lifestyle',
      date: '2025-01-22',
      location: 'Studio Portrait Session',
      mediaType: 'image'
    },
    {
      id: 'local-new-3',
      src: '/images/image00002(1).jpeg',
      alt: 'Behind the scenes collaboration and mixing',
      category: 'studio',
      date: '2025-01-21',
      location: 'Collaborative Studio Work',
      mediaType: 'image'
    },
    {
      id: 'local-1',
      src: '/images/image00001.jpeg',
      alt: 'Justas Lange in atmospheric DJ booth setting',
      category: 'performance',
      date: '2025-01-20',
      location: 'Club Performance',
      mediaType: 'image'
    },
    {
      id: 'local-2',
      src: '/images/image00002.jpeg',
      alt: 'Professional DJ setup and mixing',
      category: 'studio',
      date: '2025-01-18',
      location: 'Studio Session',
      mediaType: 'image'
    },
    {
      id: 'local-3',
      src: '/images/image00003.jpeg',
      alt: 'High-energy live performance',
      category: 'performance',
      date: '2025-01-15',
      location: 'Main Stage',
      mediaType: 'image'
    },
    {
      id: 'local-4',
      src: '/images/image00004.jpeg',
      alt: 'Behind the scenes preparation',
      category: 'lifestyle',
      date: '2025-01-12',
      location: 'Backstage',
      mediaType: 'image'
    },
    {
      id: 'local-5',
      src: '/images/image00005.jpeg',
      alt: 'Event atmosphere and crowd energy',
      category: 'event',
      date: '2025-01-10',
      location: 'Event Space',
      mediaType: 'image'
    },
    {
      id: 'local-6',
      src: '/images/justas header.jpg',
      alt: 'Promotional header shot',
      category: 'lifestyle',
      date: '2025-01-08',
      mediaType: 'image'
    },
    {
      id: 'local-7',
      src: '/Images/364268621_248985811283826_4097087762299984333_n.jpg',
      alt: 'Classic performance shot',
      category: 'performance',
      date: '2023-07-30',
      location: 'Das Zimmer Mannheim',
      mediaType: 'image'
    },
    {
      id: 'local-8',
      src: '/Images/WhatsApp Image 2025-05-10 at 15.09.09 copy.jpeg',
      alt: 'DJ equipment close-up',
      category: 'studio',
      date: '2025-05-10',
      mediaType: 'image'
    }
  ];

  // Instagram Bilder konvertieren
  const instagramImages: GalleryImage[] = instagramData
    .slice(0, 20)
    .map(post => ({
      id: post.id,
      src: post.displayUrl,
      alt: post.caption.split('\n')[0] || 'Instagram Post',
      category: post.locationName?.toLowerCase().includes('club') || 
                post.locationName?.toLowerCase().includes('basement') ||
                post.locationName?.toLowerCase().includes('connexion') ? 'performance' : 
                post.caption.toLowerCase().includes('studio') ? 'studio' :
                post.caption.toLowerCase().includes('event') ? 'event' : 'lifestyle',
      date: new Date(post.timestamp * 1000).toISOString().split('T')[0],
      location: post.locationName,
      likes: post.likes,
      caption: post.caption,
      isInstagram: true,
      mediaType: post.mediaType as 'image' | 'video'
    }));

  // Combine all media (videos first for prominence)
  const allImages = [...localVideos, ...localImages, ...instagramImages];

  const filteredImages = filter === 'all' 
    ? allImages 
    : allImages.filter(img => img.category === filter);

  const openLightbox = (imageId: string) => {
    setSelectedImage(imageId);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1;
    } else {
      newIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0;
    }
    
    setSelectedImage(filteredImages[newIndex].id);
  };

  const selectedImageData = selectedImage 
    ? allImages.find(img => img.id === selectedImage)
    : null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="container mx-auto px-6">
      <div className="mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Foto & Video Galerie</h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-8">
          Behind the Scenes, Live-Auftritte und Studio-Momente - Ein visueller Einblick in meine Welt.
        </p>
        
        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {[
            { key: 'all', label: 'Alle' },
            { key: 'performance', label: 'Live Sets' },
            { key: 'studio', label: 'Studio' },
            { key: 'event', label: 'Events' },
            { key: 'lifestyle', label: 'Lifestyle' }
          ].map((category) => (
            <button
              key={category.key}
              onClick={() => setFilter(category.key)}
              className={`px-6 py-2 rounded-sm transition-all duration-300 ${
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
      
      {/* Gallery grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredImages.map((image) => (
          <div
            key={image.id}
            className="relative group cursor-pointer overflow-hidden rounded-lg bg-neutral-900"
            onClick={() => openLightbox(image.id)}
          >
            <div className="aspect-square overflow-hidden">
              {image.mediaType === 'video' ? (
                <div className="relative w-full h-full">
                  <LazyImage
                    src={image.thumbnail || image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black/70 rounded-full p-4 transform transition-all duration-300 group-hover:scale-110">
                      <Play size={24} className="text-white ml-1" />
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                    VIDEO
                  </div>
                </div>
              ) : (
                <LazyImage
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              )}
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs uppercase tracking-wider bg-red-600 px-2 py-1 rounded">
                    {image.category}
                  </span>
                  {image.isInstagram && image.likes && (
                    <div className="flex items-center text-sm">
                      <Heart size={14} className="mr-1" />
                      <span>{image.likes}</span>
                    </div>
                  )}
                </div>
                <p className="text-sm font-medium truncate">{image.alt}</p>
                <div className="flex items-center text-xs text-gray-300 mt-1">
                  <Calendar size={12} className="mr-1" />
                  <span>{formatDate(image.date)}</span>
                  {image.location && (
                    <>
                      <span className="mx-2">•</span>
                      <MapPin size={12} className="mr-1" />
                      <span className="truncate">{image.location}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Lightbox */}
      {selectedImage && selectedImageData && (
        <LightboxWithGestures 
          selectedImageData={selectedImageData}
          onClose={closeLightbox}
          onNavigate={navigateImage}
          formatDate={formatDate}
        />
      )}
    </div>
  );
};

// Separate component for lightbox with touch gestures
const LightboxWithGestures: React.FC<{
  selectedImageData: GalleryImage;
  onClose: () => void;
  onNavigate: (direction: 'prev' | 'next') => void;
  formatDate: (date: string) => string;
}> = ({ selectedImageData, onClose, onNavigate, formatDate }) => {
  const lightboxRef = useRef<HTMLDivElement>(null);
  const { copyToClipboard, isCopied } = useCopyToClipboard();

  const copyImageLink = () => {
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set('image', selectedImageData.id);
    currentUrl.searchParams.set('title', encodeURIComponent(selectedImageData.alt));
    copyToClipboard(currentUrl.toString());
  };

  useTouchGestures(lightboxRef, {
    onSwipeLeft: () => onNavigate('next'),
    onSwipeRight: () => onNavigate('prev'),
    onSwipeUp: () => onClose(),
    onTap: (e) => {
      // Close on background tap
      if (e.target === lightboxRef.current) {
        onClose();
      }
    }
  });

  return (
    <div 
      ref={lightboxRef}
      className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative max-w-6xl max-h-full">
        {selectedImageData.mediaType === 'video' ? (
          <ProgressiveVideo
            src={selectedImageData.src}
            poster={selectedImageData.thumbnail}
            title={selectedImageData.alt}
            className="max-w-full max-h-[80vh]"
            preloadStrategy="metadata"
          />
        ) : (
          <LazyImage
            src={selectedImageData.src}
            alt={selectedImageData.alt}
            className="max-w-full max-h-full object-contain"
            priority={true}
          />
        )}
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-red-500 transition-colors duration-300 bg-black/50 rounded-full p-2 z-10"
        >
          <X size={24} />
        </button>
        
        {/* Copy link button */}
        <button
          onClick={copyImageLink}
          className="absolute top-4 right-16 text-white hover:text-red-500 transition-colors duration-300 bg-black/50 rounded-full p-2 z-10 relative"
          title="Link kopieren"
        >
          {isCopied ? <span className="text-green-400">✓</span> : <Link size={20} />}
          {isCopied && (
            <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
              Kopiert!
            </span>
          )}
        </button>
        
        {/* Navigation buttons */}
        <button
          onClick={() => onNavigate('prev')}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-red-500 transition-colors duration-300 bg-black/50 rounded-full p-2"
        >
          <ChevronLeft size={32} />
        </button>
        
        <button
          onClick={() => onNavigate('next')}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-red-500 transition-colors duration-300 bg-black/50 rounded-full p-2"
        >
          <ChevronRight size={32} />
        </button>
        
        {/* Touch instructions for mobile */}
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-white text-xs bg-black/50 px-3 py-1 rounded-full lg:hidden">
          Wischen: Weiter • Hoch: Schließen
        </div>
        
        {/* Media info overlay */}
        <div className="absolute bottom-4 left-4 right-4 text-white bg-black/70 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm uppercase tracking-wider text-red-400 bg-red-600/20 px-2 py-1 rounded">
              {selectedImageData.category} {selectedImageData.mediaType === 'video' && '• VIDEO'}
            </span>
          </div>
          <h3 className="text-lg font-bold mb-2">{selectedImageData.alt}</h3>
          {selectedImageData.caption && (
            <p className="text-sm text-gray-300 mb-2">
              {selectedImageData.caption}
            </p>
          )}
          <div className="flex items-center text-sm text-gray-400">
            <Calendar size={14} className="mr-1" />
            <span>{formatDate(selectedImageData.date)}</span>
            {selectedImageData.location && (
              <>
                <span className="mx-2">•</span>
                <MapPin size={14} className="mr-1" />
                <span>{selectedImageData.location}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;