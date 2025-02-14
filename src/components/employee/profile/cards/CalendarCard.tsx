
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Calendar, ListTodo } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, 
         isSameDay, addMonths, subMonths, startOfWeek, endOfWeek } from "date-fns";
import { cn } from "@/lib/utils";
import { TaskItem } from "../TaskSection";

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
  const [activeTab, setActiveTab] = useState("events");

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
    <Card className="p-4 hover:shadow-md transition-shadow bg-white/80 backdrop-blur-sm h-[380px]">
      <div className="grid grid-cols-[2fr_3fr] gap-4 h-full">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between px-2">
            <button 
              onClick={prevMonth}
              className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>
            <h2 className="text-sm font-semibold text-gray-900">
              {format(currentDate, 'MMMM yyyy')}
            </h2>
            <button 
              onClick={nextMonth}
              className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {weekDays.map(day => (
              <div key={day} className="h-6 flex items-center justify-center text-xs font-medium text-gray-400">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => (
              <TooltipProvider key={index}>
                <div
                  className={cn(
                    "h-7 w-7 flex items-center justify-center text-xs relative",
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
                        <div className="absolute -top-0.5 -right-0.5 w-1 h-1 bg-red-500 rounded-full" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="text-xs">
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
        
        <div className="flex flex-col h-full">
          <Tabs defaultValue="events" className="flex flex-col h-full" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 mb-2">
              <TabsTrigger value="events" className="flex items-center gap-1 text-xs">
                <Calendar className="w-3 h-3" />
                Upcoming Events
              </TabsTrigger>
              <TabsTrigger value="tasks" className="flex items-center gap-1 text-xs">
                <ListTodo className="w-3 h-3" />
                Tasks
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="events" className="flex-1 mt-0">
              <ScrollArea className="h-[calc(100%-8px)] w-full rounded-md">
                <div className="space-y-2 pr-4">
                  {[...Array(5)].map((_, i) => (
                    <div 
                      key={i}
                      className="w-full bg-white border border-gray-100 p-2.5 rounded-lg hover:border-[#1A73E8]/20 hover:bg-blue-50/30 transition-all duration-200 cursor-pointer"
                    >
                      <div className="space-y-1">
                        <div className="font-medium text-sm text-gray-800">Team Sync {i + 1}</div>
                        <div className="text-xs text-gray-500">10:00 AM</div>
                        <div className="text-xs text-gray-600">
                          Daily standup meeting with the development team
                        </div>
                        <div className="flex items-center gap-2 text-xs text-[#1A73E8]">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#1A73E8]" />
                          <span>In Progress</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="tasks" className="flex-1 mt-0">
              <ScrollArea className="h-[calc(100%-8px)] w-full rounded-md">
                <div className="space-y-2 pr-4">
                  <TaskItem time="Sep 13, 08:50" title="Interview" completed={true} />
                  <TaskItem time="Sep 13, 10:30" title="Team-Meeting" completed={true} />
                  <TaskItem time="Sep 13, 13:00" title="Project Update" completed={false} />
                  <TaskItem time="Sep 13, 14:45" title="Discuss Q3 Goals" completed={false} />
                  <TaskItem time="Sep 15, 16:30" title="HR Policy Review" completed={false} />
                  <TaskItem time="Sep 16, 09:00" title="Code Review" completed={false} />
                  <TaskItem time="Sep 16, 11:30" title="Client Meeting" completed={false} />
                  <TaskItem time="Sep 16, 14:00" title="Sprint Planning" completed={false} />
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Card>
  );
};
