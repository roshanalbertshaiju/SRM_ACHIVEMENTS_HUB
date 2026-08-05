'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { toPng } from 'html-to-image';
import { X, Download, Share2, ShieldCheck, Trophy, Sparkles, CheckCircle2 } from 'lucide-react';
import { Achievement } from '@/types';
import { useApp } from '@/context/AppContext';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface SocialCardExporterModalProps {
  achievement: Achievement | null;
  onClose: () => void;
}

export const SocialCardExporterModal: React.FC<SocialCardExporterModalProps> = ({ achievement, onClose }) => {
  const { currentStudent, themeConfig } = useApp();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  if (!achievement) return null;

  const handleExportPNG = async () => {
    if (!cardRef.current) return;
    setIsExporting(true);
    try {
      const dataUrl = await toPng(cardRef.current, { quality: 0.98, cacheBust: true });
      const link = document.createElement('a');
      link.download = `CelebrateSRM_${achievement.title.replace(/[^a-zA-Z0-9]/g, '_')}.png`;
      link.href = dataUrl;
      link.click();
      toast.success('Social Achievement Card Downloaded!', {
        description: 'Ready to share on LinkedIn, Twitter/X, or Instagram!',
      });
    } catch (err) {
      toast.error('Could not generate image card. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className={cn(
          "relative w-full max-w-lg rounded-2xl border p-6 shadow-2xl space-y-5 overflow-hidden",
          themeConfig.isLight ? "bg-white border-slate-200 text-slate-900" : "bg-slate-900 border-slate-800 text-slate-100"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-3 border-slate-200 dark:border-slate-800">
          <div className="flex items-center space-x-2">
            <Share2 className="w-4 h-4 text-amber-500" />
            <h3 className="font-extrabold text-sm">Share Achievement Card</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Card Canvas Preview (Rendered to PNG via html-to-image) */}
        <div className="flex justify-center">
          <div
            ref={cardRef}
            id="social-achievement-card"
            className="w-full rounded-2xl p-6 bg-gradient-to-br from-slate-900 via-slate-950 to-black border border-slate-800 text-white shadow-2xl relative space-y-4"
          >
            {/* Branding Header */}
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 font-black text-xs shadow-md">
                  ★
                </div>
                <div>
                  <h4 className="font-extrabold text-xs tracking-tight text-white">CelebrateSRM</h4>
                  <p className="text-[9px] text-amber-400 font-medium">SRM Student Achievement Network</p>
                </div>
              </div>
              <span className="text-[10px] font-mono text-slate-400 border border-slate-800 px-2 py-0.5 rounded-full bg-slate-900">
                VERIFIED MILESTONE
              </span>
            </div>

            {/* Student & Achievement Body */}
            <div className="flex items-center space-x-3 pt-1">
              <img
                src={achievement.studentAvatar || currentStudent.avatar}
                alt={achievement.studentName}
                className="w-12 h-12 rounded-full object-cover border-2 border-amber-500/50 shadow-md"
              />
              <div>
                <h3 className="font-bold text-sm text-white flex items-center space-x-1.5">
                  <span>{achievement.studentName || currentStudent.name}</span>
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                </h3>
                <p className="text-[11px] text-slate-400">
                  {achievement.studentDept || currentStudent.department} • Level {currentStudent.level}
                </p>
              </div>
            </div>

            {/* Achievement Detail Box */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-amber-500/30 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wider flex items-center space-x-1">
                  <Trophy className="w-3.5 h-3.5" />
                  <span>{achievement.category}</span>
                </span>
                <span className="text-xs font-black text-amber-400 font-numeric bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                  +{achievement.pointsEarned} XP
                </span>
              </div>
              <h2 className="font-black text-base leading-snug text-white">{achievement.title}</h2>
              <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">{achievement.description}</p>
            </div>

            {/* Verification Footer */}
            <div className="flex items-center justify-between pt-1 text-[10px] text-slate-400 border-t border-slate-800/80">
              <span className="flex items-center space-x-1 text-emerald-400 font-semibold">
                <CheckCircle2 className="w-3 h-3" />
                <span>Faculty Verified Proof • {achievement.date}</span>
              </span>
              <span className="font-mono text-slate-500">SRM-HUB-2026</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end space-x-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleExportPNG}
            disabled={isExporting}
            className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md flex items-center space-x-1.5 transition-all tactile-btn disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>{isExporting ? 'Exporting Image...' : 'Download Card (PNG)'}</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
