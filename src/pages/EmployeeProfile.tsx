import React from "react";
import { useParams } from "react-router-dom";
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
  MoreHorizontal,
  Loader2,
  Target
} from "lucide-react";
import { useEmployeeData } from "@/hooks/useEmployeeData";
import { ProfileHeader } from "@/components/employee/profile/ProfileHeader";
import { StatsBar } from "@/components/employee/profile/StatsBar";
import { TaskItem } from "@/components/employee/profile/TaskSection";

const EmployeeProfile = () => {
  const { id } = useParams<{ id: string }>();
  const { isLoading, employeeData, fetchEmployeeData } = useEmployeeData(id || '');

  React.useEffect(() => {
    if (id) {
      fetchEmployeeData();
    }
  }, [id, fetchEmployeeData]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      </DashboardLayout>
    );
  }

  if (!employeeData) {
    return (
      <DashboardLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Employee Not Found</h2>
            <p className="text-gray-500">The requested employee could not be found.</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-b from-white to-[#FFF9E7] p-8">
        <ProfileHeader
          employeeId={employeeData.employee_id}
          firstName={employeeData.first_name}
          lastName={employeeData.last_name}
          email={employeeData.email}
        />

        <StatsBar
          joinedDate={new Date(employeeData.created_at).toLocaleDateString()}
          gender={employeeData.gender}
          bloodGroup={employeeData.blood_group}
        />

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-3 space-y-6">
            {/* Left sidebar cards */}
            <Card className="p-4 hover:shadow-md transition-shadow bg-white/80 backdrop-blur-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Pension Contributions</h3>
                <ChevronRight className="w-4 h-4" />
              </div>
            </Card>
            <Card className="p-4 hover:shadow-md transition-shadow bg-white/80 backdrop-blur-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Devices</h3>
                <MoreHorizontal className="w-4 h-4 cursor-pointer hover:text-gray-600" />
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Laptop className="w-4 h-4" />
                </div>
                <span className="text-sm flex-1">MacBook Air Version M1</span>
              </div>
            </Card>
            <Card className="p-4 hover:shadow-md transition-shadow bg-white/80 backdrop-blur-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Compensation Summary</h3>
                <ChevronRight className="w-4 h-4" />
              </div>
            </Card>
            <Card className="p-4 hover:shadow-md transition-shadow bg-white/80 backdrop-blur-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Employee Benefits</h3>
                <ChevronRight className="w-4 h-4" />
              </div>
            </Card>
          </div>

          <div className="col-span-6 space-y-6">
            {/* Center column cards */}
            <Card className="p-6 hover:shadow-md transition-shadow bg-white/80 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Work Time this Week</h3>
                <div className="text-sm text-gray-500">Total: 5h 26m</div>
              </div>
              <div className="text-3xl font-bold mb-6">6.1h</div>
              <div className="grid grid-cols-6 gap-2 mb-4 relative">
                {["M", "T", "W", "T", "F", "S"].map((day, i) => (
                  <div key={day} className="space-y-2">
                    <div className="relative">
                      <div className={`h-24 w-full rounded-lg ${i === 3 ? "bg-brand-accent" : "bg-gray-100"}`} />
                      {i === 3 && (
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-medium bg-gray-800 text-white px-2 py-1 rounded">
                          5h 26m
                        </div>
                      )}
                    </div>
                    <div className="text-center text-sm text-gray-500">{day}</div>
                  </div>
                ))}
              </div>
            </Card>

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

            <Card className="p-6 bg-[#1C1C1C] text-white hover:shadow-xl transition-shadow">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-medium">Onboarding Tasks (2/8)</h3>
              </div>
              <div className="space-y-3">
                <TaskItem time="Sep 13, 08:50" title="Interview" completed={true} />
                <TaskItem time="Sep 13, 10:30" title="Team-Meeting" completed={true} />
                <TaskItem time="Sep 13, 13:00" title="Project Update" completed={false} />
                <TaskItem time="Sep 13, 14:45" title="Discuss Q3 Goals" completed={false} />
                <TaskItem time="Sep 15, 16:30" title="HR Policy Review" completed={false} />
              </div>
            </Card>

            <Card className="p-6 hover:shadow-md transition-shadow bg-white/80 backdrop-blur-sm">
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
                    <span className="text-sm font-medium w-12 text-right">{progress}%</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="col-span-3">
            {/* Right sidebar calendar */}
            <Card className="p-4 hover:shadow-md transition-shadow bg-white/80 backdrop-blur-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Calendar</h3>
                <Calendar className="w-4 h-4" />
              </div>
              <div className="space-y-4">
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
                <div className="space-y-2 mt-4">
                  <div className="bg-gray-100 p-2 rounded-lg text-sm hover:bg-gray-200 transition-colors cursor-pointer">
                    <div className="font-medium">Weekly Team Sync</div>
                    <div className="text-xs text-gray-500">10:00 AM</div>
                  </div>
                  <div className="bg-gray-100 p-2 rounded-lg text-sm hover:bg-gray-200 transition-colors cursor-pointer">
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
