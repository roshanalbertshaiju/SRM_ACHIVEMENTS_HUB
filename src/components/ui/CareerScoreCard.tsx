'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Code, Users, BookOpen, HeartHandshake } from 'lucide-react';
import { StudentScores } from '@/types';
import { useApp } from '@/context/AppContext';
import { cn } from '@/lib/utils';

interface CareerScoreCardProps {
  score: number;
  scores: StudentScores;
}

// Sub-metric gradient maps to the gold token system so the bars
// feel like they belong to the same accent language as XP
const METRIC_COLORS = [
  { fill: 'from-[#F5A623] to-[#FBCB6A]', track: 'bg-slate-900' },   // Technical — gold
  { fill: 'from-emerald-500 to-emerald-400', track: 'bg-slate-900' }, // Leadership — verified green
  { fill: 'from-[#F5A623] to-[#FBCB6A]', track: 'bg-slate-900' },   // Research — gold
  { fill: 'from-sky-500 to-sky-400', track: 'bg-slate-900' },        // Community — rare sky
];

export const CareerScoreCard: React.FC<CareerScoreCardProps> = ({ score, scores }) => {
  const { themeConfig } = useApp();
  const isLight = themeConfig.isLight;

  const metrics = [
    { label: 'Technical Mastery', value: scores.technical, icon: Code },
    { label: 'Leadership Impact', value: scores.leadership, icon: Users },
    { label: 'Research & IP', value: scores.research, icon: BookOpen },
    { label: 'Community & Peer', value: scores.community, icon: HeartHandshake },
  ];

  return (
    <div className={cn(
      'p-5 rounded-2xl border backdrop-blur-xl space-y-4',
      isLight ? 'bg-white/80 border-slate-200' : 'bg-card/60 border-white/5'
    )}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <h3 className={cn('font-semibold text-sm tracking-tight', isLight ? 'text-slate-900' : 'text-slate-100')}>
            Career Reputation Score
          </h3>
        </div>
        <span className="text-[11px] font-semibold text-emerald-400">
          Top 0.5% Campus
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
        {/* Big Score — stat-number role */}
        <div className={cn(
          'md:col-span-2 flex flex-col items-center justify-center p-4 rounded-xl border text-center',
          isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-white/5'
        )}>
          <span className={cn('stat-number text-4xl', isLight ? 'text-slate-900' : 'text-white')}>
            {score}
          </span>
          <span className={cn('text-[11px] font-semibold mt-1', isLight ? 'text-slate-500' : 'text-slate-400')}>
            / 1000 MAX SCORE
          </span>
        </div>

        {/* Sub-metrics with amber-based gradient bars */}
        <div className="md:col-span-3 space-y-2.5">
          {metrics.map((m, idx) => {
            const Icon = m.icon;
            const colors = METRIC_COLORS[idx % METRIC_COLORS.length];
            return (
              <div key={idx} className="space-y-1">
                <div className={cn('flex items-center justify-between text-xs font-medium', isLight ? 'text-slate-600' : 'text-slate-300')}>
                  <span className="flex items-center space-x-1.5">
                    <Icon className={cn('w-3.5 h-3.5', isLight ? 'text-slate-400' : 'text-slate-400')} />
                    <span>{m.label}</span>
                  </span>
                  <span className={cn('font-bold stat-number text-xs', isLight ? 'text-slate-800' : 'text-slate-200')}>
                    {m.value}
                  </span>
                </div>
                {/* Gradient bar — same inset-track approach as XP bar */}
                <div className={cn('h-1.5 w-full rounded-full overflow-hidden',
                  isLight ? 'bg-slate-200' : colors.track
                )}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${m.value}%` }}
                    transition={{ duration: 0.8, delay: 0.07 * idx, ease: 'easeOut' }}
                    className={cn('h-full rounded-full bg-gradient-to-r', colors.fill)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
