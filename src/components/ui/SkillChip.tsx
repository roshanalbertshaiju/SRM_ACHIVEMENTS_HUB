'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ThumbsUp, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SkillChipProps {
  name: string;
  level: number;
  endorsements: number;
  onEndorse?: () => void;
}

export const SkillChip: React.FC<SkillChipProps> = ({ name, level, endorsements }) => {
  const [count, setCount] = useState(endorsements);
  const [endorsed, setEndorsed] = useState(false);

  const handleEndorse = () => {
    if (!endorsed) {
      setCount((prev) => prev + 1);
      setEndorsed(true);
    } else {
      setCount((prev) => prev - 1);
      setEndorsed(false);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="p-3 rounded-xl border bg-black/20 dark:bg-white/5 border-white/10 flex items-center justify-between space-x-3 text-xs"
    >
      <div className="space-y-1 flex-1">
        <div className="flex items-center justify-between font-semibold">
          <span>{name}</span>
          <span className="text-[11px] opacity-70">{level}% Mastery</span>
        </div>

        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${level}%` }}
            transition={{ duration: 1 }}
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
          />
        </div>
      </div>

      <button
        onClick={handleEndorse}
        className={cn(
          'px-2.5 py-1.5 rounded-lg border text-[11px] font-semibold flex items-center space-x-1.5 transition-all duration-200',
          endorsed
            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
            : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10'
        )}
      >
        {endorsed ? <Check className="w-3 h-3 text-emerald-400" /> : <ThumbsUp className="w-3 h-3" />}
        <span>{count}</span>
      </button>
    </motion.div>
  );
};
