import React from 'react';
import LazyImage from './LazyImage';

const About: React.FC = () => {
  return (
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="order-2 lg:order-1 animate-slideInLeft">
          <div 
            className="relative overflow-hidden rounded-lg smooth-hover"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-red-600/40 to-transparent z-10"></div>
            <LazyImage 
              src="/images/image00001(2).jpeg"
              alt="Justas Lange - Professional DJ Portrait" 
              className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black to-transparent z-10"></div>
          </div>
        </div>
        
        <div className="order-1 lg:order-2 animate-slideInRight">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 relative animate-fadeIn">
            <span className="relative z-10">About Justas</span>
            <span className="absolute -left-4 top-0 w-12 h-12 bg-red-600/20 rounded-full blur-xl -z-0"></span>
          </h2>
          
          <div className="space-y-6 text-gray-300">
            <p className="leading-relaxed animate-fadeIn delay-100">
              Justas Lange is a rising electronic music DJ from Lithuania, known for his high-energy sets and innovative approach to bass and house music. With a passion for creating unforgettable experiences, he seamlessly blends heavy bass drops with melodic house elements.
            </p>
            
            <p className="leading-relaxed animate-fadeIn delay-200">
              From underground club nights to festival stages, Justas has been making waves in the electronic music scene with his signature style that combines technical precision with raw energy. His sets take listeners on a journey through deep basslines, progressive builds, and explosive drops.
            </p>
            
            <p className="leading-relaxed animate-fadeIn delay-300">
              Whether warming up the crowd or headlining the main event, Justas brings an infectious energy that transforms any venue into an electrifying experience. His dedication to the craft and ability to read the crowd has earned him recognition in the Baltic electronic music scene.
            </p>
          </div>
          
          <div className="mt-8 grid grid-cols-3 gap-6 text-center animate-scaleIn delay-400">
            <div className="smooth-hover">
              <p className="text-4xl font-bold text-red-500">50+</p>
              <p className="text-sm uppercase tracking-wider mt-2">Shows</p>
            </div>
            <div className="smooth-hover">
              <p className="text-4xl font-bold text-red-500">15+</p>
              <p className="text-sm uppercase tracking-wider mt-2">Venues</p>
            </div>
            <div className="smooth-hover">
              <p className="text-4xl font-bold text-red-500">3+</p>
              <p className="text-sm uppercase tracking-wider mt-2">Years</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;