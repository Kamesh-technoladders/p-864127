
import { useState } from "react";
import { toast } from "sonner";
import { useEmailValidation } from "./form/useEmailValidation";
import { useFormStateMachine } from "./form/useFormStateMachine";
import { usePersonalDetailsSubmission } from "./form/usePersonalDetailsSubmission";
import { useEducationSubmission } from "./form/useEducationSubmission";
import { useBankDetailsSubmission } from "./form/useBankDetailsSubmission";

export const useEmployeeForm = () => {
  const [isFormCompleted, setIsFormCompleted] = useState(false);

  const {
    formState,
    setFormState,
    activeTab,
    formProgress,
    formData,
    updateSectionProgress,
    updateFormData,
    setActiveTab,
    clearError
  } = useFormStateMachine();

  const { isCheckingEmail, emailError, setEmailError } = useEmailValidation(formData.personal?.email);

  const { isSubmitting: isSubmittingPersonal, handlePersonalDetailsSubmission } = 
    usePersonalDetailsSubmission(setFormState, updateFormData, updateSectionProgress, setActiveTab);

  const { handleEducationSubmission } = 
    useEducationSubmission(setFormState, updateFormData, updateSectionProgress, setActiveTab);

  const { isSubmitting: isSubmittingBank, handleBankDetailsSubmission } = 
    useBankDetailsSubmission(setFormState, updateFormData, setIsFormCompleted);

  const handleTabChange = (tabId: string) => {
    const currentTabKey = activeTab as keyof typeof formProgress;
    if (!formProgress[currentTabKey]) {
      toast.error("Please save the current section before proceeding");
      return;
    }
    setActiveTab(tabId);
  };

  const handleSaveAndNext = async (completedData?: any) => {
    if (activeTab === "personal") {
      await handlePersonalDetailsSubmission(completedData);
      return;
    }

    if (activeTab === "education") {
      if (!formData.personal?.id) {
        toast.error("Please complete personal details first");
        setActiveTab("personal");
        return;
      }
      await handleEducationSubmission(completedData, formData.personal.id);
      return;
    }

    if (activeTab === "bank") {
      if (!formData.personal?.id || !formData.education) {
        toast.error("Please complete all required sections before submitting");
        return;
      }
      await handleBankDetailsSubmission(completedData, formData);
      return;
    }
  };

  return {
    activeTab,
    formProgress,
    formData,
    isFormCompleted,
    isSubmitting: isSubmittingPersonal || isSubmittingBank,
    isCheckingEmail,
    emailError,
    formState,
    updateSectionProgress,
    updateFormData,
    handleTabChange,
    handleSaveAndNext,
    clearError,
  };
};
