
import React from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export const OnboardingProgressCard = () => {
  return (
    <Card className="p-2 hover:shadow-md transition-shadow bg-white/80 backdrop-blur-sm h-[280px]">
      <div className="flex justify-between items-center mb-1">
        <h3 className="text-[10px] font-medium">Onboarding Progress</h3>
        <div className="text-[11px] font-bold">18%</div>
      </div>
      <Progress value={18} className="mb-2 h-0.5" />
      
      <ScrollArea className="h-[230px]">
        <div className="pr-2 space-y-1">
          <div className="flex justify-between text-[10px]">
            <span className="text-gray-500">Tasks Completed</span>
            <span className="font-medium">2/8</span>
          </div>
          <div className="space-y-3">
            {[30, 25, 0].map((progress, i) => (
              <div key={i} className="flex items-center gap-1">
                <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                  <Target className="w-3 h-3" />
                </div>
                <div className="flex-1">
                  <Progress value={progress} className="h-0.5" />
                </div>
                <span className="text-[10px] font-medium w-8 text-right">{progress}%</span>
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>
    </Card>
  );
};
