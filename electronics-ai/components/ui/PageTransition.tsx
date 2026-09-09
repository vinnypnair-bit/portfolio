'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface PageTransitionProps {
  children: React.ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}

export function PageTransition({ children, onSwipeLeft, onSwipeRight }: PageTransitionProps) {
  const shouldReduceMotion = useReducedMotion();

  const animationVariants = {
    initial: shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 8, scale: 0.99 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -8, scale: 0.99 },
  };

  return (
    <motion.div
      variants={animationVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1.0] }}
      drag={onSwipeLeft || onSwipeRight ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.15}
      onDragEnd={(_, info) => {
        const offset = info.offset.x;
        const velocity = info.velocity.x;

        if (offset < -80 || velocity < -300) {
          if (onSwipeLeft) onSwipeLeft();
        } else if (offset > 80 || velocity > 300) {
          if (onSwipeRight) onSwipeRight();
        }
      }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}
