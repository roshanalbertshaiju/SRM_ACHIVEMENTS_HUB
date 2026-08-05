'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Palette,
  Check,
  Settings,
  RotateCcw,
  User,
  Sun,
  Moon,
  Bell,
  Sliders,
  ShieldCheck,
  Sparkles,
  Zap,
  Download,
  CheckCircle2,
} from 'lucide-react';
import { ThemeId } from '@/types';
import { useApp } from '@/context/AppContext';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

type SettingsTab = 'account' | 'appearance' | 'notifications' | 'advanced';

export const SettingsModal: React.FC = () => {
  const { isSettingsOpen, setIsSettingsOpen, activeTheme, setTheme, currentStudent, resetData, themeConfig } = useApp();
  const isLight = themeConfig.isLight;
  const [activeTab, setActiveTab] = useState<SettingsTab>('appearance');
  const [profileName, setProfileName] = useState(currentStudent?.name || '');
  const [profileHeadline, setProfileHeadline] = useState(currentStudent?.headline || '');
  const [enableToasts, setEnableToasts] = useState(true);
  const [compactDensity, setCompactDensity] = useState(false);

  useEffect(() => {
    if (currentStudent) {
      setProfileName(currentStudent.name);
      setProfileHeadline(currentStudent.headline);
    }
  }, [currentStudent]);

  // Handle ESC key press to close settings (like Discord)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSettingsOpen) {
        setIsSettingsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSettingsOpen, setIsSettingsOpen]);

  if (!isSettingsOpen) return null;

  const handleReset = () => {
    resetData();
    toast.success('Data Reset to Default', {
      description: 'Restored initial mock dataset and default theme.',
    });
  };

  const handleSaveProfile = () => {
    toast.success('Settings Saved Successfully!', {
      description: 'Your user profile and UI preferences have been updated.',
    });
    setIsSettingsOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className={cn(
          "relative w-full max-w-4xl h-[85vh] max-h-[750px] rounded-3xl border text-slate-100 shadow-2xl overflow-hidden flex flex-col md:flex-row",
          themeConfig.bgClass,
          themeConfig.cardBorderClass
        )}
      >
        {/* Discord-style Top Right ESC Close Button */}
        <div className="absolute top-4 right-4 z-20 flex flex-col items-center">
          <button
            onClick={() => setIsSettingsOpen(false)}
            className={cn(
              "w-9 h-9 rounded-full border flex items-center justify-center transition-all shadow-md tactile-btn",
              isLight ? "bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700" : "bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200"
            )}
            title="Close Settings (ESC)"
          >
            <X className="w-5 h-5" />
          </button>
          <span className="text-[9px] font-black uppercase text-slate-400 mt-1">ESC</span>
        </div>

        {/* DISCORD-STYLE LEFT SIDEBAR NAVIGATION */}
        <div className={cn(
          "w-full md:w-64 p-5 sm:p-6 border-b md:border-b-0 md:border-r space-y-6 flex-shrink-0",
          isLight ? "bg-slate-100/80 border-slate-200" : "bg-slate-900/90 border-slate-800"
        )}>
          {/* Header Badge */}
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className={cn("font-black text-sm", isLight ? "text-slate-900" : "text-slate-100")}>App Settings</h3>
              <p className={cn("text-[10px] font-bold uppercase tracking-wider", isLight ? "text-slate-500" : "text-slate-400")}>CelebrateSRM</p>
            </div>
          </div>

          {/* Settings Nav Groups */}
          <div className="space-y-4 text-xs font-semibold">
            {/* USER SETTINGS GROUP */}
            <div className="space-y-1">
              <span className={cn("px-2 text-[10px] font-black uppercase tracking-wider block mb-1", isLight ? "text-slate-500" : "text-slate-400")}>User Settings</span>
              
              <button
                onClick={() => setActiveTab('account')}
                className={cn(
                  "w-full px-3 py-2.5 rounded-xl font-bold flex items-center space-x-2.5 transition-all tactile-btn",
                  activeTab === 'account'
                    ? "bg-amber-500 text-slate-950 shadow-sm"
                    : isLight ? "text-slate-700 hover:bg-slate-200/70" : "text-slate-300 hover:bg-slate-800/60"
                )}
              >
                <User className="w-4 h-4" />
                <span>My Profile & Account</span>
              </button>
            </div>

            {/* APP SETTINGS GROUP */}
            <div className="space-y-1">
              <span className={cn("px-2 text-[10px] font-black uppercase tracking-wider block mb-1", isLight ? "text-slate-500" : "text-slate-400")}>App & Theme</span>

              <button
                onClick={() => setActiveTab('appearance')}
                className={cn(
                  "w-full px-3 py-2.5 rounded-xl font-bold flex items-center space-x-2.5 transition-all tactile-btn",
                  activeTab === 'appearance'
                    ? "bg-amber-500 text-slate-950 shadow-sm"
                    : isLight ? "text-slate-700 hover:bg-slate-200/70" : "text-slate-300 hover:bg-slate-800/60"
                )}
              >
                <Palette className="w-4 h-4" />
                <span>Appearance & UI Theme</span>
              </button>

              <button
                onClick={() => setActiveTab('notifications')}
                className={cn(
                  "w-full px-3 py-2.5 rounded-xl font-bold flex items-center space-x-2.5 transition-all tactile-btn",
                  activeTab === 'notifications'
                    ? "bg-amber-500 text-slate-950 shadow-sm"
                    : isLight ? "text-slate-700 hover:bg-slate-200/70" : "text-slate-300 hover:bg-slate-800/60"
                )}
              >
                <Bell className="w-4 h-4" />
                <span>Notifications & Sound</span>
              </button>

              <button
                onClick={() => setActiveTab('advanced')}
                className={cn(
                  "w-full px-3 py-2.5 rounded-xl font-bold flex items-center space-x-2.5 transition-all tactile-btn",
                  activeTab === 'advanced'
                    ? "bg-amber-500 text-slate-950 shadow-sm"
                    : isLight ? "text-slate-700 hover:bg-slate-200/70" : "text-slate-300 hover:bg-slate-800/60"
                )}
              >
                <Sliders className="w-4 h-4" />
                <span>Advanced & Data Reset</span>
              </button>
            </div>
          </div>

          {/* User Quick Info Badge */}
          <div className={cn("p-3 rounded-2xl border flex items-center space-x-3", isLight ? "bg-white border-slate-200" : "bg-slate-800/60 border-slate-700")}>
            <img src={currentStudent?.avatar} alt={currentStudent?.name} className="w-9 h-9 rounded-xl object-cover border border-amber-500/30" />
            <div className="min-w-0 flex-1">
              <h4 className={cn("text-xs font-bold truncate", isLight ? "text-slate-900" : "text-slate-100")}>{currentStudent?.name}</h4>
              <p className="text-[10px] text-amber-500 dark:text-amber-400 font-semibold font-numeric">Lvl {currentStudent?.level} • {currentStudent?.careerScore} XP</p>
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT DISPLAY PANEL */}
        <div className="flex-1 p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* TAB 1: APPEARANCE & UI THEME */}
          {activeTab === 'appearance' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="border-b pb-4 border-slate-200 dark:border-slate-800">
                <h2 className={cn("text-xl font-black", isLight ? "text-slate-900" : "text-slate-100")}>Appearance & UI Theme</h2>
                <p className={cn("text-xs mt-1", isLight ? "text-slate-600" : "text-slate-400")}>
                  Customize your interface appearance. Toggle between Dark Mode and Light Mode with dynamic UI styling.
                </p>
              </div>

              {/* Theme Selection Cards (Dark Mode vs Light Mode) */}
              <div className="space-y-3">
                <span className={cn("text-xs font-extrabold uppercase tracking-wider block", isLight ? "text-slate-700" : "text-slate-300")}>
                  Theme Mode
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* DARK MODE SELECTION CARD */}
                  <button
                    onClick={() => setTheme('dark')}
                    className={cn(
                      "p-4 rounded-2xl border text-left space-y-3 transition-all tactile-btn relative overflow-hidden",
                      activeTheme === 'dark'
                        ? "border-amber-500 ring-2 ring-amber-500/30 bg-slate-900 text-white shadow-lg"
                        : "border-slate-300 dark:border-slate-700 bg-slate-800/40 text-slate-300 hover:bg-slate-800"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
                          <Moon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-white">Dark Mode</h4>
                          <p className="text-[11px] text-slate-400">Deep Slate `#0F172A` Canvas</p>
                        </div>
                      </div>
                      {activeTheme === 'dark' && (
                        <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                          <Check className="w-4 h-4" />
                        </span>
                      )}
                    </div>

                    {/* Dark Mode Preview Box */}
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-[10px]">
                      <div className="flex items-center justify-between text-slate-300">
                        <span className="font-bold text-amber-400">Preview UI Card</span>
                        <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-numeric">Lvl 28</span>
                      </div>
                      <div className="h-1.5 w-3/4 rounded-full bg-slate-800" />
                    </div>
                  </button>

                  {/* LIGHT MODE SELECTION CARD */}
                  <button
                    onClick={() => setTheme('light')}
                    className={cn(
                      "p-4 rounded-2xl border text-left space-y-3 transition-all tactile-btn relative overflow-hidden",
                      activeTheme === 'light'
                        ? "border-amber-500 ring-2 ring-amber-500/30 bg-white text-slate-900 shadow-lg"
                        : "border-slate-300 dark:border-slate-700 bg-slate-100 text-slate-800 hover:bg-slate-200"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600">
                          <Sun className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-slate-900">Light Mode (White)</h4>
                          <p className="text-[11px] text-slate-600">Clean Crisp White Canvas</p>
                        </div>
                      </div>
                      {activeTheme === 'light' && (
                        <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                          <Check className="w-4 h-4" />
                        </span>
                      )}
                    </div>

                    {/* Light Mode Preview Box */}
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-[10px]">
                      <div className="flex items-center justify-between text-slate-900">
                        <span className="font-bold text-amber-600">Preview UI Card</span>
                        <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-numeric">Lvl 28</span>
                      </div>
                      <div className="h-1.5 w-3/4 rounded-full bg-slate-200" />
                    </div>
                  </button>
                </div>
              </div>

              {/* UI Density & Aesthetics Toggle */}
              <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                <span className={cn("text-xs font-extrabold uppercase tracking-wider block", isLight ? "text-slate-700" : "text-slate-300")}>
                  UI Display Options
                </span>

                <div className={cn("p-4 rounded-2xl border flex items-center justify-between", isLight ? "bg-slate-50 border-slate-200" : "bg-slate-800/40 border-slate-700")}>
                  <div>
                    <h4 className={cn("text-xs font-bold", isLight ? "text-slate-900" : "text-slate-100")}>Compact Display Density</h4>
                    <p className={cn("text-[11px]", isLight ? "text-slate-600" : "text-slate-400")}>Reduce padding for high information density cards.</p>
                  </div>
                  <button
                    onClick={() => setCompactDensity(!compactDensity)}
                    className={cn(
                      "w-12 h-6 rounded-full transition-colors relative flex items-center px-0.5",
                      compactDensity ? "bg-amber-500" : isLight ? "bg-slate-300" : "bg-slate-700"
                    )}
                  >
                    <span className={cn("w-5 h-5 rounded-full bg-white shadow-md transition-transform", compactDensity && "translate-x-6")} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MY ACCOUNT & PROFILE */}
          {activeTab === 'account' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="border-b pb-4 border-slate-200 dark:border-slate-800">
                <h2 className={cn("text-xl font-black", isLight ? "text-slate-900" : "text-slate-100")}>My Account & Profile</h2>
                <p className={cn("text-xs mt-1", isLight ? "text-slate-600" : "text-slate-400")}>
                  Update your public student profile headline and department credentials.
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div className="flex items-center space-x-4">
                  <img src={currentStudent?.avatar} alt={currentStudent?.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-500/40 shadow-md" />
                  <div>
                    <h3 className={cn("font-bold text-base", isLight ? "text-slate-900" : "text-slate-100")}>{currentStudent?.name}</h3>
                    <p className="text-amber-500 font-semibold">{currentStudent?.department} ({currentStudent?.year})</p>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className={cn("font-bold block", isLight ? "text-slate-700" : "text-slate-300")}>Full Name</label>
                  <input
                    type="text"
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    className={cn(
                      "w-full p-3 rounded-xl border text-xs focus:outline-none focus:border-amber-500 font-medium",
                      isLight ? "bg-slate-100 border-slate-300 text-slate-900" : "bg-slate-800 border-slate-700 text-slate-100"
                    )}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className={cn("font-bold block", isLight ? "text-slate-700" : "text-slate-300")}>Professional Headline</label>
                  <input
                    type="text"
                    value={profileHeadline}
                    onChange={(e) => setProfileHeadline(e.target.value)}
                    className={cn(
                      "w-full p-3 rounded-xl border text-xs focus:outline-none focus:border-amber-500 font-medium",
                      isLight ? "bg-slate-100 border-slate-300 text-slate-900" : "bg-slate-800 border-slate-700 text-slate-100"
                    )}
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: NOTIFICATIONS & SOUND */}
          {activeTab === 'notifications' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="border-b pb-4 border-slate-200 dark:border-slate-800">
                <h2 className={cn("text-xl font-black", isLight ? "text-slate-900" : "text-slate-100")}>Notifications & Activity</h2>
                <p className={cn("text-xs mt-1", isLight ? "text-slate-600" : "text-slate-400")}>
                  Manage real-time campus toast alerts and rank gain notifications.
                </p>
              </div>

              <div className={cn("p-4 rounded-2xl border flex items-center justify-between", isLight ? "bg-slate-50 border-slate-200" : "bg-slate-800/40 border-slate-700")}>
                <div>
                  <h4 className={cn("text-xs font-bold", isLight ? "text-slate-900" : "text-slate-100")}>Live Campus Toast Notifier</h4>
                  <p className={cn("text-[11px]", isLight ? "text-slate-600" : "text-slate-400")}>Pop up real-time student achievement celebrations.</p>
                </div>
                <button
                  onClick={() => setEnableToasts(!enableToasts)}
                  className={cn(
                    "w-12 h-6 rounded-full transition-colors relative flex items-center px-0.5",
                    enableToasts ? "bg-amber-500" : isLight ? "bg-slate-300" : "bg-slate-700"
                  )}
                >
                  <span className={cn("w-5 h-5 rounded-full bg-white shadow-md transition-transform", enableToasts && "translate-x-6")} />
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: ADVANCED & DATA RESET */}
          {activeTab === 'advanced' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="border-b pb-4 border-slate-200 dark:border-slate-800">
                <h2 className={cn("text-xl font-black", isLight ? "text-slate-900" : "text-slate-100")}>Advanced Controls</h2>
                <p className={cn("text-xs mt-1", isLight ? "text-slate-600" : "text-slate-400")}>
                  Reset application mock state or clear local cache.
                </p>
              </div>

              <div className={cn("p-4 rounded-2xl border space-y-3", isLight ? "bg-amber-50/50 border-amber-200" : "bg-amber-500/10 border-amber-500/20")}>
                <div className="flex items-center space-x-2 text-amber-500 font-bold text-xs">
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset Demo Workspace Data</span>
                </div>
                <p className={cn("text-xs", isLight ? "text-slate-700" : "text-slate-300")}>
                  Restores initial students, department rivalry scores, and default configuration.
                </p>
                <button
                  onClick={handleReset}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all tactile-btn shadow-sm"
                >
                  Reset All Mock Data
                </button>
              </div>
            </div>
          )}

          {/* Bottom Action Footer Bar */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">
              Theme: <strong className="text-amber-500 capitalize">{activeTheme}</strong>
            </span>

            <button
              onClick={handleSaveProfile}
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs transition-all tactile-btn shadow-sm"
            >
              Save & Close
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
