import { Course, Achievement, StudentProfile, LearningStats } from '@/types/education';

const courseCategories = ['math', 'science', 'language', 'social', 'arts', 'technology'] as const;
const courseLevels = ['beginner', 'intermediate', 'advanced'] as const;

export const sampleCourses: Course[] = [
  {
    id: '1',
    title: 'Basic Mathematics',
    description: 'Learn fundamental math concepts including addition, subtraction, multiplication, and division',
    level: 'beginner',
    category: 'math',
    totalLessons: 12,
    completedLessons: 8,
    estimatedDuration: 180,
    thumbnail: '🔢',
    isLocked: false,
    points: 120,
    badges: ['Calculator', 'Problem Solver']
  },
  {
    id: '2',
    title: 'Village Science',
    description: 'Explore science through everyday examples from rural life and nature',
    level: 'beginner',
    category: 'science',
    totalLessons: 15,
    completedLessons: 3,
    estimatedDuration: 225,
    thumbnail: '🔬',
    isLocked: false,
    points: 180,
    badges: ['Young Scientist', 'Nature Observer']
  },
  {
    id: '3',
    title: 'Local Language Reading',
    description: 'Improve reading skills with stories and texts from your region',
    level: 'beginner',
    category: 'language',
    totalLessons: 20,
    completedLessons: 15,
    estimatedDuration: 300,
    thumbnail: '📚',
    isLocked: false,
    points: 200,
    badges: ['Bookworm', 'Story Collector']
  },
  {
    id: '4',
    title: 'Community History',
    description: 'Learn about your local community, traditions, and cultural heritage',
    level: 'intermediate',
    category: 'social',
    totalLessons: 10,
    completedLessons: 0,
    estimatedDuration: 150,
    thumbnail: '🏛️',
    isLocked: true,
    points: 150,
    badges: ['Heritage Keeper']
  },
  {
    id: '5',
    title: 'Creative Arts',
    description: 'Express yourself through drawing, music, and traditional crafts',
    level: 'beginner',
    category: 'arts',
    totalLessons: 18,
    completedLessons: 6,
    estimatedDuration: 270,
    thumbnail: '🎨',
    isLocked: false,
    points: 160,
    badges: ['Artist', 'Creative Mind']
  },
  {
    id: '6',
    title: 'Digital Skills',
    description: 'Learn basic computer and internet skills for the modern world',
    level: 'intermediate',
    category: 'technology',
    totalLessons: 14,
    completedLessons: 2,
    estimatedDuration: 210,
    thumbnail: '💻',
    isLocked: false,
    points: 190,
    badges: ['Tech Explorer', 'Digital Native']
  }
];

export const sampleAchievements: Achievement[] = [
  {
    id: '1',
    title: 'First Steps',
    description: 'Complete your first lesson',
    icon: '👣',
    category: 'progress',
    points: 10,
    rarity: 'common',
    unlockedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    title: 'Week Warrior',
    description: 'Learn for 7 consecutive days',
    icon: '🔥',
    category: 'streak',
    points: 50,
    rarity: 'rare',
    unlockedAt: new Date('2024-01-22')
  },
  {
    id: '3',
    title: 'Math Master',
    description: 'Complete all basic math courses',
    icon: '🧮',
    category: 'mastery',
    points: 100,
    rarity: 'epic'
  },
  {
    id: '4',
    title: 'Community Helper',
    description: 'Help 5 classmates with their lessons',
    icon: '🤝',
    category: 'social',
    points: 75,
    rarity: 'rare'
  },
  {
    id: '5',
    title: 'Night Owl',
    description: 'Study after 9 PM',
    icon: '🦉',
    category: 'special',
    points: 25,
    rarity: 'common'
  }
];

export const sampleProfile: StudentProfile = {
  id: 'student1',
  name: 'Priya Sharma',
  avatar: '👧',
  level: 8,
  totalPoints: 1247,
  currentStreak: 12,
  longestStreak: 28,
  completedCourses: 2,
  totalLessons: 47,
  achievements: sampleAchievements.filter(a => a.unlockedAt),
  joinDate: new Date('2024-01-01'),
  lastActive: new Date()
};

export const sampleStats: LearningStats = {
  todayMinutes: 45,
  weeklyMinutes: 285,
  monthlyMinutes: 1140,
  averageSessionTime: 22,
  completionRate: 78,
  strongestSubject: 'Language',
  weakestSubject: 'Science'
};

export function generateRandomCourse(): Course {
  const randomCategory = courseCategories[Math.floor(Math.random() * courseCategories.length)];
  const randomLevel = courseLevels[Math.floor(Math.random() * courseLevels.length)];
  const totalLessons = Math.floor(Math.random() * 20) + 5;
  const completedLessons = Math.floor(Math.random() * totalLessons);
  
  return {
    id: Math.random().toString(36).substring(2, 15),
    title: `${randomCategory.charAt(0).toUpperCase() + randomCategory.slice(1)} Fundamentals`,
    description: `Master the basics of ${randomCategory} with engaging, interactive lessons`,
    level: randomLevel,
    category: randomCategory,
    totalLessons,
    completedLessons,
    estimatedDuration: totalLessons * 15,
    thumbnail: getCategoryEmoji(randomCategory),
    isLocked: Math.random() > 0.7,
    points: totalLessons * 10,
    badges: []
  };
}

function getCategoryEmoji(category: string): string {
  const emojis: Record<string, string> = {
    math: '🔢',
    science: '🔬',
    language: '📚',
    social: '🏛️',
    arts: '🎨',
    technology: '💻'
  };
  return emojis[category] || '📖';
}