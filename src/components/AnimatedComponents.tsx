import { FC, ReactNode } from 'react';
import '../styles/justas-animations.css';

// Interfaces für Props
interface AnimatedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

interface SocialIconsProps {}

interface LoadingSpinnerProps {}

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

// Animierte Button Komponente
export const AnimatedButton: FC<AnimatedButtonProps> = ({ children, onClick, variant = 'primary' }) => {
  return (
    <button
      onClick={onClick}
      className={`animated-button ${variant === 'secondary' ? 'bg-gray-600 hover:bg-gray-500' : ''}`}
    >
      {children}
    </button>
  );
};

// Social Media Icons Komponente
export const SocialIcons: FC<SocialIconsProps> = () => {
  const socialLinks = [
    { name: 'Instagram', url: '#', icon: '📷' },
    { name: 'SoundCloud', url: '#', icon: '🎵' },
    { name: 'Spotify', url: '#', icon: '🎧' },
    { name: 'YouTube', url: '#', icon: '📺' },
    { name: 'Facebook', url: '#', icon: '📘' }
  ];

  return (
    <div className="social-icons">
      {socialLinks.map((social) => (
        <a
          key={social.name}
          href={social.url}
          className="social-icon"
          title={social.name}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="text-xl">{social.icon}</span>
        </a>
      ))}
    </div>
  );
};

// Loading Komponente
export const LoadingSpinner: FC<LoadingSpinnerProps> = () => {
  return (
    <div className="loader">
      <div className="loader-circle"></div>
      <div className="loader-circle"></div>
      <div className="loader-circle"></div>
    </div>
  );
};

// Theme Toggle Komponente
export const ThemeToggle: FC<ThemeToggleProps> = ({ isDark, onToggle }) => {
  return (
    <div
      className={`theme-toggle ${isDark ? 'dark' : ''}`}
      onClick={onToggle}
    >
      <div className="theme-toggle-slider">
        {isDark ? '🌙' : '☀️'}
      </div>
    </div>
  );
}; 