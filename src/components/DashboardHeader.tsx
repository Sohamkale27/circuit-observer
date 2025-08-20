import { Activity, Zap, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DashboardHeaderProps {
  totalJobs: number;
  runningJobs: number;
  onRefresh: () => void;
  isRefreshing: boolean;
}

export function DashboardHeader({ totalJobs, runningJobs, onRefresh, isRefreshing }: DashboardHeaderProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-background via-background to-secondary/20 border-b border-border/50">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
      
      <div className="relative container mx-auto px-6 py-8">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                  IBM Quantum Dashboard
                </h1>
                <p className="text-muted-foreground">
                  Real-time monitoring of quantum computing jobs
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2 px-3 py-2 bg-card/50 rounded-lg border">
                <Activity className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Total Jobs:</span>
                <span className="font-semibold text-foreground">{totalJobs}</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-card/50 rounded-lg border">
                <div className="h-2 w-2 rounded-full bg-quantum-running animate-pulse" />
                <span className="text-muted-foreground">Running:</span>
                <span className="font-semibold text-quantum-running">{runningJobs}</span>
              </div>
            </div>

            <Button 
              variant="outline"
              size="sm"
              onClick={onRefresh}
              disabled={isRefreshing}
              className="gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}