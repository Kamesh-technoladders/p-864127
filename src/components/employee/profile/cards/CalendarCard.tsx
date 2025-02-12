import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <Card className="p-6 hover:shadow-md transition-shadow bg-white/80 backdrop-blur-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-[500px]">
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <button 
              onClick={prevMonth}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h2 className="text-lg font-semibold text-gray-900">
              {format(currentDate, 'MMMM yyyy')}
            </h2>
            <button 
              onClick={nextMonth}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {weekDays.map(day => (
              <div key={day} className="h-10 flex items-center justify-center text-sm font-medium text-gray-400">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => (
              <TooltipProvider key={index}>
                <div
                  className={cn(
                    "h-10 w-10 flex items-center justify-center text-sm relative",
                    "rounded-full transition-colors cursor-pointer mx-auto",
                    !day.isCurrentMonth && "text-gray-300",
                    day.isToday && !isSameDay(day.date, selectedDate) && "bg-blue-50 text-blue-600 font-medium",
                    day.isSunday && !isSameDay(day.date, selectedDate) && "text-[#F59E0B]",
                    day.isHoliday && !isSameDay(day.date, selectedDate) && "text-[#EF4444]",
                    !day.isSunday && !day.isHoliday && day.isCurrentMonth && !isSameDay(day.date, selectedDate) && "text-gray-900 hover:bg-gray-100",
                    isSameDay(day.date, selectedDate) && "bg-[#1A73E8] text-white hover:bg-[#1A73E8]/90"
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
        </div>
        
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900 px-2">Upcoming Events</h3>
          
          <ScrollArea className="h-[420px] w-full rounded-md">
            <div className="space-y-3 pr-4">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i}
                  className="w-full bg-white border border-gray-100 p-4 rounded-lg hover:border-[#1A73E8]/20 hover:bg-blue-50/30 transition-all duration-200 cursor-pointer"
                >
                  <div className="space-y-2">
                    <div className="font-medium text-gray-800">Team Sync {i + 1}</div>
                    <div className="text-xs text-gray-500">10:00 AM</div>
                    <div className="text-sm text-gray-600">
                      Daily standup meeting with the development team
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#1A73E8]">
                      <div className="w-2 h-2 rounded-full bg-[#1A73E8]" />
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
