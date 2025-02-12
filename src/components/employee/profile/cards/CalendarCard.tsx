
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Info } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, 
         isSameDay, addMonths, subMonths, startOfWeek, endOfWeek } from "date-fns";
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

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isHoliday: boolean;
  isSunday: boolean;
  holidayInfo?: Holiday;
}

export const CalendarCard = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
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

  const generateMonth = (date: Date): CalendarDay[] => {
    const start = startOfWeek(startOfMonth(date));
    const end = endOfWeek(endOfMonth(date));
    const days = eachDayOfInterval({ start, end });

    return days.map(day => ({
      date: day,
      isCurrentMonth: isSameMonth(day, date),
      isToday: isSameDay(day, new Date()),
      isHoliday: isHoliday(day),
      isSunday: day.getDay() === 0,
      holidayInfo: getHolidayInfo(day),
    }));
  };

  const isHoliday = (date: Date) => {
    const dateString = format(date, 'yyyy-MM-dd');
    return holidays.some(holiday => holiday.date === dateString);
  };

  const getHolidayInfo = (date: Date) => {
    const dateString = format(date, 'yyyy-MM-dd');
    return holidays.find(holiday => holiday.date === dateString);
  };

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const days = generateMonth(currentDate);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <Card className="p-5 hover:shadow-md transition-shadow bg-white/80 backdrop-blur-sm h-[500px]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 h-full">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-gray-800">Calendar</h3>
            <CalendarIcon className="w-4 h-4 text-gray-500" />
          </div>
          
          <div className="border rounded-lg p-4 bg-white">
            <div className="flex items-center justify-between mb-4">
              <button 
                onClick={prevMonth}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <h2 className="text-sm font-medium">
                {format(currentDate, 'MMMM yyyy')}
              </h2>
              <button 
                onClick={nextMonth}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {weekDays.map(day => (
                <div key={day} className="text-center text-xs text-gray-500 font-medium">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {days.map((day, index) => (
                <TooltipProvider key={index}>
                  <div
                    className={cn(
                      "aspect-square flex items-center justify-center text-sm relative",
                      "rounded-full transition-colors cursor-pointer",
                      !day.isCurrentMonth && "text-gray-300",
                      day.isToday && "bg-[#F2FCE2] text-[#4BAE4F] font-medium",
                      day.isSunday && "text-[#F59E0B] bg-[#F59E0B]/5",
                      day.isHoliday && "text-[#EF4444] bg-[#EF4444]/5",
                      !day.isSunday && !day.isHoliday && day.isCurrentMonth && "text-[#4BAE4F] hover:bg-[#4BAE4F]/5",
                      isSameDay(day.date, selectedDate) && "bg-[#4BAE4F] text-white hover:bg-[#4BAE4F]"
                    )}
                    onClick={() => setSelectedDate(day.date)}
                  >
                    {format(day.date, 'd')}
                    {day.holidayInfo && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="text-sm">
                            <p className="font-medium">{day.holidayInfo.name}</p>
                            <p className="text-xs text-gray-500">{day.holidayInfo.localName}</p>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    )}
                  </div>
                </TooltipProvider>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-3 text-xs">
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
