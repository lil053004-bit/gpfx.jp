import { useEffect, useState } from 'react';

interface FloatingDot {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  delay: number;
}

export default function DreamyPurpleBackground() {
  const [dots, setDots] = useState<FloatingDot[]>([]);

  useEffect(() => {
    const generatedDots: FloatingDot[] = [];
    const dotCount = 80;

    for (let i = 0; i < dotCount; i++) {
      generatedDots.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.6 + 0.2,
        delay: Math.random() * 5
      });
    }

    setDots(generatedDots);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, #e9d5ff 0%, #c084fc 50%, #9333ea 100%)'
        }}
      />

      <div className="absolute inset-0">
        {dots.map((dot) => (
          <div
            key={dot.id}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              left: `${dot.x}%`,
              top: `${dot.y}%`,
              width: `${dot.size}px`,
              height: `${dot.size}px`,
              opacity: dot.opacity,
              animationDelay: `${dot.delay}s`,
              animationDuration: '3s'
            }}
          />
        ))}
      </div>

      <div
        className="absolute top-0 left-0 right-0 h-[800px] pointer-events-none animate-spotlight"
        style={{
          background: 'radial-gradient(ellipse 100% 60% at 50% -10%, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.5) 20%, rgba(251, 207, 232, 0.4) 40%, transparent 80%)',
          filter: 'blur(2px)'
        }}
      />

      <div
        className="absolute top-0 left-0 right-0 h-[700px] pointer-events-none animate-breathe"
        style={{
          background: 'radial-gradient(ellipse 90% 55% at 50% -5%, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.3) 25%, rgba(233, 213, 255, 0.3) 50%, transparent 75%)',
          mixBlendMode: 'overlay'
        }}
      />

      <div
        className="absolute top-0 left-1/4 right-1/4 h-[600px] pointer-events-none animate-breathe-delayed"
        style={{
          background: 'radial-gradient(ellipse 70% 45% at 50% 0%, rgba(251, 207, 232, 0.6) 0%, rgba(192, 132, 252, 0.3) 40%, transparent 70%)',
          mixBlendMode: 'screen',
          animationDelay: '1.5s'
        }}
      />

      <div
        className="absolute top-0 left-1/3 right-1/3 h-[500px] pointer-events-none animate-pulse-glow"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 5%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.4) 30%, transparent 60%)',
          mixBlendMode: 'soft-light',
          animationDelay: '0.5s'
        }}
      />

      <div
        className="absolute top-0 left-0 w-[400px] h-[400px] pointer-events-none animate-float-slow"
        style={{
          background: 'radial-gradient(circle, rgba(192, 132, 252, 0.3) 0%, transparent 70%)',
          filter: 'blur(60px)'
        }}
      />

      <div
        className="absolute top-20 right-0 w-[500px] h-[500px] pointer-events-none animate-float-slow-reverse"
        style={{
          background: 'radial-gradient(circle, rgba(233, 213, 255, 0.4) 0%, transparent 70%)',
          filter: 'blur(80px)',
          animationDelay: '2s'
        }}
      />
    </div>
  );
}
