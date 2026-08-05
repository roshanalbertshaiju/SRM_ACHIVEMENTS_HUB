'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy,
  Flame,
  ShieldCheck,
  Target,
  Award,
  BookOpen,
  CheckCircle2,
  ThumbsUp,
  MessageSquare,
  Bookmark,
  ExternalLink,
  Lock,
  ChevronRight,
  Pin,
  CheckSquare,
  Square,
  Sparkles,
  Rocket,
  Github,
  Globe,
  TrendingUp,
  Crown,
  Zap,
  Radio,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { XPBar } from '@/components/ui/XPBar';
import { GlassCard } from '@/components/ui/GlassCard';
import { ActivityHeatmap } from '@/components/ui/ActivityHeatmap';
import { ProofViewerModal } from '@/components/ui/ProofViewerModal';
import { LiveToastNotifier } from '@/components/ui/LiveToastNotifier';
import { DepartmentBattleCard } from '@/components/ui/DepartmentBattleCard';
import { Achievement, ReactionType } from '@/types';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const REACTION_EMOJIS: Record<ReactionType, { emoji: string; label: string; color: string }> = {
  celebrate: { emoji: '🎉', label: 'Celebrate', color: 'text-amber-500' },
  applaud: { emoji: '👏', label: 'Applaud', color: 'text-emerald-500' },
  inspired: { emoji: '🔥', label: 'Inspired', color: 'text-amber-500' },
  respect: { emoji: '⭐', label: 'Respect', color: 'text-amber-500' },
};

import confetti from 'canvas-confetti';
import { SocialCardExporterModal } from '../ui/SocialCardExporterModal';

