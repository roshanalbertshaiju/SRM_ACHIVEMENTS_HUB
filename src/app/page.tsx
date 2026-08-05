'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MessageSquare, Bot } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Navbar } from '@/components/navigation/Navbar';
import { LandingScreen } from '@/components/screens/LandingScreen';
import { StudentDashboardScreen } from '@/components/screens/StudentDashboardScreen';
import { LeaderboardScreen } from '@/components/screens/LeaderboardScreen';
import { TimelineScreen } from '@/components/screens/TimelineScreen';
import { RecruiterPortalScreen } from '@/components/screens/RecruiterPortalScreen';
import { ResumeGeneratorScreen } from '@/components/screens/ResumeGeneratorScreen';
import { FacultyDashboardScreen } from '@/components/screens/FacultyDashboardScreen';
import { ClubDashboardScreen } from '@/components/screens/ClubDashboardScreen';
import { PublicProfileScreen } from '@/components/screens/PublicProfileScreen';
import { AddAchievementModal } from '@/components/ui/AddAchievementModal';
import { SettingsModal } from '@/components/ui/SettingsModal';
import { AICareerCoachModal } from '@/components/ui/AICareerCoachModal';
import { THEMES } from '@/styles/themes';
import { cn } from '@/lib/utils';

export default function Home() {
  const { activeScreen, activeTheme, isCoachOpen, setIsCoachOpen } = useApp();
  const themeConfig = THEMES[activeTheme] || THEMES['dark'];
  const isLight = themeConfig.isLight;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${themeConfig.bgClass}`}>
      {/* Sleek Edge-to-Edge Top Navigation Bar */}
      <Navbar />

      {/* Main Content Workspace with Framer Motion Screen Transitions */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-24 lg:pb-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeScreen}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {activeScreen === 'landing' && <LandingScreen />}
            {activeScreen === 'dashboard' && <StudentDashboardScreen />}
            {activeScreen === 'leaderboard' && <LeaderboardScreen />}
            {activeScreen === 'timeline' && <TimelineScreen />}
            {activeScreen === 'recruiter' && <RecruiterPortalScreen />}
            {activeScreen === 'resume' && <ResumeGeneratorScreen />}
            {activeScreen === 'faculty' && <FacultyDashboardScreen />}
            {activeScreen === 'club' && <ClubDashboardScreen />}
            {activeScreen === 'public-profile' && <PublicProfileScreen />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating Bottom-Right AI Career Advisor Action Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsCoachOpen(true)}
        className={cn(
          "fixed bottom-20 lg:bottom-6 right-36 z-40 px-4 py-2.5 rounded-full border text-xs font-bold shadow-lg flex items-center space-x-2 transition-all tactile-btn",
          isLight
            ? "bg-white border-slate-300 text-slate-900 shadow-slate-200 hover:bg-slate-100"
            : "bg-slate-800/90 border-slate-700 text-slate-100 shadow-black/40 backdrop-blur-md hover:bg-slate-800"
        )}
        title="AI Career Advisor"
      >
        <Bot className="w-4 h-4 text-amber-500" />
        <span className="hidden sm:inline">AI Career Advisor</span>
      </motion.button>

      {/* Modals */}
      <AddAchievementModal />
      <SettingsModal />
      <AICareerCoachModal isOpen={isCoachOpen} onClose={() => setIsCoachOpen(false)} />
    </div>
  );
}
