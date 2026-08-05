'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Swords, ChevronRight, Zap } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { GlassCard } from '@/components/ui/GlassCard';
import { cn } from '@/lib/utils';

export interface DeptBattleItem {
  id: string;
  code: string;
  name: string;
  xp: number;
  rank: number;
  color: string;
  icon: string;
  members: number;
}

const DEPT_BATTLE_DATA: DeptBattleItem[] = [
  { id: 'd1', code: 'CSE', name: 'Computer Science', xp: 21420, rank: 1, color: 'from-amber-500 to-amber-600', icon: '🥇', members: 420 },
  { id: 'd2', code: 'AIML', name: 'AI & Machine Learning', xp: 20980, rank: 2, color: 'from-slate-400 to-slate-500', icon: '🥈', members: 380 },
  { id: 'd3', code: 'ECE', name: 'Electronics & Comm.', xp: 18730, rank: 3, color: 'from-amber-700 to-amber-800', icon: '🥉', members: 340 },
  { id: 'd4', code: 'IT', name: 'Information Tech.', xp: 16400, rank: 4, color: 'from-indigo-500 to-purple-600', icon: '⚡', members: 290 },
];

export const DepartmentBattleCard: React.FC = () => {
  const { setActiveScreen, themeConfig } = useApp();
  const isLight = themeConfig.isLight;

  const maxXP = DEPT_BATTLE_DATA[0].xp;

  return (
    <GlassCard className="p-5 space-y-4 border-amber-500/20">
      {/* Header */}
      <div className={cn('flex items-center justify-between border-b pb-2.5', isLight ? 'border-slate-200' : 'border-slate-800')}>
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-500 dark:text-amber-400">
            <Swords className="w-4 h-4" />
          </div>
          <div>
            <h3 className={cn('font-bold text-xs flex items-center space-x-1', isLight ? 'text-slate-900' : 'text-slate-100')}>
              <span>Department Battle</span>
              <span className="text-[9px] font-black uppercase text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded">V2 Live</span>
            </h3>
            <p className={cn("text-[10px]", isLight ? "text-slate-500" : "text-slate-400")}>Inter-department XP rivalry</p>
          </div>
        </div>

        <button
          onClick={() => setActiveScreen('leaderboard')}
          className="text-[10px] font-bold text-amber-500 dark:text-amber-400 hover:underline flex items-center space-x-0.5"
        >
          <span>View Rivalry</span>
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>

      {/* Department Leaderboard Bars */}
      <div className="space-y-2.5 text-xs">
        {DEPT_BATTLE_DATA.map((dept) => {
          const percentage = Math.round((dept.xp / maxXP) * 100);

          return (
            <div key={dept.id} className="space-y-1">
              <div className="flex items-center justify-between font-bold text-[11px]">
                <div className="flex items-center space-x-1.5">
                  <span className="text-xs">{dept.icon}</span>
                  <span className={isLight ? 'text-slate-900' : 'text-slate-100'}>{dept.code}</span>
                  <span className={cn("text-[10px] font-normal hidden sm:inline", isLight ? "text-slate-500" : "text-slate-400")}>({dept.name})</span>
                </div>
                <span className="font-extrabold text-amber-500 dark:text-amber-400 font-numeric">{dept.xp.toLocaleString()} XP</span>
              </div>

              <div className={cn('h-2 w-full rounded-full overflow-hidden relative', isLight ? 'bg-slate-200' : 'bg-slate-800')}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className={cn(
                    'h-full rounded-full bg-gradient-to-r',
                    dept.rank === 1 ? 'from-amber-400 to-amber-600' : dept.rank === 2 ? 'from-slate-400 to-slate-500' : dept.rank === 3 ? 'from-amber-600 to-amber-800' : 'from-indigo-500 to-purple-500'
                  )}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom info banner */}
      <div className={cn('p-2.5 rounded-xl text-[10px] flex items-center justify-between font-semibold border', isLight ? 'bg-amber-50 text-amber-900 border-amber-200' : 'bg-amber-500/10 text-amber-300 border-amber-500/20')}>
        <div className="flex items-center space-x-1.5">
          <Zap className="w-3.5 h-3.5 text-amber-500" />
          <span>CSE leads by +440 XP! Earn XP to lift your dept.</span>
        </div>
      </div>
    </GlassCard>
  );
};
