import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, Shield, Smartphone, Globe, AlertTriangle, CheckCircle } from 'lucide-react';

const NetworkTroubleshooting: React.FC = () => {
  const [currentUrl, setCurrentUrl] = useState('');
  const [networkStatus, setNetworkStatus] = useState<'checking' | 'blocked' | 'accessible'>('checking');

  useEffect(() => {
    setCurrentUrl(window.location.href);
    
    // Teste Netzwerk-Zugriff
    const testNetwork = async () => {
      try {
        const response = await fetch('/api/health', { method: 'HEAD' });
        setNetworkStatus(response.ok ? 'accessible' : 'blocked');
      } catch {
        setNetworkStatus('blocked');
      }
    };

    testNetwork();
  }, []);

  const alternativeUrls = [
    { label: '127.0.0.1', url: currentUrl.replace('localhost', '127.0.0.1') },
    { label: 'Port 8080', url: currentUrl.replace(':5173', ':8080').replace(':3000', ':8080') },
    { label: 'Port 3001', url: currentUrl.replace(':5173', ':3001').replace(':3000', ':3001') },
    { label: 'Port 4000', url: currentUrl.replace(':5173', ':4000').replace(':3000', ':4000') }
  ];

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
      <div className="bg-neutral-900 rounded-lg max-w-2xl w-full p-6">
        <div className="text-center mb-6">
          <Shield className="text-red-500 mx-auto mb-4" size={48} />
          <h2 className="text-2xl font-bold text-white mb-2">Netzwerk-Blockierung erkannt</h2>
          <p className="text-gray-400">
            Deine Organisation blockiert den Zugriff auf diese Seite
          </p>
        </div>

        <div className="space-y-6">
          {/* Schnelle Lösungen */}
          <div className="bg-neutral-800 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-3 flex items-center">
              <Smartphone className="mr-2 text-blue-500" size={20} />
              Sofortige Lösungen
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-neutral-700 rounded">
                <span className="text-gray-300">Mobiles Internet verwenden</span>
                <span className="text-green-400 text-sm">Empfohlen</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-neutral-700 rounded">
                <span className="text-gray-300">VPN aktivieren</span>
                <a 
                  href="https://protonvpn.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 text-sm hover:underline"
                >
                  ProtonVPN →
                </a>
              </div>
            </div>
          </div>

          {/* Alternative URLs */}
          <div className="bg-neutral-800 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-3 flex items-center">
              <Globe className="mr-2 text-green-500" size={20} />
              Alternative URLs testen
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {alternativeUrls.map((alt, index) => (
                <a
                  key={index}
                  href={alt.url}
                  className="flex items-center justify-between p-3 bg-neutral-700 hover:bg-neutral-600 rounded transition-colors duration-300"
                >
                  <span className="text-gray-300">{alt.label}</span>
                  <span className="text-blue-400 text-sm">Testen →</span>
                </a>
              ))}
            </div>
          </div>

          {/* Entwickler-Befehle */}
          <div className="bg-neutral-800 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-3 flex items-center">
              <WifiOff className="mr-2 text-purple-500" size={20} />
              Entwickler-Befehle
            </h3>
            
            <div className="space-y-2">
              <div className="bg-neutral-700 p-3 rounded">
                <p className="text-gray-400 text-sm mb-1">Alternativer Port:</p>
                <code className="text-green-400 text-sm">npm run dev-alt</code>
              </div>
              
              <div className="bg-neutral-700 p-3 rounded">
                <p className="text-gray-400 text-sm mb-1">Netzwerk-Zugriff:</p>
                <code className="text-green-400 text-sm">npm run dev-mobile</code>
              </div>
              
              <div className="bg-neutral-700 p-3 rounded">
                <p className="text-gray-400 text-sm mb-1">HTTPS-Modus:</p>
                <code className="text-green-400 text-sm">npm run dev-secure</code>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className={`p-4 rounded-lg border ${
            networkStatus === 'accessible' 
              ? 'bg-green-900/20 border-green-700' 
              : 'bg-red-900/20 border-red-700'
          }`}>
            <div className="flex items-center space-x-3">
              {networkStatus === 'accessible' ? (
                <CheckCircle className="text-green-500" size={20} />
              ) : (
                <AlertTriangle className="text-red-500" size={20} />
              )}
              <div>
                <h4 className="text-white font-medium">
                  {networkStatus === 'accessible' ? 'Verbindung OK' : 'Verbindung blockiert'}
                </h4>
                <p className="text-gray-400 text-sm">
                  {networkStatus === 'accessible' 
                    ? 'Die Seite sollte normal funktionieren'
                    : 'Verwende eine der obigen Lösungen'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-300"
          >
            Seite neu laden
          </button>
        </div>
      </div>
    </div>
  );
};

export default NetworkTroubleshooting;