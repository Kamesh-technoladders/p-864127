
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, RefreshCcw, List } from "lucide-react";
import { useWorkTime } from "@/hooks/useWorkTime";
import { WorkTimeHistoryModal } from "../modals/WorkTimeHistoryModal";
import { supabase } from "@/integrations/supabase/client";

interface TimeTrackerCardProps {
  employeeId: string;
}

export const TimeTrackerCard: React.FC<TimeTrackerCardProps> = ({ employeeId }) => {
  const {
    isLoading,
    activeSession,
    elapsedTime,
    startTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
    formatTime,
  } = useWorkTime(employeeId);

  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [workTimeEntries, setWorkTimeEntries] = useState([]);

  const fetchWorkTimeHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('employee_work_times')
        .select('*')
        .eq('employee_id', employeeId)
        .order('start_time', { ascending: false })
        .limit(50);

      if (error) throw error;
      setWorkTimeEntries(data || []);
    } catch (error) {
      console.error('Error fetching work time history:', error);
    }
  };

  useEffect(() => {
    if (isHistoryModalOpen) {
      fetchWorkTimeHistory();
    }
  }, [isHistoryModalOpen, employeeId]);

  const handleAction = async (action: 'start' | 'pause' | 'resume' | 'reset') => {
    if (isLoading) return;

    switch (action) {
      case 'start':
        await startTimer();
        break;
      case 'pause':
        await pauseTimer();
        break;
      case 'resume':
        await resumeTimer();
        break;
      case 'reset':
        await resetTimer();
        break;
    }
  };

  return (
    <>
      <Card className="p-6 hover:shadow-md transition-shadow bg-white/80 backdrop-blur-sm h-full flex flex-col justify-between">
        <div className="flex-1 flex flex-col items-center justify-center">
          <h3 className="font-medium mb-4">Time Tracker</h3>
          <div className="relative w-28 h-28">
            <div className={`absolute inset-0 rounded-full border-4 ${
              activeSession?.status === 'running' 
                ? 'border-brand-accent animate-pulse' 
                : 'border-gray-200'
            }`} />
            <div className="absolute inset-2 rounded-full border-2 border-brand-accent/50" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-3xl font-bold">{formatTime(elapsedTime)}</div>
            </div>
          </div>
          <div className="text-sm text-gray-500 mt-2">
            {activeSession?.status === 'running' ? 'Currently Working' : 'Work Time'}
          </div>
        </div>
        <div className="flex justify-center gap-4 mt-4">
          {!activeSession ? (
            <Button
              size="icon"
              variant="outline"
              className="hover:bg-brand-accent/10 w-10 h-10"
              onClick={() => handleAction('start')}
              disabled={isLoading}
            >
              <Play className="h-4 w-4" />
            </Button>
          ) : activeSession.status === 'running' ? (
            <Button
              size="icon"
              variant="outline"
              className="hover:bg-brand-accent/10 w-10 h-10"
              onClick={() => handleAction('pause')}
              disabled={isLoading}
            >
              <Pause className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              size="icon"
              variant="outline"
              className="hover:bg-brand-accent/10 w-10 h-10"
              onClick={() => handleAction('resume')}
              disabled={isLoading}
            >
              <Play className="h-4 w-4" />
            </Button>
          )}
          <Button
            size="icon"
            variant="outline"
            className="hover:bg-brand-accent/10 w-10 h-10"
            onClick={() => handleAction('reset')}
            disabled={isLoading || !activeSession}
          >
            <RefreshCcw className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            className="hover:bg-brand-accent/10 w-10 h-10"
            onClick={() => setIsHistoryModalOpen(true)}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </Card>

      <WorkTimeHistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        entries={workTimeEntries}
      />
    </>
  );
};
