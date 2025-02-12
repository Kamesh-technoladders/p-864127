
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
        // Using Nager.Date API for public holidays
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
    <div className="mt-3 text-sm">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span>Working Day</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <span>Holiday</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <span>Sunday</span>
        </div>
      </div>
    </div>
  );

  return (
    <Card className="p-6 hover:shadow-md transition-shadow bg-white/80 backdrop-blur-sm h-[600px]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Calendar</h3>
            <CalendarIcon className="w-4 h-4" />
          </div>
          
          <TooltipProvider>
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="border rounded-md p-3"
              classNames={{
                day_today: "bg-brand-accent text-brand-primary",
                day: cn(
                  "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
                  "hover:bg-gray-100 rounded-full"
                ),
                day_selected: "bg-brand-primary text-white hover:bg-brand-primary hover:text-white",
                day_disabled: "text-gray-400 hover:bg-transparent",
              }}
              modifiers={{
                holiday: (date) => isHoliday(date),
                sunday: (date) => isSunday(date),
                workingDay: (date) => isWorkingDay(date),
              }}
              modifiersStyles={{
                holiday: { color: "#EF4444" },
                sunday: { color: "#F59E0B" },
                workingDay: { color: "#10B981" },
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
                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
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
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Upcoming Events</h3>
            <Info className="w-4 h-4 text-gray-500" />
          </div>
          
          <ScrollArea className="h-[450px] w-full" orientation="horizontal">
            <div className="flex space-x-4 pb-4">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i}
                  className="flex-none w-[280px] bg-gray-100 p-4 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  <div className="space-y-2">
                    <div className="font-medium">Team Sync {i + 1}</div>
                    <div className="text-xs text-gray-500">10:00 AM</div>
                    <div className="text-sm text-gray-600">
                      Daily standup meeting with the development team
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
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
