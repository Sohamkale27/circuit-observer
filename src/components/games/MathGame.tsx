import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Clock, Trophy, Heart, Zap, Play } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface MathProblem {
  question: string;
  answer: number;
  options?: number[];
}

interface GameState {
  score: number;
  lives: number;
  timeLeft: number;
  currentProblem: MathProblem | null;
  gameActive: boolean;
  level: number;
  streak: number;
}

export const MathGame = () => {
  const { t } = useTranslation();
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    lives: 3,
    timeLeft: 60,
    currentProblem: null,
    gameActive: false,
    level: 1,
    streak: 0
  });
  
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const timerRef = useRef<NodeJS.Timeout>();
  const inputRef = useRef<HTMLInputElement>(null);

  const generateProblem = (level: number): MathProblem => {
    const operations = ['+', '-', '*'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    
    let num1: number, num2: number, answer: number, question: string;
    
    switch (operation) {
      case '+':
        num1 = Math.floor(Math.random() * (10 * level)) + 1;
        num2 = Math.floor(Math.random() * (10 * level)) + 1;
        answer = num1 + num2;
        question = `${num1} + ${num2} = ?`;
        break;
      case '-':
        num1 = Math.floor(Math.random() * (10 * level)) + 10;
        num2 = Math.floor(Math.random() * num1) + 1;
        answer = num1 - num2;
        question = `${num1} - ${num2} = ?`;
        break;
      case '*':
        num1 = Math.floor(Math.random() * (5 * level)) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        answer = num1 * num2;
        question = `${num1} × ${num2} = ?`;
        break;
      default:
        num1 = 1; num2 = 1; answer = 2; question = '1 + 1 = ?';
    }

    return { question, answer };
  };

  const startGame = () => {
    setGameState({
      score: 0,
      lives: 3,
      timeLeft: 60,
      currentProblem: generateProblem(1),
      gameActive: true,
      level: 1,
      streak: 0
    });
    setUserAnswer('');
    setFeedback('');
    
    // Start timer
    timerRef.current = setInterval(() => {
      setGameState(prev => {
        if (prev.timeLeft <= 1) {
          return { ...prev, gameActive: false, timeLeft: 0 };
        }
        return { ...prev, timeLeft: prev.timeLeft - 1 };
      });
    }, 1000);
  };

  const checkAnswer = () => {
    if (!gameState.currentProblem || !gameState.gameActive) return;
    
    const userNum = parseInt(userAnswer);
    const correct = userNum === gameState.currentProblem.answer;
    
    if (correct) {
      const points = gameState.level * 10 + (gameState.streak * 5);
      setGameState(prev => ({
        ...prev,
        score: prev.score + points,
        streak: prev.streak + 1,
        level: Math.floor(prev.streak / 5) + 1,
        currentProblem: generateProblem(Math.floor(prev.streak / 5) + 1)
      }));
      setFeedback(`Correct! +${points} points`);
    } else {
      setGameState(prev => ({
        ...prev,
        lives: prev.lives - 1,
        streak: 0,
        gameActive: prev.lives > 1,
        currentProblem: prev.lives > 1 ? generateProblem(prev.level) : null
      }));
      setFeedback(`Wrong! The answer was ${gameState.currentProblem.answer}`);
    }
    
    setUserAnswer('');
    setTimeout(() => setFeedback(''), 2000);
    
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      checkAnswer();
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!gameState.gameActive && timerRef.current) {
      clearInterval(timerRef.current);
    }
  }, [gameState.gameActive]);

  if (!gameState.gameActive && gameState.score === 0) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="text-6xl mb-4">🔢</div>
          <CardTitle className="text-2xl">{t('math_game')}</CardTitle>
          <p className="text-muted-foreground">
            Solve math problems as quickly as possible!
          </p>
        </CardHeader>
        <CardContent>
          <Button onClick={startGame} className="w-full" size="lg">
            <Play className="w-5 h-5 mr-2" />
            Start Game
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <Badge variant="outline" className="bg-learning-progress text-white">
            Level {gameState.level}
          </Badge>
          <Badge variant="outline">
            <Zap className="w-3 h-3 mr-1" />
            {gameState.streak} streak
          </Badge>
        </div>
        
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <Trophy className="w-5 h-5 mx-auto mb-1 text-learning-new" />
            <div className="font-bold">{gameState.score}</div>
            <div className="text-xs text-muted-foreground">Score</div>
          </div>
          <div>
            <Heart className="w-5 h-5 mx-auto mb-1 text-destructive" />
            <div className="font-bold">{gameState.lives}</div>
            <div className="text-xs text-muted-foreground">Lives</div>
          </div>
          <div>
            <Clock className="w-5 h-5 mx-auto mb-1 text-learning-progress" />
            <div className="font-bold">{gameState.timeLeft}</div>
            <div className="text-xs text-muted-foreground">Time</div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <Progress value={(gameState.timeLeft / 60) * 100} className="h-2" />
        
        {gameState.gameActive && gameState.currentProblem ? (
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold mb-4">
                {gameState.currentProblem.question}
              </div>
              
              <Input
                ref={inputRef}
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Your answer..."
                className="text-center text-xl"
                autoFocus
              />
            </div>
            
            {feedback && (
              <div className={`text-center p-2 rounded-lg ${
                feedback.includes('Correct') ? 'bg-learning-completed/20 text-learning-completed' : 'bg-destructive/20 text-destructive'
              }`}>
                {feedback}
              </div>
            )}
            
            <Button onClick={checkAnswer} className="w-full" disabled={!userAnswer}>
              Submit Answer
            </Button>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <div className="text-2xl font-bold">Game Over!</div>
            <div className="text-lg">Final Score: {gameState.score}</div>
            <div className="text-sm text-muted-foreground">
              {gameState.lives === 0 ? 'No lives left!' : 'Time\'s up!'}
            </div>
            <Button onClick={startGame} className="w-full">
              Play Again
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};