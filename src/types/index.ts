export type Tier = 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Emerald' | 'Diamond';

export type Rarity = 'Common' | 'Rare' | 'Epic' | 'Legendary';

export type AchievementCategory = 
  | 'Hackathon' 
  | 'Research Paper' 
  | 'Open Source' 
  | 'Leadership' 
  | 'Certification' 
  | 'Sports & Culture';

export type VerificationStatus = 'Faculty Verified' | 'Pending Review' | 'Peer Endorsed';

export type ThemeId = 'dark' | 'light';

export interface Badge {
  id: string;
  name: string;
  description: string;
  iconName: string;
  tier: Tier;
  dateUnlocked?: string;
  requirement: string;
  isUnlocked: boolean;
  xpBonus: number;
  currentProgress?: number;
  maxProgress?: number;
}

export interface Comment {
  id: string;
  authorName: string;
  authorAvatar: string;
  authorRole: string;
  content: string;
  createdAt: string;
}

export type ReactionType = 'celebrate' | 'applaud' | 'inspired' | 'respect';

export interface AchievementReactions {
  celebrate: number;
  applaud: number;
  inspired: number;
  respect: number;
}

export interface Achievement {
  id: string;
  studentId: string;
  studentName: string;
  studentAvatar: string;
  studentDept: string;
  title: string;
  category: AchievementCategory;
  date: string;
  pointsEarned: number;
  verificationStatus: VerificationStatus;
  verifiedBy?: string;
  proofTitle: string;
  proofType: 'PDF Certificate' | 'GitHub Repository' | 'DOI Publication' | 'Official Letter';
  proofUrl?: string;
  githubUrl?: string;
  projectUrl?: string;
  liveDemoUrl?: string;
  description: string;
  comments: Comment[];
  endorsementsCount: number;
  isPeerEndorsed?: boolean;
  userReaction?: ReactionType;
  reactions?: AchievementReactions;
  rarity?: Rarity;
  isPinned?: boolean;
}

export interface StudentScores {
  technical: number;
  leadership: number;
  research: number;
  community: number;
}

export interface Ranks {
  campus: number;
  department: number;
  monthly: number;
}

export interface HeatmapDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface Student {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  headline: string;
  identityTitle: string;
  department: string;
  year: string;
  level: number;
  xp: number;
  xpNextLevel: number;
  careerScore: number;
  weeklyMomentum: number;
  rankChangeText: string;
  scores: StudentScores;
  tier: Tier;
  ranks: Ranks;
  streakDays: number;
  badges: Badge[];
  profileStrength: number;
  bio: string;
  location: string;
  skills: { name: string; level: number; endorsements: number }[];
  achievements: Achievement[];
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  preferredTheme: ThemeId;
  heatmapData: HeatmapDay[];
  atsResumeScore: number;
}

export interface Recruiter {
  id: string;
  name: string;
  role: string;
  company: string;
  logo: string;
  savedCandidateIds: string[];
}

export interface Department {
  id: string;
  name: string;
  code: string;
  totalStudents: number;
  avgCareerScore: number;
  topSkills: string[];
  pendingVerificationsCount: number;
  iconName: string;
}

export interface Club {
  id: string;
  name: string;
  category: string;
  logo: string;
  membersCount: number;
  totalXP: number;
  leadStudentName: string;
  leadStudentAvatar: string;
  nextEvent: string;
  campusRank: number;
}

export interface ActivityFeedItem {
  id: string;
  studentId: string;
  studentName: string;
  studentAvatar: string;
  studentDept: string;
  actionText: string;
  achievementTitle: string;
  xpGained: number;
  timestamp: string;
  category: AchievementCategory;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  type: 'verification' | 'rank' | 'endorsement' | 'opportunity' | 'achievement';
  xpBonus?: number;
  avatar?: string;
}

export interface SeasonInfo {
  seasonNumber: number;
  title: string;
  daysRemaining: number;
  currentRank: number;
  qualifyingThreshold: number;
  neededXP: number;
  totalParticipants: number;
}

