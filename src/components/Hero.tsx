import { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!imageRef.current) return;
      
      const { clientX, clientY } = e;
      const x = (window.innerWidth / 2 - clientX) / 50;
      const y = (window.innerHeight / 2 - clientY) / 50;
      
      imageRef.current.style.transform = `translate(${x}px, ${y}px)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black z-10"></div>
      
      <div 
        ref={imageRef}
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/2111015/pexels-photo-2111015.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: 'scale(1.1)'
        }}
      ></div>
      
      <div className="container mx-auto px-6 relative z-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-4 animate-fadeIn">
            JUSTAS <span className="text-red-600">LANGE</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 animate-fadeIn delay-200 opacity-90">
            Electronic Music DJ | Creating Moments Through Sound
          </p>
          <div className="flex justify-center space-x-4 animate-fadeIn delay-300">
            <a 
              href="#music"
              className="px-8 py-3 bg-red-600 hover:bg-red-700 rounded-sm transition-all duration-300 font-medium animate-redPulse"
            >
              Latest Sets
            </a>
            <a 
              href="#contact"
              className="px-8 py-3 border border-white hover:border-red-500 hover:text-red-500 rounded-sm transition-all duration-300 font-medium"
            >
              Book Now
            </a>
          </div>
        </div>
      </div>
      
      <div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer animate-float z-20"
        onClick={scrollToAbout}
      >
        <ArrowDown size={32} className="text-white/80 hover:text-red-500 transition-colors duration-300" />
      </div>
    </div>
  );
};

export default Hero;