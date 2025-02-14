
import React from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useWorkTimeStats } from "@/hooks/useWorkTimeStats";
import { format } from "date-fns";

interface WorkTimeCardProps {
  employeeId: string;
}

export const WorkTimeCard: React.FC<WorkTimeCardProps> = ({ employeeId }) => {
  const { weeklyStats, totalWeeklyHours, isLoading } = useWorkTimeStats(employeeId);

  const formatHours = (hours: number) => {
    const wholeHours = Math.floor(hours);
    const minutes = Math.round((hours - wholeHours) * 60);
    return `${wholeHours}h ${minutes}m`;
  };

  const getHeightPercentage = (hours: number) => {
    const maxHours = Math.max(...weeklyStats.map(day => day.total), 8); // At least 8 hours for scale
    return (hours / maxHours) * 100;
  };

  if (isLoading) {
    return (
      <Card className="p-6 hover:shadow-md transition-shadow bg-white/80 backdrop-blur-sm h-full">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-6 gap-2 h-[180px]">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-lg w-full h-full"></div>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 hover:shadow-md transition-shadow bg-white/80 backdrop-blur-sm h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">Work Time this Week</h3>
        <div className="text-sm text-gray-500">
          Total: {formatHours(totalWeeklyHours)}
        </div>
      </div>

      <ScrollArea className="h-[180px]">
        <div className="grid grid-cols-6 gap-2 relative pr-4">
          {weeklyStats.map((day, i) => (
            <div key={i} className="flex flex-col h-full">
              <div className="flex-1 relative">
                <div 
                  className={`w-full rounded-lg transition-all duration-300 ${
                    day.isToday ? "bg-brand-accent" : "bg-gray-100"
                  }`}
                  style={{
                    height: `${getHeightPercentage(day.total)}%`,
                    minHeight: '10%'
                  }}
                />
                {day.total > 0 && (
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-medium bg-gray-800 text-white px-2 py-1 rounded whitespace-nowrap">
                    {formatHours(day.total)}
                  </div>
                )}
              </div>
              <div className="text-center text-sm text-gray-500 mt-2">
                {format(day.date, 'EEE')}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};
