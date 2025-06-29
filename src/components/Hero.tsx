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
      {/* Optimierter Gradient-Overlay für bessere Lesbarkeit */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/80 z-10"></div>
      
      {/* Header-Hintergrundbild mit optimierten Dimensionen */}
      <div 
        ref={imageRef}
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/Images/364268621_248985811283826_4097087762299984333_n.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          transform: 'scale(1.05)',
          filter: 'brightness(0.8) contrast(1.1)'
        }}
      ></div>
      
      <div className="container mx-auto px-6 relative z-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fadeIn text-white drop-shadow-2xl">
            JUSTAS <span className="text-red-500">LANGE</span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-8 animate-fadeIn delay-200 text-gray-100 drop-shadow-lg font-medium">
            Elektronische Musik DJ | Bass & House Spezialist
          </p>
          <p className="text-base md:text-lg mb-10 animate-fadeIn delay-300 text-gray-200 max-w-2xl mx-auto">
            Aus Litauen stammend, kreiert unvergessliche Erlebnisse durch kraftvolle Basslines und mitreißende House-Beats
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fadeIn delay-400">
            <a 
              href="#music"
              className="px-8 py-4 bg-red-600 hover:bg-red-700 rounded-sm transition-all duration-300 font-semibold text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Neueste Sets
            </a>
            <a 
              href="#contact"
              className="px-8 py-4 border-2 border-white hover:border-red-500 hover:bg-red-500 hover:text-white rounded-sm transition-all duration-300 font-semibold text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Jetzt Buchen
            </a>
          </div>
        </div>
      </div>
      
      <div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer animate-float z-20"
        onClick={scrollToAbout}
      >
        <div className="flex flex-col items-center">
          <span className="text-xs uppercase tracking-wider text-gray-300 mb-2">Scrollen</span>
          <ArrowDown size={28} className="text-white/80 hover:text-red-500 transition-colors duration-300" />
        </div>
      </div>
    </div>
  );
};

export default Hero;