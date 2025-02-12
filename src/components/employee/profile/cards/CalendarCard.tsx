
import React from "react";
import { Card } from "@/components/ui/card";
import { Calendar } from "lucide-react";

export const CalendarCard = () => {
  return (
    <Card className="p-6 hover:shadow-md transition-shadow bg-white/80 backdrop-blur-sm h-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Calendar</h3>
            <Calendar className="w-4 h-4" />
          </div>
          <div className="flex justify-between items-center text-sm mb-4">
            <button className="text-gray-500 hover:text-gray-700">August</button>
            <span className="font-medium">September 2024</span>
            <button className="text-gray-500 hover:text-gray-700">October</button>
          </div>
          <div className="grid grid-cols-7 gap-1">
            {["M", "T", "W", "T", "F", "S", "S"].map((day) => (
              <div key={day} className="text-center text-sm text-gray-500 font-medium pb-2">{day}</div>
            ))}
            {Array.from({ length: 31 }).map((_, i) => (
              <div 
                key={i} 
                className={`text-center text-sm py-1 rounded-full cursor-pointer transition-colors
                  ${i === 14 ? 'bg-brand-accent font-medium' : 'hover:bg-gray-100'}`}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="font-medium">Upcoming Events</h3>
          <div className="space-y-2">
            <div className="bg-gray-100 p-3 rounded-lg text-sm hover:bg-gray-200 transition-colors cursor-pointer">
              <div className="font-medium">Weekly Team Sync</div>
              <div className="text-xs text-gray-500">10:00 AM</div>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg text-sm hover:bg-gray-200 transition-colors cursor-pointer">
              <div className="font-medium">Onboarding Session</div>
              <div className="text-xs text-gray-500">2:30 PM</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
