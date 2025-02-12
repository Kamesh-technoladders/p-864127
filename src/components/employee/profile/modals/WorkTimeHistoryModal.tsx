
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { Clock } from "lucide-react";

interface WorkTimeEntry {
  id: string;
  start_time: string;
  end_time: string | null;
  duration_minutes: number | null;
  status: string;
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

  const groupedEntries = groupEntriesByDate(entries);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Work Time History
          </DialogTitle>
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
                    className="bg-white p-3 rounded-lg border shadow-sm"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-sm font-medium">
                          {format(new Date(entry.start_time), 'h:mm a')}
                          {entry.end_time && ` - ${format(new Date(entry.end_time), 'h:mm a')}`}
                        </div>
                        <div className="text-sm text-gray-500">
                          Duration: {formatDuration(entry.duration_minutes)}
                        </div>
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
