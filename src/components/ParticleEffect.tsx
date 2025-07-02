import React, { useEffect, useRef } from 'react';

interface ParticleEffectProps {
  colors?: string[];
  particleCount?: number;
  className?: string;
}

const ParticleEffect: React.FC<ParticleEffectProps> = ({
  colors = ['#ef4444', '#dc2626', '#b91c1c'],
  particleCount = 50,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const particles: HTMLDivElement[] = [];

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      const size = Math.random() * 4 + 1;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const startX = Math.random() * 100;
      const startY = Math.random() * 100;
      const duration = Math.random() * 20 + 10;
      const delay = Math.random() * 5;
      
      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        left: ${startX}%;
        top: ${startY}%;
        animation: float ${duration}s ${delay}s infinite linear;
        opacity: ${Math.random() * 0.7 + 0.3};
        pointer-events: none;
      `;
      
      container.appendChild(particle);
      particles.push(particle);
    }

    // Add keyframes for animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0% {
          transform: translateY(100vh) rotate(0deg);
        }
        100% {
          transform: translateY(-100vh) rotate(360deg);
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      particles.forEach(particle => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      });
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };
  }, [colors, particleCount]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    />
  );
};

export default ParticleEffect;
