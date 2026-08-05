'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Trophy,
  BookOpen,
  GitMerge,
  Crown,
  Award,
  Sparkles,
  CheckCircle2,
  ThumbsUp,
  MessageSquare,
  FileCheck,
  Calendar,
  ExternalLink,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { GlassCard } from '@/components/ui/GlassCard';
import { AchievementCategory } from '@/types';

const CATEGORY_ICONS: Record<AchievementCategory, React.ComponentType<{ className?: string }>> = {
  Hackathon: Trophy,
  'Research Paper': BookOpen,
  'Open Source': GitMerge,
  Leadership: Crown,
  Certification: Award,
  'Sports & Culture': Sparkles,
};

export const TimelineScreen: React.FC = () => {
  const { currentStudent, toggleEndorsement } = useApp();

  const allAchievements = currentStudent.achievements;

  return (
    <div className="space-y-8 pb-16 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center space-x-2">
          <Calendar className="w-7 h-7 text-blue-400" />
          <h1 className="text-3xl font-black tracking-tight">Verified Achievement Timeline</h1>
        </div>
        <p className="text-sm text-slate-400 mt-1">
          Chronological verified milestones for {currentStudent.name} • {currentStudent.department}
        </p>
      </div>

      {/* Vertical Timeline Container */}
      <div className="relative pl-6 md:pl-10 space-y-8 before:absolute before:left-2 md:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-blue-500 before:via-purple-500 before:to-emerald-500">
        {allAchievements.length > 0 ? (
          allAchievements.map((ach, index) => {
            const Icon = CATEGORY_ICONS[ach.category] || Trophy;

            return (
              <motion.div
                key={ach.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {/* Timeline node icon */}
                <div className="absolute -left-[30px] md:-left-[46px] top-1 p-2 rounded-full bg-slate-900 border-2 border-blue-500 text-blue-400 shadow-lg shadow-blue-500/20">
                  <Icon className="w-4 h-4" />
                </div>

                <GlassCard className="p-6 space-y-4">
                  {/* Category & Status Header */}
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center space-x-2">
                      <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                        {ach.category}
                      </span>
                      <span className="text-xs text-emerald-400 font-semibold flex items-center space-x-1">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{ach.verificationStatus}</span>
                      </span>
                      {ach.verifiedBy && (
                        <span className="text-[11px] text-slate-400 font-medium">({ach.verifiedBy})</span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-black text-amber-400">+{ach.pointsEarned} XP</span>
                      <span className="text-xs text-slate-400">{ach.date}</span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-1.5">
                    <h3 className="text-xl font-bold">{ach.title}</h3>
                    <p className="text-sm text-slate-300 leading-relaxed">{ach.description}</p>
                  </div>

                  {/* Certificate / Proof Document Bar */}
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2.5">
                      <FileCheck className="w-4 h-4 text-emerald-400" />
                      <div>
                        <span className="font-bold text-slate-200 block">{ach.proofTitle}</span>
                        <span className="text-[10px] text-slate-400 font-semibold">{ach.proofType}</span>
                      </div>
                    </div>
                    <button className="px-3 py-1.5 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 font-bold flex items-center space-x-1 transition-colors">
                      <span>Inspect Proof</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Endorsements & Comments Bar */}
                  <div className="flex items-center justify-between border-t border-white/10 pt-4 text-xs">
                    <button
                      onClick={() => toggleEndorsement(ach.id)}
                      className={`px-3 py-1.5 rounded-xl border font-semibold flex items-center space-x-1.5 transition-all ${
                        ach.isPeerEndorsed
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10'
                      }`}
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{ach.endorsementsCount} Endorsements</span>
                    </button>

                    <div className="flex items-center space-x-1 text-slate-400">
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{ach.comments.length} Comments</span>
                    </div>
                  </div>

                  {/* Comments Thread */}
                  {ach.comments.length > 0 && (
                    <div className="space-y-2.5 pt-2">
                      {ach.comments.map((comment) => (
                        <div key={comment.id} className="p-3 rounded-xl bg-slate-900/60 border border-white/5 text-xs flex items-start space-x-3">
                          <img src={comment.authorAvatar} alt={comment.authorName} className="w-7 h-7 rounded-full object-cover" />
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-bold text-slate-200">{comment.authorName}</span>
                              <span className="text-[10px] text-blue-400 font-semibold">{comment.authorRole}</span>
                            </div>
                            <p className="text-slate-300 mt-0.5">{comment.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </GlassCard>
              </motion.div>
            );
          })
        ) : (
          <div className="p-12 text-center text-slate-400">No achievements recorded in timeline yet.</div>
        )}
      </div>
    </div>
  );
};
