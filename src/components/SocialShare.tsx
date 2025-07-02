import React, { useState } from 'react';
import { Share2, Facebook, Twitter, Instagram, Link, Check } from 'lucide-react';

interface SocialShareProps {
  url?: string;
  title?: string;
  description?: string;
  className?: string;
}

const SocialShare: React.FC<SocialShareProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const currentUrl = window.location.href;
  const title = 'Justas Lange - DJ & Electronic Music';

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(title)}`,
    instagram: 'https://instagram.com/justaslange'
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const openShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], '_blank', 'width=600,height=400');
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors duration-300"
      >
        <Share2 size={18} />
        <span>Teilen</span>
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full mt-2 right-0 bg-neutral-900 rounded-lg shadow-xl border border-neutral-700 p-4 z-50 min-w-48">
            <h4 className="text-white font-medium mb-3">Teilen</h4>
            
            <div className="space-y-2">
              <button
                onClick={() => openShare('facebook')}
                className="w-full flex items-center space-x-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors duration-300"
              >
                <Facebook size={18} className="text-blue-500" />
                <span>Facebook</span>
              </button>
              
              <button
                onClick={() => openShare('twitter')}
                className="w-full flex items-center space-x-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors duration-300"
              >
                <Twitter size={18} className="text-blue-400" />
                <span>Twitter</span>
              </button>
              
              <button
                onClick={() => openShare('instagram')}
                className="w-full flex items-center space-x-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors duration-300"
              >
                <Instagram size={18} className="text-pink-500" />
                <span>Instagram</span>
              </button>
              
              <button
                onClick={copyToClipboard}
                className="w-full flex items-center space-x-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors duration-300"
              >
                {copied ? (
                  <Check size={18} className="text-green-500" />
                ) : (
                  <Link size={18} className="text-gray-400" />
                )}
                <span>{copied ? 'Kopiert!' : 'Link kopieren'}</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SocialShare;