'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Swords,
  Crown,
  Flame,
  Zap,
  Shield,
  TrendingUp,
  Award,
  BookOpen,
  Users,
  Plus,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { GlassCard } from '@/components/ui/GlassCard';
import { cn } from '@/lib/utils';

export interface DeptBattleItem {
  id: string;
  code: string;
  name: string;
  xp: number;
  rank: number;
  leadStatus: string;
  mvp: string;
  mvpAvatar: string;
  papers: number;
  hackathons: number;
  members: number;
  color: string;
  glowColor: string;
  borderAccent: string;
  bgGlow: string;
  icon: React.ComponentType<{ className?: string }>;
}

const DEPT_BATTLE_DATA: DeptBattleItem[] = [
  {
    id: 'd1',
    code: 'CSE',
    name: 'Computer Science & Engineering',
    xp: 21420,
    rank: 1,
    leadStatus: '+440 XP Lead (Defending Champion)',
    mvp: 'Roshan Albert Shaiju',
    mvpAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    papers: 14,
    hackathons: 8,
    members: 420,
    color: 'from-[#F5A623] to-[#E8960F]',
    glowColor: '#F5A623',
    borderAccent: 'border-amber-500/40',
    bgGlow: 'bg-amber-500/10',
    icon: Crown,
  },
  {
    id: 'd2',
    code: 'AIML',
    name: 'AI & Machine Learning',
    xp: 20980,
    rank: 2,
    leadStatus: 'Rival #1 (-440 XP Gap to #1)',
    mvp: 'Sophia Chen',
    mvpAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    papers: 12,
    hackathons: 6,
    members: 380,
    color: 'from-purple-500 to-indigo-600',
    glowColor: '#C084FC',
    borderAccent: 'border-purple-500/40',
    bgGlow: 'bg-purple-500/10',
    icon: Flame,
  },
  {
    id: 'd3',
    code: 'ECE',
    name: 'Electronics & Communication',
    xp: 18730,
    rank: 3,
    leadStatus: 'Challenger #3 (-2,250 XP Gap to #2)',
    mvp: 'Aarav Sharma',
    mvpAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    papers: 9,
    hackathons: 5,
    members: 340,
    color: 'from-sky-400 to-blue-600',
    glowColor: '#38BDF8',
    borderAccent: 'border-sky-500/40',
    bgGlow: 'bg-sky-500/10',
    icon: Zap,
  },
  {
    id: 'd4',
    code: 'IT',
    name: 'Information Technology',
    xp: 16400,
    rank: 4,
    leadStatus: 'Challenger #4 (-2,330 XP Gap to #3)',
    mvp: 'Elena Rostova',
    mvpAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    papers: 7,
    hackathons: 4,
    members: 290,
    color: 'from-emerald-400 to-teal-600',
    glowColor: '#34D399',
    borderAccent: 'border-emerald-500/40',
    bgGlow: 'bg-emerald-500/10',
    icon: Shield,
  },
];

interface DepartmentBattleCardProps {
  compact?: boolean;
}

