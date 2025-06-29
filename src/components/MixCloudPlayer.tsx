import React, { useState } from 'react';
import { Play, Pause, ExternalLink, Download } from 'lucide-react';
import AudioVisualizer from './AudioVisualizer';

interface Mix {
  id: string;
  title: string;
  duration: string;
  date: string;
  plays: number;
  mixcloudUrl: string;
  downloadUrl?: string;
  genre: string[];
  description: string;
}

const MixCloudPlayer: React.FC = () => {
  const [currentMix, setCurrentMix] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const mixes: Mix[] = [
    {
      id: 'mix-1',
      title: 'Techno Underground Session #001',
      duration: '62:34',
      date: '2025-01-15',
      plays: 2847,
      mixcloudUrl: 'https://mixcloud.com/justaslange',
      downloadUrl: '/mixes/underground-session-001.mp3',
      genre: ['Techno', 'Underground', 'Dark'],
      description: 'Deep underground techno journey with industrial elements and driving basslines.'
    },
    {
      id: 'mix-2',
      title: 'Bass House Madness Vol. 3',
      duration: '45:22',
      date: '2025-01-08',
      plays: 1923,
      mixcloudUrl: 'https://mixcloud.com/justaslange',
      genre: ['Bass House', 'Electronic', 'Energy'],
      description: 'High-energy bass house mix perfect for peak time moments.'
    },
    {
      id: 'mix-3',
      title: 'Progressive Journey',
      duration: '78:15',
      date: '2024-12-28',
      plays: 3421,
      mixcloudUrl: 'https://mixcloud.com/justaslange',
      genre: ['Progressive', 'Melodic', 'Deep'],
      description: 'Emotional progressive house journey with melodic breakdowns.'
    }
  ];

  const togglePlay = (mixId: string) => {
    if (currentMix === mixId && isPlaying) {
      setIsPlaying(false);
    } else {
      setCurrentMix(mixId);
      setIsPlaying(true);
    }
  };

  return (
    <div className="bg-neutral-900 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold">Latest Mixes</h3>
        <a 
          href="https://mixcloud.com/justaslange"
          target="_blank"
          rel="noopener noreferrer"
          className="text-red-500 hover:text-red-400 text-sm flex items-center"
        >
          <ExternalLink size={16} className="mr-1" />
          View All on Mixcloud
        </a>
      </div>

      <div className="space-y-4">
        {mixes.map((mix) => (
          <div 
            key={mix.id}
            className="bg-neutral-800 rounded-lg p-4 hover:bg-neutral-750 transition-colors duration-300"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-semibold text-white mb-1">{mix.title}</h4>
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <span>{mix.duration}</span>
                  <span>{mix.plays.toLocaleString()} plays</span>
                  <span>{new Date(mix.date).toLocaleDateString('de-DE')}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {mix.downloadUrl && (
                  <a
                    href={mix.downloadUrl}
                    download
                    className="p-2 bg-neutral-700 hover:bg-neutral-600 rounded-full transition-colors duration-300"
                  >
                    <Download size={16} className="text-gray-300" />
                  </a>
                )}
                
                <button
                  onClick={() => togglePlay(mix.id)}
                  className="p-2 bg-red-600 hover:bg-red-700 rounded-full transition-colors duration-300"
                >
                  {currentMix === mix.id && isPlaying ? (
                    <Pause size={16} className="text-white" />
                  ) : (
                    <Play size={16} className="text-white ml-0.5" />
                  )}
                </button>
              </div>
            </div>

            {/* Genre Tags */}
            <div className="flex flex-wrap gap-2 mb-3">
              {mix.genre.map((genre) => (
                <span 
                  key={genre}
                  className="px-2 py-1 bg-red-600/20 text-red-400 text-xs rounded"
                >
                  {genre}
                </span>
              ))}
            </div>

            {/* Audio Visualizer */}
            {currentMix === mix.id && (
              <div className="mb-3">
                <AudioVisualizer 
                  isPlaying={isPlaying}
                  className="w-full h-16 bg-black rounded"
                />
              </div>
            )}

            <p className="text-gray-400 text-sm">{mix.description}</p>

            {/* Mixcloud Embed */}
            {currentMix === mix.id && (
              <div className="mt-4">
                <iframe
                  width="100%"
                  height="120"
                  src={`https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&feed=${encodeURIComponent(mix.mixcloudUrl)}`}
                  frameBorder="0"
                  className="rounded"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MixCloudPlayer;