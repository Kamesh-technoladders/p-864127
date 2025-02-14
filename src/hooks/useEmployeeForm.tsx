
import { useState } from "react";
import { toast } from "sonner";
import { employeeService } from "@/services/employee/employee.service";
import { useEmailValidation } from "./form/useEmailValidation";
import { useFormState } from "./form/useFormState";
import { PersonalDetailsData } from "@/components/employee/types";
import { EmployeeData } from "@/services/types/employee.types";

export const useEmployeeForm = () => {
  const [isFormCompleted, setIsFormCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    activeTab,
    formProgress,
    formData,
    updateSectionProgress,
    updateFormData,
    handleTabChange,
    setActiveTab
  } = useFormState();

  const { isCheckingEmail, emailError, setEmailError } = useEmailValidation(formData.personal?.email);

  const handleSaveAndNext = async () => {
    if (activeTab === "personal") {
      const form = document.getElementById("personalDetailsForm") as HTMLFormElement;
      if (form) {
        form.requestSubmit();
      }
      return;
    }

    const hasAllRequiredData = (
      formData.personal && 
      formData.education &&
      formData.bank
    );

    if (activeTab === "bank" && hasAllRequiredData) {
      setIsSubmitting(true);
      try {
        const employeeData: EmployeeData = {
          id: '',
          employeeId: formData.personal.employeeId,
          personal: formData.personal,
          education: formData.education,
          experience: formData.experience || [],
          bank: formData.bank,
          department: formData.personal?.department || null,
          position: formData.personal?.position || null,
          employmentStatus: 'active',
          documents: formData.personal?.documents || []
        };

        await employeeService.createEmployee(employeeData);
        toast.success("Employee information saved successfully!");
        setIsFormCompleted(true);
        window.location.reload();
      } catch (error: any) {
        console.error('Error saving employee data:', error);
        toast.error("Failed to save employee information. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    // Move to next tab if current section is complete
    const tabOrder = ["personal", "education", "bank"];
    const currentIndex = tabOrder.indexOf(activeTab);
    if (currentIndex < tabOrder.length - 1) {
      setActiveTab(tabOrder[currentIndex + 1]);
    }
  };

  return {
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
  };
};
