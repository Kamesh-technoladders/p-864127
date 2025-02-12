
export interface WorkTimeSession {
  id: string;
  start_time: string;
  end_time: string | null;
  duration_minutes: number | null;
  status: 'running' | 'completed' | 'paused';
  pause_reason?: string;
  pause_start_time?: string;
  pause_end_time?: string;
  total_pause_duration_minutes?: number;
}

export type WorkTimeAction = 'start' | 'pause' | 'resume' | 'reset' | 'stop';
