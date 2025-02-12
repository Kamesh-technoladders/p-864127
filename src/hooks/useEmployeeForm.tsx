
import { useState } from "react";
import { toast } from "sonner";
import { FormProgress, FormData } from "@/utils/progressCalculator";
import { Experience } from "@/components/employee/types";

export const useEmployeeForm = () => {
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
    setFormData((prev) => ({
      ...prev,
      [section]: data,
    }));
  };

  const handleTabChange = (tabId: string) => {
    if (!formProgress[activeTab as keyof FormProgress]) {
      toast.error("Please complete the current section before proceeding");
      return;
    }
    setActiveTab(tabId);
  };

  const handleSaveAndNext = () => {
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
      console.log("Submitting form data:", formData);
      toast.success("All forms completed successfully!");
    }
  };

  return {
    activeTab,
    formProgress,
    formData,
    updateSectionProgress,
    updateFormData,
    handleTabChange,
    handleSaveAndNext,
  };
};
