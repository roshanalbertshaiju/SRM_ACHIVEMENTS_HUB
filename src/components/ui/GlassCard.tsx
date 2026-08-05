'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { cn } from '@/lib/utils';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  hoverEffect?: boolean;
  tilt?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  glow = false,
  hoverEffect = false,
  tilt = false,
  onMouseMove,
  onMouseLeave,
  ...props
}) => {
  const { themeConfig } = useApp();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (tilt) {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
    }
    if (onMouseMove) onMouseMove(e);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (tilt) {
      e.currentTarget.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    }
    if (onMouseLeave) onMouseLeave(e);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'relative rounded-2xl border transition-all duration-300 overflow-hidden shadow-sm',
        themeConfig.isLight ? 'bg-white border-slate-200/90 text-slate-900' : 'bg-slate-900 border-slate-800/90 text-slate-100',
        hoverEffect && 'hover:-translate-y-1 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700',
        glow && 'ring-1 ring-amber-500/30 shadow-amber-500/10',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};

