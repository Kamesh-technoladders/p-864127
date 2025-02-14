
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

export const EventsList: React.FC = () => {
  return (
    <ScrollArea className="h-[calc(100%-4px)] w-full rounded-md">
      <div className="space-y-1.5 pr-4">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i}
            className="w-full bg-white border border-gray-100 p-2 rounded-lg hover:border-[#1A73E8]/20 hover:bg-blue-50/30 transition-all duration-200 cursor-pointer"
          >
            <div className="space-y-0.5">
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
  );
};
