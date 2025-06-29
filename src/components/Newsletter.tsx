import React, { useState } from 'react';
import { Mail, Check, AlertCircle } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setStatus('error');
      setMessage('Bitte gib eine gültige E-Mail-Adresse ein.');
      return;
    }

    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setMessage('Erfolgreich angemeldet! Du erhältst bald Updates zu neuen Events und Releases.');
      setEmail('');
      
      // Reset after 5 seconds
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
    }, 2000);
  };

  return (
    <div className="py-20 bg-gradient-to-r from-red-900/20 to-black">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <Mail size={48} className="text-red-500 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Bleib auf dem Laufenden
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Erhalte exklusive Updates zu neuen Tracks, kommenden Events und Behind-the-Scenes Content. 
              Kein Spam, nur die wichtigsten News aus der Techno-Welt.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="deine@email.com"
                  disabled={status === 'loading' || status === 'success'}
                  className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors duration-300"
                />
              </div>
              
              <button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-red-800 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors duration-300 flex items-center justify-center min-w-[120px]"
              >
                {status === 'loading' ? (
                  <LoadingSpinner size="sm" color="white" />
                ) : status === 'success' ? (
                  <>
                    <Check size={18} className="mr-2" />
                    Angemeldet
                  </>
                ) : (
                  'Anmelden'
                )}
              </button>
            </div>

            {/* Status Messages */}
            {message && (
              <div className={`mt-4 p-3 rounded-lg flex items-center ${
                status === 'success' 
                  ? 'bg-green-900/30 border border-green-700 text-green-400' 
                  : 'bg-red-900/30 border border-red-700 text-red-400'
              }`}>
                {status === 'success' ? (
                  <Check size={18} className="mr-2 flex-shrink-0" />
                ) : (
                  <AlertCircle size={18} className="mr-2 flex-shrink-0" />
                )}
                <span className="text-sm">{message}</span>
              </div>
            )}
          </form>

          {/* Benefits */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-red-500 mb-2">🎵</div>
              <h4 className="font-semibold mb-1">Neue Releases</h4>
              <p className="text-gray-400 text-sm">Erfahre als Erster von neuen Tracks und Remixes</p>
            </div>
            
            <div>
              <div className="text-red-500 mb-2">🎪</div>
              <h4 className="font-semibold mb-1">Event Updates</h4>
              <p className="text-gray-400 text-sm">Exklusive Infos zu kommenden Auftritten und Festivals</p>
            </div>
            
            <div>
              <div className="text-red-500 mb-2">🎬</div>
              <h4 className="font-semibold mb-1">Behind the Scenes</h4>
              <p className="text-gray-400 text-sm">Studio-Sessions und persönliche Einblicke</p>
            </div>
          </div>

          <div className="mt-8 text-xs text-gray-500">
            Du kannst dich jederzeit abmelden. Wir respektieren deine Privatsphäre.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;