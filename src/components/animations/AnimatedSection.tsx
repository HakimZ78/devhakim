'use client';

import { motion, useInView, useReducedMotion, Variants } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade';
  duration?: number;
  className?: string;
  staggerChildren?: boolean;
  viewport?: {
    once?: boolean;
    margin?: string;
    amount?: number | 'some' | 'all';
  };
}

const getVariants = (direction: string, shouldReduceMotion: boolean): Variants => {
  if (shouldReduceMotion) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1 }
    };
  }

  const variants: Record<string, Variants> = {
    up: {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0 }
    },
    down: {
      hidden: { opacity: 0, y: -50 },
      visible: { opacity: 1, y: 0 }
    },
    left: {
      hidden: { opacity: 0, x: -50 },
      visible: { opacity: 1, x: 0 }
    },
    right: {
      hidden: { opacity: 0, x: 50 },
      visible: { opacity: 1, x: 0 }
    },
    scale: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 }
    },
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 }
    }
  };

  return variants[direction] || variants.up;
};

export default function AnimatedSection({
  children,
  delay = 0,
  direction = 'up',
  duration = 0.6,
  className = '',
  staggerChildren = false,
  viewport = { once: true, margin: '-100px', amount: 0.3 }
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, viewport as any);
  const shouldReduceMotion = useReducedMotion();

  const variants = getVariants(direction, shouldReduceMotion || false);

  const transition = {
    duration: shouldReduceMotion ? 0 : duration,
    delay: shouldReduceMotion ? 0 : delay,
    ease: [0.25, 0.46, 0.45, 0.94] as any,
    ...(staggerChildren && {
      staggerChildren: 0.1,
      delayChildren: delay
    })
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}