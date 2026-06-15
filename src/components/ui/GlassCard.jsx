import React from 'react';
import { motion } from 'framer-motion';

export default function GlassCard({ children, className = '', animate = true, delay = 0, onClick }) {
  const Card = animate ? motion.div : 'div';
  
  const motionProps = animate ? {
    initial: { opacity: 0, y: 15 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-50px' },
    transition: { duration: 0.5, delay },
  } : {};

  return (
    <Card
      onClick={onClick}
      className={`glass-panel rounded-2xl p-6 ${onClick ? 'cursor-pointer hover:border-brand-orange/30' : ''} ${className}`}
      {...motionProps}
    >
      {children}
    </Card>
  );
}
