'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface XPBarProps {
  level: number;
  xp: number;
  xpNextLevel: number;
  showDetails?: boolean;
}

export const XPBar: React.FC<XPBarProps> = ({ level, xp, xpNextLevel, showDetails = true }) => {
  const percentage = Math.min(100, Math.round((xp / xpNextLevel) * 100));
  const remainingXP = xpNextLevel - xp;

  return (
    <div className="w-full space-y-1.5 text-xs font-sans">
      <div className="flex items-center justify-between text-slate-300">
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-blue-400">
            LEVEL {level}
          </span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-200 font-medium">{xp.toLocaleString()} XP</span>
        </div>
        {showDetails && (
          <span className="text-slate-400">
            {remainingXP.toLocaleString()} XP to Level {level + 1}
          </span>
        )}
      </div>

      {/* Clean quiet progress track */}
      <div className="h-1.5 w-full bg-slate-800/80 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="h-full bg-blue-500 rounded-full"
        />
      </div>
    </div>
  );
};
