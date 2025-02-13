
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { WorkTimeSession } from '@/types/workTime';
import { toast } from "sonner";

export const useWorkSession = (employeeId: string) => {
  const [activeSession, setActiveSession] = useState<WorkTimeSession | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const checkActiveSession = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('employee_work_times')
        .select('*')
        .eq('employee_id', employeeId)
        .or('status.eq.running,status.eq.paused')
        .order('start_time', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error('Database error:', error);
        throw error;
      }

      if (data) {
        console.log('Active session found:', data);
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
      } else {
        console.log('No active session found');
        setActiveSession(null);
      }
    } catch (error) {
      console.error('Error checking active session:', error);
      toast.error('Failed to check active session');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkActiveSession();

    // Subscribe to real-time changes
    const channel = supabase
      .channel('work-time-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'employee_work_times',
          filter: `employee_id=eq.${employeeId}`
        },
        (payload) => {
          console.log('Realtime update received:', payload);
          checkActiveSession();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [employeeId]);

  return {
    activeSession,
    setActiveSession,
    isLoading,
    setIsLoading,
    checkActiveSession
  };
};
