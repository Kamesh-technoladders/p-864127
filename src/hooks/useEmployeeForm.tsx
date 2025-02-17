
import { useState } from "react";
import { toast } from "sonner";
import { employeeService } from "@/services/employee/employee.service";
import { useEmailValidation } from "./form/useEmailValidation";
import { useFormStateMachine } from "./form/useFormStateMachine";
import { PersonalDetailsData } from "@/components/employee/types";
import { EmployeeData } from "@/services/types/employee.types";
import { personalInfoService } from "@/services/employee/personalInfo.service";
import { validatePersonalDetails, validateEducation, validateBankDetails } from "@/utils/formValidation";

export const useEmployeeForm = () => {
  const [isFormCompleted, setIsFormCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      setIsSubmitting(true);
      setFormState('VALIDATING');
      try {
        if (!completedData) {
          toast.error("Please complete all required fields");
          return;
        }

        console.log('Form submission data:', completedData);

        if (!validatePersonalDetails(completedData)) {
          setFormState('ERROR');
          setIsSubmitting(false);
          return;
        }

        setFormState('SUBMITTING');
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
          documents: completedData.documents || [],
          emergencyContacts: completedData.emergencyContacts || [],
          familyDetails: completedData.familyDetails || []
        };

        const savedEmployee = await personalInfoService.createPersonalInfo(submissionData);

        if (!savedEmployee) {
          throw new Error("Failed to save personal details");
        }

        const personalData: PersonalDetailsData = {
          ...submissionData,
          id: savedEmployee.id,
          aadharUrl: completedData.aadharUrl,
          panUrl: completedData.panUrl,
          uanUrl: completedData.uanUrl,
          esicUrl: completedData.esicUrl,
          profilePictureUrl: completedData.profilePictureUrl,
          documents: submissionData.documents
        };
        
        updateFormData("personal", personalData);
        updateSectionProgress("personal", true);
        setActiveTab("education");
        setFormState('SUCCESS');
        toast.success("Personal details saved successfully!");
      } catch (error: any) {
        console.error('Error saving personal details:', error);
        toast.error(error.message || "Failed to save personal details. Please try again.");
        updateSectionProgress("personal", false);
        setFormState('ERROR');
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

      setFormState('VALIDATING');
      if (completedData) {
        try {
          if (!validateEducation(completedData)) {
            setFormState('ERROR');
            return;
          }

          setFormState('SUBMITTING');
          await employeeService.updateEmployee(formData.personal.id, {
            education: completedData
          });

          updateFormData("education", completedData);
          updateSectionProgress("education", true);
          setActiveTab("bank");
          setFormState('SUCCESS');
          toast.success("Education details saved successfully!");
        } catch (error: any) {
          console.error('Error saving education details:', error);
          toast.error(error.message || "Failed to save education details. Please try again.");
          updateSectionProgress("education", false);
          setFormState('ERROR');
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
      setFormState('VALIDATING');
      try {
        if (completedData) {
          if (!validateBankDetails(completedData)) {
            setFormState('ERROR');
            setIsSubmitting(false);
            return;
          }

          setFormState('SUBMITTING');
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
          setFormState('SUCCESS');
          toast.success("Employee information saved successfully!");
          setIsFormCompleted(true);
          window.location.reload();
        }
      } catch (error: any) {
        console.error('Error saving employee data:', error);
        toast.error(error.message || "Failed to save employee information. Please try again.");
        setFormState('ERROR');
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
    formState,
    updateSectionProgress,
    updateFormData,
    handleTabChange,
    handleSaveAndNext,
    clearError,
  };
};
