'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Trophy,
  ShieldCheck,
  Zap,
  Globe,
  Github,
  Linkedin,
  Twitter,
  FileText,
  Copy,
  Share2,
  Building2,
  MapPin,
  Flame,
  Award,
  Sparkles,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { GlassCard } from '@/components/ui/GlassCard';
import { BadgeCard } from '@/components/ui/BadgeCard';
import { SkillChip } from '@/components/ui/SkillChip';
import { ActivityHeatmap } from '@/components/ui/ActivityHeatmap';
import { ThemeSelector } from '@/components/ui/ThemeSelector';
import { toast } from 'sonner';

export const PublicProfileScreen: React.FC = () => {
  const { currentStudent, themeConfig, setActiveScreen } = useApp();

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://studenthub.university.edu/u/${currentStudent.username}`);
    toast.success('Public Portfolio Link Copied to Clipboard!', {
      description: `Shareable URL: studenthub.university.edu/u/${currentStudent.username}`,
    });
  };

  return (
    <div className="space-y-8 pb-20 max-w-5xl mx-auto">
      {/* Top Banner Actions */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 text-xs">
        <div className="flex items-center space-x-2 text-slate-300">
          <Globe className="w-4 h-4 text-blue-400" />
          <span>Public Shareable URL: <strong className="text-white font-mono">studenthub.university.edu/u/{currentStudent.username}</strong></span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleCopyLink}
            className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center space-x-1 transition-colors"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Copy Link</span>
          </button>
        </div>
      </div>

      {/* Main Public Hero Card */}
      <GlassCard className="p-8 relative overflow-hidden space-y-6">
        <div
          className="absolute -right-20 -top-20 w-80 h-80 rounded-full blur-3xl opacity-30 pointer-events-none"
          style={{ backgroundColor: themeConfig.accentColor }}
        />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <img
              src={currentStudent.avatar}
              alt={currentStudent.name}
              className="w-28 h-28 rounded-3xl object-cover border-4 border-white/20 shadow-2xl"
            />

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <h1 className="text-3xl font-black">{currentStudent.name}</h1>
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
              </div>
              <p className="text-sm font-semibold text-slate-300">{currentStudent.headline}</p>

              <div className="flex items-center space-x-4 text-xs text-slate-400">
                <span className="flex items-center space-x-1">
                  <Building2 className="w-3.5 h-3.5 text-blue-400" />
                  <span>{currentStudent.department}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" />
                  <span>{currentStudent.location}</span>
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center min-w-[130px]">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">CAREER REPUTATION</span>
            <span className="text-3xl font-black text-blue-400">{currentStudent.careerScore}</span>
            <span className="text-[10px] text-emerald-400 font-bold block mt-0.5">Top 0.5% Campus</span>
          </div>
        </div>

        {/* Bio & Social Links */}
        <div className="space-y-3 pt-4 border-t border-white/10">
          <p className="text-sm text-slate-300 leading-relaxed">{currentStudent.bio}</p>

          <div className="flex items-center space-x-3 pt-2">
            {currentStudent.socialLinks.github && (
              <a href={currentStudent.socialLinks.github} target="_blank" rel="noreferrer" className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300">
                <Github className="w-4 h-4" />
              </a>
            )}
            {currentStudent.socialLinks.linkedin && (
              <a href={currentStudent.socialLinks.linkedin} target="_blank" rel="noreferrer" className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-blue-400">
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            {currentStudent.socialLinks.twitter && (
              <a href={currentStudent.socialLinks.twitter} target="_blank" rel="noreferrer" className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-cyan-400">
                <Twitter className="w-4 h-4" />
              </a>
            )}
            <button
              onClick={() => setActiveScreen('resume')}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-xs flex items-center space-x-1.5"
            >
              <FileText className="w-4 h-4" />
              <span>Inspect ATS Resume</span>
            </button>
          </div>
        </div>
      </GlassCard>

      {/* Activity Heatmap */}
      <ActivityHeatmap data={currentStudent.heatmapData} streakDays={currentStudent.streakDays} />

      {/* Unlocked Badges Showcase */}
      <GlassCard className="p-6 space-y-4">
        <h3 className="font-bold text-lg flex items-center space-x-2">
          <Trophy className="w-5 h-5 text-amber-400" />
          <span>Verified Badges & Credentials</span>
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {currentStudent.badges.slice(0, 8).map((badge) => (
            <BadgeCard key={badge.id} badge={badge} />
          ))}
        </div>
      </GlassCard>

      {/* Skills Grid */}
      <GlassCard className="p-6 space-y-4">
        <h3 className="font-bold text-lg flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-purple-400" />
          <span>Technical Endorsements</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {currentStudent.skills.map((sk, idx) => (
            <SkillChip key={idx} name={sk.name} level={sk.level} endorsements={sk.endorsements} />
          ))}
        </div>
      </GlassCard>

      <ThemeSelector />
    </div>
  );
};
