'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ProgressRingProps {
  value: number; // 0-100
  size?: number;
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  value,
  size = 120,
  strokeWidth = 10,
  label,
  sublabel,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            strokeLinecap="round"
            fill="transparent"
            className="text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]"
          />
        </svg>

        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="stat-number text-sm">{value}%</span>
          {sublabel && <span className="text-[9px] opacity-60 font-medium">{sublabel}</span>}
        </div>
      </div>
      {label && <span className="text-xs font-semibold tracking-tight">{label}</span>}
    </div>
  );
};
