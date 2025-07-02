import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Camera, Star } from 'lucide-react';
import LazyImage from './LazyImage';

interface SpotlightImage {
  id: string;
  src: string;
  title: string;
  description: string;
  category: string;
  featured: boolean;
}

const ArtistSpotlight: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const spotlightImages: SpotlightImage[] = [
    {
      id: 'spotlight-1',
      src: '/images/image00003(1).jpeg',
      title: 'Red Light Sessions',
      description: 'Professional studio performance captured in dramatic lighting. This image showcases the intensity and focus that goes into every live session.',
      category: 'Live Performance',
      featured: true
    },
    {
      id: 'spotlight-2',
      src: '/images/image00001(2).jpeg',
      title: 'Artist Portrait',
      description: 'Professional portrait highlighting the artist behind the music. A glimpse into the person who creates the beats that move the crowd.',
      category: 'Professional',
      featured: true
    },
    {
      id: 'spotlight-3',
      src: '/images/image00002(1).jpeg',
      title: 'Behind The Beats',
      description: 'Collaborative moments in the studio where music comes to life. These are the authentic moments of creation and partnership.',
      category: 'Studio Life',
      featured: true
    }
  ];

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % spotlightImages.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + spotlightImages.length) % spotlightImages.length);
  };

  const currentImage = spotlightImages[currentIndex];

  return (
    <div className="py-20 bg-gradient-to-b from-black to-neutral-950">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Camera size={32} className="text-red-500 mr-3" />
            <h2 className="text-3xl md:text-4xl font-bold">Artist Spotlight</h2>
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Professional captures that showcase the artistry, passion, and dedication behind the music
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image Section */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl group">
                <LazyImage
                  src={currentImage.src}
                  alt={currentImage.title}
                  className="w-full h-[500px] md:h-[600px] object-cover transition-transform duration-700 group-hover:scale-105"
                  context="gallery"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Image Category Badge */}
                <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {currentImage.category}
                </div>
                
                {/* Featured Badge */}
                {currentImage.featured && (
                  <div className="absolute top-4 right-4 bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                    <Star size={14} className="mr-1 fill-current" />
                    Featured
                  </div>
                )}
              </div>

              {/* Navigation Controls */}
              <div className="absolute inset-y-0 left-4 flex items-center">
                <button
                  onClick={prevImage}
                  className="bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
                >
                  <ChevronLeft size={24} />
                </button>
              </div>
              
              <div className="absolute inset-y-0 right-4 flex items-center">
                <button
                  onClick={nextImage}
                  className="bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              {/* Dots Indicator */}
              <div className="flex justify-center mt-6 space-x-2">
                {spotlightImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex 
                        ? 'bg-red-500 scale-125' 
                        : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Content Section */}
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                  {currentImage.title}
                </h3>
                <p className="text-xl text-gray-300 leading-relaxed">
                  {currentImage.description}
                </p>
              </div>

              {/* Professional Stats */}
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-neutral-900/50 rounded-xl backdrop-blur-sm">
                  <div className="text-3xl font-bold text-red-500 mb-2">Professional</div>
                  <div className="text-sm text-gray-400 uppercase tracking-wider">Quality</div>
                </div>
                <div className="text-center p-6 bg-neutral-900/50 rounded-xl backdrop-blur-sm">
                  <div className="text-3xl font-bold text-red-500 mb-2">Authentic</div>
                  <div className="text-sm text-gray-400 uppercase tracking-wider">Moments</div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#gallery"
                  className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg transition-all duration-300 transform hover:-translate-y-1 text-center font-semibold"
                >
                  View Full Gallery
                </a>
                <a
                  href="#contact"
                  className="px-6 py-3 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all duration-300 transform hover:-translate-y-1 text-center font-semibold"
                >
                  Book a Session
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail Strip */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h4 className="text-xl font-semibold mb-6 text-center">Featured Collection</h4>
          <div className="grid grid-cols-3 gap-4">
            {spotlightImages.map((image, index) => (
              <button
                key={image.id}
                onClick={() => setCurrentIndex(index)}
                className={`relative overflow-hidden rounded-lg group transition-all duration-300 ${
                  index === currentIndex 
                    ? 'ring-2 ring-red-500 scale-105' 
                    : 'hover:scale-105'
                }`}
              >
                <LazyImage
                  src={image.src}
                  alt={image.title}
                  className="w-full h-24 md:h-32 object-cover transition-transform duration-300 group-hover:scale-110"
                  context="gallery"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300"></div>
                <div className="absolute bottom-1 left-1 right-1">
                  <div className="text-white text-xs font-semibold truncate">
                    {image.title}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistSpotlight; 