'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Student, Achievement, ThemeId, NotificationItem, SeasonInfo, ReactionType } from '@/types';
import { STUDENTS, RECRUITERS, INITIAL_NOTIFICATIONS, INITIAL_SEASON_INFO } from '@/data/mockData';
import { THEMES as ThemeMap, ThemeConfig } from '@/styles/themes';

export type ScreenType = 
  | 'landing' 
  | 'dashboard' 
  | 'leaderboard' 
  | 'timeline' 
  | 'recruiter' 
  | 'resume' 
  | 'faculty' 
  | 'club' 
  | 'public-profile';

interface AppContextType {
  activeScreen: ScreenType;
  setActiveScreen: (screen: ScreenType) => void;
  currentStudent: Student;
  setCurrentStudentId: (id: string) => void;
  students: Student[];
  activeTheme: ThemeId;
  setTheme: (theme: ThemeId) => void;
  themeConfig: ThemeConfig;
  isAddModalOpen: boolean;
  setIsAddModalOpen: (open: boolean) => void;
  isSettingsOpen: boolean;
  setIsSettingsOpen: (open: boolean) => void;
  isCoachOpen: boolean;
  setIsCoachOpen: (open: boolean) => void;
  selectedCandidateForDrawer: Student | null;
  setSelectedCandidateForDrawer: (student: Student | null) => void;
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  seasonInfo: SeasonInfo;
  addAchievement: (achievementData: Omit<Achievement, 'id' | 'studentId' | 'studentName' | 'studentAvatar' | 'studentDept' | 'comments' | 'endorsementsCount'>) => void;
  approveVerification: (achievementId: string) => void;
  rejectVerification: (achievementId: string) => void;
  toggleEndorsement: (achievementId: string) => void;
  toggleReaction: (achievementId: string, reaction: ReactionType) => void;
  resetData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY_STUDENTS = 'cse_hub_students_v1';
const LOCAL_STORAGE_KEY_THEME = 'cse_hub_theme_v1';
const LOCAL_STORAGE_KEY_CURRENT_STU = 'cse_hub_current_stu_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeScreen, setActiveScreen] = useState<ScreenType>('dashboard');

  // SSR-safe initial state — always start with defaults so server and client
  // render identical HTML on first paint, avoiding hydration mismatches.
  const [students, setStudents] = useState<Student[]>(STUDENTS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [seasonInfo] = useState<SeasonInfo>(INITIAL_SEASON_INFO);
  const [currentStudentId, setCurrentStudentIdState] = useState<string>('stu-1');
  const [activeTheme, setActiveTheme] = useState<ThemeId>('dark');

  // After first client render, hydrate state from localStorage.
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem(LOCAL_STORAGE_KEY_THEME);
      if (savedTheme === 'light' || savedTheme === 'dark') {
        setActiveTheme(savedTheme as ThemeId);
      }
    } catch (e) {
      console.error('Failed to get saved theme', e);
    }

    try {
      const savedStudentId = localStorage.getItem(LOCAL_STORAGE_KEY_CURRENT_STU);
      if (savedStudentId) setCurrentStudentIdState(savedStudentId);
    } catch (e) {
      console.error('Failed to get saved student ID', e);
    }

    try {
      const savedStudents = localStorage.getItem(LOCAL_STORAGE_KEY_STUDENTS);
      if (savedStudents) setStudents(JSON.parse(savedStudents));
    } catch (e) {
      console.error('Failed to parse saved students', e);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // intentionally empty — runs once after mount

  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isCoachOpen, setIsCoachOpen] = useState<boolean>(false);
  const [selectedCandidateForDrawer, setSelectedCandidateForDrawer] = useState<Student | null>(null);

