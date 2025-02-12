
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, RefreshCcw } from "lucide-react";

export const TimeTrackerCard = () => {
  return (
    <Card className="p-6 hover:shadow-md transition-shadow bg-white/80 backdrop-blur-sm h-full flex flex-col justify-between">
      <div className="flex-1 flex flex-col items-center justify-center">
        <h3 className="font-medium mb-4">Time Tracker</h3>
        <div className="relative w-28 h-28">
          <div className="absolute inset-0 rounded-full border-4 border-brand-accent animate-pulse" />
          <div className="absolute inset-2 rounded-full border-2 border-brand-accent/50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-3xl font-bold">02:35</div>
          </div>
        </div>
        <div className="text-sm text-gray-500 mt-2">Work Time</div>
      </div>
      <div className="flex justify-center gap-4 mt-4">
        <Button size="icon" variant="outline" className="hover:bg-brand-accent/10 w-10 h-10">
          <Play className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="outline" className="hover:bg-brand-accent/10 w-10 h-10">
          <Pause className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="outline" className="hover:bg-brand-accent/10 w-10 h-10">
          <RefreshCcw className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};
