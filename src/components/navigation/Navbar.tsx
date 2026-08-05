'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  Trophy,
  Clock,
  Sparkles,
  Search,
  Bell,
  Plus,
  ChevronDown,
  FileText,
  UserCheck,
  Briefcase,
  Users,
  Building2,
  Palette,
  Settings,
  User,
  ShieldCheck,
  ExternalLink,
  Menu,
  X,
} from 'lucide-react';
import { useApp, ScreenType } from '@/context/AppContext';
import { NotificationDrawer } from '@/components/ui/NotificationDrawer';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { cn } from '@/lib/utils';

export const Navbar: React.FC = () => {
  const {
    activeScreen,
    setActiveScreen,
    currentStudent,
    setCurrentStudentId,
    students,
    notifications,
    setIsAddModalOpen,
    setIsSettingsOpen,
    themeConfig,
  } = useApp();

  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');
  const [studentSearch, setStudentSearch] = useState('');

  const searchInputRef = useRef<HTMLInputElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const moreMenuRef = useRef<HTMLDivElement>(null);

  const isLight = themeConfig.isLight;
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // Keyboard shortcut Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(e.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
      if (moreMenuRef.current && !moreMenuRef.current.contains(e.target as Node)) {
        setIsMoreMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const primaryTabs: { screen: ScreenType; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { screen: 'dashboard', label: 'Campus Pulse', icon: Home },
    { screen: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { screen: 'recruiter', label: 'Opportunities', icon: Sparkles },
  ];

  const menuGroups: {
    category: string;
    items: { screen: ScreenType; label: string; icon: React.ComponentType<{ className?: string }>; desc: string }[];
  }[] = [
    {
      category: 'Campus Community',
      items: [
        { screen: 'club', label: 'Clubs & Guilds', icon: Users, desc: 'Student chapters, member rankings & events' },
        { screen: 'leaderboard', label: 'Campus Leaderboards', icon: Trophy, desc: 'Department & monthly status rankings' },
        { screen: 'timeline', label: 'Verified Timeline', icon: Clock, desc: 'Chronological campus milestone log' },
      ],
    },
    {
      category: 'Career & Talent',
      items: [
        { screen: 'resume', label: 'ATS Resume Engine', icon: FileText, desc: 'Auto-compile 94% ATS compatible resume' },
        { screen: 'public-profile', label: 'Public Portfolio', icon: UserCheck, desc: 'Shareable public candidate portfolio' },
        { screen: 'recruiter', label: 'Recruiter Radar', icon: Briefcase, desc: 'Enterprise talent search & dossiers' },
      ],
    },
  ];

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
      s.department.toLowerCase().includes(studentSearch.toLowerCase())
  );

  return (
    <header
      className={cn(
        'sticky top-0 z-50 h-16 w-full border-b transition-all duration-300 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between gap-4 shadow-sm',
        themeConfig.navBgClass
      )}
    >
      {/* ================= LEFT: AUTHENTIC BRAND LOGO ================= */}
      <BrandLogo onClick={() => setActiveScreen('dashboard')} />

      {/* ================= CENTER: INTEGRATED RAYCAST SEARCH & UNDERLINE NAV ================= */}
      <div className="flex-1 max-w-3xl flex items-center justify-center space-x-6">
        {/* Raycast Integrated Search */}
        <div
          className={cn(
            'relative transition-all duration-200 hidden md:block',
            isSearchFocused ? 'w-64 lg:w-72' : 'w-48 lg:w-56'
          )}
        >
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search students, skills..."
            value={globalSearch}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            onChange={(e) => setGlobalSearch(e.target.value)}
            className={cn(
              'w-full pl-8 pr-10 py-1.5 rounded-full text-xs transition-colors focus:outline-none border',
              isLight
                ? 'bg-slate-100 border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-slate-400'
                : 'bg-slate-800/40 border-slate-800 text-slate-100 placeholder-slate-400 focus:bg-slate-800 focus:border-amber-500/50'
            )}
          />
          <div className="absolute right-2.5 top-2 px-1 py-0.5 rounded bg-slate-800/50 text-[9px] font-semibold text-slate-400 pointer-events-none">
            ⌘K
          </div>
        </div>

        {/* Primary Navigation with Animated Glowing Underline */}
        <nav className="hidden lg:flex items-center space-x-6">
          {primaryTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeScreen === tab.screen;
            return (
              <button
                key={tab.screen}
                onClick={() => setActiveScreen(tab.screen)}
                className={cn(
                  'relative py-5 text-xs font-semibold flex items-center space-x-1.5 transition-colors hover:-translate-y-[1px]',
                  isActive
                    ? 'text-amber-400 font-bold'
                    : isLight
                    ? 'text-slate-600 hover:text-slate-900'
                    : 'text-slate-400 hover:text-slate-200'
                )}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>

                {/* Animated Glowing Underline Bar */}
                {isActive && (
                  <motion.div
                    layoutId="topNavUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-amber-400"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}

          {/* More Menu Dropdown */}
          <div className="relative" ref={moreMenuRef}>
            <button
              onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
              className={cn(
                'py-5 text-xs font-semibold transition-colors flex items-center space-x-1 hover:-translate-y-[1px]',
                isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white',
                isMoreMenuOpen && 'text-blue-400'
              )}
            >
              <span>More</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            <AnimatePresence>
              {isMoreMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  className={cn(
                    'absolute right-0 mt-1 w-80 rounded-2xl shadow-2xl p-2 z-50 space-y-3 border backdrop-blur-2xl',
                    isLight
                      ? 'bg-white/95 border-slate-200/90 text-slate-900'
                      : 'bg-[#0B1020]/95 border-white/10 text-slate-100 shadow-black/50'
                  )}
                >
                  {menuGroups.map((group, idx) => (
                    <div key={idx} className="space-y-1">
                      <span className={cn('text-[10px] font-bold uppercase tracking-wider block px-2.5 pt-1 pb-1 text-slate-400')}>
                        {group.category}
                      </span>

                      <div className="space-y-0.5">
                        {group.items.map((item, itemIdx) => {
                          const Icon = item.icon;
                          const isSelected = activeScreen === item.screen;
                          return (
                            <button
                              key={itemIdx}
                              onClick={() => {
                                setActiveScreen(item.screen);
                                setIsMoreMenuOpen(false);
                              }}
                              className={cn(
                                'w-full px-2.5 py-2 rounded-xl text-left flex items-center space-x-3 transition-colors text-xs group',
                                isSelected
                                  ? 'bg-blue-500/10 text-blue-400 font-semibold'
                                  : isLight
                                  ? 'hover:bg-slate-100 text-slate-700 hover:text-slate-900'
                                  : 'hover:bg-white/[0.05] text-slate-300 hover:text-white'
                              )}
                            >
                              <Icon className={cn('w-4 h-4 flex-shrink-0 transition-colors', isSelected ? 'text-blue-400' : 'text-slate-400 group-hover:text-slate-200')} />
                              <div className="flex-1 min-w-0">
                                <span className="font-semibold block leading-snug">{item.label}</span>
                                <span className={cn('text-[10px] block truncate', isLight ? 'text-slate-500' : 'text-slate-400')}>{item.desc}</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>
      </div>

      {/* ================= RIGHT: ACTIONS (NOTIFICATION, USER PROFILE DROPDOWN WITH SETTINGS) ================= */}
      <div className="flex items-center space-x-3 flex-shrink-0">
        {/* Notification Bell */}
        <button
          onClick={() => setIsNotificationsOpen(true)}
          className={cn(
            'p-2 rounded-full relative transition-all hover:scale-105',
            isLight ? 'hover:bg-slate-100 text-slate-600' : 'hover:bg-white/10 text-slate-300'
          )}
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="min-w-4 h-4 px-1 rounded-full bg-amber-500 text-slate-950 text-[9px] font-extrabold flex items-center justify-center absolute -top-0.5 -right-0.5 ring-2 ring-slate-900 animate-pulse">
              {unreadCount}
            </span>
          )}
        </button>

        {/* User Profile Dropdown (Includes Settings & Theme Options) */}
        <div className="relative" ref={profileDropdownRef}>
          <button
            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
            className="flex items-center space-x-2 p-1 rounded-full hover:opacity-90 transition-opacity ring-1 ring-slate-300 dark:ring-slate-700 hover:ring-amber-500/40"
          >
            <img
              src={currentStudent.avatar}
              alt={currentStudent.name}
              className="w-7 h-7 rounded-full object-cover border border-amber-500/40"
            />
            <span className={cn('text-xs font-semibold hidden sm:inline pr-1', isLight ? 'text-slate-800' : 'text-slate-200')}>
              {currentStudent.name.split(' ')[0]}
            </span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          <AnimatePresence>
            {isProfileDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                className={cn(
                  'absolute right-0 mt-2 w-72 rounded-2xl shadow-2xl p-2 z-50 space-y-2 border backdrop-blur-2xl',
                  isLight ? 'bg-white border-slate-200 text-slate-900 shadow-slate-200' : 'bg-slate-900 border-slate-700 text-slate-100 shadow-black/60'
                )}
              >
                {/* Current Student Profile Card Header */}
                <div className={cn('p-3 rounded-xl border flex items-center space-x-3', isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-800/50 border-slate-700/60')}>
                  <img src={currentStudent.avatar} alt={currentStudent.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-amber-500/30" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold truncate leading-tight">{currentStudent.name}</h4>
                    <p className={cn('text-[10px] truncate', isLight ? 'text-slate-500' : 'text-slate-400')}>{currentStudent.department}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-500 dark:text-amber-400">Lvl {currentStudent.level}</span>
                      <span className="text-[9px] text-amber-500 font-bold">{currentStudent.xp} XP</span>
                    </div>
                  </div>
                </div>

                {/* Quick Action Navigation Links */}
                <div className="space-y-0.5 pt-1">
                  <button
                    onClick={() => {
                      setActiveScreen('timeline');
                      setIsProfileDropdownOpen(false);
                    }}
                    className={cn(
                      'w-full px-2.5 py-2 rounded-xl text-left flex items-center justify-between text-xs font-medium transition-colors',
                      isLight ? 'hover:bg-slate-100 text-slate-700' : 'hover:bg-slate-800 text-slate-200'
                    )}
                  >
                    <div className="flex items-center space-x-2.5">
                      <Clock className="w-4 h-4 text-amber-500" />
                      <span>Timeline</span>
                    </div>
                    <ChevronDown className="w-3 h-3 -rotate-90 text-slate-400" />
                  </button>

                  <button
                    onClick={() => {
                      setActiveScreen('public-profile');
                      setIsProfileDropdownOpen(false);
                    }}
                    className={cn(
                      'w-full px-2.5 py-2 rounded-xl text-left flex items-center justify-between text-xs font-medium transition-colors',
                      isLight ? 'hover:bg-slate-100 text-slate-700' : 'hover:bg-slate-800 text-slate-200'
                    )}
                  >
                    <div className="flex items-center space-x-2.5">
                      <User className="w-4 h-4 text-amber-500" />
                      <span>Public Portfolio</span>
                    </div>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </button>

                  <button
                    onClick={() => {
                      setIsSettingsOpen(true);
                      setIsProfileDropdownOpen(false);
                    }}
                    className={cn(
                      'w-full px-2.5 py-2 rounded-xl text-left flex items-center justify-between text-xs font-medium transition-colors',
                      isLight ? 'hover:bg-slate-100 text-slate-700' : 'hover:bg-slate-800 text-slate-200'
                    )}
                  >
                    <div className="flex items-center space-x-2.5">
                      <Palette className="w-4 h-4 text-amber-500" />
                      <span>Settings & Skins</span>
                    </div>
                    <Settings className="w-3 h-3 text-slate-400" />
                  </button>

                  <button
                    onClick={() => {
                      setActiveScreen('faculty');
                      setIsProfileDropdownOpen(false);
                    }}
                    className={cn(
                      'w-full px-2.5 py-2 rounded-xl text-left flex items-center justify-between text-xs font-medium transition-colors',
                      isLight ? 'hover:bg-slate-100 text-slate-700' : 'hover:bg-slate-800 text-slate-200'
                    )}
                  >
                    <div className="flex items-center space-x-2.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      <span>Faculty Verification</span>
                    </div>
                    <Building2 className="w-3 h-3 text-slate-400" />
                  </button>
                </div>

                <div className={cn('border-t pt-2 mt-1 space-y-1.5', isLight ? 'border-slate-200' : 'border-slate-800')}>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2.5">Switch Student Persona</div>
                  <div className="relative px-1">
                    <Search className="w-3 h-3 absolute left-3 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search student..."
                      value={studentSearch}
                      onChange={(e) => setStudentSearch(e.target.value)}
                      className={cn(
                        'w-full pl-7 pr-2 py-1 rounded-xl text-xs focus:outline-none border',
                        isLight ? 'bg-slate-100 border-slate-200 text-slate-900' : 'bg-slate-800 border-slate-700 text-white'
                      )}
                    />
                  </div>

                  <div className="max-h-40 overflow-y-auto space-y-0.5 px-0.5">
                    {filteredStudents.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => {
                          setCurrentStudentId(s.id);
                          setIsProfileDropdownOpen(false);
                        }}
                        className={cn(
                          'w-full px-2 py-1.5 rounded-lg text-left flex items-center space-x-2 text-xs transition-colors',
                          s.id === currentStudent.id
                            ? 'bg-amber-500/15 text-amber-500 font-semibold'
                            : isLight
                            ? 'hover:bg-slate-100 text-slate-700'
                            : 'hover:bg-slate-800 text-slate-300'
                        )}
                      >
                        <img src={s.avatar} alt={s.name} className="w-5 h-5 rounded-full object-cover" />
                        <span className="truncate flex-1">{s.name}</span>
                        <span className="text-[10px] text-amber-500 font-bold">Lvl {s.level}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={cn(
            'p-2 rounded-xl border lg:hidden transition-colors',
            isLight ? 'bg-slate-100 border-slate-200 text-slate-700' : 'bg-slate-800 border-slate-700 text-slate-200'
          )}
          title="Toggle Navigation Menu"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Primary CTA: + Share Achievement (The single saturated accent button) */}
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold flex items-center space-x-1.5 transition-all shadow-md shadow-amber-500/25 active:scale-95 tactile-btn min-h-[44px]"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span className="hidden sm:inline">Share Achievement</span>
        </button>
      </div>

      {/* Mobile Drawer Overlay Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={cn(
              'absolute top-16 left-0 right-0 z-50 border-b p-4 space-y-4 lg:hidden backdrop-blur-2xl shadow-2xl',
              isLight ? 'bg-white/95 border-slate-200 text-slate-900' : 'bg-[#0B1020]/95 border-white/10 text-slate-100'
            )}
          >
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Navigation</span>
              <div className="grid grid-cols-2 gap-2">
                {primaryTabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeScreen === tab.screen;
                  return (
                    <button
                      key={tab.screen}
                      onClick={() => {
                        setActiveScreen(tab.screen);
                        setIsMobileMenuOpen(false);
                      }}
                      className={cn(
                        'min-h-[44px] p-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 border transition-all text-left active:scale-95',
                        isActive
                          ? 'bg-amber-500/20 text-amber-400 border-amber-500/40 shadow-sm'
                          : isLight
                          ? 'bg-slate-100 border-slate-200 text-slate-700'
                          : 'bg-white/5 border-white/10 text-slate-300'
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-white/10">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Campus Modules</span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {menuGroups.flatMap((g) => g.items).map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        setActiveScreen(item.screen);
                        setIsMobileMenuOpen(false);
                      }}
                      className={cn(
                        'min-h-[44px] p-2.5 rounded-xl text-left flex items-center space-x-2 border transition-colors active:scale-95',
                        activeScreen === item.screen
                          ? 'bg-purple-600 text-white border-purple-500'
                          : isLight
                          ? 'bg-slate-50 border-slate-200 text-slate-800'
                          : 'bg-white/[0.03] border-white/10 text-slate-300'
                      )}
                    >
                      <Icon className="w-4 h-4 text-purple-400" />
                      <span className="font-semibold line-clamp-1">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Bottom Mobile Navigation Bar for Handheld Devices */}
      <nav
        className={cn(
          'fixed bottom-0 left-0 right-0 z-40 h-16 border-t backdrop-blur-2xl flex items-center justify-around px-3 lg:hidden shadow-2xl',
          isLight ? 'bg-white/95 border-slate-200 text-slate-900' : 'bg-[#0B1020]/95 border-white/10 text-slate-100'
        )}
      >
        {primaryTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeScreen === tab.screen;
          return (
            <button
              key={tab.screen}
              onClick={() => setActiveScreen(tab.screen)}
              className={cn(
                'min-h-[44px] min-w-[44px] flex flex-col items-center justify-center space-y-0.5 py-1 px-3 rounded-xl transition-all active:scale-95',
                isActive
                  ? 'text-amber-400 font-bold scale-105'
                  : 'text-slate-400 hover:text-slate-200'
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-semibold">{tab.label}</span>
            </button>
          );
        })}
        <button
          onClick={() => setActiveScreen('timeline')}
          className={cn(
            'min-h-[44px] min-w-[44px] flex flex-col items-center justify-center space-y-0.5 py-1 px-3 rounded-xl transition-all active:scale-95',
            activeScreen === 'timeline' ? 'text-amber-400 font-bold scale-105' : 'text-slate-400 hover:text-slate-200'
          )}
        >
          <Clock className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Timeline</span>
        </button>
      </nav>

      {/* Notification Drawer Modal */}
      <NotificationDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />
    </header>
  );
};
