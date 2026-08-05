'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Trophy,
  Crown,
  Search,
  Zap,
  Flame,
  TrendingUp,
  ShieldCheck,
  Building2,
  ChevronRight,
  Sparkles,
  Download,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { GlassCard } from '@/components/ui/GlassCard';
import { CandidateDrawer } from '@/components/ui/CandidateDrawer';
import { DepartmentBattleCard } from '@/components/ui/DepartmentBattleCard';
import { Student } from '@/types';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export const LeaderboardScreen: React.FC = () => {
  const { students, setCurrentStudentId, setActiveScreen, selectedCandidateForDrawer, setSelectedCandidateForDrawer, themeConfig } = useApp();
  const isLight = themeConfig.isLight;
  const [activeTab, setActiveTab] = useState<'students' | 'battle'>('students');
  const [filterDept, setFilterDept] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Sort students by Career Score descending
  const sortedStudents = [...students].sort((a, b) => b.careerScore - a.careerScore);

  const filteredStudents = sortedStudents.filter((s) => {
    const matchesDept = filterDept === 'All' || s.department.includes(filterDept);
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.headline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  const exportLeaderboardCSV = () => {
    const headers = ['Rank', 'Name', 'Department', 'Year', 'Career Score', 'XP', 'Level', 'Verified Achievements'];
    const rows = filteredStudents.map((s, idx) => [
      idx + 1,
      `"${s.name}"`,
      `"${s.department}"`,
      `"${s.year}"`,
      s.careerScore,
      s.xp,
      s.level,
      s.achievements.length,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `SRM_Campus_Leaderboard_${filterDept.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success('Leaderboard Exported to CSV!', {
      description: `Downloaded ${filteredStudents.length} student rankings for HOD reporting.`,
    });
  };

  const top1 = filteredStudents[0];
  const top2 = filteredStudents[1];
  const top3 = filteredStudents[2];
  const remaining = filteredStudents.slice(3);

  const DEPT_BATTLE_STATS = [
    { code: 'CSE', name: 'Computer Science & Eng.', xp: 21420, rank: 1, lead: '+440 XP Lead', mvp: 'Roshan Albert', papers: 14, hackathons: 8 },
    { code: 'AIML', name: 'AI & Machine Learning', xp: 20980, rank: 2, lead: 'Rival #1', mvp: 'Sophia Chen', papers: 12, hackathons: 6 },
    { code: 'ECE', name: 'Electronics & Comm.', xp: 18730, rank: 3, lead: 'Rival #2', mvp: 'Aarav Sharma', papers: 9, hackathons: 5 },
    { code: 'IT', name: 'Information Tech.', xp: 16400, rank: 4, lead: 'Rival #3', mvp: 'Elena Rostova', papers: 7, hackathons: 4 },
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Trophy className="w-7 h-7 text-amber-500" />
            <h1 className={cn("text-3xl font-black tracking-tight", isLight ? "text-slate-900" : "text-slate-100")}>Campus Reputation Leaderboards</h1>
          </div>
          <p className={cn("text-sm mt-1", isLight ? "text-slate-600" : "text-slate-400")}>
            Real-time rankings based on verified achievements, research publications & peer citations.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={exportLeaderboardCSV}
            className={cn("px-4 py-2 rounded-xl font-bold text-xs flex items-center space-x-2 border transition-all tactile-btn", isLight ? "bg-white border-slate-300 text-slate-800 hover:bg-slate-100" : "bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700")}
          >
            <Download className="w-4 h-4 text-amber-500" />
            <span>Export CSV</span>
          </button>
          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 dark:text-amber-400 text-xs font-bold">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>Updated Live • July 2026</span>
          </div>
        </div>
      </div>

      {/* Main View Mode Tabs (Student Leaderboards vs Department Battle Arena) */}
      <div className={cn("p-1.5 rounded-2xl border flex items-center space-x-2 max-w-md shadow-sm", themeConfig.cardBgClass, themeConfig.cardBorderClass)}>
        <button
          onClick={() => setActiveTab('students')}
          className={cn(
            "flex-1 py-2.5 rounded-xl text-xs font-extrabold flex items-center justify-center space-x-2 transition-all tactile-btn",
            activeTab === 'students'
              ? "bg-amber-500 text-slate-950 shadow-sm"
              : isLight ? "text-slate-600 hover:text-slate-900 hover:bg-slate-100" : "text-slate-400 hover:text-white hover:bg-white/5"
          )}
        >
          <Trophy className="w-4 h-4" />
          <span>Student Leaderboard</span>
        </button>

        <button
          onClick={() => setActiveTab('battle')}
          className={cn(
            "flex-1 py-2.5 rounded-xl text-xs font-extrabold flex items-center justify-center space-x-2 transition-all tactile-btn relative",
            activeTab === 'battle'
              ? "bg-amber-500 text-slate-950 shadow-sm"
              : isLight ? "text-slate-600 hover:text-slate-900 hover:bg-slate-100" : "text-slate-400 hover:text-white hover:bg-white/5"
          )}
        >
          <Zap className="w-4 h-4 text-amber-500 dark:text-amber-400" />
          <span>Department Battle</span>
          <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase bg-amber-500/20 text-amber-600 dark:text-amber-300">Live</span>
        </button>
      </div>

      {/* TAB CONTENT 1: DEPARTMENT BATTLE ARENA */}
      {activeTab === 'battle' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Main Rivalry Banner */}
          <GlassCard className="p-6 sm:p-8 space-y-6 border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b pb-6 border-amber-500/20">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <Crown className="w-6 h-6 text-amber-500" />
                  <h2 className={cn("text-2xl font-black tracking-tight", isLight ? "text-slate-900" : "text-slate-100")}>Department Rivalry Arena</h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-500 dark:text-amber-400 text-xs font-bold border border-amber-500/30">Season 3</span>
                </div>
                <p className={cn("text-xs font-medium", isLight ? "text-slate-600" : "text-slate-400")}>
                  Inter-department competition. Verified XP earned by any student lifts their department's campus standing.
                </p>
              </div>

              <div className={cn("p-4 rounded-2xl border text-center font-numeric shadow-sm", isLight ? "bg-amber-50 border-amber-200" : "bg-amber-500/10 border-amber-500/30")}>
                <span className="text-2xl font-black text-amber-500 dark:text-amber-400 block">+440 XP</span>
                <span className="text-[10px] font-bold uppercase text-amber-600 dark:text-amber-300">CSE Department Lead</span>
              </div>
            </div>

            {/* Department Battle Live Chart Component */}
            <DepartmentBattleCard />
          </GlassCard>

          {/* Department Standings Breakdown Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DEPT_BATTLE_STATS.map((dept) => (
              <GlassCard key={dept.code} className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center font-black text-lg text-amber-500 font-numeric">
                      #{dept.rank}
                    </div>
                    <div>
                      <h3 className={cn("font-bold text-base", isLight ? "text-slate-900" : "text-slate-100")}>{dept.code} ({dept.name})</h3>
                      <p className="text-xs text-amber-500 font-semibold">{dept.lead}</p>
                    </div>
                  </div>

                  <span className="text-xl font-black text-amber-500 dark:text-amber-400 font-numeric">{dept.xp.toLocaleString()} XP</span>
                </div>

                <div className={cn("grid grid-cols-3 gap-2 pt-3 border-t text-center text-xs", isLight ? "border-slate-200" : "border-slate-800")}>
                  <div className={cn("p-2 rounded-xl border", isLight ? "bg-slate-50 border-slate-200" : "bg-slate-800/40 border-slate-700/60")}>
                    <span className={cn("text-xs font-bold block truncate", isLight ? "text-slate-900" : "text-slate-100")}>{dept.mvp}</span>
                    <span className={cn("text-[10px] uppercase font-bold", isLight ? "text-slate-500" : "text-slate-400")}>Top Contributor</span>
                  </div>
                  <div className={cn("p-2 rounded-xl border", isLight ? "bg-slate-50 border-slate-200" : "bg-slate-800/40 border-slate-700/60")}>
                    <span className="text-xs font-bold text-emerald-500 block font-numeric">{dept.papers} DOIs</span>
                    <span className={cn("text-[10px] uppercase font-bold", isLight ? "text-slate-500" : "text-slate-400")}>IEEE Papers</span>
                  </div>
                  <div className={cn("p-2 rounded-xl border", isLight ? "bg-slate-50 border-slate-200" : "bg-slate-800/40 border-slate-700/60")}>
                    <span className="text-xs font-bold text-amber-500 block font-numeric">{dept.hackathons} Wins</span>
                    <span className={cn("text-[10px] uppercase font-bold", isLight ? "text-slate-500" : "text-slate-400")}>Hackathons</span>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT 2: STUDENT INDIVIDUAL LEADERBOARD */}
      {activeTab === 'students' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Filter Tabs & Search Bar */}
          <div className={cn("flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl border shadow-sm", themeConfig.cardBgClass, themeConfig.cardBorderClass)}>
            <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
              {['All', 'Computer Science', 'Data Science', 'Electronics', 'Information Tech', 'Mechanical'].map((dept) => (
                <button
                  key={dept}
                  onClick={() => setFilterDept(dept)}
                  className={cn(
                    "px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all tactile-btn",
                    filterDept === dept
                      ? "bg-amber-500 text-slate-950 shadow-sm"
                      : isLight ? "bg-slate-100 text-slate-700 hover:bg-slate-200" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  )}
                >
                  {dept}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search candidate..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={cn(
                  "w-full pl-9 pr-4 py-2 rounded-xl border text-xs focus:outline-none focus:border-amber-500 font-medium",
                  isLight ? "bg-slate-100 border-slate-300 text-slate-900 placeholder-slate-500" : "bg-slate-800 border-slate-700 text-slate-100 placeholder-slate-400"
                )}
              />
            </div>
          </div>

          {/* TOP 3 PODIUM */}
          {filteredStudents.length >= 3 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end pt-8">
              {/* 2ND PLACE (SILVER) */}
              {top2 && (
                <GlassCard className="p-6 text-center space-y-4 border-slate-300 dark:border-slate-700 relative order-2 md:order-1 shadow-xl">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-[11px] font-black border border-slate-400 dark:border-slate-600 shadow-md">
                    2ND PLACE 🥈
                  </div>
                  <img src={top2.avatar} alt={top2.name} className="w-20 h-20 rounded-2xl object-cover mx-auto border-2 border-slate-400 shadow-lg mt-2" />
                  <div>
                    <h3 className={cn("font-bold text-base", isLight ? "text-slate-900" : "text-slate-100")}>{top2.name}</h3>
                    <p className={cn("text-xs font-medium", isLight ? "text-slate-600" : "text-slate-400")}>{top2.department}</p>
                  </div>
                  <div className={cn("p-3 rounded-2xl border space-y-0.5", isLight ? "bg-slate-50 border-slate-200" : "bg-slate-800/40 border-slate-700")}>
                    <span className={cn("text-2xl font-black font-numeric", isLight ? "text-slate-900" : "text-slate-100")}>{top2.careerScore}</span>
                    <span className={cn("text-[10px] block font-bold uppercase tracking-wider", isLight ? "text-slate-500" : "text-slate-400")}>Career XP Score</span>
                  </div>
                  <button
                    onClick={() => {
                      setCurrentStudentId(top2.id);
                      setActiveScreen('dashboard');
                    }}
                    className={cn("w-full py-2.5 rounded-xl text-xs font-bold transition-colors border tactile-btn", isLight ? "bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300" : "bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700")}
                  >
                    Inspect Profile
                  </button>
                </GlassCard>
              )}

              {/* 1ST PLACE (GOLD CHAMPION) */}
              {top1 && (
                <GlassCard className="p-8 text-center space-y-4 border-amber-500/60 shadow-2xl shadow-amber-500/10 relative order-1 md:order-2 md:-translate-y-4">
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-amber-500 text-slate-950 text-xs font-black shadow-xl flex items-center space-x-1.5 border border-amber-400">
                    <Crown className="w-4 h-4" />
                    <span>CAMPUS CHAMPION 🥇</span>
                  </div>
                  <img src={top1.avatar} alt={top1.name} className="w-24 h-24 rounded-2xl object-cover mx-auto border-4 border-amber-500 shadow-amber-500/20 shadow-2xl mt-2" />
                  <div>
                    <h3 className={cn("font-black text-xl tracking-tight", isLight ? "text-slate-900" : "text-slate-100")}>{top1.name}</h3>
                    <p className="text-xs text-amber-500 dark:text-amber-400 font-semibold">{top1.headline}</p>
                  </div>
                  <div className={cn("p-4 rounded-2xl border space-y-0.5", isLight ? "bg-amber-50 border-amber-200" : "bg-amber-500/10 border-amber-500/30")}>
                    <span className="text-3xl font-black text-amber-500 dark:text-amber-400 font-numeric">{top1.careerScore}</span>
                    <span className={cn("text-[10px] block font-bold uppercase tracking-wider", isLight ? "text-amber-700" : "text-amber-300")}>Total Reputation Points</span>
                  </div>
                  <button
                    onClick={() => {
                      setCurrentStudentId(top1.id);
                      setActiveScreen('dashboard');
                    }}
                    className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black shadow-lg transition-all tactile-btn"
                  >
                    View Champion Portfolio
                  </button>
                </GlassCard>
              )}

              {/* 3RD PLACE (BRONZE) */}
              {top3 && (
                <GlassCard className="p-6 text-center space-y-4 border-amber-700/40 relative order-3 shadow-xl">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-amber-950 text-amber-400 text-[11px] font-black border border-amber-800/60 shadow-md">
                    3RD PLACE 🥉
                  </div>
                  <img src={top3.avatar} alt={top3.name} className="w-20 h-20 rounded-2xl object-cover mx-auto border-2 border-amber-600 shadow-lg mt-2" />
                  <div>
                    <h3 className={cn("font-bold text-base", isLight ? "text-slate-900" : "text-slate-100")}>{top3.name}</h3>
                    <p className={cn("text-xs font-medium", isLight ? "text-slate-600" : "text-slate-400")}>{top3.department}</p>
                  </div>
                  <div className={cn("p-3 rounded-2xl border space-y-0.5", isLight ? "bg-slate-50 border-slate-200" : "bg-slate-800/40 border-slate-700")}>
                    <span className="text-2xl font-black text-amber-500 font-numeric">{top3.careerScore}</span>
                    <span className={cn("text-[10px] block font-bold uppercase tracking-wider", isLight ? "text-slate-500" : "text-slate-400")}>Career XP Score</span>
                  </div>
                  <button
                    onClick={() => {
                      setCurrentStudentId(top3.id);
                      setActiveScreen('dashboard');
                    }}
                    className={cn("w-full py-2.5 rounded-xl text-xs font-bold transition-colors border tactile-btn", isLight ? "bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300" : "bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700")}
                  >
                    Inspect Profile
                  </button>
                </GlassCard>
              )}
            </div>
          )}

          {/* RANKS 4 TO 20 LIST TABLE */}
          <GlassCard className="p-6 space-y-4">
            <div className={cn("flex items-center justify-between border-b pb-4 text-xs font-bold uppercase tracking-wider", isLight ? "border-slate-200 text-slate-500" : "border-slate-800 text-slate-400")}>
              <span>Rank & Candidate</span>
              <span className="hidden md:inline">Department</span>
              <span>Level & XP</span>
              <span>Career Score</span>
            </div>

            <div className="space-y-2">
              {remaining.map((s, index) => {
                const rankNum = index + 4;
                return (
                  <motion.div
                    key={s.id}
                    whileHover={{ scale: 1.01, x: 4 }}
                    onClick={() => setSelectedCandidateForDrawer(s)}
                    className={cn(
                      "p-3.5 rounded-2xl border flex items-center justify-between gap-4 cursor-pointer transition-all tactile-btn",
                      isLight
                        ? "bg-slate-50 border-slate-200 hover:border-amber-500/40 hover:bg-slate-100"
                        : "bg-slate-800/40 border-slate-800 hover:border-amber-500/40"
                    )}
                  >
                    <div className="flex items-center space-x-3 min-w-[200px]">
                      <span className={cn("font-black text-sm w-6 text-center font-numeric", isLight ? "text-slate-500" : "text-slate-400")}>#{rankNum}</span>
                      <img src={s.avatar} alt={s.name} className="w-10 h-10 rounded-xl object-cover border border-amber-500/20" />
                      <div>
                        <h4 className={cn("font-bold text-sm flex items-center space-x-1.5", isLight ? "text-slate-900" : "text-slate-100")}>
                          <span>{s.name}</span>
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                        </h4>
                        <p className={cn("text-[11px] line-clamp-1", isLight ? "text-slate-500" : "text-slate-400")}>{s.headline}</p>
                      </div>
                    </div>

                    <div className={cn("hidden md:block text-xs font-medium", isLight ? "text-slate-700" : "text-slate-300")}>
                      {s.department}
                    </div>

                    <div className="flex items-center space-x-2 text-xs font-bold text-amber-500 dark:text-amber-400">
                      <Zap className="w-3.5 h-3.5" />
                      <span className="font-numeric">Lvl {s.level}</span>
                    </div>

                    <div className="text-right">
                      <span className="text-base font-black text-amber-500 dark:text-amber-400 block font-numeric">{s.careerScore}</span>
                      <span className="text-[10px] text-emerald-500 font-bold flex items-center justify-end space-x-0.5">
                        <TrendingUp className="w-3 h-3" />
                        <span>Top Tier</span>
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </GlassCard>
        </div>
      )}

      {/* Candidate Drawer Modal */}
      <CandidateDrawer
        student={selectedCandidateForDrawer}
        onClose={() => setSelectedCandidateForDrawer(null)}
      />
    </div>
  );
};
