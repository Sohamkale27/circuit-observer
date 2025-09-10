import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Bell, 
  Settings, 
  Trophy,
  Flame,
  RefreshCw
} from 'lucide-react';

interface LearningHeaderProps {
  studentName: string;
  currentStreak: number;
  totalPoints: number;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export const LearningHeader = ({ 
  studentName, 
  currentStreak, 
  totalPoints,
  onRefresh,
  isRefreshing = false 
}: LearningHeaderProps) => {
  return (
    <header className="bg-card/80 backdrop-blur-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="text-2xl">🎓</div>
              <div>
                <h1 className="text-xl font-bold">
                  Welcome back, {studentName}!
                </h1>
                <p className="text-sm text-muted-foreground">
                  Ready to continue your learning journey?
                </p>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search courses..."
                className="pl-10 w-64"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center gap-3">
              <Badge variant="outline" className="bg-learning-new text-white">
                <Flame className="w-3 h-3 mr-1" />
                {currentStreak} day streak
              </Badge>
              <Badge variant="outline" className="bg-learning-progress text-white">
                <Trophy className="w-3 h-3 mr-1" />
                {totalPoints.toLocaleString()} points
              </Badge>
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={onRefresh}
              disabled={isRefreshing}
              className="relative"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </Button>

            <Button variant="outline" size="icon">
              <Bell className="w-4 h-4" />
            </Button>

            <Button variant="outline" size="icon">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Mobile stats */}
        <div className="sm:hidden flex justify-center gap-4 mt-4">
          <Badge variant="outline" className="bg-learning-new text-white">
            <Flame className="w-3 h-3 mr-1" />
            {currentStreak} days
          </Badge>
          <Badge variant="outline" className="bg-learning-progress text-white">
            <Trophy className="w-3 h-3 mr-1" />
            {totalPoints.toLocaleString()}
          </Badge>
        </div>
      </div>
    </header>
  );
};