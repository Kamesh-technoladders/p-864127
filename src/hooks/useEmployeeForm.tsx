
import { useState } from "react";
import { toast } from "sonner";
import { FormProgress, FormData } from "@/utils/progressCalculator";
import { Experience } from "@/components/employee/types";
import { employeeService } from "@/services/employee/employee.service";

export const useEmployeeForm = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [isFormCompleted, setIsFormCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [employeeUUID, setEmployeeUUID] = useState<string>("");
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
    console.log('Tab change requested:', { 
      from: activeTab, 
      to: tabId, 
      currentProgress: currentTabProgress,
      employeeUUID 
    });

    // For education tab, check both education and experience progress
    if (activeTab === "education") {
      const isEducationComplete = formProgress.education;
      const isExperienceComplete = formProgress.experience;
      if (!isEducationComplete || !isExperienceComplete) {
        toast.error("Please complete both Education and Experience sections before proceeding");
        return;
      }
    } else if (!currentTabProgress) {
      toast.error("Please complete all required fields before proceeding");
      return;
    }
    setActiveTab(tabId);
  };

  const createEmployee = async () => {
    setIsSubmitting(true);
    try {
      const employee = await employeeService.createEmployee({
        personal: {
          ...formData.personal!,
          emergencyContacts: formData.personal?.emergencyContacts || [],
          familyDetails: formData.personal?.familyDetails || []
        },
        employment: formData.employment || null,
        education: null,
        experience: [],
        bank: null,
      });
      console.log('Employee created:', employee);
      setEmployeeUUID(employee.id);
      toast.success("Personal details saved successfully!");
      return employee.id;
    } catch (error: any) {
      console.error('Error creating employee:', error);
      toast.error(error.message || "Failed to save personal details");
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateEmployee = async () => {
    setIsSubmitting(true);
    try {
      await employeeService.updateEmployee(employeeUUID, {
        personal: formData.personal,
        employment: formData.employment,
        education: formData.education,
        experience: formData.experience,
        bank: formData.bank,
      });
      toast.success("Employee information updated successfully!");
    } catch (error: any) {
      console.error('Error updating employee:', error);
      toast.error(error.message || "Failed to update employee information");
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveAndNext = async () => {
    console.log('Save and Next clicked:', { 
      activeTab, 
      formProgress, 
      formData,
      employeeUUID 
    });

    const tabOrder = ["personal", "education", "bank"];
    const currentIndex = tabOrder.indexOf(activeTab);
    
    try {
      // If we're on personal tab and no UUID exists, create the employee
      if (activeTab === "personal" && !employeeUUID) {
        await createEmployee();
      }
      
      // If we're on the last tab, update everything and complete
      if (currentIndex === tabOrder.length - 1) {
        const requiredSections = ["personal", "education", "experience", "bank"];
        const isRequiredCompleted = requiredSections.every(section => 
          formProgress[section as keyof FormProgress]
        );
        
        if (isRequiredCompleted) {
          await updateEmployee();
          setIsFormCompleted(true);
          window.location.reload();
          return;
        } else {
          toast.error("Please complete all required sections before submitting");
          return;
        }
      }
      
      // Move to next tab if not on last tab
      if (currentIndex < tabOrder.length - 1) {
        const nextTab = tabOrder[currentIndex + 1];
        console.log('Moving to next tab:', nextTab);
        setActiveTab(nextTab);
      }
    } catch (error) {
      console.error('Error in handleSaveAndNext:', error);
      // Error is already handled in createEmployee/updateEmployee
    }
  };

  return {
    activeTab,
    formProgress,
    formData,
    employeeUUID,
    isFormCompleted,
    isSubmitting,
    updateSectionProgress,
    updateFormData,
    handleTabChange,
    handleSaveAndNext,
  };
};
