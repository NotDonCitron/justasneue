import React from 'react';

const About: React.FC = () => {
  return (
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="order-2 lg:order-1">
          <div 
            className="relative overflow-hidden rounded-lg"
            data-aos="fade-right"
            data-aos-delay="200"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-red-600/40 to-transparent z-10"></div>
            <img 
              src="https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=1920"
              alt="Justas Lange performing" 
              className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black to-transparent z-10"></div>
          </div>
        </div>
        
        <div className="order-1 lg:order-2">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 relative">
            <span className="relative z-10">About Justas</span>
            <span className="absolute -left-4 top-0 w-12 h-12 bg-red-600/20 rounded-full blur-xl -z-0"></span>
          </h2>
          
          <div className="space-y-6 text-gray-300">
            <p className="leading-relaxed">
              Justas Lange is an electronic music DJ known for his dynamic sets and ability to read the crowd. With a passion for creating unforgettable experiences, he seamlessly blends various electronic genres to keep the dance floor moving.
            </p>
            
            <p className="leading-relaxed">
              From intimate club nights to larger venues, Justas has been making waves in the electronic music scene with his signature style and energy behind the decks. His sets are a journey through deep house, techno, and progressive elements.
            </p>
            
            <p className="leading-relaxed">
              Whether it's warming up the crowd or headlining the main event, Justas brings technical precision and musical storytelling to every performance, ensuring each set is a unique experience.
            </p>
          </div>
          
          <div className="mt-8 grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-4xl font-bold text-red-500">100+</p>
              <p className="text-sm uppercase tracking-wider mt-2">Shows</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-red-500">20+</p>
              <p className="text-sm uppercase tracking-wider mt-2">Venues</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-red-500">5+</p>
              <p className="text-sm uppercase tracking-wider mt-2">Years</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;