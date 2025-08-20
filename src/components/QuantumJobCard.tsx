import { Clock, Zap, Users, AlertCircle, CheckCircle2, Loader2, XCircle, PauseCircle } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { QuantumJob } from '@/types/quantum';
import { cn } from '@/lib/utils';

interface QuantumJobCardProps {
  job: QuantumJob;
}

const statusConfig = {
  running: {
    icon: Loader2,
    color: 'quantum-running',
    bgColor: 'bg-cyan-500/10',
    label: 'Running',
    animate: true
  },
  completed: {
    icon: CheckCircle2,
    color: 'quantum-completed',
    bgColor: 'bg-green-500/10',
    label: 'Completed',
    animate: false
  },
  queued: {
    icon: Clock,
    color: 'quantum-queued',
    bgColor: 'bg-yellow-500/10',
    label: 'Queued',
    animate: false
  },
  failed: {
    icon: XCircle,
    color: 'quantum-failed',
    bgColor: 'bg-red-500/10',
    label: 'Failed',
    animate: false
  },
  cancelled: {
    icon: PauseCircle,
    color: 'quantum-cancelled',
    bgColor: 'bg-gray-500/10',
    label: 'Cancelled',
    animate: false
  }
};

export function QuantumJobCard({ job }: QuantumJobCardProps) {
  const config = statusConfig[job.status];
  const StatusIcon = config.icon;

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(date);
  };

  const formatDuration = (start: Date, end?: Date) => {
    const endTime = end || new Date();
    const diff = endTime.getTime() - start.getTime();
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="group hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={cn(
              "p-2 rounded-lg",
              config.bgColor
            )}>
              <StatusIcon 
                className={cn(
                  "h-4 w-4",
                  `text-${config.color}`,
                  config.animate && "animate-spin"
                )} 
              />
            </div>
            <div>
              <h3 className="font-semibold text-sm">{job.name}</h3>
              <p className="text-xs text-muted-foreground">#{job.id}</p>
            </div>
          </div>
          <Badge 
            variant="secondary" 
            className={cn(
              "text-xs",
              `border-${config.color}`,
              `text-${config.color}`
            )}
          >
            {config.label}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div className="flex items-center gap-2">
            <Zap className="h-3 w-3 text-muted-foreground" />
            <span className="text-muted-foreground">Backend:</span>
            <span className="font-mono">{job.backend}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Users className="h-3 w-3 text-muted-foreground" />
            <span className="text-muted-foreground">User:</span>
            <span className="font-mono">{job.user}</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="text-center p-2 bg-muted/50 rounded">
            <div className="font-mono font-semibold">{job.qubits}</div>
            <div className="text-muted-foreground">Qubits</div>
          </div>
          <div className="text-center p-2 bg-muted/50 rounded">
            <div className="font-mono font-semibold">{job.shots.toLocaleString()}</div>
            <div className="text-muted-foreground">Shots</div>
          </div>
          <div className="text-center p-2 bg-muted/50 rounded">
            <div className="font-mono font-semibold">{job.depth}</div>
            <div className="text-muted-foreground">Depth</div>
          </div>
        </div>

        <div className="flex justify-between items-center text-xs text-muted-foreground pt-2 border-t">
          <span>Started: {formatTime(job.createdAt)}</span>
          {job.startedAt && (
            <span>
              Duration: {formatDuration(job.startedAt, job.completedAt)}
            </span>
          )}
        </div>

        {job.errorMessage && (
          <div className="flex items-center gap-2 p-2 bg-destructive/10 rounded text-xs">
            <AlertCircle className="h-3 w-3 text-destructive" />
            <span className="text-destructive">{job.errorMessage}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}