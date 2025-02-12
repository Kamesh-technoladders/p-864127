
import React from "react";
import { DashboardLayout } from "@/components/employee/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Play,
  Pause,
  RefreshCcw,
  ChevronRight,
  Laptop,
  Calendar,
  Users,
  Briefcase,
  Target,
  Check,
  Clock,
  MoreHorizontal
} from "lucide-react";

const TaskItem = ({ time, title, completed }: { time: string; title: string; completed: boolean }) => (
  <div className="flex items-center gap-3 py-2">
    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${completed ? 'bg-brand-accent' : 'bg-gray-100'}`}>
      {completed ? <Check className="w-4 h-4 text-brand-primary" /> : <Clock className="w-4 h-4 text-gray-400" />}
    </div>
    <div className="flex-1">
      <div className="text-sm font-medium">{title}</div>
      <div className="text-xs text-gray-500">{time}</div>
    </div>
  </div>
);

const EmployeeProfile = () => {
  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-b from-white to-[#FFF9E7] p-8">
        {/* Profile Header */}
        <div className="relative w-full h-[200px] rounded-xl overflow-hidden mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-[#ee9ca7] to-[#ffdde1]" />
          <div className="relative z-10 flex items-end p-6 h-full">
            <div className="flex items-end gap-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <div className="w-full h-full bg-gray-300" />
                </div>
                <div className="absolute -top-2 -right-2 bg-brand-accent text-brand-primary px-2 py-1 rounded-lg text-sm font-medium shadow-sm">
                  $1,200
                </div>
              </div>
              <div className="mb-2">
                <h1 className="text-2xl font-bold text-white">Lara Piterson</h1>
                <p className="text-white/80">UX/UI Designer</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <Card className="p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5" />
              <div>
                <div className="text-sm text-gray-500">Employee Count</div>
                <div className="text-xl font-bold">78</div>
              </div>
            </div>
          </Card>
          <Card className="p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <Briefcase className="w-5 h-5" />
              <div>
                <div className="text-sm text-gray-500">Hirings</div>
                <div className="text-xl font-bold">56</div>
              </div>
            </div>
          </Card>
          <Card className="p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <Target className="w-5 h-5" />
              <div>
                <div className="text-sm text-gray-500">Projects</div>
                <div className="text-xl font-bold">203</div>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <div className="col-span-3 space-y-6">
            <Card className="p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Pension Contributions</h3>
                <ChevronRight className="w-4 h-4" />
              </div>
            </Card>
            <Card className="p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Devices</h3>
                <MoreHorizontal className="w-4 h-4" />
              </div>
              <div className="flex items-center gap-3">
                <Laptop className="w-4 h-4" />
                <span className="text-sm flex-1">MacBook Air Version M1</span>
              </div>
            </Card>
            <Card className="p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Compensation Summary</h3>
                <ChevronRight className="w-4 h-4" />
              </div>
            </Card>
            <Card className="p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Employee Benefits</h3>
                <ChevronRight className="w-4 h-4" />
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="col-span-6 space-y-6">
            {/* Progress Card */}
            <Card className="p-6 hover:shadow-md transition-shadow">
              <h3 className="font-medium mb-4">Work Time this Week</h3>
              <div className="text-3xl font-bold mb-4">6.1h</div>
              <div className="grid grid-cols-6 gap-2 mb-4">
                {["M", "T", "W", "T", "F", "S"].map((day, i) => (
                  <div key={day} className="space-y-2">
                    <div className={`h-24 w-full rounded-lg ${i === 3 ? "bg-brand-accent" : "bg-gray-100"}`} />
                    <div className="text-center text-sm text-gray-500">{day}</div>
                  </div>
                ))}
              </div>
              <div className="text-sm text-gray-500">5h 26m</div>
            </Card>

            {/* Time Tracker Card */}
            <Card className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-medium">Time Tracker</h3>
                <div className="relative">
                  <div className="w-20 h-20 rounded-full border-4 border-brand-accent flex items-center justify-center">
                    <div className="text-2xl font-bold">02:35</div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center gap-4">
                <Button size="icon" variant="outline" className="hover:bg-brand-accent/10">
                  <Play className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="outline" className="hover:bg-brand-accent/10">
                  <Pause className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="outline" className="hover:bg-brand-accent/10">
                  <RefreshCcw className="h-4 w-4" />
                </Button>
              </div>
            </Card>

            {/* Onboarding Tasks Card */}
            <Card className="p-6 bg-[#1C1C1C] text-white hover:shadow-md transition-shadow">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-medium">Onboarding Tasks (2/8)</h3>
              </div>
              <div className="space-y-2">
                <TaskItem time="Sep 13, 08:50" title="Interview" completed={true} />
                <TaskItem time="Sep 13, 10:30" title="Team-Meeting" completed={true} />
                <TaskItem time="Sep 13, 13:00" title="Project Update" completed={false} />
                <TaskItem time="Sep 13, 14:45" title="Discuss Q3 Goals" completed={false} />
                <TaskItem time="Sep 15, 16:30" title="HR Policy Review" completed={false} />
              </div>
            </Card>

            {/* Onboarding Progress Card */}
            <Card className="p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Onboarding Progress</h3>
                <div className="text-xl font-bold">18%</div>
              </div>
              <Progress value={18} className="mb-6" />
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Tasks Completed</span>
                  <span className="font-medium">2/8</span>
                </div>
                {[30, 25, 0].map((progress, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                      <Target className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <Progress value={progress} />
                    </div>
                    <span className="text-sm font-medium">{progress}%</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Calendar Section */}
          <div className="col-span-3">
            <Card className="p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Calendar</h3>
                <Calendar className="w-4 h-4" />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm mb-4">
                  <span className="text-gray-500">August</span>
                  <span className="font-medium">September 2024</span>
                  <span className="text-gray-500">October</span>
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {["M", "T", "W", "T", "F", "S", "S"].map((day) => (
                    <div key={day} className="text-center text-sm text-gray-500">{day}</div>
                  ))}
                  {Array.from({ length: 31 }).map((_, i) => (
                    <div 
                      key={i} 
                      className={`text-center text-sm py-1 rounded-full ${i === 14 ? 'bg-brand-accent font-medium' : ''}`}
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
                <div className="space-y-2 mt-4">
                  <div className="bg-gray-100 p-2 rounded-lg text-sm">
                    <div className="font-medium">Weekly Team Sync</div>
                    <div className="text-xs text-gray-500">10:00 AM</div>
                  </div>
                  <div className="bg-gray-100 p-2 rounded-lg text-sm">
                    <div className="font-medium">Onboarding Session</div>
                    <div className="text-xs text-gray-500">2:30 PM</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EmployeeProfile;
