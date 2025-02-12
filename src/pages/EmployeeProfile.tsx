import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/employee/layout/DashboardLayout";
import { 
  UserCircle,
  Briefcase,
  GraduationCap,
  CreditCard,
  ArrowLeft,
  Download
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
import { QuickActions } from "@/components/employee/profile/QuickActions";
import { InfoCard } from "@/components/employee/profile/InfoCard";
import { LoadingState, ErrorState } from "@/components/employee/profile/ProfileStates";
import { EmploymentDetailsModal } from "@/components/employee/profile/modals/EmploymentDetailsModal";

const EmployeeProfile = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { isLoading, employeeData, error, fetchEmployeeData, updateEmployee } = useEmployeeData(id);
  const [isEmploymentModalOpen, setIsEmploymentModalOpen] = useState(false);

  const handleEdit = (section: string) => {
    if (section === "employment") {
      setIsEmploymentModalOpen(true);
    } else {
      toast.info(`Editing ${section} details`);
    }
  };

  const handleUpdateEmployment = async (data: any) => {
    try {
      await updateEmployee("employment", data);
      await fetchEmployeeData();
    } catch (error) {
      throw error;
    }
  };

  const calculateYearsOfExperience = (joinedDate: string) => {
    const joined = new Date(joinedDate);
    const now = new Date();
    const years = now.getFullYear() - joined.getFullYear();
    const months = now.getMonth() - joined.getMonth();
    if (months < 0) {
      return `${years - 1} years`;
    }
    return `${years} years`;
  };

  if (!id) {
    return <ErrorState message="No Employee Selected" onReturn={() => navigate("/")} />;
  }

  if (isLoading) {
    return <LoadingState />;
  }

  if (error || !employeeData) {
    return <ErrorState message={error || "Employee Not Found"} onReturn={() => navigate("/")} />;
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-b from-white to-[#FFF9E7] p-8">
        <div className="flex justify-between items-center mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="hover:bg-white/50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <QuickActions />
        </div>

        <ProfileHeader
          employeeId={employeeData.employee_id}
          firstName={employeeData.first_name}
          lastName={employeeData.last_name}
          email={employeeData.email}
        />

        <StatsBar
          joinedDate={new Date(employeeData.created_at).toLocaleDateString()}
          department="Engineering"
          designation="Software Engineer"
          yearsOfExperience={calculateYearsOfExperience(employeeData.created_at)}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
          <InfoCard 
            title="Personal Information" 
            icon={UserCircle}
            onEdit={() => handleEdit("personal")}
          >
            <div className="space-y-4 p-2">
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
              <div className="pt-4 border-t border-gray-100">
                <h4 className="text-sm font-medium mb-2">Additional Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Nationality</span>
                    <span>Indian</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Languages</span>
                    <span>English, Hindi</span>
                  </div>
                </div>
              </div>
            </div>
          </InfoCard>

          <InfoCard 
            title="Employment Details" 
            icon={Briefcase}
            onEdit={() => handleEdit("employment")}
          >
            <div className="space-y-4 p-2">
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
            </div>
          </InfoCard>

          <InfoCard 
            title="Education & Experience" 
            icon={GraduationCap}
            onEdit={() => handleEdit("education")}
          >
            <div className="space-y-4 p-2">
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
              <div className="pt-4 border-t border-gray-100">
                <h4 className="text-sm font-medium mb-2">Education Timeline</h4>
                <div className="space-y-3">
                  <div className="text-sm">
                    <div className="font-medium">B.Tech in Computer Science</div>
                    <div className="text-gray-500">2015 - 2019</div>
                  </div>
                  <div className="text-sm">
                    <div className="font-medium">Higher Secondary</div>
                    <div className="text-gray-500">2013 - 2015</div>
                  </div>
                </div>
              </div>
            </div>
          </InfoCard>

          <InfoCard 
            title="Bank Information" 
            icon={CreditCard}
            onEdit={() => handleEdit("bank")}
          >
            <div className="space-y-4 p-2">
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
              <div className="pt-4 border-t border-gray-100">
                <h4 className="text-sm font-medium mb-2">Documents</h4>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Cancelled Cheque
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Bank Statement
                  </Button>
                </div>
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

        <EmploymentDetailsModal
          isOpen={isEmploymentModalOpen}
          onClose={() => setIsEmploymentModalOpen(false)}
          employeeId={employeeData?.id || ''}
          initialData={{
            employeeId: employeeData?.employee_id || '',
            department: 'Engineering',
            position: 'Software Engineer',
            joinedDate: employeeData?.created_at || '',
            employmentHistory: [
              {
                title: 'Senior Developer',
                date: 'Jan 2023',
                description: 'Promoted to Senior Developer role',
                type: 'promotion'
              },
              {
                title: 'Developer',
                date: 'Jan 2022',
                description: 'Joined as Developer',
                type: 'join'
              }
            ]
          }}
          onUpdate={handleUpdateEmployment}
        />
      </div>
    </DashboardLayout>
  );
};

export default EmployeeProfile;
