'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Code, Users, BookOpen, HeartHandshake } from 'lucide-react';
import { StudentScores } from '@/types';
import { useApp } from '@/context/AppContext';

interface CareerScoreCardProps {
  score: number;
  scores: StudentScores;
}

export const CareerScoreCard: React.FC<CareerScoreCardProps> = ({ score, scores }) => {
  const { themeConfig } = useApp();

  const metrics = [
    { label: 'Technical Mastery', value: scores.technical, icon: Code },
    { label: 'Leadership Impact', value: scores.leadership, icon: Users },
    { label: 'Research & IP', value: scores.research, icon: BookOpen },
    { label: 'Community & Peer', value: scores.community, icon: HeartHandshake },
  ];

  return (
    <div className="p-5 rounded-2xl border bg-card/60 backdrop-blur-xl border-white/5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <h3 className="font-semibold text-sm tracking-tight text-slate-100">Career Reputation Score</h3>
        </div>
        <span className="text-[11px] font-semibold text-emerald-400">
          Top 0.5% Campus
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
        {/* Main Big Score */}
        <div className="md:col-span-2 flex flex-col items-center justify-center p-4 rounded-xl bg-slate-900/60 border border-white/5 text-center">
          <span className="text-4xl font-black tracking-tight text-white">
            {score}
          </span>
          <span className="text-[11px] font-semibold text-slate-400 mt-0.5">/ 1000 MAX SCORE</span>
        </div>

        {/* Sub-metrics */}
        <div className="md:col-span-3 space-y-2.5">
          {metrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-medium text-slate-300">
                  <span className="flex items-center space-x-1.5">
                    <Icon className="w-3.5 h-3.5 text-slate-400" />
                    <span>{m.label}</span>
                  </span>
                  <span className="font-bold text-slate-200">{m.value}/100</span>
                </div>
                <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${m.value}%` }}
                    transition={{ duration: 0.8, delay: 0.05 * idx }}
                    className="h-full bg-blue-500/80 rounded-full"
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
