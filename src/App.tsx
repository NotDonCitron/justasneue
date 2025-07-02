import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import ArtistSpotlight from './components/ArtistSpotlight';
import Music from './components/Music';
import Gallery from './components/Gallery';
import VideoSection from './components/VideoSection';
import Events from './components/Events';
import PerformanceMetrics from './components/PerformanceMetrics';
import Testimonials from './components/Testimonials';
import Newsletter from './components/Newsletter';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SocialShare from './components/SocialShare';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';
import './styles/justas-animations.css';
import MusicPlayer from './components/MusicPlayer';
import { AnimatedButton, SocialIcons } from './components/AnimatedComponents';
import './i18n';

// Lazy load heavy components to avoid initial load issues
// Instagram feed removed as requested

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Determine active section based on scroll position
      const sections = ['home', 'about', 'spotlight', 'music', 'videos', 'gallery', 'events', 'contact'];
      
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
    <ErrorBoundary>
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
          <ErrorBoundary fallback={
            <div className="h-screen flex items-center justify-center bg-black text-white">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Hero Section Error</h2>
                <p className="text-gray-400">The hero section could not be loaded.</p>
              </div>
            </div>
          }>
            <section id="home" className="relative">
              <Hero />
            </section>
          </ErrorBoundary>
          
          <ErrorBoundary>
            <section id="about" className="py-20 bg-neutral-900">
              <About />
            </section>
          </ErrorBoundary>
          
          <ErrorBoundary>
            <section id="spotlight" className="py-0">
              <ArtistSpotlight />
            </section>
          </ErrorBoundary>
          
          <ErrorBoundary>
            <section id="music" className="py-20 bg-black">
              <Music />
            </section>
          </ErrorBoundary>
          
          <ErrorBoundary>
            <section id="events" className="py-20 bg-neutral-900">
              <Events />
            </section>
          </ErrorBoundary>
          
          <ErrorBoundary>
            <section id="gallery" className="py-20 bg-black">
              <Gallery />
            </section>
          </ErrorBoundary>
          
          <ErrorBoundary>
            <section id="testimonials" className="py-20 bg-neutral-900">
              <Testimonials />
            </section>
          </ErrorBoundary>
          
          <ErrorBoundary>
            <section id="contact" className="py-20 bg-black">
              <Contact />
            </section>
          </ErrorBoundary>
          
          <ErrorBoundary>
            <Newsletter />
          </ErrorBoundary>
          
          <ErrorBoundary>
            <section className="py-20 bg-black">
              <PerformanceMetrics />
            </section>
          </ErrorBoundary>
          
          <ErrorBoundary>
            <section id="videos">
              <VideoSection />
            </section>
          </ErrorBoundary>
          
          <ErrorBoundary>
            <section id="music-player" className="py-20 bg-neutral-900">
              <MusicPlayer />
            </section>
          </ErrorBoundary>
          
          <ErrorBoundary>
            <section className="py-20 bg-black">
              <div className="container mx-auto px-6 flex flex-col items-center gap-4">
                <AnimatedButton onClick={() => alert('Book Now Clicked!')}>Book Now</AnimatedButton>
                <SocialIcons />
              </div>
            </section>
          </ErrorBoundary>
        </main>
        
        <ErrorBoundary>
          <Footer />
        </ErrorBoundary>
      </div>
    </ErrorBoundary>
  );
}

export default App;