
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
  };

  const handleTabChange = (tabId: string) => {
    const currentTabProgress = formProgress[activeTab as keyof FormProgress];
    console.log('Tab change requested:', { from: activeTab, to: tabId, currentProgress: currentTabProgress });

    if (!currentTabProgress) {
      toast.error("Please complete all required fields before proceeding");
      return;
    }
    setActiveTab(tabId);
  };

  const handleSaveAndNext = async () => {
    console.log('Save and Next clicked:', { activeTab, formProgress, formData });

    const tabOrder = ["personal", "education", "bank"];
    const currentIndex = tabOrder.indexOf(activeTab);
    
    if (currentIndex < tabOrder.length - 1) {
      // Move to next tab
      const nextTab = tabOrder[currentIndex + 1];
      console.log('Moving to next tab:', nextTab);
      setActiveTab(nextTab);
    } else {
      // On last tab, submit the form
      const requiredSections = ["personal", "bank"];
      const isRequiredCompleted = requiredSections.every(section => 
        formProgress[section as keyof FormProgress]
      );
      
      if (isRequiredCompleted) {
        setIsSubmitting(true);
        try {
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
          window.location.reload();
        } catch (error: any) {
          console.error('Error saving employee data:', error);
          toast.error(error.message || "Failed to save employee information");
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
