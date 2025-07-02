import React, { useState, useRef, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';
import { Music, Camera, Calendar, Play, Image as ImageIcon } from 'lucide-react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
  webpSrc?: string;
  sizes?: string;
  priority?: boolean;
  context?: 'music' | 'gallery' | 'event' | 'video' | 'general';
}

const LazyImage: React.FC<LazyImageProps> = ({ 
  src, 
  alt, 
  className = '', 
  placeholder,
  onLoad,
  onError,
  webpSrc,
  sizes,
  priority = false,
  context = 'general'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const [supportsWebP, setSupportsWebP] = useState<boolean | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // WebP support detection
  useEffect(() => {
    const checkWebPSupport = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      const dataURL = canvas.toDataURL('image/webp');
      setSupportsWebP(dataURL.indexOf('data:image/webp') === 0);
    };
    
    checkWebPSupport();
  }, []);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority) return; // Skip observer for priority images
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '50px' // Start loading 50px before entering viewport
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    console.warn(`Failed to load image: ${src}`);
    setHasError(true);
    onError?.();
  };

  const renderContextIcon = () => {
    switch (context) {
      case 'music':
        return <Music size={40} className="text-red-500 opacity-60" />;
      case 'gallery':
        return <Camera size={40} className="text-gray-400 opacity-60" />;
      case 'event':
        return <Calendar size={40} className="text-blue-400 opacity-60" />;
      case 'video':
        return <Play size={40} className="text-green-400 opacity-60" />;
      default:
        return <ImageIcon size={40} className="text-gray-400 opacity-60" />;
    }
  };

  const getOptimalSrc = () => {
    if (hasError) {
      return placeholder || '';
    }
    if (webpSrc && supportsWebP) return webpSrc;
    return src;
  };

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {/* Placeholder/Loading state */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-neutral-800 flex items-center justify-center">
          {placeholder ? (
            <img 
              src={placeholder} 
              alt={`${alt} placeholder`}
              className="w-full h-full object-cover opacity-30 blur-sm scale-110"
            />
          ) : (
            renderContextIcon()
          )}
        </div>
      )}
      
      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 bg-neutral-800 flex items-center justify-center">
          {renderContextIcon()}
        </div>
      )}
      
      {/* Main image */}
      {isInView && !hasError && (
        <img
          ref={imgRef}
          src={getOptimalSrc()}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          sizes={sizes}
          loading={priority ? 'eager' : 'lazy'}
          className={`
            w-full h-full object-cover transition-opacity duration-500
            ${isLoaded ? 'opacity-100' : 'opacity-0'}
          `}
        />
      )}
    </div>
  );
};

export default LazyImage;