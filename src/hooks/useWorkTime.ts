
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface WorkTimeSession {
  id: string;
  start_time: string;
  end_time: string | null;
  duration_minutes: number | null;
  status: 'running' | 'completed' | 'paused';
}

export const useWorkTime = (employeeId: string) => {
  const [activeSession, setActiveSession] = useState<WorkTimeSession | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    // Check for any running session on component mount
    const checkActiveSession = async () => {
      try {
        const { data, error } = await supabase
          .from('employee_work_times')
          .select('*')
          .eq('employee_id', employeeId)
          .eq('status', 'running')
          .order('start_time', { ascending: false })
          .limit(1)
          .single();

        if (error) throw error;

        if (data) {
          setActiveSession(data);
          // Calculate elapsed time for running session
          const startTime = new Date(data.start_time).getTime();
          const currentTime = new Date().getTime();
          setElapsedTime(Math.floor((currentTime - startTime) / 1000));
        }
      } catch (error) {
        console.error('Error checking active session:', error);
      }
    };

    checkActiveSession();
  }, [employeeId]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activeSession?.status === 'running') {
      interval = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeSession?.status]);

  const startTimer = async () => {
    setIsLoading(true);
    try {
      const newSession = {
        employee_id: employeeId,
        start_time: new Date().toISOString(),
        date: new Date().toISOString().split('T')[0],
        status: 'running',
      };

      const { data, error } = await supabase
        .from('employee_work_times')
        .insert([newSession])
        .select()
        .single();

      if (error) throw error;

      setActiveSession(data);
      setElapsedTime(0);
      toast.success('Timer started successfully');
    } catch (error) {
      console.error('Error starting timer:', error);
      toast.error('Failed to start timer');
    } finally {
      setIsLoading(false);
    }
  };

  const pauseTimer = async () => {
    if (!activeSession) return;
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('employee_work_times')
        .update({ status: 'paused', end_time: new Date().toISOString() })
        .eq('id', activeSession.id);

      if (error) throw error;

      setActiveSession(prev => prev ? { ...prev, status: 'paused' } : null);
      toast.success('Timer paused');
    } catch (error) {
      console.error('Error pausing timer:', error);
      toast.error('Failed to pause timer');
    } finally {
      setIsLoading(false);
    }
  };

  const resumeTimer = async () => {
    setIsLoading(true);
    try {
      const newSession = {
        employee_id: employeeId,
        start_time: new Date().toISOString(),
        date: new Date().toISOString().split('T')[0],
        status: 'running',
      };

      const { data, error } = await supabase
        .from('employee_work_times')
        .insert([newSession])
        .select()
        .single();

      if (error) throw error;

      setActiveSession(data);
      setElapsedTime(0);
      toast.success('Timer resumed');
    } catch (error) {
      console.error('Error resuming timer:', error);
      toast.error('Failed to resume timer');
    } finally {
      setIsLoading(false);
    }
  };

  const resetTimer = async () => {
    if (!activeSession) return;
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('employee_work_times')
        .update({ 
          status: 'completed', 
          end_time: new Date().toISOString()
        })
        .eq('id', activeSession.id);

      if (error) throw error;

      setActiveSession(null);
      setElapsedTime(0);
      toast.success('Timer reset');
    } catch (error) {
      console.error('Error resetting timer:', error);
      toast.error('Failed to reset timer');
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return {
    isLoading,
    activeSession,
    elapsedTime,
    startTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
    formatTime,
  };
};
