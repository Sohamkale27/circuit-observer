import { useState, useEffect } from 'react';
import { DashboardHeader } from '@/components/DashboardHeader';
import { QuantumJobCard } from '@/components/QuantumJobCard';
import { BackendStatus } from '@/components/BackendStatus';
import { generateMockJobs, generateMockBackends } from '@/data/mockData';
import { QuantumJob, BackendInfo } from '@/types/quantum';
import quantumBg from '@/assets/quantum-bg.jpg';

const Index = () => {
  const [jobs, setJobs] = useState<QuantumJob[]>([]);
  const [backends, setBackends] = useState<BackendInfo[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadData = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setJobs(generateMockJobs(20));
      setBackends(generateMockBackends());
      setIsRefreshing(false);
    }, 1000);
  };

  useEffect(() => {
    loadData();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      setJobs(generateMockJobs(20));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const runningJobs = jobs.filter(job => job.status === 'running').length;

  return (
    <div className="min-h-screen bg-background">
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url(${quantumBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      />
      
      <div className="relative">
        <DashboardHeader 
          totalJobs={jobs.length}
          runningJobs={runningJobs}
          onRefresh={loadData}
          isRefreshing={isRefreshing}
        />

        <div className="container mx-auto px-6 py-8">
          <div className="grid lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <BackendStatus backends={backends} />
            </div>
            
            <div className="lg:col-span-3">
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Active Jobs</h2>
              </div>
              
              {jobs.length === 0 ? (
                <div className="flex items-center justify-center h-64 bg-card/30 rounded-lg border border-dashed">
                  <div className="text-center">
                    <div className="text-muted-foreground mb-2">Loading quantum jobs...</div>
                    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                  </div>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {jobs.map((job) => (
                    <QuantumJobCard key={job.id} job={job} />
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
