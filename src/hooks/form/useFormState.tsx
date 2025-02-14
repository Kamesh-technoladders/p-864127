
import { useState } from "react";
import { FormProgress, FormData } from "@/utils/progressCalculator";
import { toast } from "sonner";

export const useFormState = () => {
  const [activeTab, setActiveTab] = useState("personal");
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
    setFormData((prev) => {
      const newFormData = {
        ...prev,
        [section]: data,
      };
      console.log('Updated form data:', newFormData);
      return newFormData;
    });
  };

  const handleTabChange = (tabId: string) => {
    const currentTabProgress = formProgress[activeTab as keyof FormProgress];
    const currentTabData = formData[activeTab as keyof FormData];
    
    if (!currentTabProgress || !currentTabData) {
      toast.error("Please complete and save the current section before proceeding");
      return;
    }
    setActiveTab(tabId);
  };

  return {
    activeTab,
    formProgress,
    formData,
    updateSectionProgress,
    updateFormData,
    handleTabChange,
    setActiveTab
  };
};
