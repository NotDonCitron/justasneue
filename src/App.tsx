import { useState, useEffect } from 'react';
import { Menu, X, Play, Pause, Instagram, Facebook, Twitter } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Music from './components/Music';
import Gallery from './components/Gallery';
import Events from './components/Events';
import InstagramFeed from './components/InstagramFeed';
import Contact from './components/Contact';
import Footer from './components/Footer';
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
      
      <main>
        <section id="home" className="relative">
          <Hero />
        </section>
        
        <section id="about" className="py-20">
          <About />
        </section>
        
        <section id="music" className="py-20 bg-neutral-900">
          <Music />
        </section>
        
        <section id="gallery" className="py-20">
          <Gallery />
        </section>
        
        <section id="instagram" className="py-20 bg-neutral-900">
          <InstagramFeed />
        </section>
        
        <section id="events" className="py-20">
          <Events />
        </section>
        
        <section id="contact" className="py-20 bg-neutral-900">
          <Contact />
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;