import { QuantumJob, BackendInfo, JobStatus } from '@/types/quantum';

const ibmBackends = [
  'ibm_brisbane', 'ibm_kyoto', 'ibm_osaka', 'ibm_quebec', 'ibm_sherbrooke',
  'ibm_torino', 'ibm_nazca', 'ibm_peekskill', 'ibm_washington'
];

const users = [
  'alice.cooper', 'bob.martin', 'charlie.brown', 'diana.ross', 'edward.norton',
  'fiona.apple', 'george.lucas', 'helen.keller', 'ivan.petrov', 'jane.smith'
];

const jobNames = [
  'VQE_H2_optimization', 'QAOA_max_cut', 'Grover_search_4bit', 'Shor_factorization',
  'Quantum_ML_classifier', 'Bell_state_preparation', 'QFT_implementation',
  'Error_correction_test', 'Variational_classifier', 'Chemistry_simulation',
  'Portfolio_optimization', 'Quantum_walk_graph', 'Amplitude_estimation',
  'Phase_estimation_protocol', 'Quantum_teleportation'
];

function randomChoice<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomDate(minutesBack: number): Date {
  const now = new Date();
  return new Date(now.getTime() - Math.random() * minutesBack * 60 * 1000);
}

export function generateMockJobs(count: number = 20): QuantumJob[] {
  const jobs: QuantumJob[] = [];
  const statuses: JobStatus[] = ['running', 'completed', 'queued', 'failed', 'cancelled'];
  
  for (let i = 0; i < count; i++) {
    const status = randomChoice(statuses);
    const createdAt = randomDate(240); // Last 4 hours
    const qubits = randomChoice([5, 16, 27, 65, 127]);
    
    let startedAt: Date | undefined;
    let completedAt: Date | undefined;
    let estimatedCompletion: Date | undefined;
    let errorMessage: string | undefined;

    if (status === 'running') {
      startedAt = new Date(createdAt.getTime() + randomInt(1, 30) * 60 * 1000);
      estimatedCompletion = new Date(startedAt.getTime() + randomInt(2, 15) * 60 * 1000);
    } else if (status === 'completed') {
      startedAt = new Date(createdAt.getTime() + randomInt(1, 30) * 60 * 1000);
      completedAt = new Date(startedAt.getTime() + randomInt(1, 10) * 60 * 1000);
    } else if (status === 'failed') {
      startedAt = new Date(createdAt.getTime() + randomInt(1, 30) * 60 * 1000);
      completedAt = new Date(startedAt.getTime() + randomInt(1, 5) * 60 * 1000);
      errorMessage = randomChoice([
        'Quantum circuit compilation failed',
        'Backend calibration error',
        'Job timeout exceeded',
        'Invalid gate parameters',
        'Insufficient quantum volume'
      ]);
    }

    const job: QuantumJob = {
      id: `qjob_${Math.random().toString(36).substring(2, 15)}`,
      name: randomChoice(jobNames),
      status,
      backend: randomChoice(ibmBackends),
      shots: randomChoice([1024, 2048, 4096, 8192]),
      qubits,
      depth: randomInt(10, 200),
      createdAt,
      startedAt,
      completedAt,
      estimatedCompletion,
      user: randomChoice(users),
      priority: randomChoice(['low', 'normal', 'high']),
      errorMessage
    };

    jobs.push(job);
  }

  return jobs.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export function generateMockBackends(): BackendInfo[] {
  return [
    { name: 'ibm_brisbane', qubits: 127, status: 'online', pending_jobs: 23 },
    { name: 'ibm_kyoto', qubits: 127, status: 'online', pending_jobs: 45 },
    { name: 'ibm_osaka', qubits: 127, status: 'maintenance', pending_jobs: 0 },
    { name: 'ibm_quebec', qubits: 27, status: 'online', pending_jobs: 12 },
    { name: 'ibm_sherbrooke', qubits: 127, status: 'online', pending_jobs: 38 },
    { name: 'ibm_torino', qubits: 133, status: 'offline', pending_jobs: 0 },
  ];
}