import React, { useState } from 'react';
import '../styles/justas-animations.css';

interface Track {
  id: string;
  title: string;
  artist: string;
  src: string;
  duration: string;
}

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Track>({
    id: '1',
    title: 'Deep House Mix',
    artist: 'Justas',
    src: '/audio/track1.mp3',
    duration: '4:32'
  });

  const [tracks] = useState<Track[]>([
    {
      id: '1',
      title: 'Deep House Mix',
      artist: 'Justas',
      src: '/audio/track1.mp3',
      duration: '4:32'
    },
    {
      id: '2',
      title: 'Techno Vibes',
      artist: 'Justas',
      src: '/audio/track2.mp3',
      duration: '5:18'
    },
    {
      id: '3',
      title: 'Progressive Journey',
      artist: 'Justas',
      src: '/audio/track3.mp3',
      duration: '6:45'
    }
  ]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const selectTrack = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  return (
    <div className="music-player max-w-md mx-auto my-8">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold mb-2">{currentTrack.title}</h3>
        <p className="text-gray-200">{currentTrack.artist}</p>
      </div>

      {/* Waveform Animation */}
      {isPlaying && (
        <div className="waveform-container">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="waveform-bar"></div>
          ))}
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <button className="text-white hover:text-gray-300 transition-colors">
          ⏮
        </button>
        <button
          onClick={togglePlay}
          className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:bg-gray-200 transition-all transform hover:scale-105"
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
        <button className="text-white hover:text-gray-300 transition-colors">
          ⏭
        </button>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
        <div className="bg-white h-2 rounded-full w-1/3 transition-all duration-300"></div>
      </div>

      {/* Track List */}
      <div className="space-y-2">
        {tracks.map((track) => (
          <div
            key={track.id}
            onClick={() => selectTrack(track)}
            className={`p-3 rounded-lg cursor-pointer transition-all hover:bg-white hover:bg-opacity-10 ${
              currentTrack.id === track.id ? 'bg-white bg-opacity-20' : ''
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{track.title}</p>
                <p className="text-sm text-gray-300">{track.artist}</p>
              </div>
              <span className="text-sm text-gray-300">{track.duration}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MusicPlayer; 