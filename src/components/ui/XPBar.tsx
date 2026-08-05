'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';

interface XPBarProps {
  level: number;
  xp: number;
  xpNextLevel: number;
  showDetails?: boolean;
}

export const XPBar: React.FC<XPBarProps> = ({ level, xp, xpNextLevel, showDetails = true }) => {
  const { themeConfig } = useApp();
  const isLight = themeConfig.isLight;
  const percentage = Math.min(100, Math.round((xp / xpNextLevel) * 100));
  const remainingXP = xpNextLevel - xp;

  return (
    <div className="w-full space-y-1.5 text-xs font-sans">
      {/* Level & XP Labels */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {/* Level badge — gold, stat-number role */}
          <span
            className="stat-number text-[11px] px-1.5 py-0.5 rounded-md"
            style={{ color: '#F5A623', background: 'rgba(245, 166, 35, 0.12)' }}
          >
            LVL {level}
          </span>
          <span className={`font-semibold stat-number text-[11px] ${isLight ? 'text-slate-700' : 'text-slate-200'}`}>
            {xp.toLocaleString()} XP
          </span>
        </div>
        {showDetails && (
          <span className={`text-[10px] font-medium ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>
            {remainingXP.toLocaleString()} to Lv{level + 1}
          </span>
        )}
      </div>

      {/* XP Bar Track — inset "slot" feel */}
      <div className={`xp-bar-track ${isLight ? 'xp-bar-track-light' : ''} relative`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="xp-bar-fill"
          style={{ minWidth: percentage > 0 ? '12px' : '0px' }}
        />
      </div>
    </div>
  );
};
