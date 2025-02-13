
import { useState } from "react";
import { toast } from "sonner";
import { FormProgress, FormData } from "@/utils/progressCalculator";
import { Experience } from "@/components/employee/types";
import { employeeService } from "@/services/employee/employee.service";

export const useEmployeeForm = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [isFormCompleted, setIsFormCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formProgress, setFormProgress] = useState<FormProgress>({
    personal: false,
    education: false,
    experience: false,
    bank: false,
  });

  const [formData, setFormData] = useState<FormData>({
    personal: null,
    education: null,
    experience: [],
    bank: null,
  });

  const updateSectionProgress = (section: keyof FormProgress, completed: boolean) => {
    setFormProgress((prev) => ({
      ...prev,
      [section]: completed,
    }));
  };

  const updateFormData = (section: keyof FormData, data: any) => {
    console.log(`Updating ${section} data:`, data);
    setFormData((prev) => ({
      ...prev,
      [section]: data,
    }));

    if (section === 'experience') {
      updateSectionProgress('experience', Array.isArray(data) && data.length > 0);
    }
  };

  const handleTabChange = (tabId: string) => {
    if (!formProgress[activeTab as keyof FormProgress]) {
      toast.error("Please complete the current section before proceeding");
      return;
    }
    setActiveTab(tabId);
  };

  const handleSaveAndNext = async () => {
    if (activeTab === "personal") {
      const form = document.getElementById("personalDetailsForm") as HTMLFormElement;
      if (form) {
        form.requestSubmit();
      }
    }

    if (!formProgress[activeTab as keyof FormProgress]) {
      toast.error("Please complete all required fields before proceeding");
      return;
    }

    const tabOrder = ["personal", "education", "bank"];
    const currentIndex = tabOrder.indexOf(activeTab);
    
    if (currentIndex < tabOrder.length - 1) {
      setActiveTab(tabOrder[currentIndex + 1]);
    } else {
      // Check if all required sections are completed
      const requiredSections = ["personal", "bank"];
      const isRequiredCompleted = requiredSections.every(section => 
        formProgress[section as keyof FormProgress]
      );
      
      if (isRequiredCompleted) {
        setIsSubmitting(true);
        try {
          console.log('Submitting form data:', formData);
          const personalData = {
            ...formData.personal!,
            emergencyContacts: formData.personal?.emergencyContacts || [],
            familyDetails: formData.personal?.familyDetails || []
          };
          
          await employeeService.createEmployee({
            personal: personalData,
            education: formData.education,
            experience: formData.experience || [],
            bank: formData.bank!,
          });
          
          toast.success("Employee information saved successfully!");
          setIsFormCompleted(true);
          window.location.reload(); // Refresh to show updated table
        } catch (error: any) {
          console.error('Error saving employee data:', error);
          if (error.message && error.message.includes('Employee ID')) {
            toast.error(error.message);
          } else {
            toast.error("Failed to save employee information. Please try again.");
          }
        } finally {
          setIsSubmitting(false);
        }
      } else {
        toast.error("Please complete all required sections before submitting");
      }
    }
  };

  return {
    activeTab,
    formProgress,
    formData,
    isFormCompleted,
    isSubmitting,
    updateSectionProgress,
    updateFormData,
    handleTabChange,
    handleSaveAndNext,
  };
};
