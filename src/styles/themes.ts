import { ThemeId } from '@/types';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  tagline: string;
  previewGradient: string;
  isLight?: boolean;
  bgClass: string;
  cardBgClass: string;
  cardBorderClass: string;
  innerBgClass: string;
  innerBorderClass: string;
  textPrimary: string;
  textSecondary: string;
  accentGradient: string;
  accentColor: string;
  glowColor: string;
  badgeStyle: string;
  navBgClass: string;
}

export const THEMES: Record<ThemeId, ThemeConfig> = {
  dark: {
    id: 'dark',
    name: 'Dark Mode',
    tagline: 'Deep slate dark canvas with warm amber & indigo details',
    previewGradient: 'from-slate-800 to-slate-950',
    isLight: false,
    bgClass: 'bg-[#0F172A] text-slate-100',
    navBgClass: 'bg-[#0F172A]/90 border-slate-800 text-slate-100 backdrop-blur-md',
    cardBgClass: 'bg-[#1E293B] border-slate-700/60 text-slate-100 shadow-sm',
    cardBorderClass: 'border-slate-700/60 hover:border-amber-500/40',
    innerBgClass: 'bg-[#0F172A]',
    innerBorderClass: 'border-slate-800',
    textPrimary: 'text-slate-100',
    textSecondary: 'text-slate-400',
    accentGradient: 'from-amber-400 via-indigo-400 to-amber-500',
    accentColor: '#F5A623',
    glowColor: 'rgba(245, 166, 35, 0.10)',
    badgeStyle: 'bg-amber-500/10 text-amber-300 border border-amber-500/20',
  },
  light: {
    id: 'light',
    name: 'Light Mode',
    tagline: 'Clean white canvas with charcoal typography & amber details',
    previewGradient: 'from-slate-100 to-slate-300',
    isLight: true,
    bgClass: 'bg-[#F8FAFC] text-slate-900',
    navBgClass: 'bg-white/90 border-slate-200 text-slate-900 backdrop-blur-md shadow-sm',
    cardBgClass: 'bg-white border-slate-200 text-slate-900 shadow-sm',
    cardBorderClass: 'border-slate-200 hover:border-amber-500/40',
    innerBgClass: 'bg-[#F1F5F9]',
    innerBorderClass: 'border-slate-200',
    textPrimary: 'text-slate-900',
    textSecondary: 'text-slate-600',
    accentGradient: 'from-amber-500 to-amber-600',
    accentColor: '#D97706',
    glowColor: 'rgba(217, 119, 6, 0.08)',
    badgeStyle: 'bg-amber-50 text-amber-800 border border-amber-200',
  },
};
