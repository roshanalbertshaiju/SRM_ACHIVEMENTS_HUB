'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Calendar } from 'lucide-react';
import { HeatmapDay } from '@/types';
import { useApp } from '@/context/AppContext';

interface ActivityHeatmapProps {
  data: HeatmapDay[];
  streakDays: number;
}

export const ActivityHeatmap: React.FC<ActivityHeatmapProps> = ({ data, streakDays }) => {
  const { themeConfig } = useApp();

  const getLevelColor = (level: number) => {
    switch (level) {
      case 4:
        return 'bg-emerald-400 dark:bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]';
      case 3:
        return 'bg-emerald-500/80 dark:bg-emerald-500/80';
      case 2:
        return 'bg-emerald-700/60 dark:bg-emerald-600/60';
      case 1:
        return 'bg-emerald-900/40 dark:bg-emerald-900/50';
      default:
        return 'bg-white/5 dark:bg-white/5 border border-white/5';
    }
  };

  return (
    <div className="p-5 rounded-2xl border bg-card/60 backdrop-blur-xl border-white/10 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-emerald-400" />
          <h3 className="font-semibold text-sm tracking-tight">Achievement & Skill Activity</h3>
        </div>

        <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold animate-pulse">
          <Flame className="w-4 h-4 fill-orange-400" />
          <span>{streakDays} DAY STREAK</span>
        </div>
      </div>

      {/* Grid container */}
      <div className="overflow-x-auto pb-2">
        <div className="grid grid-rows-7 grid-flow-col gap-1.5 min-w-[600px]">
          {data.map((day, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.25, zIndex: 10 }}
              title={`${day.date}: ${day.count} activities logged`}
              className={`w-3.5 h-3.5 rounded-sm transition-all duration-200 cursor-pointer ${getLevelColor(day.level)}`}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-1 border-t border-white/5">
        <span>120 Days Timeline</span>
        <div className="flex items-center space-x-1.5">
          <span>Less</span>
          <div className="w-2.5 h-2.5 rounded-sm bg-white/5 border border-white/5" />
          <div className="w-2.5 h-2.5 rounded-sm bg-emerald-900/50" />
          <div className="w-2.5 h-2.5 rounded-sm bg-emerald-600/60" />
          <div className="w-2.5 h-2.5 rounded-sm bg-emerald-500/80" />
          <div className="w-2.5 h-2.5 rounded-sm bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.5)]" />
          <span>More</span>
        </div>
      </div>
    </div>
  );
};
