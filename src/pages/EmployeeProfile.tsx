
import React from "react";
import { useParams } from "react-router-dom";
import { DashboardLayout } from "@/components/employee/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { ChevronRight, Laptop, MoreHorizontal, Loader2 } from "lucide-react";
import { useEmployeeData } from "@/hooks/useEmployeeData";
import { ProfileHeader } from "@/components/employee/profile/ProfileHeader";
import { StatsBar } from "@/components/employee/profile/StatsBar";
import { WorkTimeCard } from "@/components/employee/profile/cards/WorkTimeCard";
import { TimeTrackerCard } from "@/components/employee/profile/cards/TimeTrackerCard";
import { OnboardingTasksCard } from "@/components/employee/profile/cards/OnboardingTasksCard";
import { OnboardingProgressCard } from "@/components/employee/profile/cards/OnboardingProgressCard";
import { CalendarCard } from "@/components/employee/profile/cards/CalendarCard";

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
            <WorkTimeCard />
            <TimeTrackerCard />
            <OnboardingTasksCard />
            <OnboardingProgressCard />
          </div>

          <div className="col-span-3">
            <CalendarCard />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EmployeeProfile;
