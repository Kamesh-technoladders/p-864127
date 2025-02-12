
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { Clock, AlertCircle, Coffee, UtensilsCrossed, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

interface WorkTimeEntry {
  id: string;
  start_time: string;
  end_time: string | null;
  duration_minutes: number | null;
  status: string;
  pause_reason?: string;
  pause_start_time?: string;
  pause_end_time?: string;
  total_pause_duration_minutes?: number;
  excess_break_minutes?: number;
  missed_breaks?: string[];
  auto_stopped?: boolean;
  overtime_minutes?: number;
  regular_hours_completed?: boolean;
}

interface WorkTimeHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  entries: WorkTimeEntry[];
}

export const WorkTimeHistoryModal: React.FC<WorkTimeHistoryModalProps> = ({
  isOpen,
  onClose,
  entries,
}) => {
  const [showOvertime, setShowOvertime] = useState(false);

  const formatDuration = (minutes: number | null) => {
    if (!minutes) return "In progress";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const groupEntriesByDate = (entries: WorkTimeEntry[]) => {
    const grouped: { [key: string]: WorkTimeEntry[] } = {};
    entries.forEach(entry => {
      const date = format(new Date(entry.start_time), 'yyyy-MM-dd');
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(entry);
    });
    return grouped;
  };

  const getBreakIcon = (reason: string) => {
    switch (reason) {
      case 'Lunch Break':
        return <UtensilsCrossed className="h-4 w-4" />;
      case 'Coffee Break':
        return <Coffee className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const groupedEntries = groupEntriesByDate(entries);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Work Time History
            </DialogTitle>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Show Overtime</span>
              <Switch
                checked={showOvertime}
                onCheckedChange={setShowOvertime}
              />
            </div>
          </div>
        </DialogHeader>
        <ScrollArea className="h-[500px] pr-4">
          {Object.entries(groupedEntries).map(([date, dayEntries]) => (
            <div key={date} className="mb-6">
              <h3 className="text-sm font-medium mb-3">
                {format(new Date(date), 'EEEE, MMMM d, yyyy')}
              </h3>
              <div className="space-y-3">
                {dayEntries.map(entry => (
                  <div
                    key={entry.id}
                    className="bg-white p-4 rounded-lg border shadow-sm"
                  >
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <div>
                          <div className="text-sm font-medium">
                            {format(new Date(entry.start_time), 'h:mm a')}
                            {entry.end_time && ` - ${format(new Date(entry.end_time), 'h:mm a')}`}
                            {entry.auto_stopped && (
                              <span className="ml-2 text-xs text-orange-600">(Auto-stopped)</span>
                            )}
                          </div>
                          <div className="text-sm text-gray-500">
                            Duration: {formatDuration(entry.duration_minutes)}
                            {entry.regular_hours_completed && (
                              <span className="text-green-600 ml-2">(Regular hours completed)</span>
                            )}
                          </div>
                          {showOvertime && entry.overtime_minutes && entry.overtime_minutes > 0 && (
                            <div className="text-sm text-purple-600 flex items-center gap-1 mt-1">
                              <Timer className="h-4 w-4" />
                              Overtime: {formatDuration(entry.overtime_minutes)}
                            </div>
                          )}
                        </div>

                        {entry.excess_break_minutes && entry.excess_break_minutes > 0 && (
                          <div className="text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="h-4 w-4" />
                            Excess break time: {entry.excess_break_minutes} minutes
                          </div>
                        )}

                        {entry.missed_breaks && entry.missed_breaks.length > 0 && (
                          <div className="text-sm text-orange-600">
                            Missed breaks: {entry.missed_breaks.join(', ')}
                          </div>
                        )}
                      </div>
                      <div className={`text-xs px-2 py-1 rounded-full ${
                        entry.status === 'completed' 
                          ? 'bg-green-100 text-green-700'
                          : entry.status === 'running'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {entry.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
