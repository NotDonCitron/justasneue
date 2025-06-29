import React, { useState } from 'react';
import { Play, Pause } from 'lucide-react';

interface Track {
  id: number;
  title: string;
  duration: string;
  thumbnail: string;
  soundcloudUrl: string;
  embedCode: string;
}

const Music: React.FC = () => {
  const [currentTrack, setCurrentTrack] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const tracks: Track[] = [
    { 
      id: 1, 
      title: 'Justas Lange - Bass Drop Anthem', 
      duration: '3:24', 
      thumbnail: '/Images/364268621_248985811283826_4097087762299984333_n.jpg',
      soundcloudUrl: 'https://soundcloud.com/justas-lange',
      embedCode: '<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/justas-lange&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>'
    },
    { 
      id: 2, 
      title: 'Justas Lange - Underground Vibes', 
      duration: '4:15', 
      thumbnail: '/Images/364268621_248985811283826_4097087762299984333_n.jpg',
      soundcloudUrl: 'https://soundcloud.com/justas-lange',
      embedCode: '<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/justas-lange&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>'
    },
    { 
      id: 3, 
      title: 'Justas Lange - Festival Mix 2024', 
      duration: '5:45', 
      thumbnail: '/Images/364268621_248985811283826_4097087762299984333_n.jpg',
      soundcloudUrl: 'https://soundcloud.com/justas-lange',
      embedCode: '<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/justas-lange&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>'
    }
  ];

  return (
    <div className="container mx-auto px-6">
      <div className="mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest Tracks & Sets</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Experience the energy through my latest releases and live sets. Bass-heavy tracks and house anthems.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2">
          <div className="relative rounded-lg overflow-hidden group">
            <img 
              src={tracks[0].thumbnail}
              alt="Latest Release" 
              className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70"></div>
            <div className="absolute bottom-0 left-0 p-6">
              <h3 className="text-2xl font-bold mb-2">Latest Release</h3>
              <p className="text-red-400 mb-4">{tracks[0].title}</p>
              <a 
                href={tracks[0].soundcloudUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 bg-red-600 hover:bg-red-700 rounded-sm flex items-center space-x-2 play-btn w-fit"
              >
                <Play size={18} />
                <span>Listen Now</span>
              </a>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Stream On</h3>
            <div className="flex space-x-4">
              <a 
                href="https://soundcloud.com/justas-lange"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-neutral-800 rounded hover:bg-neutral-700 transition-colors duration-300 cursor-pointer"
              >
                <img src="https://upload.wikimedia.org/wikipedia/commons/9/96/SoundCloud_icon.svg" alt="SoundCloud" className="h-8 w-8" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-3">
          <div className="bg-neutral-800/50 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Featured Tracks</h3>
            
            <div className="space-y-8">
              {tracks.map((track) => (
                <div key={track.id} className="space-y-4">
                  <div 
                    className={`flex items-center p-3 rounded-lg track-item ${
                      currentTrack === track.id ? 'bg-red-900/20 border-l-4 border-red-600' : ''
                    }`}
                  >
                    <div className="flex-shrink-0 w-12 h-12 relative mr-4">
                      <img 
                        src={track.thumbnail} 
                        alt={track.title} 
                        className="w-full h-full object-cover rounded"
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
                View All Tracks on SoundCloud
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Music;