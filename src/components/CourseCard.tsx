import { Course } from '@/types/education';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Trophy, Lock, Play, CheckCircle } from 'lucide-react';

interface CourseCardProps {
  course: Course;
  onContinue?: (courseId: string) => void;
}

export const CourseCard = ({ course, onContinue }: CourseCardProps) => {
  const progressPercentage = (course.completedLessons / course.totalLessons) * 100;
  const isCompleted = course.completedLessons === course.totalLessons;
  
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-learning-new text-white';
      case 'intermediate': return 'bg-learning-progress text-white';
      case 'advanced': return 'bg-learning-mastered text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      math: 'bg-blue-100 text-blue-800',
      science: 'bg-green-100 text-green-800',
      language: 'bg-purple-100 text-purple-800',
      social: 'bg-orange-100 text-orange-800',
      arts: 'bg-pink-100 text-pink-800',
      technology: 'bg-indigo-100 text-indigo-800'
    };
    return colors[category] || 'bg-muted text-muted-foreground';
  };

  return (
    <Card className={`h-full transition-all duration-300 hover:shadow-lg ${
      course.isLocked ? 'opacity-75' : 'hover:-translate-y-1'
    }`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="text-4xl mb-2">{course.thumbnail}</div>
          <div className="flex gap-2">
            <Badge className={getLevelColor(course.level)} variant="secondary">
              {course.level}
            </Badge>
            {course.isLocked && <Lock className="w-4 h-4 text-learning-locked" />}
          </div>
        </div>
        <h3 className="font-semibold text-lg leading-tight">{course.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
      </CardHeader>

      <CardContent className="space-y-4">
        <Badge className={getCategoryColor(course.category)} variant="outline">
          {course.category}
        </Badge>

        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">
              {course.completedLessons}/{course.totalLessons} lessons
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{course.estimatedDuration}min</span>
          </div>
          <div className="flex items-center gap-1">
            <Trophy className="w-4 h-4" />
            <span>{course.points} points</span>
          </div>
        </div>

        {course.badges.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {course.badges.map((badge, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {badge}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter>
        {course.isLocked ? (
          <Button variant="outline" disabled className="w-full">
            <Lock className="w-4 h-4 mr-2" />
            Locked
          </Button>
        ) : isCompleted ? (
          <Button variant="outline" className="w-full" onClick={() => onContinue?.(course.id)}>
            <CheckCircle className="w-4 h-4 mr-2" />
            Review
          </Button>
        ) : (
          <Button 
            className="w-full" 
            onClick={() => onContinue?.(course.id)}
          >
            <Play className="w-4 h-4 mr-2" />
            {course.completedLessons > 0 ? 'Continue' : 'Start'}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};