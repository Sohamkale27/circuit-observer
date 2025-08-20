import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BackendInfo } from '@/types/quantum';
import { Cpu, Activity, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BackendStatusProps {
  backends: BackendInfo[];
}

export function BackendStatus({ backends }: BackendStatusProps) {
  const getStatusColor = (status: BackendInfo['status']) => {
    switch (status) {
      case 'online': return 'quantum-completed';
      case 'offline': return 'quantum-failed';
      case 'maintenance': return 'quantum-queued';
      default: return 'muted-foreground';
    }
  };

  const getStatusBg = (status: BackendInfo['status']) => {
    switch (status) {
      case 'online': return 'bg-green-500/10';
      case 'offline': return 'bg-red-500/10';
      case 'maintenance': return 'bg-yellow-500/10';
      default: return 'bg-muted/50';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Activity className="h-5 w-5 text-primary" />
          Backend Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {backends.map((backend) => (
            <div 
              key={backend.name}
              className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  "p-1.5 rounded",
                  getStatusBg(backend.status)
                )}>
                  <Cpu className={cn(
                    "h-4 w-4",
                    `text-${getStatusColor(backend.status)}`
                  )} />
                </div>
                <div>
                  <div className="font-medium text-sm">{backend.name}</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <span>{backend.qubits} qubits</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{backend.pending_jobs} queued</span>
                </div>
                <Badge 
                  variant="secondary"
                  className={cn(
                    "text-xs capitalize",
                    `border-${getStatusColor(backend.status)}`,
                    `text-${getStatusColor(backend.status)}`
                  )}
                >
                  {backend.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}