  // Sync to localStorage
  React.useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_STUDENTS, JSON.stringify(students));
    } catch (e) {
      console.error('Failed to save students to localStorage', e);
    }
  }, [students]);

  React.useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_THEME, activeTheme);
    } catch (e) {
      console.error('Failed to save theme to localStorage', e);
    }
  }, [activeTheme]);

  React.useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_CURRENT_STU, currentStudentId);
    } catch (e) {
      console.error('Failed to save current student ID', e);
    }
  }, [currentStudentId]);

  const currentStudent = students.find((s) => s.id === currentStudentId) || students[0];
  const themeConfig = ThemeMap[activeTheme] || ThemeMap['dark'];

  const setCurrentStudentId = (id: string) => {
    setCurrentStudentIdState(id);
  };

  const setTheme = (theme: ThemeId) => {
    setActiveTheme(theme);
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const addAchievement = (data: Omit<Achievement, 'id' | 'studentId' | 'studentName' | 'studentAvatar' | 'studentDept' | 'comments' | 'endorsementsCount'>) => {
    const newAch: Achievement = {
      ...data,
      id: `ach-${Date.now()}`,
      studentId: currentStudent.id,
      studentName: currentStudent.name,
      studentAvatar: currentStudent.avatar,
      studentDept: currentStudent.department,
      comments: [],
      endorsementsCount: 1,
      reactions: { celebrate: 1, applaud: 0, inspired: 0, respect: 0 },
      userReaction: 'celebrate',
    };

    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === currentStudent.id) {
          const updatedAchievements = [newAch, ...s.achievements];
          const newXP = s.xp + data.pointsEarned;
          const newLevel = Math.floor(newXP / 1000) + 1;
          const newScore = Math.min(1000, s.careerScore + 8);
          return {
            ...s,
            achievements: updatedAchievements,
            xp: newXP,
            level: newLevel,
            careerScore: newScore,
          };
        }
        return s;
      })
    );
  };

  const approveVerification = (achievementId: string) => {
    setStudents((prev) =>
      prev.map((s) => ({
        ...s,
        achievements: s.achievements.map((ach) => {
          if (ach.id === achievementId) {
            return {
              ...ach,
              verificationStatus: 'Faculty Verified' as const,
              verifiedBy: 'Faculty Committee',
            };
          }
          return ach;
        }),
      }))
    );
  };

  const rejectVerification = (achievementId: string) => {
    setStudents((prev) =>
      prev.map((s) => ({
        ...s,
        achievements: s.achievements.filter((ach) => ach.id !== achievementId),
      }))
    );
  };

  const toggleEndorsement = (achievementId: string) => {
    setStudents((prev) =>
      prev.map((s) => ({
        ...s,
        achievements: s.achievements.map((ach) => {
          if (ach.id === achievementId) {
            const isEndorsed = ach.isPeerEndorsed;
            return {
              ...ach,
              isPeerEndorsed: !isEndorsed,
              endorsementsCount: isEndorsed ? ach.endorsementsCount - 1 : ach.endorsementsCount + 1,
            };
          }
          return ach;
        }),
      }))
    );
  };

  const toggleReaction = (achievementId: string, reaction: ReactionType) => {
    setStudents((prev) =>
      prev.map((s) => ({
        ...s,
        achievements: s.achievements.map((ach) => {
          if (ach.id === achievementId) {
            const currentReaction = ach.userReaction;
            const currentReactions = ach.reactions || { celebrate: 0, applaud: 0, inspired: 0, respect: 0 };
            
            const updated = { ...currentReactions };
            let newReaction: ReactionType | undefined = reaction;

            if (currentReaction === reaction) {
              // Unselect reaction
              updated[reaction] = Math.max(0, updated[reaction] - 1);
              newReaction = undefined;
            } else {
              if (currentReaction) {
                updated[currentReaction] = Math.max(0, updated[currentReaction] - 1);
              }
              updated[reaction] = (updated[reaction] || 0) + 1;
            }

            return {
              ...ach,
              userReaction: newReaction,
              reactions: updated,
            };
          }
          return ach;
        }),
      }))
    );
  };

  const resetData = () => {
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY_STUDENTS);
      localStorage.removeItem(LOCAL_STORAGE_KEY_THEME);
      localStorage.removeItem(LOCAL_STORAGE_KEY_CURRENT_STU);
    } catch (e) {
      console.error('Failed to clear localStorage', e);
    }
    setStudents(STUDENTS);
    setCurrentStudentIdState('stu-1');
    setActiveTheme('dark');
    setNotifications(INITIAL_NOTIFICATIONS);
  };

  return (
    <AppContext.Provider
      value={{
        activeScreen,
        setActiveScreen,
        currentStudent,
        setCurrentStudentId,
        students,
        activeTheme,
        setTheme,
        themeConfig,
        isAddModalOpen,
        setIsAddModalOpen,
        isSettingsOpen,
        setIsSettingsOpen,
        isCoachOpen,
        setIsCoachOpen,
        selectedCandidateForDrawer,
        setSelectedCandidateForDrawer,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        seasonInfo,
        addAchievement,
        approveVerification,
        rejectVerification,
        toggleEndorsement,
        toggleReaction,
        resetData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

