export interface GameConfig {
  id: string;
  title: string;
  description: string;
  category: 'math' | 'science' | 'language' | 'logic';
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: number; // in minutes
  points: number;
  thumbnail: string;
}

export interface GameScore {
  gameId: string;
  studentId: string;
  score: number;
  maxScore: number;
  completionTime: number; // in seconds
  timestamp: Date;
  achievements: string[];
}

export interface GameProgress {
  gameId: string;
  studentId: string;
  level: number;
  highScore: number;
  timesPlayed: number;
  averageScore: number;
  lastPlayed: Date;
}

export interface GameAchievement {
  id: string;
  gameId: string;
  title: string;
  description: string;
  icon: string;
  condition: string; // e.g., "score >= 100", "time < 60"
  points: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}