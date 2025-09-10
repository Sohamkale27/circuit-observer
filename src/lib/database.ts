import Dexie, { Table } from 'dexie';

// IndexedDB schemas for offline storage
export interface OfflineCourse {
  id: string;
  title: string;
  description: string;
  level: string;
  category: string;
  content: any;
  lastSync: Date;
}

export interface OfflineProgress {
  id: string;
  studentId: string;
  courseId: string;
  lessonId?: string;
  progressData: any;
  timestamp: Date;
  synced: number; // 0 for false, 1 for true (IndexedDB compatible)
}

export interface OfflineGameScore {
  id: string;
  studentId: string;
  gameId: string;
  score: number;
  achievements: string[];
  timestamp: Date;
  synced: number; // 0 for false, 1 for true (IndexedDB compatible)
}

export interface OfflineStudent {
  id: string;
  name: string;
  avatar: string;
  level: number;
  totalPoints: number;
  achievements: any[];
  lastSync: Date;
}

export class OfflineDatabase extends Dexie {
  courses!: Table<OfflineCourse>;
  progress!: Table<OfflineProgress>;
  gameScores!: Table<OfflineGameScore>;
  students!: Table<OfflineStudent>;

  constructor() {
    super('RuralLearningDB');
    
    this.version(1).stores({
      courses: 'id, category, level, lastSync',
      progress: '++id, studentId, courseId, lessonId, timestamp, synced',
      gameScores: '++id, studentId, gameId, timestamp, synced',
      students: 'id, lastSync'
    });
  }

  // Sync methods for when online
  async syncToServer() {
    try {
      // Sync unsynced progress
      const unsyncedProgress = await this.progress.where('synced').equals(0).toArray();
      for (const progress of unsyncedProgress) {
        await this.syncProgressToServer(progress);
      }

      // Sync unsynced game scores
      const unsyncedScores = await this.gameScores.where('synced').equals(0).toArray();
      for (const score of unsyncedScores) {
        await this.syncGameScoreToServer(score);
      }

      console.log('Offline data synced successfully');
    } catch (error) {
      console.error('Sync failed:', error);
    }
  }

  private async syncProgressToServer(progress: OfflineProgress) {
    // Implementation would send to actual server
    console.log('Syncing progress to server:', progress);
    await this.progress.update(progress.id!, { synced: 1 });
  }

  private async syncGameScoreToServer(score: OfflineGameScore) {
    // Implementation would send to actual server  
    console.log('Syncing game score to server:', score);
    await this.gameScores.update(score.id!, { synced: 1 });
  }

  async saveProgress(studentId: string, courseId: string, lessonId: string, progressData: any) {
    await this.progress.add({
      id: `${studentId}-${courseId}-${lessonId}-${Date.now()}`,
      studentId,
      courseId,
      lessonId,
      progressData,
      timestamp: new Date(),
      synced: navigator.onLine ? 1 : 0
    });
  }

  async saveGameScore(studentId: string, gameId: string, score: number, achievements: string[] = []) {
    await this.gameScores.add({
      id: `${studentId}-${gameId}-${Date.now()}`,
      studentId,
      gameId,
      score,
      achievements,
      timestamp: new Date(),
      synced: navigator.onLine ? 1 : 0
    });
  }
}

export const db = new OfflineDatabase();