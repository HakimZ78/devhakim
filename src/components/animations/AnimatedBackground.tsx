'use client';

import { motion } from 'framer-motion';
import { useMemo, useState, useEffect } from 'react';

interface AnimatedBackgroundProps {
  variant?: 'particles' | 'grid' | 'waves' | 'gradient';
  intensity?: 'low' | 'medium' | 'high';
  className?: string;
}

const ParticleBackground = ({ intensity }: { intensity: string }) => {
  const [isMounted, setIsMounted] = useState(false);
  const particleCount = intensity === 'high' ? 100 : intensity === 'medium' ? 60 : 30;
  
  const particles = useMemo(() => {
    if (!isMounted) return [];
    return Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5
    }));
  }, [particleCount, isMounted]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Return empty div during SSR or before mount
  if (!isMounted || particles.length === 0) {
    return <div className="absolute inset-0 overflow-hidden"></div>;
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute bg-blue-400/10 rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

const GridBackground = ({ intensity }: { intensity: string }) => {
  const [isMounted, setIsMounted] = useState(false);
  const gridSize = intensity === 'high' ? 20 : intensity === 'medium' ? 30 : 40;
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  if (!isMounted) {
    return <div className="absolute inset-0 overflow-hidden"></div>;
  }
  
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: `${gridSize}px ${gridSize}px`
        }}
        animate={{
          backgroundPosition: ['0px 0px', `${gridSize}px ${gridSize}px`]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
};

const WaveBackground = ({ intensity }: { intensity: string }) => {
  const [isMounted, setIsMounted] = useState(false);
  const waveCount = intensity === 'high' ? 4 : intensity === 'medium' ? 3 : 2;
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  if (!isMounted) {
    return <div className="absolute inset-0 overflow-hidden"></div>;
  }
  
  return (
    <div className="absolute inset-0 overflow-hidden">
      {Array.from({ length: waveCount }, (_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at center, rgba(59, 130, 246, ${0.1 - i * 0.02}) 0%, transparent 50%)`
          }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 15 + i * 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 2
          }}
        />
      ))}
    </div>
  );
};

const GradientBackground = ({ intensity }: { intensity: string }) => {
  const [isMounted, setIsMounted] = useState(false);
  const colors = {
    low: ['rgba(59, 130, 246, 0.1)', 'rgba(147, 51, 234, 0.1)'],
    medium: ['rgba(59, 130, 246, 0.15)', 'rgba(147, 51, 234, 0.15)', 'rgba(236, 72, 153, 0.1)'],
    high: ['rgba(59, 130, 246, 0.2)', 'rgba(147, 51, 234, 0.2)', 'rgba(236, 72, 153, 0.15)', 'rgba(34, 197, 94, 0.1)']
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="absolute inset-0 overflow-hidden"></div>;
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{
          background: `conic-gradient(from 0deg, ${colors[intensity as keyof typeof colors].join(', ')})`
        }}
        animate={{
          rotate: [0, 360]
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
};

export default function AnimatedBackground({
  variant = 'particles',
  intensity = 'medium',
  className = ''
}: AnimatedBackgroundProps) {
  const renderBackground = () => {
    switch (variant) {
      case 'particles':
        return <ParticleBackground intensity={intensity} />;
      case 'grid':
        return <GridBackground intensity={intensity} />;
      case 'waves':
        return <WaveBackground intensity={intensity} />;
      case 'gradient':
        return <GradientBackground intensity={intensity} />;
      default:
        return <ParticleBackground intensity={intensity} />;
    }
  };

  return (
    <div className={`pointer-events-none ${className}`}>
      {renderBackground()}
    </div>
  );
}