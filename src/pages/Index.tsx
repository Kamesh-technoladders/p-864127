
import React, { useState } from "react";
import { DashboardLayout } from "@/components/employee/layout/DashboardLayout";
import { FormContainer } from "@/components/employee/layout/FormContainer";
import { FormContent } from "@/components/employee/forms/FormContent";
import { DashboardView } from "@/components/employee/dashboard/DashboardView";
import { useEmployeeForm } from "@/hooks/useEmployeeForm";
import { calculateProgress, getProgressMessage } from "@/utils/progressCalculator";

const Index = () => {
  const [showForm, setShowForm] = useState(false);
  const {
    activeTab,
    formProgress,
    formData,
    isFormCompleted,
    isSubmitting,
    isCheckingEmail,
    emailError,
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

  const progress = calculateProgress(formData);
  const progressMessage = getProgressMessage(formData);

  const handleAddEmployee = () => {
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
  };

  const handleFormComplete = () => {
    setShowForm(false);
  };

  return (
    <DashboardLayout>
      {showForm ? (
        <>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Add New Employee</h1>
            <button
              onClick={handleFormClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
          </div>
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
              isCheckingEmail={isCheckingEmail}
              emailError={emailError}
              isSubmitting={isSubmitting}
            />
          </FormContainer>
        </>
      ) : (
        <DashboardView onAddEmployee={handleAddEmployee} />
      )}
    </DashboardLayout>
  );
};

export default Index;
