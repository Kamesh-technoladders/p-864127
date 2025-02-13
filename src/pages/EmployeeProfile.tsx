
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/employee/layout/DashboardLayout";
import { LoadingState, ErrorState } from "@/components/employee/profile/ProfileStates";
import { ProfileHeaderSection } from "@/components/employee/profile/ProfileHeaderSection";
import { ProfileContent } from "@/components/employee/profile/ProfileContent";
import { useEmployeeProfile } from "@/hooks/useEmployeeProfile";

const EmployeeProfile = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const {
    isLoading,
    employeeData,
    error,
    isEmploymentModalOpen,
    setIsEmploymentModalOpen,
    isPersonalModalOpen,
    setIsPersonalModalOpen,
    handleEdit,
    handleUpdateEmployment,
    handleUpdatePersonal,
    calculateYearsOfExperience,
    fetchEmployeeData
  } = useEmployeeProfile(id);

  useEffect(() => {
    if (id) {
      console.log('Fetching data for employee:', id);
      fetchEmployeeData();
    }
  }, [id, fetchEmployeeData]);

  if (!id) {
    return <ErrorState message="No Employee Selected" onReturn={() => navigate("/")} />;
  }

  if (isLoading) {
    return <LoadingState />;
  }

  if (error || !employeeData) {
    return <ErrorState message={error || "Employee Not Found"} onReturn={() => navigate("/")} />;
  }

  console.log('Employee data in profile:', employeeData);

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-b from-white to-[#FFF9E7] p-8">
        <ProfileHeaderSection />
        <ProfileContent
          employeeData={employeeData}
          isEmploymentModalOpen={isEmploymentModalOpen}
          isPersonalModalOpen={isPersonalModalOpen}
          setIsEmploymentModalOpen={setIsEmploymentModalOpen}
          setIsPersonalModalOpen={setIsPersonalModalOpen}
          handleEdit={handleEdit}
          handleUpdateEmployment={handleUpdateEmployment}
          handleUpdatePersonal={handleUpdatePersonal}
          calculateYearsOfExperience={calculateYearsOfExperience}
        />
      </div>
    </DashboardLayout>
  );
};

export default EmployeeProfile;
