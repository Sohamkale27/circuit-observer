import { StudentProfile, LearningStats } from '@/types/education';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Trophy, 
  Flame, 
  Clock, 
  Target, 
  TrendingUp, 
  Award,
  BookOpen,
  Calendar
} from 'lucide-react';

interface StudentStatsProps {
  profile: StudentProfile;
  stats: LearningStats;
}

export const StudentStats = ({ profile, stats }: StudentStatsProps) => {
  const nextLevelPoints = (profile.level + 1) * 100;
  const currentLevelPoints = profile.level * 100;
  const progressToNext = ((profile.totalPoints - currentLevelPoints) / (nextLevelPoints - currentLevelPoints)) * 100;

  return (
    <div className="space-y-6">
      {/* Profile Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="text-4xl">{profile.avatar}</div>
            <div>
              <CardTitle className="text-xl">{profile.name}</CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="bg-learning-progress text-white">
                  Level {profile.level}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {profile.totalPoints} points
                </span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between items-center text-sm mb-2">
              <span>Progress to Level {profile.level + 1}</span>
              <span>{Math.round(progressToNext)}%</span>
            </div>
            <Progress value={progressToNext} className="h-2" />
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-learning-new" />
              <div>
                <div className="font-medium">{profile.currentStreak}</div>
                <div className="text-muted-foreground">Day streak</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-learning-progress" />
              <div>
                <div className="font-medium">{profile.completedCourses}</div>
                <div className="text-muted-foreground">Courses done</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Learning Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Learning Stats
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-learning-progress">
                {stats.todayMinutes}
              </div>
              <div className="text-sm text-muted-foreground">Minutes today</div>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-learning-completed">
                {stats.weeklyMinutes}
              </div>
              <div className="text-sm text-muted-foreground">This week</div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Completion Rate</span>
              <span className="font-medium">{stats.completionRate}%</span>
            </div>
            <Progress value={stats.completionRate} className="h-2" />
            
            <div className="flex justify-between items-center text-sm">
              <span>Strongest: {stats.strongestSubject}</span>
              <span className="text-learning-completed">📈</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span>Focus on: {stats.weakestSubject}</span>
              <span className="text-learning-new">🎯</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          {profile.achievements.length === 0 ? (
            <p className="text-muted-foreground text-sm">No achievements yet. Keep learning!</p>
          ) : (
            <div className="space-y-3">
              {profile.achievements.slice(0, 3).map((achievement) => (
                <div key={achievement.id} className="flex items-center gap-3 p-2 bg-muted/30 rounded-lg">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{achievement.title}</div>
                    <div className="text-xs text-muted-foreground">{achievement.description}</div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    +{achievement.points}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};