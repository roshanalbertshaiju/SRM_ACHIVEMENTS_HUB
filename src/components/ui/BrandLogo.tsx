'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { useApp } from '@/context/AppContext';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
  onClick?: () => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showText = true,
  className,
  onClick,
}) => {
  const { themeConfig } = useApp();
  const isLight = themeConfig?.isLight;

  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-9.5 h-9.5',
    lg: 'w-11 h-11',
  };

  const svgSizes = {
    sm: 'w-4.5 h-4.5',
    md: 'w-5.5 h-5.5',
    lg: 'w-6.5 h-6.5',
  };

  return (
    <div
      onClick={onClick}
      className={cn('flex items-center space-x-3 cursor-pointer group flex-shrink-0 select-none', className)}
    >
      {/* Premium Logo Mark Icon Container */}
      <div
        className={cn(
          iconSizes[size],
          'rounded-xl relative flex items-center justify-center transition-all duration-300 group-hover:scale-105 shadow-md',
          isLight
            ? 'bg-slate-900 border border-slate-700/80 shadow-slate-300/40 group-hover:border-amber-500/60'
            : 'bg-slate-950/90 border border-amber-500/30 shadow-black/60 group-hover:border-amber-400/70 group-hover:shadow-amber-500/10'
        )}
      >
        {/* Ambient Subtle Glow */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-amber-500/10 via-amber-400/5 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Vector Emblem */}
        <svg
          className={cn(svgSizes[size], 'relative z-10 text-amber-400')}
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Primary Gold Metallic Gradient */}
            <linearGradient id="srmLogoGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FBCB6A" />
              <stop offset="45%" stopColor="#F5A623" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>

            {/* Subtle Secondary Highlight Gradient */}
            <linearGradient id="srmLogoAccent" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#C084FC" />
            </linearGradient>

            {/* Inner Glow Filter */}
            <filter id="logoGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Faceted Outer Shield / Hexagonal Diamond Framing */}
          <path
            d="M20 3L34 10V22C34 30.2 28 35.8 20 38C12 35.8 6 30.2 6 22V10L20 3Z"
            stroke="url(#srmLogoGold)"
            strokeWidth="2.2"
            strokeLinejoin="round"
            fill="rgba(245, 166, 35, 0.06)"
          />

          {/* Interlocking Dynamic 'S' Crest & Apex Polygon */}
          <path
            d="M20 8.5L28 13.5L25 18L20 15L15 18L12 13.5L20 8.5Z"
            fill="url(#srmLogoGold)"
            filter="url(#logoGlow)"
          />
          <path
            d="M12 20.5L16.5 18L20 20.5L23.5 18L28 20.5L26 26.5L20 30.5L14 26.5L12 20.5Z"
            fill="url(#srmLogoGold)"
            opacity="0.9"
          />

          {/* Core Central Node (Reputation Hub Center Point) */}
          <circle cx="20" cy="19.5" r="2.2" fill="#FFFFFF" />
          <circle cx="20" cy="19.5" r="3.5" stroke="url(#srmLogoGold)" strokeWidth="1" fill="none" />
        </svg>
      </div>

      {/* Brand Name Typography */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center space-x-1.5 font-black text-sm tracking-tight leading-none">
            <span className={cn('transition-colors', isLight ? 'text-slate-900' : 'text-slate-100')}>
              SRM
            </span>
            <span className="text-amber-400 font-black tracking-tight drop-shadow-sm">
              Hub
            </span>
          </div>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block pt-0.5 leading-none">
            Student Network
          </span>
        </div>
      )}
    </div>
  );
};
