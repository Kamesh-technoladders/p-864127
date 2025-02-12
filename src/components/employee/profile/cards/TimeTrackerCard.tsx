
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, RefreshCcw, List, Square, Coffee, UtensilsCrossed, AlertCircle } from "lucide-react";
import { useWorkTime } from "@/hooks/useWorkTime";
import { WorkTimeHistoryModal } from "../modals/WorkTimeHistoryModal";
import { PauseReasonModal } from "../modals/PauseReasonModal";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

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
  const [isPauseModalOpen, setIsPauseModalOpen] = useState(false);
  const [workTimeEntries, setWorkTimeEntries] = useState([]);
  const [pauseDuration, setPauseDuration] = useState(0);

  const checkOfficeHours = () => {
    const now = new Date();
    const hours = now.getHours();
    return hours >= 10 && hours < 18;
  };

  const handleAction = async (action: 'start' | 'pause' | 'resume' | 'reset' | 'stop') => {
    if (isLoading) return;

    if (action === 'start' && !checkOfficeHours()) {
      toast.error("Work can only be started between 10 AM and 6 PM");
      return;
    }

    try {
      switch (action) {
        case 'start':
          await startTimer();
          break;
        case 'pause':
          setIsPauseModalOpen(true);
          break;
        case 'resume':
          await resumeTimer();
          setPauseDuration(0);
          break;
        case 'reset':
        case 'stop':
          await resetTimer();
          setPauseDuration(0);
          break;
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    }
  };

  const handlePauseReasonSelect = async (reason: string) => {
    try {
      await pauseTimer(reason);
      setPauseDuration(0);
    } catch (error: any) {
      toast.error(error.message || "Failed to start break");
    }
  };

  const getPauseIcon = (reason?: string) => {
    switch (reason) {
      case 'Lunch Break':
        return <UtensilsCrossed className="h-4 w-4" />;
      case 'Coffee Break':
        return <Coffee className="h-4 w-4" />;
      default:
        return null;
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activeSession?.status === 'paused' && activeSession.pause_start_time) {
      interval = setInterval(() => {
        const pauseStart = new Date(activeSession.pause_start_time!).getTime();
        const currentTime = new Date().getTime();
        setPauseDuration(Math.floor((currentTime - pauseStart) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeSession?.status, activeSession?.pause_start_time]);

  const getBreakStatus = () => {
    if (!activeSession?.pause_reason) return null;
    const maxDuration = activeSession.pause_reason === 'Lunch Break' ? 45 : 15;
    const currentDuration = Math.floor(pauseDuration / 60);
    if (currentDuration > maxDuration) {
      return (
        <div className="text-xs text-red-600 mt-1 flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          Break exceeded by {currentDuration - maxDuration} minutes
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <Card className="p-6 hover:shadow-md transition-shadow bg-white/80 backdrop-blur-sm h-full flex flex-col justify-between relative">
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-4 right-4 hover:bg-brand-accent/10"
          onClick={() => setIsHistoryModalOpen(true)}
        >
          <List className="h-4 w-4" />
        </Button>

        <div className="flex-1 flex flex-col items-center justify-center">
          <h3 className="font-medium mb-6">Time Tracker</h3>
          <div className="relative w-36 h-36 mb-4">
            <div className={cn(
              "absolute inset-0 rounded-full border-4 transition-colors duration-300",
              activeSession?.status === 'running' 
                ? 'border-brand-accent animate-pulse bg-gradient-to-r from-brand-accent/10 to-brand-accent/5' 
                : activeSession?.status === 'paused'
                ? 'border-orange-400'
                : 'border-gray-200'
            )} />
            <div className="absolute inset-2 rounded-full border border-brand-accent/20" />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-4xl font-bold tracking-tight">{formatTime(elapsedTime)}</div>
              <div className="text-sm text-gray-500 mt-2">
                {activeSession?.status === 'running' ? 'Currently Working' : 
                 activeSession?.status === 'paused' ? 'Paused' : 
                 'Work Time'}
              </div>
            </div>
          </div>

          {activeSession?.status === 'paused' && (
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 bg-orange-50 rounded-full px-4 py-2 text-orange-600">
                {getPauseIcon(activeSession.pause_reason)}
                <span className="text-sm font-medium">{activeSession.pause_reason}</span>
                <span className="text-sm font-semibold ml-2">
                  {formatTime(pauseDuration)}
                </span>
              </div>
              {getBreakStatus()}
            </div>
          )}
        </div>

        <div className="flex justify-center gap-3 mt-6">
          {!activeSession && (
            <Button
              size="icon"
              variant="outline"
              className="hover:bg-brand-accent/10 w-12 h-12"
              onClick={() => handleAction('start')}
              disabled={isLoading || !checkOfficeHours()}
            >
              <Play className="h-5 w-5" />
            </Button>
          )}
          
          {activeSession && activeSession.status === 'running' && (
            <Button
              size="icon"
              variant="outline"
              className="hover:bg-orange-100 w-12 h-12"
              onClick={() => handleAction('pause')}
              disabled={isLoading}
            >
              <Pause className="h-5 w-5" />
            </Button>
          )}
          
          {activeSession && activeSession.status === 'paused' && (
            <Button
              size="icon"
              variant="outline"
              className="hover:bg-brand-accent/10 w-12 h-12"
              onClick={() => handleAction('resume')}
              disabled={isLoading}
            >
              <Play className="h-5 w-5" />
            </Button>
          )}

          {activeSession && (
            <>
              <Button
                size="icon"
                variant="outline"
                className="hover:bg-red-100 w-12 h-12 text-red-600 border-red-200"
                onClick={() => handleAction('stop')}
                disabled={isLoading}
              >
                <Square className="h-5 w-5" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="hover:bg-gray-100 w-12 h-12"
                onClick={() => handleAction('reset')}
                disabled={isLoading}
              >
                <RefreshCcw className="h-5 w-5" />
              </Button>
            </>
          )}
        </div>
      </Card>

      <WorkTimeHistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        entries={workTimeEntries}
      />

      <PauseReasonModal
        isOpen={isPauseModalOpen}
        onClose={() => setIsPauseModalOpen(false)}
        onSelectReason={handlePauseReasonSelect}
      />
    </>
  );
};
