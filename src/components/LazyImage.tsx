import React, { useState, useRef, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  placeholder = '/Images/364268621_248985811283826_4097087762299984333_n.jpg',
  onLoad,
  onError
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-neutral-800 flex items-center justify-center">
          <LoadingSpinner size="md" color="red" />
        </div>
      )}
      
      {isInView && (
        <img
          src={hasError ? placeholder : src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
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