'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { cn } from '@/lib/utils';

export const ThemeSelector: React.FC = () => {
  const { activeTheme, setTheme, themeConfig } = useApp();
  const isLight = themeConfig.isLight;

  const toggleTheme = () => {
    setTheme(isLight ? 'dark' : 'light');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        onClick={toggleTheme}
        className={cn(
          'px-4 py-2.5 rounded-full border shadow-lg flex items-center space-x-2.5 transition-all duration-200 tactile-btn',
          isLight
            ? 'bg-white border-slate-300 text-slate-900 hover:bg-slate-100 shadow-slate-200'
            : 'bg-slate-800/90 border-slate-700 text-slate-100 hover:bg-slate-800 shadow-black/40 backdrop-blur-md'
        )}
      >
        {isLight ? (
          <>
            <Moon className="w-4 h-4 text-slate-700" />
            <span className="text-xs font-bold text-slate-800">Dark Mode</span>
          </>
        ) : (
          <>
            <Sun className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold text-slate-100">Light Mode</span>
          </>
        )}
      </motion.button>
    </div>
  );
};


