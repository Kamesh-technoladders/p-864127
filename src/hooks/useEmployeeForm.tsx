
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
    // For personal details tab
    if (activeTab === "personal") {
      setIsSubmitting(true);
      try {
        const form = document.getElementById("personalDetailsForm") as HTMLFormElement;
        if (form) {
          await new Promise<void>((resolve) => {
            const handleSubmit = (e: Event) => {
              e.preventDefault();
              resolve();
            };
            form.addEventListener('submit', handleSubmit, { once: true });
            form.requestSubmit();
          });
          
          // Move to next tab after successful save
          updateSectionProgress("personal", true);
          setActiveTab("education");
          toast.success("Personal details saved successfully!");
        }
      } catch (error) {
        console.error('Error saving personal details:', error);
        toast.error("Failed to save personal details. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    // For final submission (bank details tab)
    if (activeTab === "bank") {
      if (!formData.personal || !formData.education || !formData.bank) {
        toast.error("Please complete all required sections before submitting");
        return;
      }

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
        toast.error(error.message || "Failed to save employee information. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    // For education tab, move to bank after saving
    if (activeTab === "education") {
      updateSectionProgress("education", true);
      setActiveTab("bank");
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
