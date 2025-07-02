import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, Settings, RefreshCw, Shield, Globe } from 'lucide-react';

const TroubleshootingGuide: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-neutral-900 rounded-lg">
      <div className="text-center mb-8">
        <AlertTriangle className="text-yellow-500 mx-auto mb-4" size={48} />
        <h2 className="text-2xl font-bold text-white mb-2">COEP Security Error - Troubleshooting</h2>
        <p className="text-gray-400">
          Cross-Origin Embedder Policy Fehler in Firefox beheben
        </p>
      </div>

      <div className="space-y-4">
        {/* Basic Solutions */}
        <div className="bg-neutral-800 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection('basic')}
            className="w-full p-4 text-left flex items-center justify-between hover:bg-neutral-700 transition-colors duration-300"
          >
            <div className="flex items-center space-x-3">
              <RefreshCw className="text-green-500" size={20} />
              <span className="text-white font-medium">1. Grundlegende Lösungen (Für alle Nutzer)</span>
            </div>
            <span className="text-gray-400">{expandedSection === 'basic' ? '−' : '+'}</span>
          </button>
          
          {expandedSection === 'basic' && (
            <div className="p-4 border-t border-neutral-700 space-y-4">
              <div className="space-y-3">
                <h4 className="text-white font-medium">Schritt 1: Browser-Cache leeren</h4>
                <div className="bg-neutral-700 p-3 rounded text-sm text-gray-300">
                  <p><strong>Firefox:</strong></p>
                  <ul className="list-disc list-inside space-y-1 mt-2">
                    <li>Drücke <kbd className="bg-neutral-600 px-2 py-1 rounded">Ctrl + Shift + Delete</kbd></li>
                    <li>Wähle "Alles" als Zeitraum</li>
                    <li>Aktiviere "Cache" und "Cookies"</li>
                    <li>Klicke "Jetzt löschen"</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-white font-medium">Schritt 2: Hard Refresh</h4>
                <div className="bg-neutral-700 p-3 rounded text-sm text-gray-300">
                  <p>Drücke <kbd className="bg-neutral-600 px-2 py-1 rounded">Ctrl + F5</kbd> oder <kbd className="bg-neutral-600 px-2 py-1 rounded">Ctrl + Shift + R</kbd></p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-white font-medium">Schritt 3: Inkognito-Modus testen</h4>
                <div className="bg-neutral-700 p-3 rounded text-sm text-gray-300">
                  <p>Öffne die Seite im privaten Browserfenster: <kbd className="bg-neutral-600 px-2 py-1 rounded">Ctrl + Shift + P</kbd></p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Firefox Settings */}
        <div className="bg-neutral-800 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection('firefox')}
            className="w-full p-4 text-left flex items-center justify-between hover:bg-neutral-700 transition-colors duration-300"
          >
            <div className="flex items-center space-x-3">
              <Settings className="text-blue-500" size={20} />
              <span className="text-white font-medium">2. Firefox-Einstellungen anpassen</span>
            </div>
            <span className="text-gray-400">{expandedSection === 'firefox' ? '−' : '+'}</span>
          </button>
          
          {expandedSection === 'firefox' && (
            <div className="p-4 border-t border-neutral-700 space-y-4">
              <div className="space-y-3">
                <h4 className="text-white font-medium">about:config Einstellungen</h4>
                <div className="bg-neutral-700 p-3 rounded text-sm text-gray-300">
                  <ol className="list-decimal list-inside space-y-2">
                    <li>Gib <code className="bg-neutral-600 px-1 rounded">about:config</code> in die Adressleiste ein</li>
                    <li>Klicke "Risiko akzeptieren und fortfahren"</li>
                    <li>Suche nach folgenden Einstellungen und setze sie auf <code>false</code>:</li>
                  </ol>
                  <div className="mt-3 space-y-1 font-mono text-xs">
                    <div>• <code>browser.tabs.remote.coep.credentialless</code> → false</div>
                    <div>• <code>dom.postMessage.sharedArrayBuffer.bypassCOOP_COEP.insecure.enabled</code> → true</div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-white font-medium">Sicherheitseinstellungen</h4>
                <div className="bg-neutral-700 p-3 rounded text-sm text-gray-300">
                  <ol className="list-decimal list-inside space-y-2">
                    <li>Gehe zu Einstellungen → Datenschutz & Sicherheit</li>
                    <li>Unter "Sicherheit" → Deaktiviere temporär "Gefährliche und betrügerische Inhalte blockieren"</li>
                    <li>Lade die Seite neu</li>
                    <li>Aktiviere die Einstellung wieder</li>
                  </ol>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Advanced Solutions */}
        <div className="bg-neutral-800 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection('advanced')}
            className="w-full p-4 text-left flex items-center justify-between hover:bg-neutral-700 transition-colors duration-300"
          >
            <div className="flex items-center space-x-3">
              <Shield className="text-purple-500" size={20} />
              <span className="text-white font-medium">3. Erweiterte Lösungen (Technische Nutzer)</span>
            </div>
            <span className="text-gray-400">{expandedSection === 'advanced' ? '−' : '+'}</span>
          </button>
          
          {expandedSection === 'advanced' && (
            <div className="p-4 border-t border-neutral-700 space-y-4">
              <div className="space-y-3">
                <h4 className="text-white font-medium">Firefox mit deaktivierten Sicherheitsfeatures starten</h4>
                <div className="bg-neutral-700 p-3 rounded text-sm text-gray-300">
                  <p className="mb-2"><strong>Windows:</strong></p>
                  <code className="block bg-neutral-600 p-2 rounded text-xs">
                    firefox.exe --disable-web-security --disable-features=VizDisplayCompositor
                  </code>
                  <p className="mt-3 mb-2"><strong>macOS/Linux:</strong></p>
                  <code className="block bg-neutral-600 p-2 rounded text-xs">
                    firefox --disable-web-security --disable-features=VizDisplayCompositor
                  </code>
                  <p className="mt-3 text-yellow-400 text-xs">⚠️ Nur für Entwicklung verwenden!</p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-white font-medium">Lokaler Server mit HTTPS</h4>
                <div className="bg-neutral-700 p-3 rounded text-sm text-gray-300">
                  <p>Für Entwickler: Verwende einen lokalen HTTPS-Server</p>
                  <code className="block bg-neutral-600 p-2 rounded text-xs mt-2">
                    npm install -g http-server<br/>
                    http-server -S -C cert.pem -K key.pem
                  </code>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Alternative Browsers */}
        <div className="bg-neutral-800 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection('alternatives')}
            className="w-full p-4 text-left flex items-center justify-between hover:bg-neutral-700 transition-colors duration-300"
          >
            <div className="flex items-center space-x-3">
              <Globe className="text-orange-500" size={20} />
              <span className="text-white font-medium">4. Alternative Browser testen</span>
            </div>
            <span className="text-gray-400">{expandedSection === 'alternatives' ? '−' : '+'}</span>
          </button>
          
          {expandedSection === 'alternatives' && (
            <div className="p-4 border-t border-neutral-700 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-neutral-700 p-3 rounded">
                  <h5 className="text-white font-medium mb-2">Chrome/Chromium</h5>
                  <p className="text-gray-300 text-sm">Meist weniger strenge COEP-Behandlung</p>
                </div>
                <div className="bg-neutral-700 p-3 rounded">
                  <h5 className="text-white font-medium mb-2">Safari</h5>
                  <p className="text-gray-300 text-sm">Andere CORS-Implementierung</p>
                </div>
                <div className="bg-neutral-700 p-3 rounded">
                  <h5 className="text-white font-medium mb-2">Edge</h5>
                  <p className="text-gray-300 text-sm">Chromium-basiert, ähnlich wie Chrome</p>
                </div>
                <div className="bg-neutral-700 p-3 rounded">
                  <h5 className="text-white font-medium mb-2">Firefox Developer Edition</h5>
                  <p className="text-gray-300 text-sm">Weniger restriktive Einstellungen</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Status Check */}
      <div className="mt-8 p-4 bg-green-900/20 border border-green-700 rounded-lg">
        <div className="flex items-center space-x-3">
          <CheckCircle className="text-green-500" size={20} />
          <div>
            <h4 className="text-white font-medium">Problem gelöst?</h4>
            <p className="text-gray-400 text-sm">
              Wenn das Problem weiterhin besteht, versuche die Seite in einem anderen Browser oder kontaktiere den Support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TroubleshootingGuide;