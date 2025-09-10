export interface Course {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: 'math' | 'science' | 'language' | 'social' | 'arts' | 'technology';
  totalLessons: number;
  completedLessons: number;
  estimatedDuration: number; // in minutes
  thumbnail: string;
  isLocked: boolean;
  points: number;
  badges: string[];
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  type: 'video' | 'quiz' | 'interactive' | 'reading' | 'practice';
  duration: number; // in minutes
  status: 'locked' | 'available' | 'in-progress' | 'completed';
  points: number;
  order: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'progress' | 'streak' | 'mastery' | 'social' | 'special';
  unlockedAt?: Date;
  points: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface StudentProfile {
  id: string;
  name: string;
  avatar: string;
  level: number;
  totalPoints: number;
  currentStreak: number;
  longestStreak: number;
  completedCourses: number;
  totalLessons: number;
  achievements: Achievement[];
  joinDate: Date;
  lastActive: Date;
}

export interface LearningStats {
  todayMinutes: number;
  weeklyMinutes: number;
  monthlyMinutes: number;
  averageSessionTime: number;
  completionRate: number;
  strongestSubject: string;
  weakestSubject: string;
}