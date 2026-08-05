'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy,
  BookOpen,
  GitMerge,
  Flame,
  Crown,
  BrainCircuit,
  ShieldAlert,
  Users,
  Layers,
  Award,
  Lightbulb,
  Sparkles,
  Cpu,
  Cloud,
  Palette,
  Lock,
  X,
  CheckCircle2,
  Zap,
} from 'lucide-react';
import { Badge, Tier } from '@/types';
import { cn } from '@/lib/utils';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Trophy,
  BookOpen,
  GitMerge,
  Flame,
  Crown,
  BrainCircuit,
  ShieldAlert,
  Users,
  Layers,
  Award,
  Lightbulb,
  Sparkles,
  Cpu,
  Cloud,
  Palette,
};

const TIER_STYLES: Record<Tier, { border: string; bg: string; text: string; shadow: string }> = {
  Bronze: {
    border: 'border-amber-700/50',
    bg: 'bg-amber-950/30',
    text: 'text-amber-500 dark:text-amber-400',
    shadow: 'shadow-amber-900/10',
  },
  Silver: {
    border: 'border-slate-400/50',
    bg: 'bg-slate-800/30',
    text: 'text-slate-300',
    shadow: 'shadow-slate-500/10',
  },
  Gold: {
    border: 'border-amber-500/60',
    bg: 'bg-amber-500/15',
    text: 'text-amber-400',
    shadow: 'shadow-amber-500/20',
  },
  Platinum: {
    border: 'border-indigo-400/60',
    bg: 'bg-indigo-950/30',
    text: 'text-indigo-300',
    shadow: 'shadow-indigo-400/20',
  },
  Emerald: {
    border: 'border-emerald-500/60',
    bg: 'bg-emerald-950/30',
    text: 'text-emerald-400',
    shadow: 'shadow-emerald-400/20',
  },
  Diamond: {
    border: 'border-purple-400/60',
    bg: 'bg-purple-950/30',
    text: 'text-purple-300',
    shadow: 'shadow-purple-500/20',
  },
};

interface BadgeCardProps {
  badge: Badge;
}

export const BadgeCard: React.FC<BadgeCardProps> = ({ badge }) => {
  const [isOpen, setIsOpen] = useState(false);
  const IconComponent = ICON_MAP[badge.iconName] || Trophy;
  const tierStyle = TIER_STYLES[badge.tier] || TIER_STYLES.Gold;

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(true)}
        className={cn(
          'relative p-4 rounded-xl border flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 group',
          badge.isUnlocked ? `${tierStyle.bg} ${tierStyle.border} ${tierStyle.shadow}` : 'bg-black/20 dark:bg-white/5 border-white/10 opacity-50 grayscale hover:grayscale-0 hover:opacity-80'
        )}
      >
        {!badge.isUnlocked && (
          <div className="absolute top-2 right-2 p-1 rounded-full bg-black/40 text-muted-foreground">
            <Lock className="w-3 h-3" />
          </div>
        )}

        <div className={cn('p-3 rounded-full mb-2.5 transition-transform duration-300 group-hover:scale-110', badge.isUnlocked ? tierStyle.bg : 'bg-white/5')}>
          <IconComponent className={cn('w-6 h-6', badge.isUnlocked ? tierStyle.text : 'text-gray-400')} />
        </div>

        <h4 className="font-semibold text-xs tracking-tight line-clamp-1">{badge.name}</h4>
        <span className={cn('text-[10px] font-medium px-2 py-0.5 rounded-full mt-1.5 border', tierStyle.border, tierStyle.text)}>
          {badge.tier}
        </span>
      </motion.div>

      {/* Badge Details Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm rounded-2xl border border-white/10 bg-slate-900/95 p-6 text-slate-100 shadow-2xl space-y-5 overflow-hidden"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex flex-col items-center text-center pt-2">
                <div className={cn('p-5 rounded-2xl border mb-3 shadow-xl', tierStyle.bg, tierStyle.border)}>
                  <IconComponent className={cn('w-10 h-10', tierStyle.text)} />
                </div>
                <h3 className="text-xl font-bold">{badge.name}</h3>
                <span className={cn('text-xs font-bold px-3 py-1 rounded-full mt-2 border', tierStyle.border, tierStyle.text)}>
                  {badge.tier} Tier Badge
                </span>
              </div>

              <div className="space-y-3 text-sm border-t border-white/10 pt-4">
                <div>
                  <span className="text-xs text-slate-400 uppercase font-semibold tracking-wider">Description</span>
                  <p className="text-slate-200 mt-1">{badge.description}</p>
                </div>

                <div>
                  <span className="text-xs text-slate-400 uppercase font-semibold tracking-wider">Unlock Criteria</span>
                  <p className="text-slate-300 text-xs mt-1 font-medium bg-white/5 p-2.5 rounded-lg border border-white/5">
                    {badge.requirement}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center space-x-1.5 text-amber-400 text-xs font-bold">
                    <Zap className="w-4 h-4 fill-amber-400" />
                    <span>+{badge.xpBonus} XP Bonus</span>
                  </div>
                  {badge.isUnlocked ? (
                    <div className="flex items-center space-x-1 text-emerald-400 text-xs font-semibold">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Unlocked {badge.dateUnlocked}</span>
                    </div>
                  ) : (
                    <span className="text-xs text-slate-400 font-semibold">Locked</span>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
