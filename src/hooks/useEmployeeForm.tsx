
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

  const handleSaveAndNext = async (completedData?: any) => {
    // For personal details tab
    if (activeTab === "personal") {
      setIsSubmitting(true);
      try {
        if (!completedData) {
          toast.error("Please complete all required fields");
          return;
        }

        console.log('Raw form data:', completedData);

        // Validate that required address data exists
        if (!completedData.presentAddress) {
          toast.error("Present address is required");
          return;
        }

        // Create a clean copy of the present address
        const presentAddress = {
          addressLine1: completedData.presentAddress.addressLine1 || '',
          country: completedData.presentAddress.country || '',
          state: completedData.presentAddress.state || '',
          city: completedData.presentAddress.city || '',
          zipCode: completedData.presentAddress.zipCode || ''
        };

        // For permanent address, use present address if sameAsPresent is true
        const permanentAddress = completedData.sameAsPresent
          ? { ...presentAddress }
          : {
              addressLine1: completedData.permanentAddress?.addressLine1 || '',
              country: completedData.permanentAddress?.country || '',
              state: completedData.permanentAddress?.state || '',
              city: completedData.permanentAddress?.city || '',
              zipCode: completedData.permanentAddress?.zipCode || ''
            };

        // Create the submission data object with all required fields
        const submissionData = {
          employeeId: completedData.employeeId,
          firstName: completedData.firstName,
          lastName: completedData.lastName,
          email: completedData.email,
          phone: completedData.phone,
          dateOfBirth: completedData.dateOfBirth,
          gender: completedData.gender,
          bloodGroup: completedData.bloodGroup,
          maritalStatus: completedData.maritalStatus,
          presentAddress,
          permanentAddress,
          documents: completedData.documents || [],
          emergencyContacts: completedData.emergencyContacts || [],
          familyDetails: completedData.familyDetails || []
        };

        console.log('Structured data for submission:', submissionData);

        // Save to backend
        const savedEmployee = await personalInfoService.createPersonalInfo(submissionData);

        if (!savedEmployee) {
          throw new Error("Failed to save personal details");
        }

        console.log('Data saved successfully:', savedEmployee);

        // Update form state with the saved data
        const personalData: PersonalDetailsData = {
          ...submissionData,
          id: savedEmployee.id
        };
        
        updateFormData("personal", personalData);
        updateSectionProgress("personal", true);
        setActiveTab("education");
        toast.success("Personal details saved successfully!");
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
