import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: 'performance' | 'studio' | 'event';
}

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const images: GalleryImage[] = [
    {
      id: 1,
      src: '/Images/364268621_248985811283826_4097087762299984333_n.jpg',
      alt: 'Justas Lange performing live',
      category: 'performance'
    },
    {
      id: 2,
      src: '/Images/WhatsApp Image 2025-05-10 at 15.09.09 copy.jpeg',
      alt: 'DJ setup and equipment',
      category: 'studio'
    },
    {
      id: 3,
      src: '/Images/WhatsApp Image 2025-05-10 at 15.10.27 copy.jpeg',
      alt: 'Live performance at club',
      category: 'performance'
    },
    {
      id: 4,
      src: '/Images/header 2.jpeg',
      alt: 'Event promotional material',
      category: 'event'
    },
    {
      id: 5,
      src: '/Images/justas-hero.jpg',
      alt: 'Professional DJ portrait',
      category: 'studio'
    }
  ];

  const filteredImages = filter === 'all' 
    ? images 
    : images.filter(img => img.category === filter);

  const openLightbox = (imageId: number) => {
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
    ? images.find(img => img.id === selectedImage)
    : null;

  return (
    <div className="container mx-auto px-6">
      <div className="mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Photo Gallery</h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-8">
          Behind the scenes, live performances, and studio moments captured.
        </p>
        
        {/* Filter buttons */}
        <div className="flex justify-center space-x-4 mb-8">
          {['all', 'performance', 'studio', 'event'].map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-2 rounded-sm transition-all duration-300 ${
                filter === category
                  ? 'bg-red-600 text-white'
                  : 'bg-neutral-800 text-gray-300 hover:bg-neutral-700'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      {/* Gallery grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredImages.map((image) => (
          <div
            key={image.id}
            className="relative group cursor-pointer overflow-hidden rounded-lg"
            onClick={() => openLightbox(image.id)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="text-white text-center">
                <p className="text-sm uppercase tracking-wider mb-2">{image.category}</p>
                <p className="text-lg font-medium">View Full Size</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Lightbox */}
      {selectedImage && selectedImageData && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <img
              src={selectedImageData.src}
              alt={selectedImageData.alt}
              className="max-w-full max-h-full object-contain"
            />
            
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-red-500 transition-colors duration-300"
            >
              <X size={32} />
            </button>
            
            {/* Navigation buttons */}
            <button
              onClick={() => navigateImage('prev')}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-red-500 transition-colors duration-300"
            >
              <ChevronLeft size={48} />
            </button>
            
            <button
              onClick={() => navigateImage('next')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-red-500 transition-colors duration-300"
            >
              <ChevronRight size={48} />
            </button>
            
            {/* Image info */}
            <div className="absolute bottom-4 left-4 text-white">
              <p className="text-sm uppercase tracking-wider text-red-400 mb-1">
                {selectedImageData.category}
              </p>
              <p className="text-lg">{selectedImageData.alt}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;