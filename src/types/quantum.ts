export type JobStatus = 'running' | 'completed' | 'queued' | 'failed' | 'cancelled';

export interface QuantumJob {
  id: string;
  name: string;
  status: JobStatus;
  backend: string;
  shots: number;
  qubits: number;
  depth: number;
  createdAt: Date;
  startedAt?: Date;
  completedAt?: Date;
  estimatedCompletion?: Date;
  user: string;
  priority: 'low' | 'normal' | 'high';
  errorMessage?: string;
}

export interface BackendInfo {
  name: string;
  qubits: number;
  status: 'online' | 'offline' | 'maintenance';
  pending_jobs: number;
}