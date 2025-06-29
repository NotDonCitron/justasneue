import { useState, useEffect } from 'react';
import { Menu, X, Play, Pause, Instagram, Facebook, Twitter } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Music from './components/Music';
import Gallery from './components/Gallery';
import Events from './components/Events';
import InstagramFeed from './components/InstagramFeed';
import PerformanceMetrics from './components/PerformanceMetrics';
import Testimonials from './components/Testimonials';
import Newsletter from './components/Newsletter';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SocialShare from './components/SocialShare';
import './App.css';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Determine active section based on scroll position
      const sections = ['home', 'about', 'music', 'gallery', 'instagram', 'events', 'contact'];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="relative bg-black text-white min-h-screen">
      <Navbar 
        activeSection={activeSection}
        mobileMenuOpen={mobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
        scrollY={scrollY}
      />
      
      {/* Floating Social Share */}
      <div className="fixed top-1/2 right-4 transform -translate-y-1/2 z-40 hidden lg:block">
        <SocialShare className="rotate-0" />
      </div>
      
      <main>
        <section id="home" className="relative">
          <Hero />
        </section>
        
        <section id="about" className="py-20">
          <About />
        </section>
        
        <PerformanceMetrics />
        
        <section id="music" className="py-20 bg-neutral-900">
          <Music />
        </section>
        
        <section id="gallery" className="py-20">
          <Gallery />
        </section>
        
        <section id="instagram" className="py-20 bg-neutral-900">
          <InstagramFeed />
        </section>
        
        <Testimonials />
        
        <section id="events" className="py-20">
          <Events />
        </section>
        
        <Newsletter />
        
        <section id="contact" className="py-20 bg-neutral-900">
          <Contact />
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;