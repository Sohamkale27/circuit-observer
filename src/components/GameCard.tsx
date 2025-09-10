import { GameConfig, GameProgress } from '@/types/games';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Trophy, Play, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface GameCardProps {
  game: GameConfig;
  progress?: GameProgress;
  onPlay?: (gameId: string) => void;
}

export const GameCard = ({ game, progress, onPlay }: GameCardProps) => {
  const { t } = useTranslation();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-learning-completed text-white';
      case 'medium': return 'bg-learning-progress text-white';
      case 'hard': return 'bg-learning-mastered text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      math: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      science: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      language: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      logic: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
    };
    return colors[category] || 'bg-muted text-muted-foreground';
  };

  return (
    <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="text-4xl mb-2">{game.thumbnail}</div>
          <div className="flex gap-2">
            <Badge className={getDifficultyColor(game.difficulty)} variant="secondary">
              {game.difficulty}
            </Badge>
          </div>
        </div>
        <h3 className="font-semibold text-lg leading-tight">{t(game.title)}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{t(game.description)}</p>
      </CardHeader>

      <CardContent className="space-y-4">
        <Badge className={getCategoryColor(game.category)} variant="outline">
          {t(game.category)}
        </Badge>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{game.estimatedTime} {t('minutes')}</span>
          </div>
          <div className="flex items-center gap-1">
            <Trophy className="w-4 h-4" />
            <span>{game.points} {t('points')}</span>
          </div>
        </div>

        {progress && (
          <div className="space-y-2 p-3 bg-muted/30 rounded-lg">
            <div className="flex justify-between items-center text-sm">
              <span>{t('high_score')}:</span>
              <span className="font-medium flex items-center gap-1">
                <Star className="w-3 h-3 text-learning-new" />
                {progress.highScore}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span>Played:</span>
              <span className="font-medium">{progress.timesPlayed} times</span>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter>
        <Button 
          className="w-full" 
          onClick={() => onPlay?.(game.id)}
        >
          <Play className="w-4 h-4 mr-2" />
          {t('play_game')}
        </Button>
      </CardFooter>
    </Card>
  );
};