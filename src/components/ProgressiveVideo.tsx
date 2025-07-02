import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Loader } from 'lucide-react';
import LazyImage from './LazyImage';

interface ProgressiveVideoProps {
  src: string;
  poster?: string;
  thumbnail?: string;
  title?: string;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  preloadStrategy?: 'none' | 'metadata' | 'auto';
}

const ProgressiveVideo: React.FC<ProgressiveVideoProps> = ({
  src,
  poster,
  thumbnail,
  title,
  className = '',
  autoPlay = false,
  muted = true,
  loop = false,
  preloadStrategy = 'metadata'
}) => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoRequested, setVideoRequested] = useState(autoPlay);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [volume, setVolume] = useState(muted ? 0 : 1);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load video when requested
  useEffect(() => {
    if (videoRequested && !videoLoaded && !hasError) {
      setIsLoading(true);
      const video = videoRef.current;
      if (video) {
        video.load();
      }
    }
  }, [videoRequested, videoLoaded, hasError]);

  const handleThumbnailClick = () => {
    setVideoRequested(true);
    setShowControls(true);
  };

  const handleVideoLoad = () => {
    setVideoLoaded(true);
    setIsLoading(false);
    
    if (autoPlay) {
      const video = videoRef.current;
      if (video) {
        video.play().then(() => {
          setIsPlaying(true);
        }).catch((error) => {
          console.error('Auto-play failed:', error);
        });
      }
    }
  };

  const handleVideoError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (!videoRequested) {
      setVideoRequested(true);
      return;
    }

    if (isPlaying) {
      video.pause();
    } else {
      video.play().catch((error) => {
        console.error('Play failed:', error);
        setHasError(true);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    
    const video = videoRef.current;
    if (video) {
      video.volume = newVolume;
      video.muted = newVolume === 0;
    }
  };

  const getDisplaySource = () => {
    if (hasError || !videoRequested) {
      return thumbnail || poster;
    }
    return poster;
  };

  return (
    <div 
      ref={containerRef}
      className={`relative group bg-black rounded-lg overflow-hidden ${className}`}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Thumbnail/Poster Layer */}
      {(!videoRequested || !videoLoaded) && (
        <div className="relative w-full h-full">
          <LazyImage
            src={getDisplaySource() || '/images/video-placeholder.jpg'}
            alt={title || 'Video thumbnail'}
            className="w-full h-full"
            priority={autoPlay}
          />
          
          {/* Play overlay for thumbnail */}
          {!videoRequested && (
            <div 
              className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black/30"
              onClick={handleThumbnailClick}
            >
              <div className="bg-black/70 rounded-full p-6 transform transition-all duration-300 hover:scale-110">
                <Play size={40} className="text-white ml-2" />
              </div>
            </div>
          )}
          
          {/* Loading overlay */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <div className="flex items-center space-x-3 text-white">
                <Loader className="animate-spin" size={24} />
                <span>Video wird geladen...</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Video Element */}
      {videoRequested && (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          preload={preloadStrategy}
          muted={muted}
          loop={loop}
          playsInline
          onLoadedData={handleVideoLoad}
          onError={handleVideoError}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          className={`w-full h-full object-cover ${videoLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
        />
      )}

      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-900/20">
          <div className="text-center text-white">
            <div className="text-4xl mb-4">⚠️</div>
            <p>Video konnte nicht geladen werden</p>
            <button 
              onClick={() => {
                setHasError(false);
                setVideoRequested(true);
              }}
              className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm transition-colors duration-300"
            >
              Erneut versuchen
            </button>
          </div>
        </div>
      )}

      {/* Video Controls */}
      {videoRequested && videoLoaded && (
        <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={togglePlay}
                className="text-white hover:text-red-500 transition-colors duration-300"
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>
              
              <div className="flex items-center space-x-2">
                <Volume2 size={16} className="text-white" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-16 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
            
            {title && (
              <span className="text-white text-sm font-medium">{title}</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressiveVideo;
