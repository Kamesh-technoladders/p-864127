
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, RefreshCcw } from "lucide-react";

export const TimeTrackerCard = () => {
  return (
    <Card className="p-6 hover:shadow-md transition-shadow bg-white/80 backdrop-blur-sm">
      <div className="flex flex-col items-center justify-center mb-6">
        <h3 className="font-medium mb-4">Time Tracker</h3>
        <div className="relative w-32 h-32">
          <div className="absolute inset-0 rounded-full border-4 border-brand-accent animate-pulse" />
          <div className="absolute inset-2 rounded-full border-2 border-brand-accent/50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-3xl font-bold">02:35</div>
          </div>
        </div>
        <div className="text-sm text-gray-500 mt-2">Work Time</div>
      </div>
      <div className="flex justify-center gap-4">
        <Button size="icon" variant="outline" className="hover:bg-brand-accent/10 w-12 h-12">
          <Play className="h-5 w-5" />
        </Button>
        <Button size="icon" variant="outline" className="hover:bg-brand-accent/10 w-12 h-12">
          <Pause className="h-5 w-5" />
        </Button>
        <Button size="icon" variant="outline" className="hover:bg-brand-accent/10 w-12 h-12">
          <RefreshCcw className="h-5 w-5" />
        </Button>
      </div>
    </Card>
  );
};
