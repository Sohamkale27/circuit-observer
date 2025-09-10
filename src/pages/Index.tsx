import { useState, useEffect } from 'react';
import { LearningHeader } from '@/components/LearningHeader';
import { CourseCard } from '@/components/CourseCard';
import { StudentStats } from '@/components/StudentStats';
import { sampleCourses, sampleProfile, sampleStats } from '@/data/educationData';
import { Course } from '@/types/education';
import educationBg from '@/assets/education-bg.jpg';

const Index = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [profile] = useState(sampleProfile);
  const [stats] = useState(sampleStats);

  const loadData = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setCourses(sampleCourses);
      setIsRefreshing(false);
    }, 1000);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleContinueCourse = (courseId: string) => {
    console.log('Continue course:', courseId);
    // Navigate to course detail page
  };

  return (
    <div className="min-h-screen bg-background">
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
          <div className="grid lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <StudentStats profile={profile} stats={stats} />
            </div>
            
            <div className="lg:col-span-3">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Your Courses</h2>
                <p className="text-muted-foreground">Continue your learning journey</p>
              </div>
              
              {courses.length === 0 ? (
                <div className="flex items-center justify-center h-64 bg-card/30 rounded-lg border border-dashed">
                  <div className="text-center">
                    <div className="text-muted-foreground mb-2">Loading your courses...</div>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
