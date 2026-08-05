'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, ShieldCheck, Trophy, Sparkles, ThumbsUp, X, CheckCheck } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { cn } from '@/lib/utils';
import { NotificationItem } from '@/types';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ isOpen, onClose }) => {
  const { notifications, markNotificationRead, markAllNotificationsRead, themeConfig } = useApp();
  const isLight = themeConfig.isLight;

  if (!isOpen) return null;

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'verification':
        return <ShieldCheck className="w-4 h-4 text-emerald-400" />;
      case 'rank':
        return <Trophy className="w-4 h-4 text-amber-400" />;
      case 'endorsement':
        return <ThumbsUp className="w-4 h-4 text-indigo-400" />;
      case 'opportunity':
        return <Sparkles className="w-4 h-4 text-purple-400" />;
      default:
        return <Bell className="w-4 h-4 text-blue-400" />;
    }
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-xs"
        />

        {/* Drawer Panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className={cn(
            'relative w-full max-w-sm h-full shadow-2xl flex flex-col z-10 border-l backdrop-blur-2xl',
            isLight ? 'bg-white/95 border-slate-200 text-slate-900' : 'bg-[#0F172A]/95 border-white/10 text-slate-100'
          )}
        >
          {/* Header */}
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-sm">Notifications</h3>
                <p className="text-[11px] text-slate-400">
                  {unreadCount > 0 ? `${unreadCount} unread update${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllNotificationsRead}
                  className="text-[10px] font-bold text-indigo-400 hover:underline flex items-center space-x-1"
                >
                  <CheckCheck className="w-3 h-3" />
                  <span>Mark all read</span>
                </button>
              )}
              <button
                onClick={onClose}
                className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {notifications.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-xs">No notifications yet.</div>
            ) : (
              notifications.map((item) => (
                <div
                  key={item.id}
                  onClick={() => markNotificationRead(item.id)}
                  className={cn(
                    'p-3.5 rounded-2xl border text-xs cursor-pointer transition-all duration-200 space-y-1.5',
                    !item.isRead
                      ? isLight
                        ? 'bg-indigo-50/60 border-indigo-200 shadow-sm'
                        : 'bg-indigo-950/30 border-indigo-500/30 shadow-sm'
                      : isLight
                      ? 'bg-slate-50/80 border-slate-200 opacity-80'
                      : 'bg-white/[0.03] border-white/[0.06] opacity-75'
                  )}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="p-1.5 rounded-lg bg-white/10">{getIcon(item.type)}</div>
                      <span className="font-bold text-xs">{item.title}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">{item.timestamp}</span>
                  </div>

                  <p className={cn('text-[11px] leading-relaxed', isLight ? 'text-slate-600' : 'text-slate-300')}>
                    {item.message}
                  </p>

                  {item.xpBonus && (
                    <div className="pt-1 flex items-center justify-between">
                      <span className="text-[10px] font-black text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        +{item.xpBonus} XP Earned
                      </span>
                      {!item.isRead && <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
