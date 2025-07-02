import { useEffect, useRef, useState } from 'react';
import { ArrowDown, Play, Calendar, Users, Radio } from 'lucide-react';
import ParticleEffect from './ParticleEffect';
import { useTranslation } from 'react-i18next';

const Hero: React.FC = () => {
  const { t } = useTranslation();
  const imageRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeListeners] = useState(Math.floor(Math.random() * 500) + 200);

  // Parallax Effekt
  useEffect(() => {
    const handleScroll = () => {
      if (imageRef.current) {
        const scrolled = window.scrollY;
        imageRef.current.style.transform = `scale(1.05) translateY(${scrolled * 0.15}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!imageRef.current) return;
      const { clientX, clientY } = e;
      const x = (window.innerWidth / 2 - clientX) / 50;
      const y = (window.innerHeight / 2 - clientY) / 50;
      imageRef.current.style.transform += ` translate(${x}px, ${y}px)`;
      setMousePos({ x: clientX, y: clientY });
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
      {/* Enhanced Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/90 z-10"></div>
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-red-900/10 to-black/30 z-10"></div>
      {/* Radial Glow Overlay */}
      <div className="absolute inset-0 pointer-events-none z-20 hero-glow-overlay"></div>
      {/* Vignette Overlay */}
      <div className="absolute inset-0 pointer-events-none z-20 hero-vignette-overlay"></div>
      {/* Interactive Mouse Lighting Effect */}
      <div 
        className="absolute inset-0 z-15 pointer-events-none opacity-60"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(239,68,68,0.15), transparent 40%)`
        }}
      ></div>
      {/* Particle Effect */}
      <ParticleEffect />
      {/* Header Background Image */}
      <div 
        ref={imageRef}
        className="absolute inset-0 z-0 hero-bg-image"
        style={{
          backgroundImage: 'url("./images/image00001(1).jpeg")',
          backgroundColor: '#1a1a1a',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          filter: 'brightness(0.85) contrast(1.1) saturate(1.1)',
          minHeight: '100vh'
        }}
      ></div>
      
      <div className="container mx-auto px-6 relative z-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Enhanced Typography */}
          <h1 className="text-5xl md:text-6xl lg:text-8xl font-black mb-6 animate-fadeIn text-white drop-shadow-2xl relative">
            <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
              JUSTAS
            </span>
            <span className="text-red-500 ml-4 relative">
              LANGE
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-red-500 animate-pulse"></div>
            </span>
          </h1>
          
          <p className="text-lg md:text-xl lg:text-2xl mb-8 animate-fadeIn delay-200 text-gray-100 drop-shadow-lg font-medium">
            {t('hero.slogan')}
          </p>
          
          <p className="text-base md:text-lg mb-8 animate-fadeIn delay-300 text-gray-200 max-w-2xl mx-auto">
            {t('hero.description')}
          </p>
          
          {/* Social Proof Elements */}
          <div className="flex items-center justify-center gap-4 mb-8 text-sm text-gray-300 animate-fadeIn delay-350">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              <Users size={16} className="mr-1" />
              <span>{activeListeners} {t('hero.activeListeners')}</span>
            </div>
            <span>•</span>
            <div className="flex items-center">
              <Radio size={16} className="mr-1" />
              <span>{t('hero.lastLive')}</span>
            </div>
          </div>
          
          {/* Enhanced Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fadeIn delay-400">
            <a 
              href="#music"
              className="group px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-sm transition-all duration-300 font-semibold text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center">
                <Play size={20} className="mr-2" />
                {t('hero.latestSets')}
              </span>
              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
            </a>
            
            <a 
              href="#contact"
              className="group px-8 py-4 border-2 border-white/60 hover:border-red-500 hover:bg-red-500 rounded-sm transition-all duration-300 font-semibold text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 backdrop-blur-sm relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center">
                <Calendar size={20} className="mr-2" />
                {t('hero.bookNow')}
              </span>
              <div className="absolute inset-0 bg-red-500/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </a>
          </div>
          
          {/* Stats Integration */}
          <div className="grid grid-cols-3 gap-4 mt-10 max-w-md mx-auto animate-fadeIn delay-500">
            <div className="text-center group cursor-pointer">
              <div className="text-3xl md:text-4xl font-bold text-red-500 group-hover:scale-110 transition-transform duration-300">50+</div>
              <div className="text-xs uppercase tracking-wider text-gray-400">{t('hero.stats.shows')}</div>
            </div>
            <div className="text-center group cursor-pointer">
              <div className="text-3xl md:text-4xl font-bold text-red-500 group-hover:scale-110 transition-transform duration-300">15+</div>
              <div className="text-xs uppercase tracking-wider text-gray-400">{t('hero.stats.venues')}</div>
            </div>
            <div className="text-center group cursor-pointer">
              <div className="text-3xl md:text-4xl font-bold text-red-500 group-hover:scale-110 transition-transform duration-300">1.2K+</div>
              <div className="text-xs uppercase tracking-wider text-gray-400">{t('hero.stats.fans')}</div>
            </div>
          </div>
        </div>
      </div>
      
      <div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer animate-float z-20"
        onClick={scrollToAbout}
      >
        <div className="flex flex-col items-center">
          <span className="text-xs uppercase tracking-wider text-gray-300 mb-2">{t('hero.scroll')}</span>
          <ArrowDown size={28} className="text-white/80 hover:text-red-500 transition-colors duration-300" />
        </div>
      </div>
    </div>
  );
};

export default Hero;