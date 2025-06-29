import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Calendar, MapPin, Heart } from 'lucide-react';
import LazyImage from './LazyImage';
import VideoPlayer from './VideoPlayer';
import instagramData from '../data/dataset_instagram-profile-posts-scraper_2025-06-29_21-56-39-977.json';

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
}

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');

  // Lokale Bilder
  const localImages: GalleryImage[] = [
    {
      id: 'local-1',
      src: '/Images/364268621_248985811283826_4097087762299984333_n.jpg',
      alt: 'Justas Lange performing live',
      category: 'performance',
      date: '2023-07-30',
      location: 'Das Zimmer Mannheim',
      mediaType: 'image'
    },
    {
      id: 'local-2',
      src: '/Images/WhatsApp Image 2025-05-10 at 15.09.09 copy.jpeg',
      alt: 'DJ setup and equipment',
      category: 'studio',
      date: '2025-05-10',
      mediaType: 'image'
    },
    {
      id: 'local-3',
      src: '/Images/WhatsApp Image 2025-05-10 at 15.10.27 copy.jpeg',
      alt: 'Live performance at club',
      category: 'performance',
      date: '2025-05-10',
      mediaType: 'image'
    },
    {
      id: 'local-4',
      src: '/Images/header 2.jpeg',
      alt: 'Event promotional material',
      category: 'event',
      date: '2024-12-01',
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

  const allImages = [...localImages, ...instagramImages];

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
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black/50 rounded-full p-3">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8 5v10l8-5-8-5z"/>
                      </svg>
                    </div>
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
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-6xl max-h-full">
            {selectedImageData.mediaType === 'video' ? (
              <VideoPlayer
                src={selectedImageData.src}
                title={selectedImageData.alt}
                className="max-w-full max-h-full"
              />
            ) : (
              <img
                src={selectedImageData.src}
                alt={selectedImageData.alt}
                className="max-w-full max-h-full object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/Images/364268621_248985811283826_4097087762299984333_n.jpg';
                }}
              />
            )}
            
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-red-500 transition-colors duration-300 bg-black/50 rounded-full p-2"
            >
              <X size={24} />
            </button>
            
            {/* Navigation buttons */}
            <button
              onClick={() => navigateImage('prev')}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-red-500 transition-colors duration-300 bg-black/50 rounded-full p-2"
            >
              <ChevronLeft size={32} />
            </button>
            
            <button
              onClick={() => navigateImage('next')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-red-500 transition-colors duration-300 bg-black/50 rounded-full p-2"
            >
              <ChevronRight size={32} />
            </button>
            
            {/* Image info */}
            {selectedImageData.mediaType !== 'video' && (
              <div className="absolute bottom-4 left-4 right-4 text-white bg-black/70 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm uppercase tracking-wider text-red-400 bg-red-600/20 px-2 py-1 rounded">
                    {selectedImageData.category}
                  </span>
                  {selectedImageData.isInstagram && selectedImageData.likes && (
                    <div className="flex items-center">
                      <Heart size={16} className="mr-1 text-red-500" />
                      <span>{selectedImageData.likes} Likes</span>
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-bold mb-2">{selectedImageData.alt}</h3>
                {selectedImageData.caption && (
                  <p className="text-sm text-gray-300 mb-2 line-clamp-3">
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
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;