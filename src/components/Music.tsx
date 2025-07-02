import React, { useState, Suspense } from 'react';
import { Play, Pause } from 'lucide-react';
import LazyImage from './LazyImage';
import LoadingSpinner from './LoadingSpinner';
import { useTranslation } from 'react-i18next';

// Dynamic import for heavy component
const MixCloudPlayer = React.lazy(() => import('./MixCloudPlayer'));

interface Track {
  id: number;
  title: string;
  duration: string;
  thumbnail: string;
  soundcloudUrl: string;
  embedCode: string;
}

const Music: React.FC = () => {
  const { t } = useTranslation();
  const [currentTrack, setCurrentTrack] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const tracks: Track[] = [
    { 
      id: 1, 
      title: 'Justas Lange - Bass Drop Anthem', 
      duration: '3:24', 
      thumbnail: '/images/image00003(1).jpeg',
      soundcloudUrl: 'https://soundcloud.com/justas-lange',
      embedCode: '<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/justas-lange&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>'
    },
    { 
      id: 2, 
      title: 'Justas Lange - Underground Vibes', 
      duration: '4:15', 
      thumbnail: '/images/image00002(1).jpeg',
      soundcloudUrl: 'https://soundcloud.com/justas-lange',
      embedCode: '<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/justas-lange&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>'
    },
    { 
      id: 3, 
      title: 'Justas Lange - Festival Mix 2024', 
      duration: '5:45', 
      thumbnail: '/images/image00001(2).jpeg',
      soundcloudUrl: 'https://soundcloud.com/justas-lange',
      embedCode: '<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/justas-lange&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>'
    }
  ];

  return (
    <div className="container mx-auto px-6 py-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">{t('music.title')}</h2>
      <div className="flex justify-center">
        <iframe
          width="100%"
          height="166"
          scrolling="no"
          frameBorder="no"
          allow="autoplay"
          src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/justas-lange&color=%23ef4444&auto_play=false&show_artwork=true"
          title="Justas Lange SoundCloud Player"
          style={{ maxWidth: 600, width: '100%', borderRadius: 12 }}
        ></iframe>
      </div>
      
      {/* Featured Track Section */}
      <div className="mb-12">
        <div className="max-w-lg mx-auto">
          <div className="relative rounded-lg overflow-hidden group">
            <LazyImage 
              src={tracks[0].thumbnail}
              alt="Latest Release" 
              className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
              context="music"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70"></div>
            <div className="absolute bottom-0 left-0 p-6">
              <h3 className="text-2xl font-bold mb-2">{t('music.latestRelease')}</h3>
              <p className="text-red-400 mb-4">{tracks[0].title}</p>
              <a 
                href={tracks[0].soundcloudUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 bg-red-600 hover:bg-red-700 rounded-sm flex items-center space-x-2 play-btn w-fit"
              >
                <Play size={18} />
                <span>{t('music.listenNow')}</span>
              </a>
            </div>
          </div>

          <div className="mt-8 text-center">
            <h3 className="text-xl font-semibold mb-4">{t('music.streamOn')}</h3>
            <div className="flex justify-center">
              <a 
                href="https://soundcloud.com/justas-lange"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-neutral-800 rounded hover:bg-neutral-700 transition-colors duration-300 cursor-pointer"
              >
                <div className="relative overflow-hidden h-8 w-8">
                  <div className="absolute inset-0 bg-neutral-800 flex items-center justify-center">
                    {/* SoundCloud SVG Logo */}
                    <svg viewBox="0 0 32 32" width="32" height="32" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="text-orange-500">
                      <path d="M25.6 18.667c-0.267 0-0.533 0.027-0.8 0.08-0.267-2.987-2.88-5.28-5.867-5.28-0.56 0-1.12 0.080-1.653 0.24-0.267 0.080-0.427 0.347-0.347 0.613 0.080 0.267 0.347 0.427 0.613 0.347 0.453-0.133 0.933-0.2 1.387-0.2 2.56 0 4.693 2.027 4.8 4.587 0.013 0.293 0.24 0.52 0.533 0.52h1.333c0.733 0 1.333 0.6 1.333 1.333s-0.6 1.333-1.333 1.333h-13.867c-0.733 0-1.333-0.6-1.333-1.333s0.6-1.333 1.333-1.333h0.267c0.293 0 0.533-0.24 0.533-0.533v-7.467c0-0.293-0.24-0.533-0.533-0.533h-0.267c-0.733 0-1.333 0.6-1.333 1.333v7.467c0 0.293-0.24 0.533-0.533 0.533h-0.267c-0.733 0-1.333-0.6-1.333-1.333s0.6-1.333 1.333-1.333h0.267c0.293 0 0.533-0.24 0.533-0.533v-5.867c0-0.293-0.24-0.533-0.533-0.533h-0.267c-0.733 0-1.333 0.6-1.333 1.333v5.867c0 0.293-0.24 0.533-0.533 0.533h-0.267c-0.733 0-1.333-0.6-1.333-1.333s0.6-1.333 1.333-1.333h0.267c0.293 0 0.533-0.24 0.533-0.533v-4.267c0-0.293-0.24-0.533-0.533-0.533h-0.267c-0.733 0-1.333 0.6-1.333 1.333v4.267c0 0.293-0.24 0.533-0.533 0.533h-0.267c-0.733 0-1.333-0.6-1.333-1.333s0.6-1.333 1.333-1.333h0.267c0.293 0 0.533-0.24 0.533-0.533v-2.667c0-0.293-0.24-0.533-0.533-0.533h-0.267c-0.733 0-1.333 0.6-1.333 1.333v2.667c0 0.293-0.24 0.533-0.533 0.533h-0.267c-0.733 0-1.333-0.6-1.333-1.333s0.6-1.333 1.333-1.333h17.067c0.733 0 1.333 0.6 1.333 1.333s-0.6 1.333-1.333 1.333z"/>
                    </svg>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mixcloud Player */}
      <div className="mb-12">
        <Suspense fallback={<LoadingSpinner size="lg" color="red" />}>
          <MixCloudPlayer />
        </Suspense>
      </div>
      
      {/* Featured Tracks */}
      <div className="bg-neutral-800/50 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">{t('music.featuredTracks')}</h3>
        
        <div className="space-y-8">
          {tracks.map((track) => (
            <div key={track.id} className="space-y-4">
              <div 
                className={`flex items-center p-3 rounded-lg track-item ${
                  currentTrack === track.id ? 'bg-red-900/20 border-l-4 border-red-600' : ''
                }`}
              >
                <div className="flex-shrink-0 w-12 h-12 relative mr-4">
                  <LazyImage 
                    src={track.thumbnail} 
                    alt={track.title} 
                    className="w-full h-full object-cover rounded"
                    context="music"
                  />
                </div>
                
                <div className="flex-1">
                  <h4 className="font-medium">{track.title}</h4>
                  <p className="text-sm text-gray-400">Bass/House</p>
                </div>
                
                <div className="text-sm text-gray-400">{track.duration}</div>
              </div>
              
              <div className="w-full" dangerouslySetInnerHTML={{ __html: track.embedCode }} />
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <a 
            href="https://soundcloud.com/justas-lange"
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-500 hover:text-red-400 text-sm font-medium"
          >
            {t('music.viewAllOnSoundcloud')}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Music;