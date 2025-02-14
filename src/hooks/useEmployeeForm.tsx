
import { useState } from "react";
import { toast } from "sonner";
import { employeeService } from "@/services/employee/employee.service";
import { useEmailValidation } from "./form/useEmailValidation";
import { useFormValidation } from "./form/useFormValidation";
import { useFormState } from "./form/useFormState";
import { PersonalDetailsData } from "@/components/employee/types";

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
  const { validatePersonalSection, validateBankSection } = useFormValidation();

  const handleSaveAndNext = async () => {
    if (activeTab === "personal") {
      const form = document.getElementById("personalDetailsForm") as HTMLFormElement;
      if (form) {
        form.requestSubmit();
      }
    }

    if (!formProgress[activeTab as keyof typeof formProgress]) {
      toast.error("Please complete all required fields before proceeding");
      return;
    }

    const tabOrder = ["personal", "education", "bank"];
    const currentIndex = tabOrder.indexOf(activeTab);
    
    if (currentIndex < tabOrder.length - 1) {
      setActiveTab(tabOrder[currentIndex + 1]);
    } else {
      const isPersonalValid = validatePersonalSection(formData.personal) && !emailError;
      const isBankValid = validateBankSection(formData.bank);
      
      if (isPersonalValid && isBankValid) {
        setIsSubmitting(true);
        try {
          console.log('Submitting form data:', formData);
          const personalData: PersonalDetailsData = {
            ...formData.personal!,
            emergencyContacts: formData.personal?.emergencyContacts || [],
            familyDetails: formData.personal?.familyDetails || [],
            documents: formData.personal?.documents || []
          };
          
          await employeeService.createEmployee({
            personal: personalData,
            education: formData.education,
            experience: formData.experience || [],
            bank: formData.bank!,
          });
          
          toast.success("Employee information saved successfully!");
          setIsFormCompleted(true);
          window.location.reload();
        } catch (error: any) {
          console.error('Error saving employee data:', error);
          if (error.message && (error.message.includes('Employee ID') || error.message.includes('Email'))) {
            toast.error(error.message);
          } else {
            toast.error("Failed to save employee information. Please try again.");
          }
        } finally {
          setIsSubmitting(false);
        }
      }
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
