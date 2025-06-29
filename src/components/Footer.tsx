import React from 'react';
import { Instagram, Facebook, Twitter, Music, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">JUSTAS <span className="text-red-600">LANGE</span></h2>
            <p className="text-gray-400 mb-6">
              Electronic music DJ from Lithuania, specializing in bass and house music. Creating unforgettable experiences through sound and energy.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors duration-300">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors duration-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors duration-300">
                <Twitter size={20} />
              </a>
              <a href="https://soundcloud.com/justas-lange" className="text-gray-400 hover:text-red-500 transition-colors duration-300">
                <Music size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#home" className="text-gray-400 hover:text-red-500 transition-colors duration-300">Home</a>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-red-500 transition-colors duration-300">About</a>
              </li>
              <li>
                <a href="#music" className="text-gray-400 hover:text-red-500 transition-colors duration-300">Music</a>
              </li>
              <li>
                <a href="#gallery" className="text-gray-400 hover:text-red-500 transition-colors duration-300">Gallery</a>
              </li>
              <li>
                <a href="#events" className="text-gray-400 hover:text-red-500 transition-colors duration-300">Events</a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-red-500 transition-colors duration-300">Contact</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Music Genres</h3>
            <ul className="space-y-3">
              <li className="text-gray-400">Bass Music</li>
              <li className="text-gray-400">Deep House</li>
              <li className="text-gray-400">Progressive House</li>
              <li className="text-gray-400">Tech House</li>
              <li className="text-gray-400">Electronic</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to get updates on new releases, events, and exclusive content.
            </p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-4 py-2 bg-neutral-800 text-white flex-1 form-input focus:outline-none border-0"
              />
              <button 
                type="submit" 
                className="bg-red-600 hover:bg-red-700 px-4 transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-neutral-800 mt-12 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Justas Lange. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;