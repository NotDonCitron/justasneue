import React, { useState } from 'react';
import { Users, Headphones, Settings } from 'lucide-react';
import GuestInterface from './GuestInterface';
import DJDashboard from './DJDashboard';

const RequestSystemDemo: React.FC = () => {
  const [activeView, setActiveView] = useState<'guest' | 'dj'>('guest');
  const [eventId] = useState('demo-event-123');
  const [userId] = useState('demo-user-456');
  const [djId] = useState('demo-dj-789');

  return (
    <div className="min-h-screen bg-black">
      {/* Demo Header */}
      <div className="bg-gradient-to-r from-red-900/30 to-purple-900/30 border-b border-red-500/30 p-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">DJ Request System Demo</h1>
              <p className="text-gray-400">Live Event: Techno Night @ MS Connexion Complex</p>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setActiveView('guest')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-300 ${
                  activeView === 'guest' 
                    ? 'bg-red-600 text-white' 
                    : 'bg-neutral-800 text-gray-300 hover:bg-neutral-700'
                }`}
              >
                <Users size={18} />
                <span>Guest View</span>
              </button>
              
              <button
                onClick={() => setActiveView('dj')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-300 ${
                  activeView === 'dj' 
                    ? 'bg-red-600 text-white' 
                    : 'bg-neutral-800 text-gray-300 hover:bg-neutral-700'
                }`}
              >
                <Headphones size={18} />
                <span>DJ Dashboard</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Notice */}
      <div className="bg-yellow-900/20 border-b border-yellow-700/30 p-3">
        <div className="container mx-auto">
          <div className="flex items-center space-x-2 text-yellow-400">
            <Settings size={16} />
            <span className="text-sm">
              Demo Mode: WebSocket connections are simulated. In production, this would connect to a real-time server.
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      {activeView === 'guest' ? (
        <GuestInterface eventId={eventId} userId={userId} />
      ) : (
        <DJDashboard eventId={eventId} djId={djId} />
      )}
    </div>
  );
};

export default RequestSystemDemo;