export const DepartmentBattleCard: React.FC<DepartmentBattleCardProps> = ({ compact = false }) => {
  const { setIsAddModalOpen, themeConfig } = useApp();
  const isLight = themeConfig.isLight;

  const maxXP = DEPT_BATTLE_DATA[0].xp;
  const top1 = DEPT_BATTLE_DATA[0];
  const top2 = DEPT_BATTLE_DATA[1];
  const gapXP = top1.xp - top2.xp;

  if (compact) {
    return (
      <GlassCard className="p-4 space-y-3.5 border-amber-500/30">
        <div className={cn('flex items-center justify-between border-b pb-2', isLight ? 'border-slate-200' : 'border-slate-800')}>
          <div className="flex items-center space-x-2">
            <Swords className="w-4 h-4 text-amber-500" />
            <span className={cn('font-bold text-xs', isLight ? 'text-slate-900' : 'text-slate-100')}>
              Department Battle
            </span>
          </div>
          <span className="text-[10px] font-black uppercase text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
            Season 3 Live
          </span>
        </div>

        <div className="space-y-2">
          {DEPT_BATTLE_DATA.map((dept) => {
            const pct = Math.round((dept.xp / maxXP) * 100);
            const Icon = dept.icon;
            return (
              <div key={dept.id} className="space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold flex items-center space-x-1.5">
                    <Icon className="w-3 h-3" style={{ color: dept.glowColor }} />
                    <span className={isLight ? 'text-slate-900' : 'text-slate-100'}>{dept.code}</span>
                  </span>
                  <span className="stat-number text-xs" style={{ color: dept.glowColor }}>
                    {dept.xp.toLocaleString()} XP
                  </span>
                </div>
                <div className={cn('h-1.5 w-full rounded-full overflow-hidden', isLight ? 'bg-slate-200' : 'bg-slate-900')}>
                  <div
                    className={cn('h-full rounded-full bg-gradient-to-r', dept.color)}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="w-full py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-[11px] flex items-center justify-center space-x-1 transition-all tactile-btn"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Boost Department XP</span>
        </button>
      </GlassCard>
    );
  }

  return (
    <div className="space-y-6">
      {/* 1. HEAD-TO-HEAD CHAMPIONSHIP MATCHUP HERO */}
      <GlassCard className="p-6 sm:p-8 space-y-6 border-amber-500/40 relative overflow-hidden bg-gradient-to-br from-amber-500/10 via-slate-900/60 to-purple-900/10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
          
          {/* Defending Champion (#1 CSE) */}
          <div className={cn(
            'flex-1 p-5 rounded-2xl border space-y-3 w-full transition-all',
            isLight ? 'bg-white/90 border-amber-400/60 shadow-lg' : 'bg-slate-900/80 border-amber-500/40 shadow-2xl'
          )}>
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 font-extrabold text-xs border border-amber-500/30">
                <Crown className="w-3.5 h-3.5 fill-amber-400" />
                <span>#1 DEFENDING CHAMPION</span>
              </span>
              <span className="text-[10px] text-slate-400 font-bold uppercase">{top1.members} Active Members</span>
            </div>

            <div>
              <h3 className={cn('text-2xl font-black tracking-tight', isLight ? 'text-slate-900' : 'text-slate-100')}>
                {top1.code}
              </h3>
              <p className={cn('text-xs font-medium', isLight ? 'text-slate-600' : 'text-slate-400')}>
                {top1.name}
              </p>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Total Dept XP</span>
                <span className="stat-number text-2xl text-amber-400">{top1.xp.toLocaleString()} XP</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Top MVP Contributor</span>
                <span className={cn('text-xs font-bold block', isLight ? 'text-slate-800' : 'text-slate-200')}>
                  {top1.mvp}
                </span>
              </div>
            </div>
          </div>

          {/* Center VS Clash Emblem & Goal-Gradient Trigger */}
          <div className="flex flex-col items-center text-center space-y-2 flex-shrink-0 px-4">
            <div className="w-14 h-14 rounded-full bg-slate-950 border-2 border-amber-500/60 flex items-center justify-center shadow-2xl shadow-amber-500/20 relative">
              <Swords className="w-6 h-6 text-amber-400 animate-pulse" />
              <div className="absolute -bottom-1 px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[9px] font-black uppercase">
                VS
              </div>
            </div>

            <div className="space-y-0.5 pt-1">
              <span className="stat-number text-lg text-emerald-400 block">+{gapXP} XP</span>
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Current Lead Gap</span>
            </div>

            {/* Zeigarnik goal-gradient callout */}
            <div className={cn(
              'px-3 py-1.5 rounded-xl border text-[10px] font-bold max-w-xs',
              isLight ? 'bg-amber-50 border-amber-200 text-amber-900' : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
            )}>
              ⚡ 1 Verified Research Paper (+500 XP) flips #1 to AIML!
            </div>
          </div>

          {/* Prime Challenger (#2 AIML) */}
          <div className={cn(
            'flex-1 p-5 rounded-2xl border space-y-3 w-full transition-all',
            isLight ? 'bg-white/90 border-purple-400/60 shadow-lg' : 'bg-slate-900/80 border-purple-500/40 shadow-2xl'
          )}>
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 font-extrabold text-xs border border-purple-500/30">
                <Flame className="w-3.5 h-3.5 fill-purple-400" />
                <span>#2 PRIME CHALLENGER</span>
              </span>
              <span className="text-[10px] text-slate-400 font-bold uppercase">{top2.members} Active Members</span>
            </div>

            <div>
              <h3 className={cn('text-2xl font-black tracking-tight', isLight ? 'text-slate-900' : 'text-slate-100')}>
                {top2.code}
              </h3>
              <p className={cn('text-xs font-medium', isLight ? 'text-slate-600' : 'text-slate-400')}>
                {top2.name}
              </p>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Total Dept XP</span>
                <span className="stat-number text-2xl text-purple-400">{top2.xp.toLocaleString()} XP</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Top MVP Contributor</span>
                <span className={cn('text-xs font-bold block', isLight ? 'text-slate-800' : 'text-slate-200')}>
                  {top2.mvp}
                </span>
              </div>
            </div>
          </div>

        </div>
      </GlassCard>

      {/* 2. ALL DEPARTMENT BATTLE STANDINGS GRID */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className={cn('font-black text-sm uppercase tracking-wider flex items-center space-x-2', isLight ? 'text-slate-900' : 'text-slate-100')}>
            <TrendingUp className="w-4 h-4 text-amber-500" />
            <span>Official Season 3 Standings & Metrics</span>
          </h4>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs flex items-center space-x-1.5 shadow-md transition-all tactile-btn"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Submit Work for My Dept</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {DEPT_BATTLE_DATA.map((dept) => {
            const Icon = dept.icon;
            const pct = Math.round((dept.xp / maxXP) * 100);

            return (
              <GlassCard
                key={dept.id}
                className={cn('p-5 space-y-4 border-l-4 transition-all hover:scale-[1.01]', dept.borderAccent)}
              >
                {/* Header Row */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center border shadow-inner"
                      style={{ background: dept.bgGlow, borderColor: dept.borderAccent }}
                    >
                      <Icon className="w-5 h-5" style={{ color: dept.glowColor }} />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h5 className={cn('font-black text-base', isLight ? 'text-slate-900' : 'text-slate-100')}>
                          {dept.code}
                        </h5>
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border" style={{ color: dept.glowColor, background: dept.bgGlow, borderColor: dept.borderAccent }}>
                          Rank #{dept.rank}
                        </span>
                      </div>
                      <p className={cn('text-xs line-clamp-1', isLight ? 'text-slate-600' : 'text-slate-400')}>
                        {dept.name}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="stat-number text-lg block" style={{ color: dept.glowColor }}>
                      {dept.xp.toLocaleString()} XP
                    </span>
                    <span className="text-[10px] font-medium text-slate-400">{dept.members} Students</span>
                  </div>
                </div>

                {/* Animated XP Progress Meter */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-semibold text-slate-400">
                    <span>{dept.leadStatus}</span>
                    <span>{pct}% of Leader</span>
                  </div>
                  <div className={cn('h-2.5 w-full rounded-full overflow-hidden p-0.5 border', isLight ? 'bg-slate-100 border-slate-200' : 'bg-slate-950 border-slate-800')}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 1.0, ease: 'easeOut' }}
                      className={cn('h-full rounded-full bg-gradient-to-r relative', dept.color)}
                    >
                      {/* Leading edge glow dot */}
                      <div
                        className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-lg"
                        style={{ boxShadow: `0 0 8px ${dept.glowColor}` }}
                      />
                    </motion.div>
                  </div>
                </div>

                {/* Proof Metrics Row */}
                <div className={cn('grid grid-cols-3 gap-2 pt-3 border-t text-center text-xs', isLight ? 'border-slate-200' : 'border-slate-800')}>
                  <div className={cn('p-2 rounded-xl border', isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-slate-800')}>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Top MVP</span>
                    <span className={cn('text-xs font-bold truncate block mt-0.5', isLight ? 'text-slate-900' : 'text-slate-100')}>
                      {dept.mvp.split(' ')[0]}
                    </span>
                  </div>

                  <div className={cn('p-2 rounded-xl border', isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-slate-800')}>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">IEEE Papers</span>
                    <span className="stat-number text-xs text-emerald-400 block mt-0.5">
                      {dept.papers} DOIs
                    </span>
                  </div>

                  <div className={cn('p-2 rounded-xl border', isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-slate-800')}>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Hackathons</span>
                    <span className="stat-number text-xs text-amber-400 block mt-0.5">
                      {dept.hackathons} Wins
                    </span>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </div>
  );
};
