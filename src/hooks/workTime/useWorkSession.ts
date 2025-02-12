
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { WorkTimeSession } from '@/types/workTime';
import { toast } from "sonner";

export const useWorkSession = (employeeId: string) => {
  const [activeSession, setActiveSession] = useState<WorkTimeSession | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const checkActiveSession = async () => {
    try {
      const { data, error } = await supabase
        .from('employee_work_times')
        .select('*')
        .eq('employee_id', employeeId)
        .eq('status', 'running')
        .order('start_time', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setActiveSession({
          id: data.id,
          start_time: data.start_time,
          end_time: data.end_time,
          duration_minutes: data.duration_minutes,
          status: data.status,
          pause_reason: data.pause_reason,
          pause_start_time: data.pause_start_time,
          pause_end_time: data.pause_end_time,
          total_pause_duration_minutes: data.total_pause_duration_minutes
        });
      }
    } catch (error) {
      console.error('Error checking active session:', error);
      toast.error('Failed to check active session');
    }
  };

  useEffect(() => {
    checkActiveSession();
  }, [employeeId]);

  return {
    activeSession,
    setActiveSession,
    isLoading,
    setIsLoading,
    checkActiveSession
  };
};
