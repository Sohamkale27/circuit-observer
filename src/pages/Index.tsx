import { useState, useEffect } from 'react';
import { LearningHeader } from '@/components/LearningHeader';
import { CourseCard } from '@/components/CourseCard';
import { StudentStats } from '@/components/StudentStats';
import { GameCard } from '@/components/GameCard';
import { TeacherDashboard } from '@/components/TeacherDashboard';
import { OfflineIndicator } from '@/components/OfflineIndicator';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { sampleCourses, sampleProfile, sampleStats } from '@/data/educationData';
import { Course, Achievement } from '@/types/education';
import { GameConfig } from '@/types/games';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Users, Gamepad2, Trophy, BookOpen } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import educationBg from '@/assets/education-bg.jpg';
import '@/lib/i18n';

const Index = () => {
  const { t } = useTranslation();
  const [courses, setCourses] = useState<Course[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [profile] = useState(sampleProfile);
  const [stats] = useState(sampleStats);
  const [activeTab, setActiveTab] = useState('courses');
  const [userRole, setUserRole] = useState<'student' | 'teacher'>('student');

  // Sample games data
  const sampleGames: GameConfig[] = [
    {
      id: 'math-challenge',
      title: 'math_game',
      description: 'Solve math problems quickly to earn points',
      category: 'math',
      difficulty: 'medium',
      estimatedTime: 10,
      points: 50,
      thumbnail: '🔢'
    },
    {
      id: 'science-lab',
      title: 'science_lab',
      description: 'Conduct virtual experiments and learn',
      category: 'science',
      difficulty: 'easy',
      estimatedTime: 15,
      points: 75,
      thumbnail: '🧪'
    },
    {
      id: 'word-builder',
      title: 'word_builder',
      description: 'Build vocabulary with fun word games',
      category: 'language',
      difficulty: 'easy',
      estimatedTime: 8,
      points: 40,
      thumbnail: '📝'
    }
  ];

  const loadData = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setCourses(sampleCourses);
      setIsRefreshing(false);
    }, 1000);
  };

  useEffect(() => {
    loadData();
    
    // Register service worker for PWA
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('SW registered: ', registration);
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }
  }, []);

  const handleContinueCourse = (courseId: string) => {
    console.log('Continue course:', courseId);
    // Navigate to course detail page
  };

  const handlePlayGame = (gameId: string) => {
    console.log('Play game:', gameId);
    // Navigate to game page  
  };

  return (
    <div className="min-h-screen bg-background">
      <OfflineIndicator />
      
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url(${educationBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      />
      
      <div className="relative">
        <LearningHeader 
          studentName={profile.name}
          currentStreak={profile.currentStreak}
          totalPoints={profile.totalPoints}
          onRefresh={loadData}
          isRefreshing={isRefreshing}
        />

        <div className="container mx-auto px-6 py-8">
          {userRole === 'teacher' ? (
            <TeacherDashboard />
          ) : (
            <div className="grid lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1 space-y-4">
                <StudentStats profile={profile} stats={stats} />
                
                {/* Role Switcher for Demo */}
                <div className="flex gap-2">
                  <Button 
                    variant={userRole === 'student' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setUserRole('student')}
                    className="flex-1"
                  >
                    Student
                  </Button>
                  <Button 
                    variant={userRole === 'teacher' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setUserRole('teacher')}
                    className="flex-1"
                  >
                    Teacher
                  </Button>
                </div>
                
                <LanguageSwitcher />
              </div>
              
              <div className="lg:col-span-3">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="courses" className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      <span className="hidden sm:inline">{t('my_courses')}</span>
                    </TabsTrigger>
                    <TabsTrigger value="games" className="flex items-center gap-2">
                      <Gamepad2 className="w-4 h-4" />
                      <span className="hidden sm:inline">Games</span>
                    </TabsTrigger>
                    <TabsTrigger value="achievements" className="flex items-center gap-2">
                      <Trophy className="w-4 h-4" />
                      <span className="hidden sm:inline">{t('achievements')}</span>
                    </TabsTrigger>
                    <TabsTrigger value="community" className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span className="hidden sm:inline">Community</span>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="courses" className="space-y-6">
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold mb-2">{t('my_courses')}</h2>
                      <p className="text-muted-foreground">{t('continue_journey')}</p>
                    </div>
                    
                    {courses.length === 0 ? (
                      <div className="flex items-center justify-center h-64 bg-card/30 rounded-lg border border-dashed">
                        <div className="text-center">
                          <div className="text-muted-foreground mb-2">{t('loading_courses')}</div>
                          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                        </div>
                      </div>
                    ) : (
                      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {courses.map((course) => (
                          <CourseCard 
                            key={course.id} 
                            course={course} 
                            onContinue={handleContinueCourse}
                          />
                        ))}
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="games" className="space-y-6">
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold mb-2">Educational Games</h2>
                      <p className="text-muted-foreground">Learn through play and earn points</p>
                    </div>
                    
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                      {sampleGames.map((game) => (
                        <GameCard 
                          key={game.id} 
                          game={game} 
                          onPlay={handlePlayGame}
                        />
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="achievements" className="space-y-6">
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold mb-2">{t('achievements')}</h2>
                      <p className="text-muted-foreground">Your learning milestones and rewards</p>
                    </div>
                    
                    <div className="grid gap-4 md:grid-cols-2">
                      {profile.achievements.map((achievement) => (
                        <div key={achievement.id} className="p-4 bg-card rounded-lg border">
                          <div className="flex items-center gap-3">
                            <div className="text-2xl">{achievement.icon}</div>
                            <div className="flex-1">
                              <h3 className="font-semibold">{achievement.title}</h3>
                              <p className="text-sm text-muted-foreground">{achievement.description}</p>
                            </div>
                            <div className="text-learning-new font-medium">+{achievement.points}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="community" className="space-y-6">
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold mb-2">Learning Community</h2>
                      <p className="text-muted-foreground">Connect with other learners</p>
                    </div>
                    
                    <div className="text-center py-12">
                      <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">Coming Soon</h3>
                      <p className="text-muted-foreground">Community features will be available soon!</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
