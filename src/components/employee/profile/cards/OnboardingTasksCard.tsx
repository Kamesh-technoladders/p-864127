
import React from "react";
import { Card } from "@/components/ui/card";
import { TaskItem } from "../TaskSection";
import { ScrollArea } from "@/components/ui/scroll-area";

export const OnboardingTasksCard = () => {
  return (
    <Card className="p-6 bg-[#1C1C1C] text-white hover:shadow-xl transition-shadow h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-medium">Onboarding Tasks (2/8)</h3>
      </div>
      <ScrollArea className="h-[240px] pr-4">
        <div className="space-y-3">
          <TaskItem time="Sep 13, 08:50" title="Interview" completed={true} />
          <TaskItem time="Sep 13, 10:30" title="Team-Meeting" completed={true} />
          <TaskItem time="Sep 13, 13:00" title="Project Update" completed={false} />
          <TaskItem time="Sep 13, 14:45" title="Discuss Q3 Goals" completed={false} />
          <TaskItem time="Sep 15, 16:30" title="HR Policy Review" completed={false} />
        </div>
      </ScrollArea>
    </Card>
  );
};
