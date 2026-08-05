'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Trophy, ShieldCheck, Flame, X } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { cn } from '@/lib/utils';

interface ToastMessage {
  id: string;
  user: string;
  avatar: string;
  action: string;
  icon: 'trophy' | 'shield' | 'sparkle' | 'flame';
}

const SAMPLE_LIVE_EVENTS: Omit<ToastMessage, 'id'>[] = [
  { user: 'Roshan Albert', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', action: 'moved to Rank #1 on Campus Leaderboard', icon: 'trophy' },
  { user: 'Sophia Lin', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80', action: 'uploaded IEEE Quantum NLP Paper', icon: 'sparkle' },
  { user: 'Faculty Board', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', action: 'verified 12 pending student achievements', icon: 'shield' },
  { user: 'Aryan Sharma', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', action: 'reached Gold Tier (+500 XP)', icon: 'flame' },
];

export const LiveToastNotifier: React.FC = () => {
  const { themeConfig } = useApp();
  const isLight = themeConfig.isLight;
  const [activeToast, setActiveToast] = useState<ToastMessage | null>(null);

  useEffect(() => {
    // Show first toast after 4 seconds, then repeat periodically
    const timer1 = setTimeout(() => {
      triggerToast(0);
    }, 4000);

    const timer2 = setTimeout(() => {
      triggerToast(1);
    }, 16000);

    const timer3 = setTimeout(() => {
      triggerToast(2);
    }, 28000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const triggerToast = (index: number) => {
    const event = SAMPLE_LIVE_EVENTS[index % SAMPLE_LIVE_EVENTS.length];
    const newToast: ToastMessage = {
      ...event,
      id: `toast-${Date.now()}`,
    };
    setActiveToast(newToast);

    // Auto dismiss after 4.5 seconds
    setTimeout(() => {
      setActiveToast((curr) => (curr?.id === newToast.id ? null : curr));
    }, 4500);
  };

  if (!activeToast) return null;

  return (
    <div className="fixed bottom-20 right-6 z-40 max-w-sm pointer-events-auto">
      <AnimatePresence>
        <motion.div
          key={activeToast.id}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className={cn(
            'p-3.5 rounded-2xl border shadow-2xl backdrop-blur-2xl flex items-center space-x-3',
            isLight
              ? 'bg-white/95 border-slate-200/90 text-slate-900 shadow-indigo-500/10'
              : 'bg-[#0F172A]/95 border-indigo-500/30 text-slate-100 shadow-indigo-500/20 ring-1 ring-indigo-500/20'
          )}
        >
          <div className="relative">
            <img src={activeToast.avatar} alt={activeToast.user} className="w-9 h-9 rounded-full object-cover border border-indigo-400/40" />
            <span className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-indigo-600 text-white text-[9px]">
              {activeToast.icon === 'trophy' && <Trophy className="w-2.5 h-2.5 text-amber-300" />}
              {activeToast.icon === 'sparkle' && <Sparkles className="w-2.5 h-2.5 text-cyan-300" />}
              {activeToast.icon === 'shield' && <ShieldCheck className="w-2.5 h-2.5 text-emerald-300" />}
              {activeToast.icon === 'flame' && <Flame className="w-2.5 h-2.5 text-orange-300" />}
            </span>
          </div>

          <div className="flex-1 text-xs pr-2">
            <div className="flex items-center space-x-1">
              <span className="font-bold text-xs">{activeToast.user}</span>
              <span className="text-[10px] text-emerald-400 font-mono font-bold">• Live</span>
            </div>
            <p className={cn('text-[11px] leading-tight', isLight ? 'text-slate-600' : 'text-slate-300')}>
              {activeToast.action}
            </p>
          </div>

          <button
            onClick={() => setActiveToast(null)}
            className="text-slate-400 hover:text-slate-200 p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
