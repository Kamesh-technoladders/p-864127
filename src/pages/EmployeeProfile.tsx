
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/employee/layout/DashboardLayout";
import { ArrowLeft } from "lucide-react";
import { useEmployeeData } from "@/hooks/useEmployeeData";
import { ProfileHeader } from "@/components/employee/profile/ProfileHeader";
import { StatsBar } from "@/components/employee/profile/StatsBar";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { QuickActions } from "@/components/employee/profile/QuickActions";
import { LoadingState, ErrorState } from "@/components/employee/profile/ProfileStates";
import { EmploymentDetailsModal } from "@/components/employee/profile/modals/EmploymentDetailsModal";
import { PersonalInfoSection } from "@/components/employee/profile/sections/PersonalInfoSection";
import { EmploymentInfoSection } from "@/components/employee/profile/sections/EmploymentInfoSection";
import { EducationSection } from "@/components/employee/profile/sections/EducationSection";
import { BankInfoSection } from "@/components/employee/profile/sections/BankInfoSection";
import { MetricsSection } from "@/components/employee/profile/sections/MetricsSection";
import { PersonalDetailsEditModal } from "@/components/employee/modals/PersonalDetailsEditModal";
import { EducationEditModal } from "@/components/employee/modals/EducationEditModal";
import { BankDetailsEditModal } from "@/components/employee/modals/BankDetailsEditModal";

const EmployeeProfile = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { isLoading, employeeData, error, fetchEmployeeData, updateEmployee } = useEmployeeData(id);
  const [isEmploymentModalOpen, setIsEmploymentModalOpen] = useState(false);
  const [isPersonalModalOpen, setIsPersonalModalOpen] = useState(false);
  const [isEducationModalOpen, setIsEducationModalOpen] = useState(false);
  const [isBankModalOpen, setIsBankModalOpen] = useState(false);

  useEffect(() => {
    if (id) {
      fetchEmployeeData();
    }
  }, [id, fetchEmployeeData]);

  const handleEdit = (section: string) => {
    switch(section) {
      case "employment":
        setIsEmploymentModalOpen(true);
        break;
      case "personal":
        setIsPersonalModalOpen(true);
        break;
      case "education":
        setIsEducationModalOpen(true);
        break;
      case "bank":
        setIsBankModalOpen(true);
        break;
      default:
        toast.error("Invalid section");
    }
  };

  const handleUpdateEmployment = async (data: any) => {
    try {
      await updateEmployee("employment", data);
    } catch (error) {
      throw error;
    }
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

  const presentAddress = employeeData.employee_addresses?.find(addr => addr.type === 'present');

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-b from-white to-[#FFF9E7] p-8">
        <div className="flex justify-between items-center mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
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
          <PersonalInfoSection
            phone={employeeData.phone}
            dateOfBirth={employeeData.date_of_birth}
            maritalStatus={employeeData.marital_status}
            gender={employeeData.gender}
            bloodGroup={employeeData.blood_group}
            state={presentAddress?.state || 'N/A'}
            country={presentAddress?.country || 'N/A'}
            onEdit={() => handleEdit("personal")}
          />

          <EmploymentInfoSection
            employeeId={employeeData.employee_id}
            onEdit={() => handleEdit("employment")}
          />

          <EducationSection
            education={employeeData.employee_education?.[0]}
            experience={employeeData.employee_experiences}
            onEdit={() => handleEdit("education")}
          />

          <BankInfoSection
            data={employeeData.employee_bank_details?.[0]}
            onEdit={() => handleEdit("bank")}
          />

          <MetricsSection employeeId={employeeData.id} />
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

        <PersonalDetailsEditModal
          isOpen={isPersonalModalOpen}
          onClose={() => setIsPersonalModalOpen(false)}
          data={{
            employeeId: employeeData.employee_id,
            firstName: employeeData.first_name,
            lastName: employeeData.last_name,
            email: employeeData.email,
            phone: employeeData.phone,
            dateOfBirth: employeeData.date_of_birth,
            gender: employeeData.gender,
            bloodGroup: employeeData.blood_group,
            maritalStatus: employeeData.marital_status,
            presentAddress: presentAddress || {
              addressLine1: '',
              country: '',
              state: '',
              city: '',
              zipCode: ''
            },
            permanentAddress: {
              addressLine1: '',
              country: '',
              state: '',
              city: '',
              zipCode: ''
            }
          }}
          employeeId={employeeData.id}
          onUpdate={fetchEmployeeData}
        />

        <EducationEditModal
          isOpen={isEducationModalOpen}
          onClose={() => setIsEducationModalOpen(false)}
          data={employeeData.employee_education?.[0] || {}}
          employeeId={employeeData.id}
          onUpdate={fetchEmployeeData}
        />

        <BankDetailsEditModal
          isOpen={isBankModalOpen}
          onClose={() => setIsBankModalOpen(false)}
          data={employeeData.employee_bank_details?.[0] || {}}
          employeeId={employeeData.id}
          onUpdate={fetchEmployeeData}
        />
      </div>
    </DashboardLayout>
  );
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

export default EmployeeProfile;
