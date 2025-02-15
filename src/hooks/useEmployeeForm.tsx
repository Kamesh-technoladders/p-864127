
import { useState } from "react";
import { toast } from "sonner";
import { employeeService } from "@/services/employee/employee.service";
import { useEmailValidation } from "./form/useEmailValidation";
import { useFormState } from "./form/useFormState";
import { PersonalDetailsData } from "@/components/employee/types";
import { EmployeeData } from "@/services/types/employee.types";
import { personalInfoService } from "@/services/employee/personalInfo.service";

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

  const validateAddressData = (data: any) => {
    if (!data.presentAddress) {
      throw new Error("Present address is required");
    }

    const requiredFields = ['addressLine1', 'country', 'state', 'city', 'zipCode'];
    
    // Validate present address (always required)
    for (const field of requiredFields) {
      if (!data.presentAddress[field]) {
        throw new Error(`Present address: ${field} is required`);
      }
    }

    // If sameAsPresent is true, use present address as permanent address
    if (data.sameAsPresent) {
      data.permanentAddress = { ...data.presentAddress };
    } else {
      // Validate permanent address only if sameAsPresent is false
      if (!data.permanentAddress) {
        throw new Error("Permanent address is required");
      }
      
      for (const field of requiredFields) {
        if (!data.permanentAddress[field]) {
          throw new Error(`Permanent address: ${field} is required`);
        }
      }
    }

    return true;
  };

  const handleSaveAndNext = async (completedData?: any) => {
    // For personal details tab
    if (activeTab === "personal") {
      setIsSubmitting(true);
      try {
        if (completedData) {
          console.log('Form data before validation:', completedData);
          
          // Validate address data before submission
          validateAddressData(completedData);

          // If sameAsPresent is true, use present address for permanent address
          const submissionData = {
            ...completedData,
            permanentAddress: completedData.sameAsPresent 
              ? { ...completedData.presentAddress }
              : completedData.permanentAddress
          };

          console.log('Data being sent to backend:', submissionData);

          // First save to backend
          const savedEmployee = await personalInfoService.createPersonalInfo(submissionData);

          if (!savedEmployee) {
            throw new Error("Failed to save personal details");
          }

          // Then update form state with the saved data
          const personalData: PersonalDetailsData = {
            ...submissionData,
            id: savedEmployee.id
          };
          
          updateFormData("personal", personalData);
          updateSectionProgress("personal", true);
          setActiveTab("education");
          toast.success("Personal details saved successfully!");
        } else {
          toast.error("Please complete all required fields");
        }
      } catch (error: any) {
        console.error('Error saving personal details:', error);
        toast.error(error.message || "Failed to save personal details. Please try again.");
        updateSectionProgress("personal", false);
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    // For education tab, move to bank after saving
    if (activeTab === "education") {
      if (!formData.personal?.id) {
        toast.error("Please complete personal details first");
        setActiveTab("personal");
        return;
      }

      if (completedData) {
        try {
          // Save education details to backend
          await employeeService.updateEmployee(formData.personal.id, {
            education: completedData
          });

          updateFormData("education", completedData);
          updateSectionProgress("education", true);
          setActiveTab("bank");
          toast.success("Education details saved successfully!");
        } catch (error: any) {
          console.error('Error saving education details:', error);
          toast.error(error.message || "Failed to save education details. Please try again.");
          updateSectionProgress("education", false);
        }
      }
      return;
    }

    // For final submission (bank details tab)
    if (activeTab === "bank") {
      if (!formData.personal?.id || !formData.education) {
        toast.error("Please complete all required sections before submitting");
        return;
      }

      setIsSubmitting(true);
      try {
        if (completedData) {
          // Update bank details in backend
          await employeeService.updateEmployee(formData.personal.id, {
            bank: completedData
          });

          updateFormData("bank", completedData);
          
          const employeeData: EmployeeData = {
            id: formData.personal.id,
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

          await employeeService.updateEmployee(formData.personal.id, employeeData);
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
