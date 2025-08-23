
import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

type CardProps = {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
} & HTMLMotionProps<'div'>;

function Card({ children, className = '', glow = false, ...props }: CardProps) {
  
  const glowClasses = glow ? 'hover:shadow-divine-glow' : '';

  const baseClasses = `
    bg-card backdrop-blur-lg 
    border border-border
    rounded-2xl 
    p-6 
    shadow-lg 
    transition-all duration-500
    text-card-foreground
    shadow-inner-sm
  `;

  return (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`${baseClasses} ${glowClasses} ${className}`}
        {...props}
    >
      {children}
    </motion.div>
  );
}

export default Card;
