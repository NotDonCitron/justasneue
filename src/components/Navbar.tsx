import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

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
  
  useEffect(() => {
    setIsScrolled(scrollY > 50);
  }, [scrollY]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    if (mobileMenuOpen) {
      toggleMobileMenu();
    }
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled || mobileMenuOpen ? 'bg-black/90 backdrop-blur-md' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div 
            className="text-2xl font-bold cursor-pointer"
            onClick={() => scrollToSection('home')}
          >
            JUSTAS <span className="text-red-600">LANGE</span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-10">
              {['home', 'about', 'music', 'gallery', 'events', 'contact'].map((section) => (
                <li key={section}>
                  <button
                    onClick={() => scrollToSection(section)}
                    className={`text-sm uppercase tracking-widest hover:text-red-500 transition-colors duration-300 ${
                      activeSection === section ? 'text-red-500 font-medium' : 'text-white'
                    }`}
                  >
                    {section}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-40 flex flex-col pt-20">
          <nav className="container mx-auto px-6">
            <ul className="flex flex-col space-y-6 items-center">
              {['home', 'about', 'music', 'gallery', 'events', 'contact'].map((section) => (
                <li key={section} className="w-full">
                  <button
                    onClick={() => scrollToSection(section)}
                    className={`text-2xl uppercase tracking-widest hover:text-red-500 transition-colors duration-300 w-full text-center py-3 ${
                      activeSection === section ? 'text-red-500 font-medium' : 'text-white'
                    }`}
                  >
                    {section}
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