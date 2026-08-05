'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  Trophy,
  Clock,
  Sparkles,
  ChevronDown,
  FileText,
  UserCheck,
  Briefcase,
  Users,
  Building2,
  Palette,
  X,
  Plus,
} from 'lucide-react';
import { useApp, ScreenType } from '@/context/AppContext';
import { cn } from '@/lib/utils';

interface SidebarProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen = false, onMobileClose }) => {
  const {
    activeScreen,
    setActiveScreen,
    setIsAddModalOpen,
    setIsSettingsOpen,
    themeConfig,
  } = useApp();

  const [expandedCategory, setExpandedCategory] = useState<string | null>('Campus Community');
  const isLight = themeConfig.isLight;

  const primaryTabs: { screen: ScreenType; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { screen: 'dashboard', label: 'Feed', icon: Home },
    { screen: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { screen: 'timeline', label: 'Timeline', icon: Clock },
    { screen: 'recruiter', label: 'Opportunities', icon: Sparkles },
  ];

  const menuGroups: {
    category: string;
    items: { screen?: ScreenType; label: string; icon: React.ComponentType<{ className?: string }>; desc: string; action?: () => void }[];
  }[] = [
    {
      category: 'Campus Community',
      items: [
        { screen: 'club', label: 'Clubs & Guilds', icon: Users, desc: 'Student chapters & rankings' },
        { screen: 'leaderboard', label: 'Campus Leaderboards', icon: Trophy, desc: 'Global & Dept rankings' },
        { screen: 'timeline', label: 'Verified Timeline', icon: Clock, desc: 'Chronological campus milestones' },
      ],
    },
    {
      category: 'Career & Talent',
      items: [
        { screen: 'resume', label: 'ATS Resume Engine', icon: FileText, desc: '94% ATS compatible resume' },
        { screen: 'public-profile', label: 'Public Portfolio', icon: UserCheck, desc: 'Shareable profile portfolio' },
        { screen: 'recruiter', label: 'Recruiter Radar', icon: Briefcase, desc: 'Talent search & dossiers' },
      ],
    },
    {
      category: 'Preferences & Admin',
      items: [
        { label: 'Settings & UI Themes', icon: Palette, desc: 'Themes & customization', action: () => setIsSettingsOpen(true) },
        { screen: 'faculty', label: 'Faculty Verification', icon: Building2, desc: 'HOD approval queue' },
      ],
    },
  ];

  const content = (
    <div className="flex flex-col h-full py-5 px-3.5 select-none">
      {/* Brand Header */}
      <div className="flex items-center justify-between px-2 pb-6 border-b border-white/[0.06]">
        <div
          onClick={() => {
            setActiveScreen('dashboard');
            if (onMobileClose) onMobileClose();
          }}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-500 p-0.5 shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full rounded-[10px] bg-[#0B1020] flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
                <line x1="12" y1="22" x2="12" y2="15.5" />
                <polyline points="22 8.5 12 15.5 2 8.5" />
                <polyline points="12 2 12 8.5" />
              </svg>
            </div>
          </div>

          <div>
            <span className={cn('font-black tracking-tight text-sm block leading-none', isLight ? 'text-slate-900' : 'text-white')}>
              Student Hub
            </span>
            <span className="text-[10px] text-blue-400 font-semibold uppercase tracking-wider">Reputation Engine</span>
          </div>
        </div>

        {onMobileClose && (
          <button onClick={onMobileClose} className="p-1 rounded-lg hover:bg-white/10 text-slate-400 md:hidden">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Main Navigation Tabs */}
      <div className="space-y-1.5 pt-5 pb-6">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 block pb-1">
          Main Views
        </span>
        {primaryTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeScreen === tab.screen;
          return (
            <button
              key={tab.screen}
              onClick={() => {
                setActiveScreen(tab.screen);
                if (onMobileClose) onMobileClose();
              }}
              className={cn(
                'w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl font-medium text-xs transition-all relative group',
                isActive
                  ? 'bg-blue-600/15 text-blue-400 font-bold border border-blue-500/30'
                  : isLight
                  ? 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  : 'text-slate-400 hover:bg-white/[0.04] hover:text-slate-200'
              )}
            >
              <Icon className={cn('w-4 h-4', isActive ? 'text-blue-400' : 'text-slate-400 group-hover:text-slate-200')} />
              <span>{tab.label}</span>
              {isActive && (
                <motion.div
                  layoutId="sidebarActiveIndicator"
                  className="absolute right-2 w-1.5 h-1.5 rounded-full bg-blue-400 shadow-sm shadow-blue-400"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Accordion Menu Groups */}
      <div className="space-y-3 flex-1 overflow-y-auto pr-1">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 block">
          Modules
        </span>

        {menuGroups.map((group) => {
          const isExpanded = expandedCategory === group.category;
          return (
            <div key={group.category} className="space-y-1">
              <button
                onClick={() => setExpandedCategory(isExpanded ? null : group.category)}
                className={cn(
                  'w-full flex items-center justify-between px-3 py-1.5 text-[11px] font-semibold rounded-lg transition-colors',
                  isLight ? 'text-slate-500 hover:text-slate-900' : 'text-slate-400 hover:text-slate-200'
                )}
              >
                <span>{group.category}</span>
                <ChevronDown className={cn('w-3 h-3 transition-transform duration-200', isExpanded && 'rotate-180')} />
              </button>

              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden space-y-0.5 pl-2"
                  >
                    {group.items.map((item, itemIdx) => {
                      const Icon = item.icon;
                      const isSelected = item.screen && activeScreen === item.screen;
                      return (
                        <button
                          key={itemIdx}
                          onClick={() => {
                            if (item.action) item.action();
                            else if (item.screen) setActiveScreen(item.screen);
                            if (onMobileClose) onMobileClose();
                          }}
                          className={cn(
                            'w-full text-left flex items-center space-x-2.5 px-2.5 py-2 rounded-xl text-xs transition-colors',
                            isSelected
                              ? 'bg-blue-500/10 text-blue-400 font-bold'
                              : isLight
                              ? 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                              : 'text-slate-400 hover:bg-white/[0.03] hover:text-slate-200'
                          )}
                        >
                          <Icon className="w-3.5 h-3.5 flex-shrink-0 text-slate-400" />
                          <span className="truncate">{item.label}</span>
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Quick Action Footer */}
      <div className="pt-4 border-t border-white/[0.06] mt-auto">
        <button
          onClick={() => {
            setIsAddModalOpen(true);
            if (onMobileClose) onMobileClose();
          }}
          className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold flex items-center justify-center space-x-2 shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02]"
        >
          <Plus className="w-4 h-4" />
          <span>Share Achievement</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Fixed Left) */}
      <aside
        className={cn(
          'hidden md:block w-64 flex-shrink-0 h-screen sticky top-0 border-r z-40 transition-colors duration-300',
          isLight
            ? 'bg-white/90 border-slate-200/80 text-slate-900 backdrop-blur-2xl'
            : 'bg-[#0B1020]/95 border-white/[0.08] text-slate-100 backdrop-blur-2xl'
        )}
      >
        {content}
      </aside>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onMobileClose}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className={cn(
                'fixed top-0 left-0 bottom-0 w-72 z-50 md:hidden shadow-2xl border-r',
                isLight ? 'bg-white text-slate-900 border-slate-200' : 'bg-[#0B1020] text-slate-100 border-white/10'
              )}
            >
              {content}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
