import React, { useRef, useEffect, useState } from 'react';

interface AudioVisualizerProps {
  audioSrc?: string;
  isPlaying?: boolean;
  className?: string;
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ 
  audioSrc, 
  isPlaying = false, 
  className = '' 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Create fake visualization bars for demo
    const bars = Array.from({ length: 64 }, () => Math.random() * 100);
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const barWidth = canvas.width / bars.length;
      
      bars.forEach((height, index) => {
        // Animate bars
        if (isPlaying) {
          bars[index] = Math.max(10, height + (Math.random() - 0.5) * 20);
        } else {
          bars[index] = Math.max(5, height * 0.95);
        }
        
        const x = index * barWidth;
        const barHeight = (bars[index] / 100) * canvas.height;
        
        // Create gradient
        const gradient = ctx.createLinearGradient(0, canvas.height, 0, canvas.height - barHeight);
        gradient.addColorStop(0, '#ef4444');
        gradient.addColorStop(0.5, '#dc2626');
        gradient.addColorStop(1, '#b91c1c');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(x, canvas.height - barHeight, barWidth - 2, barHeight);
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying]);

  return (
    <canvas
      ref={canvasRef}
      width={300}
      height={100}
      className={`${className}`}
    />
  );
};

export default AudioVisualizer;