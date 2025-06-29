import React, { useState, useEffect } from 'react';
import { Radio, Users, Clock, Calendar } from 'lucide-react';

interface StreamEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  platform: 'twitch' | 'youtube' | 'instagram';
  isLive: boolean;
  viewers?: number;
  streamUrl: string;
}

const LiveStream: React.FC = () => {
  const [isLive, setIsLive] = useState(false);
  const [viewers, setViewers] = useState(0);

  const upcomingStreams: StreamEvent[] = [
    {
      id: 'stream-1',
      title: 'Studio Session Live - New Track Preview',
      date: '2025-01-20',
      time: '20:00',
      platform: 'twitch',
      isLive: false,
      streamUrl: 'https://twitch.tv/justaslange'
    },
    {
      id: 'stream-2',
      title: 'Techno Mix Session',
      date: '2025-01-25',
      time: '21:30',
      platform: 'youtube',
      isLive: false,
      streamUrl: 'https://youtube.com/@justaslange'
    }
  ];

  // Simulate live status
  useEffect(() => {
    const interval = setInterval(() => {
      // Random chance to go live (for demo)
      if (Math.random() > 0.95) {
        setIsLive(true);
        setViewers(Math.floor(Math.random() * 500) + 50);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-r from-purple-900/20 to-red-900/20 rounded-lg p-6 border border-purple-500/20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Radio className={`${isLive ? 'text-red-500 animate-pulse' : 'text-gray-400'}`} size={24} />
          <h3 className="text-xl font-bold">Live Streams</h3>
          {isLive && (
            <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full animate-pulse">
              LIVE
            </span>
          )}
        </div>
        
        {isLive && (
          <div className="flex items-center text-sm text-gray-300">
            <Users size={16} className="mr-1" />
            <span>{viewers} Zuschauer</span>
          </div>
        )}
      </div>

      {isLive ? (
        <div className="mb-6">
          <div className="bg-black rounded-lg aspect-video flex items-center justify-center mb-4">
            <div className="text-center">
              <Radio size={48} className="text-red-500 mx-auto mb-2 animate-pulse" />
              <p className="text-white font-medium">Live Studio Session</p>
              <p className="text-gray-400 text-sm">Arbeite an neuen Tracks</p>
            </div>
          </div>
          
          <div className="flex space-x-4">
            <a
              href="https://twitch.tv/justaslange"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg text-center transition-colors duration-300"
            >
              Auf Twitch ansehen
            </a>
            <a
              href="https://youtube.com/@justaslange"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg text-center transition-colors duration-300"
            >
              Auf YouTube ansehen
            </a>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-300">Kommende Streams</h4>
          
          {upcomingStreams.map((stream) => (
            <div key={stream.id} className="bg-neutral-800/50 rounded-lg p-4">
              <h5 className="font-medium text-white mb-2">{stream.title}</h5>
              
              <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                <div className="flex items-center">
                  <Calendar size={14} className="mr-1" />
                  <span>{new Date(stream.date).toLocaleDateString('de-DE')}</span>
                </div>
                <div className="flex items-center">
                  <Clock size={14} className="mr-1" />
                  <span>{stream.time}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className={`text-xs px-2 py-1 rounded ${
                  stream.platform === 'twitch' ? 'bg-purple-600/20 text-purple-400' :
                  stream.platform === 'youtube' ? 'bg-red-600/20 text-red-400' :
                  'bg-pink-600/20 text-pink-400'
                }`}>
                  {stream.platform.toUpperCase()}
                </span>
                
                <a
                  href={stream.streamUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-500 hover:text-red-400 text-sm"
                >
                  Erinnerung setzen →
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LiveStream;