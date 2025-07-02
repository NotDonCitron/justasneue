import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface NavbarProps {
  activeSection: string;
  mobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  scrollY: number;
}

const Navbar: React.FC<NavbarProps> = ({ 
  activeSection, 
  mobileMenuOpen, 
  toggleMobileMenu,
  scrollY
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true); // Start with dark mode
  const { t, i18n } = useTranslation();
  
  useEffect(() => {
    setIsScrolled(scrollY > 50);
  }, [scrollY]);

  // Dark mode management
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    if (mobileMenuOpen) {
      toggleMobileMenu();
    }
  };

  const navItems = [
    { id: 'home', label: t('navbar.home') },
    { id: 'about', label: t('navbar.about') },
    { id: 'music', label: t('navbar.music') },
    { id: 'videos', label: t('navbar.videos', 'Videos') },
    { id: 'gallery', label: t('navbar.gallery') },
    { id: 'events', label: t('navbar.events') },
    { id: 'contact', label: t('navbar.contact') }
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled || mobileMenuOpen ? 'bg-black/90 dark:bg-black/90 backdrop-blur-md' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div 
            className="text-2xl font-bold cursor-pointer text-white dark:text-white"
            onClick={() => scrollToSection('home')}
          >
            JUSTAS <span className="text-red-600">LANGE</span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8 items-center">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`text-sm uppercase tracking-widest hover:text-red-500 transition-colors duration-300 ${
                      activeSection === item.id ? 'text-red-500 font-medium' : 'text-white dark:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Mobile Menu Button & Dark Mode Toggle */}
          <div className="md:hidden flex items-center space-x-3">
            <button 
              className="text-white dark:text-white focus:outline-none"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          <button
            style={{ position: 'absolute', top: 16, right: 16 }}
            onClick={() => i18n.changeLanguage(i18n.language === 'de' ? 'en' : 'de')}
            aria-label="Sprache wechseln"
          >
            {i18n.language === 'de' ? 'EN' : 'DE'}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-95 dark:bg-black dark:bg-opacity-95 z-40 flex flex-col pt-20">
          <nav className="container mx-auto px-6">
            <ul className="flex flex-col space-y-6 items-center">
              {navItems.map((item) => (
                <li key={item.id} className="w-full">
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`text-2xl uppercase tracking-widest hover:text-red-500 transition-colors duration-300 w-full text-center py-3 ${
                      activeSection === item.id ? 'text-red-500 font-medium' : 'text-white dark:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;