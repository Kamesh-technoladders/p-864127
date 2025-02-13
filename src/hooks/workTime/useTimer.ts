
import { useState, useEffect } from 'react';
import { WorkTimeSession } from '@/types/workTime';

export const useTimer = (activeSession: WorkTimeSession | null) => {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (!activeSession) {
      setElapsedTime(0);
      return;
    }

    const calculateElapsedTime = () => {
      const startTime = new Date(activeSession.start_time).getTime();
      const currentTime = new Date().getTime();
      let totalElapsed = Math.floor((currentTime - startTime) / 1000);

      // Subtract pause durations if any
      if (activeSession.total_pause_duration_minutes) {
        totalElapsed -= activeSession.total_pause_duration_minutes * 60;
      }

      // If currently paused, subtract current pause duration
      if (activeSession.status === 'paused' && activeSession.pause_start_time) {
        const pauseStart = new Date(activeSession.pause_start_time).getTime();
        const currentPauseDuration = Math.floor((currentTime - pauseStart) / 1000);
        totalElapsed -= currentPauseDuration;
      }

      setElapsedTime(Math.max(0, totalElapsed));
    };

    calculateElapsedTime();

    const interval = setInterval(() => {
      if (activeSession.status === 'running') {
        calculateElapsedTime();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [activeSession]);

  return { elapsedTime, setElapsedTime };
};
