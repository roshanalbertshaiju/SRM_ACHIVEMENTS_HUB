'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Trophy,
  Calendar,
  Zap,
  Flame,
  Star,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  Award,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { GlassCard } from '@/components/ui/GlassCard';
import { CLUBS } from '@/data/mockData';
import { Club } from '@/types';

export const ClubDashboardScreen: React.FC = () => {
  const { students, setCurrentStudentId, setActiveScreen } = useApp();
  const [selectedClub, setSelectedClub] = useState<Club>(CLUBS[0]);

  return (
    <div className="space-y-8 pb-16">
      {/* Club Selector Tabs */}
      <div className="flex items-center space-x-3 overflow-x-auto pb-2">
        {CLUBS.map((club) => {
          const isSelected = selectedClub.id === club.id;
          return (
            <button
              key={club.id}
              onClick={() => setSelectedClub(club)}
              className={`p-3.5 rounded-2xl border flex items-center space-x-3 whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 border-blue-400 text-white shadow-xl shadow-blue-900/40'
                  : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
              }`}
            >
              <img src={club.logo} alt={club.name} className="w-8 h-8 rounded-xl object-cover border border-white/20" />
              <div className="text-left">
                <h4 className="font-bold text-xs">{club.name}</h4>
                <p className="text-[10px] opacity-70">Rank #{club.campusRank} • {club.membersCount} Members</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Club Hero Card */}
      <GlassCard className="p-6 sm:p-8 space-y-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <img src={selectedClub.logo} alt={selectedClub.name} className="w-20 h-20 rounded-2xl object-cover border-2 border-white/20 shadow-2xl" />
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl sm:text-3xl font-black">{selectedClub.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold">
                  CAMPUS RANK #{selectedClub.campusRank}
                </span>
              </div>
              <p className="text-xs text-slate-300 font-medium mt-1">{selectedClub.category}</p>
              <div className="flex items-center space-x-2 text-xs text-slate-400 pt-2">
                <img src={selectedClub.leadStudentAvatar} alt={selectedClub.leadStudentName} className="w-5 h-5 rounded-full object-cover" />
                <span>Led by {selectedClub.leadStudentName} (President)</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center min-w-[110px]">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Club Total XP</span>
              <span className="text-xl font-black text-amber-400 flex items-center justify-center space-x-1">
                <Zap className="w-4 h-4 fill-amber-400" />
                <span>{selectedClub.totalXP.toLocaleString()}</span>
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center min-w-[110px]">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Active Guild</span>
              <span className="text-xl font-black text-emerald-400">{selectedClub.membersCount} Members</span>
            </div>
          </div>
        </div>

        {/* Next Flagship Event Alert */}
        <div className="p-4 rounded-2xl bg-blue-950/40 border border-blue-500/30 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-3">
            <Calendar className="w-5 h-5 text-blue-400" />
            <div>
              <span className="font-bold text-white block">Next Event: {selectedClub.nextEvent}</span>
              <span className="text-slate-400 text-[11px]">RSVP Open • Earn +500 XP per participation</span>
            </div>
          </div>
          <button className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg">
            RSVP Event
          </button>
        </div>
      </GlassCard>

      {/* Member Rankings Leaderboard */}
      <GlassCard className="p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center space-x-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-base">Club Top Contributor Leaderboard</h3>
          </div>
          <span className="text-xs text-slate-400">Based on XP earned in club events & hackathons</span>
        </div>

        <div className="space-y-2">
          {students.slice(0, 5).map((student, idx) => (
            <motion.div
              key={student.id}
              whileHover={{ scale: 1.01, x: 4 }}
              onClick={() => {
                setCurrentStudentId(student.id);
                setActiveScreen('dashboard');
              }}
              className="p-3.5 rounded-2xl border bg-black/20 dark:bg-white/5 border-white/5 hover:border-white/20 flex items-center justify-between gap-4 cursor-pointer transition-all text-xs"
            >
              <div className="flex items-center space-x-3">
                <span className="font-black text-slate-400 w-5 text-center">#{idx + 1}</span>
                <img src={student.avatar} alt={student.name} className="w-9 h-9 rounded-full object-cover" />
                <div>
                  <h4 className="font-bold text-white flex items-center space-x-1">
                    <span>{student.name}</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  </h4>
                  <p className="text-[10px] text-slate-400">{student.department}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2 font-bold text-amber-400">
                <Zap className="w-3.5 h-3.5" />
                <span>Lvl {student.level} ({student.xp.toLocaleString()} XP)</span>
              </div>
            </motion.div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};
