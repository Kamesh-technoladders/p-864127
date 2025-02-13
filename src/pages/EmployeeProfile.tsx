
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/employee/layout/DashboardLayout";
import { useEmployeeData } from "@/hooks/useEmployeeData";
import { toast } from "sonner";
import { LoadingState, ErrorState } from "@/components/employee/profile/ProfileStates";
import { ProfileNavigation } from "@/components/employee/profile/ProfileNavigation";
import { ProfileContent } from "@/components/employee/profile/ProfileContent";
import { ProfileModals } from "@/components/employee/profile/ProfileModals";

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

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-b from-white to-[#FFF9E7] p-8">
        <ProfileNavigation />
        <ProfileContent 
          employeeData={employeeData}
          onEdit={handleEdit}
        />
        <ProfileModals
          employeeData={employeeData}
          isEmploymentModalOpen={isEmploymentModalOpen}
          isPersonalModalOpen={isPersonalModalOpen}
          isEducationModalOpen={isEducationModalOpen}
          isBankModalOpen={isBankModalOpen}
          onCloseEmploymentModal={() => setIsEmploymentModalOpen(false)}
          onClosePersonalModal={() => setIsPersonalModalOpen(false)}
          onCloseEducationModal={() => setIsEducationModalOpen(false)}
          onCloseBankModal={() => setIsBankModalOpen(false)}
          onUpdateEmployment={handleUpdateEmployment}
          onUpdate={fetchEmployeeData}
        />
      </div>
    </DashboardLayout>
  );
};

export default EmployeeProfile;
