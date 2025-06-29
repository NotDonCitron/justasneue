import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'white' | 'red' | 'gray';
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  color = 'red',
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const colorClasses = {
    white: 'border-white border-t-transparent',
    red: 'border-red-500 border-t-transparent',
    gray: 'border-gray-300 border-t-transparent'
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div 
        className={`
          ${sizeClasses[size]} 
          ${colorClasses[color]}
          border-2 
          rounded-full 
          animate-spin
        `}
      />
    </div>
  );
};

export default LoadingSpinner;