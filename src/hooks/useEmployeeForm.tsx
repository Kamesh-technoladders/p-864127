
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
    if (activeTab === "personal") {
      setIsSubmitting(true);
      try {
        if (!completedData) {
          toast.error("Please complete all required fields");
          return;
        }

        // Ensure required fields are present
        if (!completedData.aadharNumber || !completedData.panNumber) {
          toast.error("Aadhar number and PAN number are required");
          return;
        }

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
          aadharNumber: completedData.aadharNumber,
          panNumber: completedData.panNumber,
          uanNumber: completedData.uanNumber || '',
          esicNumber: completedData.esicNumber || '',
          presentAddress: completedData.presentAddress,
          permanentAddress: completedData.permanentAddress,
          // Ensure documents is always provided as a non-optional array
          documents: completedData.documents || [],
          emergencyContacts: completedData.emergencyContacts || [],
          familyDetails: completedData.familyDetails || []
        };

        const savedEmployee = await personalInfoService.createPersonalInfo(submissionData);

        if (!savedEmployee) {
          throw new Error("Failed to save personal details");
        }

        // Create the PersonalDetailsData object with proper typing
        const personalData: PersonalDetailsData = {
          ...submissionData,
          id: savedEmployee.id,
          aadharUrl: completedData.aadharUrl,
          panUrl: completedData.panUrl,
          uanUrl: completedData.uanUrl,
          esicUrl: completedData.esicUrl,
          profilePictureUrl: completedData.profilePictureUrl,
          documents: submissionData.documents // Ensure documents is passed through
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
