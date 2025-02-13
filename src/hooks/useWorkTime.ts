import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useWorkSession } from './workTime/useWorkSession';
import { useTimeFormat } from './workTime/useTimeFormat';
import { useTimer } from './workTime/useTimer';
import { WorkTimeSession } from '@/types/workTime';

export const useWorkTime = (employeeId: string) => {
  const { activeSession, setActiveSession, isLoading, setIsLoading, checkActiveSession } = useWorkSession(employeeId);
  const { formatTime } = useTimeFormat();
  const { elapsedTime } = useTimer(activeSession);
  const [isPauseModalOpen, setIsPauseModalOpen] = useState(false);

  const startTimer = async () => {
    console.log('Starting timer for employee:', employeeId);
    setIsLoading(true);
    try {
      const date = new Date();
      const newSession = {
        employee_id: employeeId,
        start_time: date.toISOString(),
        date: date.toISOString().split('T')[0],
        status: 'running' as WorkTimeSession['status'],
      };

      const { data, error } = await supabase
        .from('employee_work_times')
        .insert([newSession])
        .select()
        .single();

      if (error) {
        console.error('Database error when starting timer:', error);
        const errorBody = JSON.parse(error.message);
        toast.error(errorBody.message || 'Failed to start timer');
        return;
      }

      if (data) {
        console.log('Timer started successfully:', data);
        setActiveSession({
          id: data.id,
          start_time: data.start_time,
          end_time: data.end_time,
          duration_minutes: data.duration_minutes,
          status: data.status as WorkTimeSession['status'],
          pause_reason: data.pause_reason,
          pause_start_time: data.pause_start_time,
          pause_end_time: data.pause_end_time,
          total_pause_duration_minutes: data.total_pause_duration_minutes,
          overtime_minutes: data.overtime_minutes,
          regular_hours_completed: data.regular_hours_completed
        });
        toast.success('Timer started successfully');
      }
    } catch (error: any) {
      console.error('Error starting timer:', error);
      toast.error('Failed to start timer');
    } finally {
      setIsLoading(false);
    }
  };

  const pauseTimer = async (reason: string) => {
    if (!activeSession) {
      console.error('No active session to pause');
      return;
    }
    console.log('Pausing timer with reason:', reason);
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('employee_work_times')
        .update({
          status: 'paused' as WorkTimeSession['status'],
          pause_reason: reason,
          pause_start_time: new Date().toISOString()
        })
        .eq('id', activeSession.id)
        .select()
        .single();

      if (error) {
        console.error('Database error when pausing timer:', error);
        throw error;
      }

      if (data) {
        console.log('Timer paused successfully:', data);
        setActiveSession({
          id: data.id,
          start_time: data.start_time,
          end_time: data.end_time,
          duration_minutes: data.duration_minutes,
          status: data.status as WorkTimeSession['status'],
          pause_reason: data.pause_reason,
          pause_start_time: data.pause_start_time,
          pause_end_time: data.pause_end_time,
          total_pause_duration_minutes: data.total_pause_duration_minutes,
          overtime_minutes: data.overtime_minutes,
          regular_hours_completed: data.regular_hours_completed
        });
        toast.success('Timer paused');
      }
    } catch (error) {
      console.error('Error pausing timer:', error);
      toast.error('Failed to pause timer');
    } finally {
      setIsLoading(false);
    }
  };

  const resumeTimer = async () => {
    if (!activeSession) {
      console.error('No active session to resume');
      return;
    }
    console.log('Resuming timer');
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('employee_work_times')
        .update({
          status: 'running' as WorkTimeSession['status'],
          pause_end_time: new Date().toISOString()
        })
        .eq('id', activeSession.id)
        .select()
        .single();

      if (error) {
        console.error('Database error when resuming timer:', error);
        throw error;
      }

      if (data) {
        console.log('Timer resumed successfully:', data);
        setActiveSession({
          id: data.id,
          start_time: data.start_time,
          end_time: data.end_time,
          duration_minutes: data.duration_minutes,
          status: data.status as WorkTimeSession['status'],
          pause_reason: data.pause_reason,
          pause_start_time: data.pause_start_time,
          pause_end_time: data.pause_end_time,
          total_pause_duration_minutes: data.total_pause_duration_minutes,
          overtime_minutes: data.overtime_minutes,
          regular_hours_completed: data.regular_hours_completed
        });
        toast.success('Timer resumed');
      }
    } catch (error) {
      console.error('Error resuming timer:', error);
      toast.error('Failed to resume timer');
    } finally {
      setIsLoading(false);
    }
  };

  const resetTimer = async () => {
    if (!activeSession) {
      console.error('No active session to reset');
      return;
    }
    console.log('Resetting timer');
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('employee_work_times')
        .update({ 
          status: 'completed' as WorkTimeSession['status'], 
          end_time: new Date().toISOString()
        })
        .eq('id', activeSession.id)
        .select()
        .single();

      if (error) {
        console.error('Database error when resetting timer:', error);
        throw error;
      }

      console.log('Timer reset successfully');
      setActiveSession(null);
      toast.success('Timer reset');
    } catch (error) {
      console.error('Error resetting timer:', error);
      toast.error('Failed to reset timer');
    } finally {
      setIsLoading(false);
    }
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
    isPauseModalOpen,
    setIsPauseModalOpen
  };
};
