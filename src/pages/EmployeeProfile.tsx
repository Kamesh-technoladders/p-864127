
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/employee/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { 
  ChevronRight, 
  Laptop, 
  MoreHorizontal, 
  Loader2, 
  ArrowLeft,
  Edit,
  UserCircle,
  Briefcase,
  GraduationCap,
  CreditCard
} from "lucide-react";
import { useEmployeeData } from "@/hooks/useEmployeeData";
import { ProfileHeader } from "@/components/employee/profile/ProfileHeader";
import { StatsBar } from "@/components/employee/profile/StatsBar";
import { WorkTimeCard } from "@/components/employee/profile/cards/WorkTimeCard";
import { TimeTrackerCard } from "@/components/employee/profile/cards/TimeTrackerCard";
import { OnboardingTasksCard } from "@/components/employee/profile/cards/OnboardingTasksCard";
import { OnboardingProgressCard } from "@/components/employee/profile/cards/OnboardingProgressCard";
import { CalendarCard } from "@/components/employee/profile/cards/CalendarCard";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const EmployeeProfile = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { isLoading, employeeData, error, fetchEmployeeData } = useEmployeeData(id);

  const [activeSection, setActiveSection] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (id) {
      fetchEmployeeData();
    }
  }, [id, fetchEmployeeData]);

  const handleEdit = (section: string) => {
    toast.info(`Editing ${section} details`);
    // Add your edit modal logic here
  };

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

  const InfoCard = ({ title, icon: Icon, children, onEdit }: { title: string; icon: any; children: React.ReactNode; onEdit?: () => void }) => (
    <Card className="p-6 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 relative group">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Icon className="w-5 h-5 text-brand-primary" />
          <h3 className="font-medium text-lg">{title}</h3>
        </div>
        {onEdit && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onEdit}
            className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-4 right-4"
          >
            <Edit className="w-4 h-4" />
          </Button>
        )}
      </div>
      {children}
    </Card>
  );

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
          <InfoCard 
            title="Personal Information" 
            icon={UserCircle}
            onEdit={() => handleEdit("personal")}
          >
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Phone</span>
                <span>{employeeData.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Date of Birth</span>
                <span>{new Date(employeeData.date_of_birth).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Marital Status</span>
                <span>{employeeData.marital_status}</span>
              </div>
            </div>
          </InfoCard>

          <InfoCard 
            title="Employment Details" 
            icon={Briefcase}
            onEdit={() => handleEdit("employment")}
          >
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Employee ID</span>
                <span>{employeeData.employee_id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Department</span>
                <span>Engineering</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Position</span>
                <span>Software Engineer</span>
              </div>
            </div>
          </InfoCard>

          <InfoCard 
            title="Education & Experience" 
            icon={GraduationCap}
            onEdit={() => handleEdit("education")}
          >
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Highest Degree</span>
                <span>Bachelor's</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Experience</span>
                <span>5 years</span>
              </div>
            </div>
          </InfoCard>

          <InfoCard 
            title="Bank Information" 
            icon={CreditCard}
            onEdit={() => handleEdit("bank")}
          >
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Bank Name</span>
                <span>●●●● Bank</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Account No.</span>
                <span>●●●● 4321</span>
              </div>
            </div>
          </InfoCard>

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

          <div className="md:col-span-2 lg:col-span-3 xl:col-span-4 h-[300px]">
            <CalendarCard />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EmployeeProfile;