export const StudentDashboardScreen: React.FC = () => {
  const {
    currentStudent,
    students,
    setIsAddModalOpen,
    setActiveScreen,
    setCurrentStudentId,
    toggleReaction,
    seasonInfo,
    themeConfig,
  } = useApp();

  const [selectedAchievementForProof, setSelectedAchievementForProof] = useState<Achievement | null>(null);
  const [selectedAchievementForSocialShare, setSelectedAchievementForSocialShare] = useState<Achievement | null>(null);
  const [openCommentAchId, setOpenCommentAchId] = useState<string | null>(null);
  const [activeReactionPickerAchId, setActiveReactionPickerAchId] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');
  const isLight = themeConfig.isLight;

  const handleSharePost = (ach: Achievement) => {
    setSelectedAchievementForSocialShare(ach);
  };

  const handleAddComment = (achId: string) => {
    if (!commentText.trim()) return;
    toast.success('Comment Posted!', {
      description: 'Your congratulatory note has been added to the milestone feed.',
    });
    setCommentText('');
  };

  const [dailyMissions, setDailyMissions] = useState([
    { id: 'm1', title: 'Upload Certificate', done: true, xp: 30 },
    { id: 'm2', title: 'Maintain 30-Day Streak', done: true, xp: 40 },
    { id: 'm3', title: 'Verify IEEE Paper', done: true, xp: 30 },
    { id: 'm4', title: 'Apply to HackMIT 2026', done: false, xp: 20 },
  ]);

  const toggleMission = (id: string) => {
    setDailyMissions((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          const nextState = !m.done;
          if (nextState) {
            confetti({
              particleCount: 80,
              spread: 60,
              origin: { y: 0.7 },
            });
            toast.success(`Mission Completed! +${m.xp} XP`, {
              description: `You finished "${m.title}". Keep up the streak!`,
            });
          }
          return { ...m, done: nextState };
        }
        return m;
      })
    );
  };

  const topStudents = [...students].sort((a, b) => b.careerScore - a.careerScore);
  const champ1 = topStudents[0];
  const rankers2to5 = topStudents.slice(1, 5);

  const lockedBadges = currentStudent.badges.filter((b) => !b.isUnlocked);
  const nextBadge = lockedBadges[0] || currentStudent.badges[0];
  const pinnedAchievements = currentStudent.achievements.filter((a) => a.isPinned);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 space-y-5">
      {/* 1. HERO 3-COLUMN GRID: 22% Left | 56% Center (Feed Hero) | 22% Right */}
      <div className="grid grid-cols-1 lg:grid-cols-[2.2fr_5.6fr_2.2fr] gap-6 items-start">
        
        {/* ================= LEFT SIDEBAR (22%): COMPACT REPUTATION & MISSIONS ================= */}
        <div className="space-y-5">
          {/* 2. COMPACT REPUTATION WIDGET */}
          <GlassCard className="overflow-hidden">
            {/* Natural Header Banner */}
            <div className={cn("h-8 w-full border-b relative", isLight ? "bg-slate-100 border-slate-200" : "bg-slate-800/60 border-slate-700")} />

            <div className="p-4 pt-0 space-y-3 relative text-center">
              {/* Avatar */}
              <div className="flex justify-center -mt-6 mb-1">
                <img
                  src={currentStudent.avatar}
                  alt={currentStudent.name}
                  className={cn("w-12 h-12 rounded-full object-cover border-2 shadow-sm", isLight ? "border-white" : "border-slate-800")}
                />
              </div>

              {/* Identity & Reputation Card */}
              <div className="space-y-1">
                <h2 className={cn("font-extrabold text-sm flex items-center justify-center space-x-1", isLight ? "text-slate-900" : "text-slate-100")}>
                  <span>{currentStudent.name}</span>
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                </h2>
                
                {/* 14. IDENTITY TITLE */}
                <div className={cn("inline-block px-2.5 py-0.5 rounded-full font-bold text-[11px] border", isLight ? "bg-slate-100 border-slate-200 text-slate-700" : "bg-slate-800 border-slate-700 text-slate-300")}>
                  🏆 Campus Innovator
                </div>

                <p className={cn("text-[10px]", isLight ? "text-slate-500" : "text-slate-400")}>
                  Level {currentStudent.level} • {currentStudent.department}
                </p>
              </div>

              {/* Compact Reputation Widget Box */}
              <div className={cn("p-3 rounded-2xl border text-xs space-y-2 text-center", isLight ? "bg-slate-50 border-slate-200" : "bg-slate-800/40 border-slate-700/60")}>
                <div className={cn("text-[10px] uppercase tracking-widest font-bold", isLight ? "text-slate-500" : "text-slate-400")}>Career Reputation</div>
                <div className="flex items-center justify-center">
                  <span className="text-xl font-black text-amber-500 dark:text-amber-400 font-numeric">{currentStudent.careerScore}</span>
                </div>
              </div>

              {/* XP Progression Bar */}
              <div className="pt-1 text-left">
                <XPBar level={currentStudent.level} xp={currentStudent.xp} xpNextLevel={currentStudent.xpNextLevel} />
              </div>

              {/* Public Portfolio Link */}
              <button
                onClick={() => setActiveScreen('public-profile')}
                className={cn("w-full py-2 rounded-xl text-xs font-bold transition-colors border flex items-center justify-center space-x-1 tactile-btn", isLight ? "bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200" : "bg-slate-800/60 hover:bg-slate-800 text-slate-200 border-slate-700")}
              >
                <span>View Public Portfolio</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </GlassCard>

          {/* 6. DAILY MISSIONS */}
          <GlassCard className="p-4 space-y-3 text-xs">
            <div className={cn("flex items-center justify-between border-b pb-2", isLight ? "border-slate-200" : "border-slate-800")}>
              <span className={cn("font-bold uppercase tracking-wider text-[11px] flex items-center space-x-1.5", isLight ? "text-slate-800" : "text-slate-200")}>
                <Target className="w-3.5 h-3.5 text-amber-500" />
                <span>Daily Missions</span>
              </span>
              <span className="text-[10px] text-emerald-500 font-bold font-numeric">
                {dailyMissions.filter((m) => m.done).length}/{dailyMissions.length}
              </span>
            </div>

            <div className="space-y-2">
              {dailyMissions.map((m) => (
                <div
                  key={m.id}
                  onClick={() => toggleMission(m.id)}
                  className="flex items-center justify-between cursor-pointer transition-colors p-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/40"
                >
                  <div className="flex items-center space-x-2">
                    {m.done ? (
                      <CheckSquare className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    )}
                    <span className={cn("text-[11px] leading-tight font-medium", m.done && "line-through text-slate-400")}>
                      {m.title}
                    </span>
                  </div>
                  <span className="text-[9px] font-extrabold text-amber-500 font-numeric">+{m.xp} XP</span>
                </div>
              ))}
            </div>

            {/* Reward Bottom Banner */}
            <div className={cn("p-2 rounded-xl border text-center font-bold text-[11px] flex items-center justify-center space-x-1.5", isLight ? "bg-slate-50 border-slate-200 text-slate-800" : "bg-slate-800/60 border-slate-700 text-slate-200")}>
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>Complete All Missions → Reward +120 XP</span>
            </div>
          </GlassCard>

          {/* 12. SEASONS WIDGET */}
          <GlassCard className="p-4 space-y-3 text-xs border-amber-500/30">
            <div className={cn("flex items-center justify-between border-b pb-2", isLight ? "border-slate-200" : "border-slate-800")}>
              <span className="font-bold text-xs text-amber-500 dark:text-amber-400 flex items-center space-x-1.5">
                <Trophy className="w-4 h-4 text-amber-500" />
                <span>{seasonInfo.title}</span>
              </span>
              <span className="text-[10px] font-bold text-slate-400">{seasonInfo.daysRemaining} Days Left</span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className={cn("font-medium", isLight ? "text-slate-600" : "text-slate-400")}>Current Qualification</span>
                <span className="font-bold text-emerald-500 font-numeric">Rank #{seasonInfo.currentRank}</span>
              </div>

              <div className="flex items-center justify-between text-[11px]">
                <span className={cn("font-medium", isLight ? "text-slate-600" : "text-slate-400")}>Target Qualifier</span>
                <span className="font-bold text-amber-500 dark:text-amber-400 font-numeric">Top 100</span>
              </div>

              <div className={cn("p-2.5 rounded-xl border space-y-1", isLight ? "bg-amber-50 border-amber-200" : "bg-amber-500/10 border-amber-500/20")}>
                <div className="flex items-center justify-between font-bold text-[10px] text-amber-500 dark:text-amber-400">
                  <span>Need +{seasonInfo.neededXP} XP</span>
                  <span>to enter Top 10</span>
                </div>
                <div className={cn("h-1.5 w-full rounded-full overflow-hidden", isLight ? "bg-slate-200" : "bg-slate-800")}>
                  <div className="h-full w-[72%] bg-amber-500 rounded-full" />
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* ================= CENTER COLUMN (56%): CAMPUS PULSE FEED ================= */}
        <div className="space-y-5">
          
          {/* HERO FEED HEADER */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className={cn("text-xl font-black flex items-center space-x-2 tracking-tight", isLight ? "text-slate-900" : "text-white")}>
                <span>⚡ Campus Pulse</span>
              </h1>
              <p className={cn("text-xs", isLight ? "text-slate-500" : "text-slate-400")}>
                The live heartbeat of university achievements, papers, and hackathons
              </p>
            </div>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-sm flex items-center space-x-1.5 transition-all tactile-btn"
            >
              <Rocket className="w-3.5 h-3.5" />
              <span>Post Win</span>
            </button>
          </div>

          {/* Quick Post Box */}
          <GlassCard className="p-4 space-y-3">
            <div className="flex items-center space-x-3">
              <img src={currentStudent.avatar} alt={currentStudent.name} className="w-9 h-9 rounded-full object-cover border border-amber-500/30" />
              <button
                onClick={() => setIsAddModalOpen(true)}
                className={cn("flex-1 text-left px-4 py-2.5 rounded-full border text-xs transition-all", isLight ? "bg-slate-100 border-slate-200 text-slate-500 hover:bg-slate-200" : "bg-slate-800/60 border-slate-700 text-slate-400 hover:bg-slate-800")}
              >
                Share a verified hackathon win, IEEE paper, or PR...
              </button>
            </div>

            <div className={cn("flex items-center justify-between pt-2 border-t text-xs", isLight ? "border-slate-200" : "border-slate-800")}>
              <button onClick={() => setIsAddModalOpen(true)} className="flex items-center space-x-1.5 text-amber-500 font-bold hover:underline">
                <Trophy className="w-4 h-4 text-amber-500" />
                <span>Hackathon Win</span>
              </button>
              <button onClick={() => setIsAddModalOpen(true)} className="flex items-center space-x-1.5 text-amber-500 font-bold hover:underline">
                <BookOpen className="w-4 h-4 text-amber-500" />
                <span>Research Paper</span>
              </button>
              <button onClick={() => setIsAddModalOpen(true)} className="flex items-center space-x-1.5 text-emerald-500 font-bold hover:underline">
                <Award className="w-4 h-4 text-emerald-500" />
                <span>Certification</span>
              </button>
            </div>
          </GlassCard>

          {/* Pinned Highlights */}
          {pinnedAchievements.length > 0 && (
            <div className={cn("p-3.5 rounded-2xl border space-y-2", isLight ? "bg-slate-50 border-slate-200 text-slate-900" : "bg-slate-800/40 border-slate-700 text-slate-100")}>
              <div className="flex items-center space-x-1.5 text-amber-500 text-xs font-bold">
                <Pin className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>Pinned Highlights</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {pinnedAchievements.map((ach) => (
                  <div key={ach.id} className={cn("p-2.5 rounded-xl border space-y-1", isLight ? "bg-white border-slate-200" : "bg-slate-900/60 border-slate-700")}>
                    <span className="text-[10px] text-amber-500 font-bold block">{ach.category}</span>
                    <h5 className={cn("font-bold text-[11px] line-clamp-1", isLight ? "text-slate-900" : "text-slate-100")}>{ach.title}</h5>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. SOCIAL ACHIEVEMENT POST CARDS */}
          <div className="space-y-4">
            {currentStudent.achievements.map((ach) => {
              return (
                <GlassCard key={ach.id} className="p-6 space-y-3.5">
                  {/* Author & Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <img src={ach.studentAvatar} alt={ach.studentName} className={cn("w-10 h-10 rounded-full object-cover border", isLight ? "border-slate-200" : "border-slate-700")} />
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className={cn("font-bold text-sm", isLight ? "text-slate-900" : "text-slate-100")}>{ach.studentName}</h3>
                          <span className={cn("text-[9px] font-extrabold px-1.5 py-0.5 rounded border", isLight ? "bg-slate-100 border-slate-300 text-slate-700" : "bg-slate-800 border-slate-700 text-slate-300")}>
                            Campus Innovator
                          </span>
                          <span className="text-[10px] font-semibold text-emerald-500 flex items-center space-x-0.5 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                            <span>{ach.verificationStatus}</span>
                          </span>
                        </div>
                        <p className={cn("text-[11px]", isLight ? "text-slate-500" : "text-slate-400")}>{ach.studentDept} • {ach.date}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-black text-amber-500 dark:text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-xl border border-amber-500/20 block font-numeric">
                        +{ach.pointsEarned} XP
                      </span>
                      {ach.rarity && (
                        <span className={cn("text-[9px] font-bold uppercase block mt-1 text-slate-400")}>
                          {ach.rarity}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="space-y-1 pt-1">
                    <h4 className={cn("font-extrabold text-base leading-snug", isLight ? "text-slate-900" : "text-slate-100")}>{ach.title}</h4>
                    <p className={cn("text-xs leading-relaxed", isLight ? "text-slate-600" : "text-slate-300")}>{ach.description}</p>
                  </div>

                  {/* Attachment Box */}
                  <div className={cn("p-3 rounded-xl border flex items-center justify-between text-xs", isLight ? "bg-slate-50 border-slate-200" : "bg-slate-800/40 border-slate-700")}>
                    <div className="flex items-center space-x-2 truncate">
                      <Award className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span className={cn("font-medium truncate", isLight ? "text-slate-800" : "text-slate-200")}>{ach.proofTitle}</span>
                    </div>
                    <button
                      onClick={() => setSelectedAchievementForProof(ach)}
                      className="text-[11px] font-bold text-amber-500 dark:text-amber-400 hover:underline flex items-center space-x-1 flex-shrink-0"
                    >
                      <span>Inspect Proof</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>

                  {/* 9. RICH INTERACTION EXPLORATION BUTTONS */}
                  <div className="flex items-center flex-wrap gap-2 pt-1">
                    <button
                      onClick={() => setSelectedAchievementForProof(ach)}
                      className={cn(
                        "px-2.5 py-1 rounded-lg text-[11px] font-bold border flex items-center space-x-1 tactile-btn",
                        isLight ? "bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300" : "bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700"
                      )}
                    >
                      <Award className="w-3 h-3 text-amber-500" />
                      <span>View Certificate</span>
                    </button>

                    {ach.githubUrl && (
                      <a
                        href={ach.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className={cn(
                          "px-2.5 py-1 rounded-lg text-[11px] font-bold border flex items-center space-x-1 tactile-btn",
                          isLight ? "bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300" : "bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700"
                        )}
                      >
                        <Github className="w-3 h-3" />
                        <span>GitHub Repo</span>
                      </a>
                    )}

                    {ach.projectUrl && (
                      <a
                        href={ach.projectUrl}
                        target="_blank"
                        rel="noreferrer"
                        className={cn(
                          "px-2.5 py-1 rounded-lg text-[11px] font-bold border flex items-center space-x-1 tactile-btn",
                          isLight ? "bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300" : "bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700"
                        )}
                      >
                        <Globe className="w-3 h-3 text-amber-500" />
                        <span>View Project</span>
                      </a>
                    )}
                  </div>

                  {/* 4. MULTI-REACTION BAR (LINKEDIN STYLE) */}
                  <div className={cn("flex items-center justify-between pt-3 border-t text-xs relative", isLight ? "border-slate-200" : "border-slate-800")}>
                    {/* Reaction Picker Button */}
                    <div className="relative">
                      <button
                        onClick={() => setActiveReactionPickerAchId(activeReactionPickerAchId === ach.id ? null : ach.id)}
                        className={cn(
                          "flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-bold transition-all tactile-btn",
                          ach.userReaction
                            ? "bg-amber-500/20 text-amber-500 border border-amber-500/40"
                            : isLight
                            ? "text-slate-700 hover:bg-slate-100"
                            : "text-slate-300 hover:bg-slate-800"
                        )}
                      >
                        <span>{ach.userReaction ? REACTION_EMOJIS[ach.userReaction].emoji : '🎉'}</span>
                        <span>{ach.userReaction ? REACTION_EMOJIS[ach.userReaction].label : 'Celebrate'}</span>
                      </button>

                      {/* Floating Reaction Picker Popover */}
                      <AnimatePresence>
                        {activeReactionPickerAchId === ach.id && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 10 }}
                            className={cn(
                              "absolute bottom-full left-0 mb-2 p-1.5 rounded-full border shadow-2xl flex items-center space-x-1 z-30",
                              isLight ? "bg-white border-slate-300" : "bg-slate-900 border-slate-700"
                            )}
                          >
                            {(['celebrate', 'applaud', 'inspired', 'respect'] as ReactionType[]).map((rKey) => {
                              const r = REACTION_EMOJIS[rKey];
                              return (
                                <button
                                  key={rKey}
                                  onClick={() => {
                                    toggleReaction(ach.id, rKey);
                                    setActiveReactionPickerAchId(null);
                                  }}
                                  className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 hover:scale-125 transition-all text-base"
                                  title={r.label}
                                >
                                  {r.emoji}
                                </button>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Reaction Summary Counters */}
                    <div className="flex items-center space-x-2 text-[11px] text-slate-400 font-medium">
                      {ach.reactions && (
                        <div className="flex items-center space-x-1.5 font-numeric">
                          {ach.reactions.celebrate > 0 && <span>🎉 {ach.reactions.celebrate}</span>}
                          {ach.reactions.applaud > 0 && <span>👏 {ach.reactions.applaud}</span>}
                          {ach.reactions.inspired > 0 && <span>🔥 {ach.reactions.inspired}</span>}
                          {ach.reactions.respect > 0 && <span>⭐ {ach.reactions.respect}</span>}
                        </div>
                      )}
                    </div>

                    {/* Comments Toggle */}
                    <button
                      onClick={() => setOpenCommentAchId(openCommentAchId === ach.id ? null : ach.id)}
                      className={cn("flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-colors font-bold tactile-btn", isLight ? "text-slate-700 hover:bg-slate-100" : "text-slate-300 hover:bg-slate-800", openCommentAchId === ach.id && "text-amber-500")}
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Comments ({ach.comments.length})</span>
                    </button>

                    {/* Share Button */}
                    <button
                      onClick={() => handleSharePost(ach)}
                      className={cn("flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-colors font-bold tactile-btn", isLight ? "text-slate-700 hover:bg-slate-100" : "text-slate-300 hover:bg-slate-800")}
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Share Card</span>
                    </button>
                  </div>

                  {/* Inline Expandable Comment Section */}
                  <AnimatePresence>
                    {openCommentAchId === ach.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className={cn("pt-3 border-t space-y-3", isLight ? "border-slate-200" : "border-slate-800")}
                      >
                        <div className="space-y-2">
                          {ach.comments.length === 0 ? (
                            <p className="text-[11px] text-slate-400 italic">No comments yet. Be the first to congratulate!</p>
                          ) : (
                            ach.comments.map((c) => (
                              <div key={c.id} className={cn("p-2.5 rounded-xl border space-y-0.5 text-xs", isLight ? "bg-slate-50 border-slate-200" : "bg-slate-800/40 border-slate-700/60")}>
                                <div className="flex items-center justify-between font-bold">
                                  <span className={isLight ? "text-slate-900" : "text-slate-200"}>{c.authorName}</span>
                                  <span className="text-[10px] text-slate-400">{c.createdAt}</span>
                                </div>
                                <p className={cn("text-[11px]", isLight ? "text-slate-700" : "text-slate-300")}>{c.content}</p>
                              </div>
                            ))
                          )}
                        </div>

                        <div className="flex items-center space-x-2 pt-1">
                          <input
                            type="text"
                            placeholder="Write a congratulatory comment..."
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            className={cn(
                              "flex-1 px-3 py-1.5 rounded-xl border text-xs focus:outline-none focus:border-amber-500 font-medium",
                              isLight ? "bg-slate-100 border-slate-300 text-slate-900 placeholder-slate-500" : "bg-slate-800 border-slate-700 text-slate-100 placeholder-slate-400"
                            )}
                          />
                          <button
                            onClick={() => handleAddComment(ach.id)}
                            className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs tactile-btn shadow-sm"
                          >
                            Post
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </GlassCard>
              );
            })}
          </div>
        </div>

        {/* ================= RIGHT SIDEBAR (22%): OPPORTUNITIES ================= */}
        <div className="space-y-5">

          {/* 8. INTELLIGENT OPPORTUNITIES MATCHING */}
          <GlassCard className="p-4 space-y-3 text-xs">
            <span className={cn("text-xs font-extrabold block border-b pb-2", isLight ? "text-slate-800 border-slate-200" : "text-slate-200 border-slate-800")}>
              Smart Opportunities
            </span>

            <div className="space-y-2.5">
              <div className={cn("p-3 rounded-xl border space-y-1.5", isLight ? "bg-slate-50 border-slate-200" : "bg-slate-800/40 border-slate-700/60")}>
                <div className="flex items-center justify-between">
                  <span className={cn("font-bold text-xs", isLight ? "text-slate-900" : "text-slate-100")}>Google AI HackMIT 2026</span>
                  <span className="text-[9px] font-black text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 font-numeric">
                    94% Match
                  </span>
                </div>

                <div className={cn("text-[10px] font-semibold space-x-1.5 pt-0.5", isLight ? "text-slate-600" : "text-slate-400")}>
                  <span>Matches profile:</span>
                  <span className="text-emerald-500 font-bold">✓ AI</span>
                  <span className="text-emerald-500 font-bold">✓ Open Source</span>
                </div>

                <div className="text-[10px] text-amber-500 dark:text-amber-400 font-bold pt-0.5 font-numeric">+1,000 XP Reward</div>
              </div>

              <div className={cn("p-3 rounded-xl border space-y-1.5", isLight ? "bg-slate-50 border-slate-200" : "bg-slate-800/40 border-slate-700/60")}>
                <div className="flex items-center justify-between">
                  <span className={cn("font-bold text-xs", isLight ? "text-slate-900" : "text-slate-100")}>ACM AlgoWars Grand Prix</span>
                  <span className="text-[9px] font-black text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20 font-numeric">
                    88% Match
                  </span>
                </div>

                <div className={cn("text-[10px] font-semibold space-x-1.5 pt-0.5", isLight ? "text-slate-600" : "text-slate-400")}>
                  <span>Matches profile:</span>
                  <span className="text-emerald-500 font-bold">✓ C++</span>
                  <span className="text-emerald-500 font-bold">✓ Algorithms</span>
                </div>

                <div className="text-[10px] text-amber-500 dark:text-amber-400 font-bold pt-0.5 font-numeric">+750 XP Reward</div>
              </div>
            </div>
          </GlassCard>

        </div>

      </div>

      {/* Proof & Certificate Viewer Modal */}
      <ProofViewerModal
        achievement={selectedAchievementForProof}
        onClose={() => setSelectedAchievementForProof(null)}
      />

      {/* Social Card Exporter Modal */}
      <SocialCardExporterModal
        achievement={selectedAchievementForSocialShare}
        onClose={() => setSelectedAchievementForSocialShare(null)}
      />

      {/* 11. LIVE TOAST ANIMATIONS */}
      <LiveToastNotifier />
    </div>
  );
};
