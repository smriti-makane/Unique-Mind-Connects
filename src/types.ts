export type NavigationTab = 
  | 'landing'
  | 'dashboard'
  | 'courses'
  | 'aitutor'
  | 'emotions'
  | 'adaptive'
  | 'assessments'
  | 'gamified'
  | 'supportive'
  | 'quests'
  | 'parent'
  | 'teacher'
  | 'profile'
  | 'feedback'
  | 'settings';

export type UserRole = 'student' | 'parent' | 'teacher';

export interface AccessibilitySettings {
  dyslexiaFont: boolean;
  highContrast: boolean;
  largeText: boolean;
  textToSpeech: boolean;
  reducedMotion: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  actionable?: {
    type: 'quiz' | 'breathing' | 'game';
    label: string;
  };
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  difficulty: 'Gentle' | 'Adaptive' | 'Advanced';
  progress: number;
  image: string;
  tags: string[];
  lessonsCount: number;
}

export interface StudentProgress {
  studentName: string;
  avatar: string;
  grade: string;
  focusScore: number;
  weeklyHours: number;
  completedLessons: number;
  dominantMood: string;
  status: 'Thriving' | 'Needs Break' | 'Consistent';
  recentAchievement: string;
}

export interface StreakDay {
  date: string; // YYYY-MM-DD
  dayLabel: string; // e.g. "Jul 1"
  loggedAt: boolean;
  streakCount: number;
  activeMinutes: number;
  completedActivities: number;
}

export interface UserData {
  points: number;
  level: number;
  completedQuests: string[];
  rewardsEarned: string[];
  streakDays: number;
  learningPace: 'gentle' | 'balanced' | 'accelerated';
  learningStyle: 'visual' | 'auditory' | 'interactive';
  role: UserRole;
  userName: string;
  avatarUrl?: string;
  focusMinutesToday: number;
  completedLessonsCount: number;
}

export interface Quest {
  id: string;
  name: string;
  description: string;
  reward: number;
  completionCriteria: number; // e.g. score percentage or count
  currentProgress: number;
  completed: boolean;
  category: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  answer: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  explanation?: string;
  category: 'Alphabet' | 'Numbers' | 'Math' | 'Logic' | 'Vocabulary';
}

export interface EmotionScores {
  happy: number;
  neutral: number;
  focused: number;
  anxious: number;
  surprised: number;
  calm: number;
}

export interface EmotionReportData {
  timestamp: string;
  snapshotUrl: string;
  emotions: EmotionScores;
  dominantEmotion: string;
  confidence: number;
  recommendation: string;
}

export interface LearningResource {
  id: string;
  title: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  summary: string;
  content: string[];
  tips: string;
  completed?: boolean;
}

export interface FeedbackEntry {
  id: string;
  name: string;
  rating: number;
  category: string;
  comment: string;
  createdAt: string;
}

