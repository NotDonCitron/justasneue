import { FC, useState, useEffect, ReactNode } from 'react';

// Interfaces für Props
interface TypingTextProps {
  text: string;
  speed?: number;
}

interface FloatingActionButtonProps {
  onClick: () => void;
  icon: string;
  position?: 'bottom-right' | 'bottom-left';
}

interface ProgressBarProps {
  progress: number;
  color?: string;
}

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
}

// Typing Animation Komponente
export const TypingText: FC<TypingTextProps> = ({ text, speed = 100 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return (
    <span className="typing-text">
      {displayText}
      <span className="cursor">|</span>
    </span>
  );
};

// Floating Action Button
export const FloatingActionButton: FC<FloatingActionButtonProps> = ({ onClick, icon, position = 'bottom-right' }) => {
  const positionClass = position === 'bottom-right' 
    ? 'bottom-6 right-6' 
    : 'bottom-6 left-6';

  return (
    <button
      onClick={onClick}
      className={`fixed ${positionClass} w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center text-white text-xl z-50 floating`}
    >
      {icon}
    </button>
  );
};

// Progress Bar Komponente
export const ProgressBar: FC<ProgressBarProps> = ({ progress, color = 'bg-blue-500' }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
      <div
        className={`h-full ${color} transition-all duration-500 ease-out`}
        style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
      />
    </div>
  );
};

// Notification Toast
export const Toast: FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500'
  }[type];

  return (
    <div className={`fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 slide-in-right z-50`}>
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button onClick={onClose} className="ml-4 text-xl">×</button>
      </div>
    </div>
  );
}; 