
import React from "react";
import { ProgressBar } from "@/components/employee/ProgressBar";
import { DashboardLayout } from "@/components/employee/layout/DashboardLayout";
import { FormContainer } from "@/components/employee/layout/FormContainer";
import { FormContent } from "@/components/employee/forms/FormContent";
import { DashboardView } from "@/components/employee/dashboard/DashboardView";
import { useEmployeeForm } from "@/hooks/useEmployeeForm";
import { calculateProgress, getProgressMessage } from "@/utils/progressCalculator";

const Index = () => {
  const {
    activeTab,
    formProgress,
    formData,
    isFormCompleted,
    updateSectionProgress,
    updateFormData,
    handleTabChange,
    handleSaveAndNext,
  } = useEmployeeForm();

  const tabs = [
    { id: "personal", label: "Personal Details", isActive: activeTab === "personal" },
    { id: "education", label: "Education & Experience", isActive: activeTab === "education" },
    { id: "bank", label: "Bank Account Details", isActive: activeTab === "bank" },
  ];

  const progress = calculateProgress(formProgress);
  const progressMessage = getProgressMessage(formProgress);

  return (
    <DashboardLayout>
      {isFormCompleted ? (
        <DashboardView formData={formData} />
      ) : (
        <>
          <ProgressBar
            percentage={progress}
            title={`${progress}% Completed`}
            subtitle={progressMessage}
          />
          <FormContainer
            tabs={tabs}
            onTabChange={handleTabChange}
            onSaveAndNext={handleSaveAndNext}
            activeTab={activeTab}
          >
            <FormContent
              activeTab={activeTab}
              formData={formData}
              updateSectionProgress={updateSectionProgress}
              updateFormData={updateFormData}
              handleSaveAndNext={handleSaveAndNext}
            />
          </FormContainer>
        </>
      )}
    </DashboardLayout>
  );
};

export default Index;
