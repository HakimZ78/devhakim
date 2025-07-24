'use client';

import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'spinner' | 'dots' | 'pulse' | 'bars';
  color?: 'blue' | 'white' | 'gray';
  className?: string;
}

const SpinnerVariant = ({ size, color }: { size: string; color: string }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8', 
    lg: 'w-12 h-12'
  };

  const colorClasses = {
    blue: 'border-blue-500',
    white: 'border-white',
    gray: 'border-gray-400'
  };

  return (
    <motion.div
      className={`${sizeClasses[size as keyof typeof sizeClasses]} border-2 ${colorClasses[color as keyof typeof colorClasses]} border-t-transparent rounded-full`}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  );
};

const DotsVariant = ({ size, color }: { size: string; color: string }) => {
  const sizeClasses = {
    sm: 'w-1 h-1',
    md: 'w-2 h-2',
    lg: 'w-3 h-3'
  };

  const colorClasses = {
    blue: 'bg-blue-500',
    white: 'bg-white',
    gray: 'bg-gray-400'
  };

  const dotClass = `${sizeClasses[size as keyof typeof sizeClasses]} ${colorClasses[color as keyof typeof colorClasses]} rounded-full`;

  return (
    <div className="flex space-x-1">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className={dotClass}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.2
          }}
        />
      ))}
    </div>
  );
};

const PulseVariant = ({ size, color }: { size: string; color: string }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const colorClasses = {
    blue: 'bg-blue-500',
    white: 'bg-white',
    gray: 'bg-gray-400'
  };

  return (
    <motion.div
      className={`${sizeClasses[size as keyof typeof sizeClasses]} ${colorClasses[color as keyof typeof colorClasses]} rounded-full`}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [1, 0.5, 1]
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
};

const BarsVariant = ({ size, color }: { size: string; color: string }) => {
  const heightClasses = {
    sm: 'h-3',
    md: 'h-6',
    lg: 'h-8'
  };

  const colorClasses = {
    blue: 'bg-blue-500',
    white: 'bg-white', 
    gray: 'bg-gray-400'
  };

  const barClass = `w-1 ${heightClasses[size as keyof typeof heightClasses]} ${colorClasses[color as keyof typeof colorClasses]}`;

  return (
    <div className="flex items-end space-x-1">
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className={barClass}
          animate={{
            scaleY: [0.4, 1, 0.4]
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.1
          }}
        />
      ))}
    </div>
  );
};

export default function LoadingSpinner({
  size = 'md',
  variant = 'spinner',
  color = 'blue',
  className = ''
}: LoadingSpinnerProps) {
  const renderVariant = () => {
    switch (variant) {
      case 'spinner':
        return <SpinnerVariant size={size} color={color} />;
      case 'dots':
        return <DotsVariant size={size} color={color} />;
      case 'pulse':
        return <PulseVariant size={size} color={color} />;
      case 'bars':
        return <BarsVariant size={size} color={color} />;
      default:
        return <SpinnerVariant size={size} color={color} />;
    }
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      {renderVariant()}
    </div>
  );
}