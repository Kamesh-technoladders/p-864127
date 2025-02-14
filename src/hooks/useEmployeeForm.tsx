
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

  const handleSaveAndNext = async (completedData?: any) => {
    // For personal details tab
    if (activeTab === "personal") {
      setIsSubmitting(true);
      try {
        if (completedData) {
          updateFormData("personal", completedData);
          updateSectionProgress("personal", true);
          setActiveTab("education");
          toast.success("Personal details saved successfully!");
        } else {
          toast.error("Please complete all required fields");
        }
      } catch (error) {
        console.error('Error saving personal details:', error);
        toast.error("Failed to save personal details. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    // For education tab, move to bank after saving
    if (activeTab === "education") {
      if (completedData) {
        updateFormData("education", completedData);
        updateSectionProgress("education", true);
        setActiveTab("bank");
        toast.success("Education details saved successfully!");
      }
      return;
    }

    // For final submission (bank details tab)
    if (activeTab === "bank") {
      if (!formData.personal || !formData.education) {
        toast.error("Please complete all required sections before submitting");
        return;
      }

      setIsSubmitting(true);
      try {
        if (completedData) {
          updateFormData("bank", completedData);
          
          const employeeData: EmployeeData = {
            id: '',
            employeeId: formData.personal.employeeId,
            personal: formData.personal,
            education: formData.education,
            experience: formData.experience || [],
            bank: completedData,
            department: formData.personal?.department || null,
            position: formData.personal?.position || null,
            employmentStatus: 'active',
            documents: formData.personal?.documents || []
          };

          await employeeService.createEmployee(employeeData);
          toast.success("Employee information saved successfully!");
          setIsFormCompleted(true);
          window.location.reload();
        }
      } catch (error: any) {
        console.error('Error saving employee data:', error);
        toast.error(error.message || "Failed to save employee information. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
      return;
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
