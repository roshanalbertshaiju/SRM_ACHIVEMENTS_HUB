'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, Mail, Globe, Github, Linkedin, Award, Trophy, BookOpen, Star, FileText, CheckCircle2, ChevronRight } from 'lucide-react';
import { Student } from '@/types';
import { useApp } from '@/context/AppContext';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface CandidateDrawerProps {
  student: Student | null;
  onClose: () => void;
}

export const CandidateDrawer: React.FC<CandidateDrawerProps> = ({ student, onClose }) => {
  const { setCurrentStudentId, setActiveScreen, themeConfig } = useApp();
  const isLight = themeConfig.isLight;

  if (!student) return null;

  const handleContactStudent = () => {
    toast.success('Interview Request Sent!', {
      description: `Formal invitation sent to ${student.name} (${student.email}).`,
    });
  };

  const handleInspectFullPortfolio = () => {
    setCurrentStudentId(student.id);
    setActiveScreen('public-profile');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className={cn(
          "absolute right-0 top-0 bottom-0 w-full max-w-xl border-l shadow-2xl p-6 sm:p-8 overflow-y-auto space-y-6",
          themeConfig.bgClass,
          themeConfig.cardBorderClass
        )}
      >
        {/* Header */}
        <div className={cn("flex items-center justify-between border-b pb-4", isLight ? "border-slate-200" : "border-slate-800")}>
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            <h3 className={cn("font-extrabold text-base", isLight ? "text-slate-900" : "text-slate-100")}>Verified Candidate Dossier</h3>
          </div>
          <button
            onClick={onClose}
            className={cn("p-2 rounded-xl transition-colors", isLight ? "bg-slate-100 hover:bg-slate-200 text-slate-700" : "bg-slate-800 hover:bg-slate-700 text-slate-300")}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Candidate Profile Summary Header */}
        <div className={cn("p-5 rounded-2xl border space-y-4 shadow-sm", themeConfig.cardBgClass, themeConfig.cardBorderClass)}>
          <div className="flex items-center space-x-4">
            <img src={student.avatar} alt={student.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-500/40 shadow-sm" />
            <div className="space-y-1 flex-1 min-w-0">
              <h2 className={cn("text-xl font-black truncate", isLight ? "text-slate-900" : "text-slate-100")}>{student.name}</h2>
              <p className="text-xs font-bold text-amber-500 dark:text-amber-400 truncate">{student.headline}</p>
              <p className={cn("text-xs font-medium", isLight ? "text-slate-600" : "text-slate-400")}>{student.department} ({student.year})</p>
            </div>
          </div>

          <div className={cn("grid grid-cols-3 gap-2 pt-2 border-t text-center text-xs", isLight ? "border-slate-200" : "border-slate-800")}>
            <div className={cn("p-2 rounded-xl border", isLight ? "bg-slate-50 border-slate-200" : "bg-slate-800/40 border-slate-700/60")}>
              <span className="text-lg font-black text-amber-500 dark:text-amber-400 font-numeric block">{student.careerScore}</span>
              <span className={cn("text-[10px] font-bold uppercase", isLight ? "text-slate-500" : "text-slate-400")}>Reputation</span>
            </div>
            <div className={cn("p-2 rounded-xl border", isLight ? "bg-slate-50 border-slate-200" : "bg-slate-800/40 border-slate-700/60")}>
              <span className="text-lg font-black text-amber-500 dark:text-amber-400 block font-numeric">Lvl {student.level}</span>
              <span className={cn("text-[10px] font-bold uppercase", isLight ? "text-slate-500" : "text-slate-400")}>{student.xp} XP</span>
            </div>
            <div className={cn("p-2 rounded-xl border", isLight ? "bg-slate-50 border-slate-200" : "bg-slate-800/40 border-slate-700/60")}>
              <span className="text-lg font-black text-emerald-500 dark:text-emerald-400 block font-numeric">{student.achievements.length}</span>
              <span className={cn("text-[10px] font-bold uppercase", isLight ? "text-slate-500" : "text-slate-400")}>Verified Wins</span>
            </div>
          </div>
        </div>

        {/* Bio & Links */}
        <div className="space-y-2 text-xs">
          <span className={cn("text-[10px] font-bold uppercase tracking-wider block", isLight ? "text-slate-600" : "text-slate-400")}>Candidate Biography</span>
          <p className={cn("leading-relaxed p-4 rounded-2xl border font-medium", isLight ? "bg-slate-50 border-slate-200 text-slate-800" : "bg-slate-800/40 border-slate-700/60 text-slate-300")}>{student.bio}</p>
        </div>

        {/* Technical Skills Competency */}
        <div className="space-y-2 text-xs">
          <span className={cn("text-[10px] font-bold uppercase tracking-wider block", isLight ? "text-slate-600" : "text-slate-400")}>Skill Endorsements</span>
          <div className="flex flex-wrap gap-2">
            {student.skills.map((sk, idx) => (
              <span key={idx} className="px-3 py-1.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold border border-amber-500/20">
                {sk.name} ({sk.endorsements} Endorsements)
              </span>
            ))}
          </div>
        </div>

        {/* Verified Achievements Stream */}
        <div className="space-y-3 text-xs pt-2">
          <span className={cn("text-[10px] font-bold uppercase tracking-wider block", isLight ? "text-slate-600" : "text-slate-400")}>Proof-Backed Milestone History</span>
          {student.achievements.map((ach) => (
            <div key={ach.id} className={cn("p-4 rounded-2xl border space-y-1.5", themeConfig.cardBgClass, themeConfig.cardBorderClass)}>
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{ach.title}</span>
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 dark:text-amber-400 border border-amber-500/20 font-numeric">
                  +{ach.pointsEarned} XP
                </span>
              </div>
              <p className={cn("text-[11px]", isLight ? "text-slate-600" : "text-slate-400")}>{ach.description}</p>
              <div className="text-[10px] text-emerald-500 font-semibold pt-1">
                Verified by {ach.verifiedBy} ({ach.date})
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="pt-4 border-t space-y-3">
          <button
            onClick={handleContactStudent}
            className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center space-x-2 transition-colors tactile-btn shadow-sm"
          >
            <Mail className="w-4 h-4" />
            <span>Send Interview Invitation ({student.email})</span>
          </button>
          
          <button
            onClick={handleInspectFullPortfolio}
            className={cn("w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors border tactile-btn", isLight ? "bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300" : "bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700")}
          >
            <span>View Full Interactive Portfolio</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
