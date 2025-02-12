
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/employee/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { ChevronRight, Laptop, MoreHorizontal, Loader2, ArrowLeft } from "lucide-react";
import { useEmployeeData } from "@/hooks/useEmployeeData";
import { ProfileHeader } from "@/components/employee/profile/ProfileHeader";
import { StatsBar } from "@/components/employee/profile/StatsBar";
import { WorkTimeCard } from "@/components/employee/profile/cards/WorkTimeCard";
import { TimeTrackerCard } from "@/components/employee/profile/cards/TimeTrackerCard";
import { OnboardingTasksCard } from "@/components/employee/profile/cards/OnboardingTasksCard";
import { OnboardingProgressCard } from "@/components/employee/profile/cards/OnboardingProgressCard";
import { CalendarCard } from "@/components/employee/profile/cards/CalendarCard";
import { Button } from "@/components/ui/button";

const EmployeeProfile = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { isLoading, employeeData, error, fetchEmployeeData } = useEmployeeData(id);

  React.useEffect(() => {
    if (id) {
      fetchEmployeeData();
    }
  }, [id, fetchEmployeeData]);

  if (!id) {
    return (
      <DashboardLayout>
        <div className="min-h-screen flex flex-col items-center justify-center gap-4">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">No Employee Selected</h2>
            <p className="text-gray-500">Please select an employee to view their profile.</p>
          </div>
          <Button onClick={() => navigate("/")}>Return to Dashboard</Button>
        </div>
      </DashboardLayout>
    );
  }

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      </DashboardLayout>
    );
  }

  if (error || !employeeData) {
    return (
      <DashboardLayout>
        <div className="min-h-screen flex flex-col items-center justify-center gap-4">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">
              {error || "Employee Not Found"}
            </h2>
            <p className="text-gray-500">The requested employee could not be found.</p>
          </div>
          <Button onClick={() => navigate("/")}>Return to Dashboard</Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-b from-white to-[#FFF9E7] p-8">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="hover:bg-white/50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
          {/* Quick Info Cards */}
          <Card className="p-4 hover:shadow-md transition-shadow bg-white/80 backdrop-blur-sm h-[200px]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Pension Contributions</h3>
              <ChevronRight className="w-4 h-4" />
            </div>
          </Card>

          <Card className="p-4 hover:shadow-md transition-shadow bg-white/80 backdrop-blur-sm h-[200px]">
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

          <Card className="p-4 hover:shadow-md transition-shadow bg-white/80 backdrop-blur-sm h-[200px]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Compensation Summary</h3>
              <ChevronRight className="w-4 h-4" />
            </div>
          </Card>

          <Card className="p-4 hover:shadow-md transition-shadow bg-white/80 backdrop-blur-sm h-[200px]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Employee Benefits</h3>
              <ChevronRight className="w-4 h-4" />
            </div>
          </Card>

          {/* Main Feature Cards */}
          <div className="h-[350px]">
            <WorkTimeCard />
          </div>

          <div className="h-[350px]">
            <TimeTrackerCard />
          </div>

          <div className="h-[350px]">
            <OnboardingTasksCard />
          </div>

          <div className="h-[350px]">
            <OnboardingProgressCard />
          </div>

          {/* Calendar Card - Full Width on Mobile, Side Column on Desktop */}
          <div className="md:col-span-2 lg:col-span-3 xl:col-span-4 h-[300px]">
            <CalendarCard />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EmployeeProfile;
