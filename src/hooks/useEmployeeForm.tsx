
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
    employment: false,
    education: false,
    experience: false,
    bank: false,
  });

  const [formData, setFormData] = useState<FormData>({
    personal: null,
    employment: null,
    education: null,
    experience: [],
    bank: null,
  });

  const updateSectionProgress = (section: keyof FormProgress, completed: boolean) => {
    console.log(`Updating progress for ${section}:`, completed);
    setFormProgress((prev) => {
      const newProgress = {
        ...prev,
        [section]: completed,
      };
      console.log('New form progress:', newProgress);
      return newProgress;
    });
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
    console.log('handleSaveAndNext called');
    console.log('Current tab:', activeTab);
    console.log('Form progress:', formProgress);
    console.log('Form data:', formData);

    if (activeTab === "personal") {
      const form = document.getElementById("personalDetailsForm") as HTMLFormElement;
      if (form) {
        form.requestSubmit();
        return;
      }
    }

    if (!formProgress[activeTab as keyof FormProgress]) {
      toast.error("Please complete all required fields before proceeding");
      return;
    }

    const tabOrder = ["personal", "employment", "education", "bank"];
    const currentIndex = tabOrder.indexOf(activeTab);
    
    if (currentIndex < tabOrder.length - 1) {
      setActiveTab(tabOrder[currentIndex + 1]);
    } else {
      // Check if all required sections are completed
      const requiredSections = ["personal", "employment", "bank"];
      const isRequiredCompleted = requiredSections.every(section => 
        formProgress[section as keyof FormProgress]
      );
      
      if (isRequiredCompleted) {
        setIsSubmitting(true);
        try {
          console.log('Submitting form data:', formData);
          await employeeService.createEmployee({
            personal: {
              ...formData.personal!,
              emergencyContacts: formData.personal?.emergencyContacts || [],
              familyDetails: formData.personal?.familyDetails || []
            },
            employment: formData.employment!,
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
