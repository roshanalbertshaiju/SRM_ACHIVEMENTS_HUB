'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase,
  Search,
  Filter,
  ShieldCheck,
  Zap,
  Building2,
  CheckCircle2,
  ExternalLink,
  X,
  FileText,
  Bookmark,
  Award,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { GlassCard } from '@/components/ui/GlassCard';
import { CandidateDrawer } from '@/components/ui/CandidateDrawer';
import { Student } from '@/types';
import { RECRUITERS } from '@/data/mockData';
import { cn } from '@/lib/utils';

export const RecruiterPortalScreen: React.FC = () => {
  const { students, setSelectedCandidateForDrawer, selectedCandidateForDrawer, themeConfig } = useApp();
  const [activeRecruiter] = useState(RECRUITERS[0]);
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [minScore, setMinScore] = useState<number>(750);
  const [skillFilter, setSkillFilter] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [savedIds, setSavedIds] = useState<string[]>(activeRecruiter.savedCandidateIds);
  const isLight = themeConfig.isLight;

  const toggleSaveCandidate = (id: string) => {
    if (savedIds.includes(id)) {
      setSavedIds(savedIds.filter((item) => item !== id));
    } else {
      setSavedIds([...savedIds, id]);
    }
  };

  const filteredCandidates = students.filter((s) => {
    const matchesDept = selectedDept === 'All' || s.department.includes(selectedDept);
    const matchesScore = s.careerScore >= minScore;
    const matchesSkill =
      !skillFilter || s.skills.some((sk) => sk.name.toLowerCase().includes(skillFilter.toLowerCase()));
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.headline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesScore && matchesSkill && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-16">
      {/* Recruiter Header */}
      <div className={cn(
        "p-6 rounded-3xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm backdrop-blur-md",
        themeConfig.cardBgClass,
        themeConfig.cardBorderClass
      )}>
        <div className="flex items-center space-x-4">
          <img src={activeRecruiter.logo} alt={activeRecruiter.company} className="w-14 h-14 rounded-2xl object-cover border border-slate-300 dark:border-slate-700 shadow-sm" />
          <div>
            <div className="flex items-center space-x-2">
              <h1 className={cn("text-2xl font-black", isLight ? "text-slate-900" : "text-slate-100")}>
                {activeRecruiter.company} Talent Radar
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-500 dark:text-amber-400 border border-amber-500/20 text-xs font-bold">
                ENTERPRISE
              </span>
            </div>
            <p className={cn("text-xs mt-0.5 font-medium", isLight ? "text-slate-600" : "text-slate-400")}>
              Logged in as {activeRecruiter.name} ({activeRecruiter.role}) • {savedIds.length} Saved Candidates
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="text-right">
            <span className={cn("text-xs block font-bold uppercase tracking-wider", isLight ? "text-slate-500" : "text-slate-400")}>Verified Talent Pool</span>
            <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">{filteredCandidates.length} Matching Students</span>
          </div>
        </div>
      </div>

      {/* Advanced Filter Panel */}
      <div className={cn(
        "p-6 rounded-3xl border space-y-4 shadow-sm backdrop-blur-md",
        themeConfig.cardBgClass,
        themeConfig.cardBorderClass
      )}>
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider">
          <span className={cn("flex items-center space-x-2", isLight ? "text-slate-800" : "text-slate-200")}>
            <Filter className="w-4 h-4 text-amber-500" />
            <span>Advanced Filters</span>
          </span>
          <button
            onClick={() => {
              setSelectedDept('All');
              setMinScore(700);
              setSkillFilter('');
              setSearchQuery('');
            }}
            className="text-amber-500 hover:underline font-bold"
          >
            Reset Filters
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-1">
            <label className={cn("text-xs font-semibold", isLight ? "text-slate-700" : "text-slate-300")}>Department</label>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className={cn(
                "w-full p-2.5 rounded-xl border text-xs focus:outline-none focus:border-amber-500 font-medium",
                isLight ? "bg-slate-100 border-slate-300 text-slate-900" : "bg-slate-900 border-slate-700 text-slate-100"
              )}
            >
              <option value="All">All Departments</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Data Science">Data Science & AI</option>
              <option value="Electronics">Electronics & Comm</option>
              <option value="Information Tech">Information Tech</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className={cn("text-xs font-semibold", isLight ? "text-slate-700" : "text-slate-300")}>Min Career Score ({minScore})</label>
            <input
              type="range"
              min={700}
              max={950}
              step={10}
              value={minScore}
              onChange={(e) => setMinScore(Number(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-amber-500 bg-slate-300 dark:bg-slate-700"
            />
          </div>

          <div className="space-y-1">
            <label className={cn("text-xs font-semibold", isLight ? "text-slate-700" : "text-slate-300")}>Filter by Skill</label>
            <input
              type="text"
              placeholder="e.g. PyTorch, Rust, React..."
              value={skillFilter}
              onChange={(e) => setSkillFilter(e.target.value)}
              className={cn(
                "w-full p-2.5 rounded-xl border text-xs focus:outline-none focus:border-amber-500 font-medium",
                isLight ? "bg-slate-100 border-slate-300 text-slate-900 placeholder-slate-500" : "bg-slate-900 border-slate-700 text-slate-100 placeholder-slate-400"
              )}
            />
          </div>

          <div className="space-y-1">
            <label className={cn("text-xs font-semibold", isLight ? "text-slate-700" : "text-slate-300")}>Search Candidate</label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Name or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={cn(
                  "w-full pl-9 pr-3 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-amber-500 font-medium",
                  isLight ? "bg-slate-100 border-slate-300 text-slate-900 placeholder-slate-500" : "bg-slate-900 border-slate-700 text-slate-100 placeholder-slate-400"
                )}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Candidate Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCandidates.map((candidate) => {
          const isSaved = savedIds.includes(candidate.id);

          return (
            <GlassCard
              key={candidate.id}
              className="p-6 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <img src={candidate.avatar} alt={candidate.name} className="w-14 h-14 rounded-2xl object-cover border border-slate-300 dark:border-slate-700" />
                    <div>
                      <h3 className={cn("font-bold text-base flex items-center space-x-1.5", isLight ? "text-slate-900" : "text-slate-100")}>
                        <span>{candidate.name}</span>
                        <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      </h3>
                      <p className={cn("text-xs font-medium", isLight ? "text-slate-600" : "text-slate-400")}>{candidate.department}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleSaveCandidate(candidate.id)}
                    className={cn(
                      "p-2 rounded-xl border transition-colors tactile-btn",
                      isSaved
                        ? "bg-amber-500/20 text-amber-500 border-amber-500/40"
                        : isLight
                        ? "bg-slate-100 text-slate-600 border-slate-300 hover:bg-slate-200"
                        : "bg-slate-900 text-slate-400 border-slate-700 hover:bg-slate-800"
                    )}
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>

                <p className={cn("text-xs line-clamp-2", isLight ? "text-slate-700" : "text-slate-300")}>{candidate.headline}</p>

                {/* Score & Tier Badge */}
                <div className={cn(
                  "p-3 rounded-xl border flex items-center justify-between text-xs",
                  isLight ? "bg-slate-100 border-slate-200" : "bg-slate-900 border-slate-800"
                )}>
                  <div>
                    <span className={cn("text-[10px] font-bold uppercase block", isLight ? "text-slate-500" : "text-slate-400")}>Career Reputation Score</span>
                    <span className="text-lg font-black text-amber-500 dark:text-amber-400 font-numeric">{candidate.careerScore} pts</span>
                  </div>
                  <div className="text-right">
                    <span className={cn("text-[10px] font-bold uppercase block", isLight ? "text-slate-500" : "text-slate-400")}>Campus Rank</span>
                    <span className="text-sm font-black text-amber-500 dark:text-amber-400">#{candidate.ranks.campus}</span>
                  </div>
                </div>

                {/* Top Skills Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {candidate.skills.slice(0, 3).map((sk, idx) => (
                    <span key={idx} className={cn(
                      "px-2 py-1 rounded-md text-[11px] font-medium border",
                      isLight ? "bg-slate-100 text-slate-800 border-slate-200" : "bg-slate-800 text-slate-300 border-slate-700"
                    )}>
                      {sk.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className={cn("pt-4 border-t", isLight ? "border-slate-200" : "border-slate-800")}>
                <button
                  onClick={() => setSelectedCandidateForDrawer(candidate)}
                  className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors tactile-btn shadow-sm"
                >
                  <span>Inspect Candidate Dossier</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* Candidate Dossier Drawer */}
      <AnimatePresence>
        {selectedCandidateForDrawer && (
          <CandidateDrawer
            student={selectedCandidateForDrawer}
            onClose={() => setSelectedCandidateForDrawer(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
