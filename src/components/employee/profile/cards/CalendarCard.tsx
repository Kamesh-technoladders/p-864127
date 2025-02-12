
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Calendar as CalendarIcon, Info } from "lucide-react";
import { Calendar as DayPicker } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface Holiday {
  date: string;
  name: string;
  localName: string;
  countryCode: string;
  fixed: boolean;
  global: boolean;
  type: string;
}

export const CalendarCard = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const year = new Date().getFullYear();
        const response = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/IN`);
        const data = await response.json();
        setHolidays(data);
      } catch (error) {
        console.error("Failed to fetch holidays:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHolidays();
  }, []);

  const isHoliday = (date: Date) => {
    const dateString = format(date, 'yyyy-MM-dd');
    return holidays.some(holiday => holiday.date === dateString);
  };

  const getHolidayInfo = (date: Date) => {
    const dateString = format(date, 'yyyy-MM-dd');
    return holidays.find(holiday => holiday.date === dateString);
  };

  const isSunday = (date: Date) => {
    return date.getDay() === 0;
  };

  const isWorkingDay = (date: Date) => {
    return !isSunday(date) && !isHoliday(date);
  };

  const footer = (
    <div className="mt-2 text-xs">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#4BAE4F]" />
          <span className="text-gray-600">Working Day</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
          <span className="text-gray-600">Holiday</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
          <span className="text-gray-600">Sunday</span>
        </div>
      </div>
    </div>
  );

  return (
    <Card className="p-5 hover:shadow-md transition-shadow bg-white/80 backdrop-blur-sm h-[500px]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 h-full">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-gray-800">Calendar</h3>
            <CalendarIcon className="w-4 h-4 text-gray-500" />
          </div>
          
          <TooltipProvider>
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="border rounded-md p-2"
              classNames={{
                day_today: "bg-[#F2FCE2] text-[#4BAE4F] font-medium",
                day: cn(
                  "h-8 w-8 p-0 font-normal aria-selected:opacity-100",
                  "hover:bg-gray-50 rounded-full transition-colors"
                ),
                day_selected: "bg-[#4BAE4F] text-white hover:bg-[#4BAE4F] hover:text-white",
                day_disabled: "text-gray-400 hover:bg-transparent",
                nav_button: "hover:bg-gray-50 transition-colors",
                cell: "text-center text-sm p-0",
                table: "w-full border-collapse space-y-1",
                head_cell: "text-gray-500 font-normal text-[0.8rem]",
                nav: "space-x-1 flex items-center",
                caption: "flex justify-center pt-1 relative items-center",
                caption_label: "text-sm font-medium",
              }}
              modifiers={{
                holiday: (date) => isHoliday(date),
                sunday: (date) => isSunday(date),
                workingDay: (date) => isWorkingDay(date),
              }}
              modifiersStyles={{
                holiday: { 
                  color: "#EF4444",
                  backgroundColor: "rgba(239, 68, 68, 0.05)"
                },
                sunday: { 
                  color: "#F59E0B",
                  backgroundColor: "rgba(245, 158, 11, 0.05)"
                },
                workingDay: { 
                  color: "#4BAE4F",
                  backgroundColor: "rgba(75, 174, 79, 0.05)"
                },
              }}
              components={{
                DayContent: ({ date }) => {
                  const holiday = getHolidayInfo(date);
                  return (
                    <div className="relative w-full h-full flex items-center justify-center">
                      {date.getDate()}
                      {holiday && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <div className="text-sm">
                              <p className="font-medium">{holiday.name}</p>
                              <p className="text-xs text-gray-500">{holiday.localName}</p>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                  );
                },
              }}
              footer={footer}
            />
          </TooltipProvider>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-gray-800">Upcoming Events</h3>
            <Info className="w-4 h-4 text-gray-500" />
          </div>
          
          <ScrollArea className="h-[380px] w-full rounded-md border">
            <div className="p-4 space-y-3">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i}
                  className="w-full bg-white border border-gray-100 p-4 rounded-lg hover:border-[#4BAE4F]/20 hover:bg-[#F2FCE2]/30 transition-all duration-200 cursor-pointer"
                >
                  <div className="space-y-2">
                    <div className="font-medium text-gray-800">Team Sync {i + 1}</div>
                    <div className="text-xs text-gray-500">10:00 AM</div>
                    <div className="text-sm text-gray-600">
                      Daily standup meeting with the development team
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#4BAE4F]">
                      <div className="w-2 h-2 rounded-full bg-[#4BAE4F]" />
                      <span>In Progress</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </Card>
  );
};
