
import React from "react";
import { Card } from "@/components/ui/card";

export const WorkTimeCard = () => {
  return (
    <Card className="p-6 hover:shadow-md transition-shadow bg-white/80 backdrop-blur-sm h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">Work Time this Week</h3>
        <div className="text-sm text-gray-500">Total: 5h 26m</div>
      </div>
      <div className="text-3xl font-bold mb-6">6.1h</div>
      <div className="grid grid-cols-6 gap-2 h-[180px] relative">
        {["M", "T", "W", "T", "F", "S"].map((day, i) => (
          <div key={day} className="flex flex-col h-full">
            <div className="flex-1 relative">
              <div 
                className={`w-full rounded-lg ${i === 3 ? "bg-brand-accent" : "bg-gray-100"}`}
                style={{
                  height: i === 3 ? "80%" : Math.random() * 60 + 20 + "%"
                }}
              />
              {i === 3 && (
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-medium bg-gray-800 text-white px-2 py-1 rounded">
                  5h 26m
                </div>
              )}
            </div>
            <div className="text-center text-sm text-gray-500 mt-2">{day}</div>
          </div>
        ))}
      </div>
    </Card>
  );
};
