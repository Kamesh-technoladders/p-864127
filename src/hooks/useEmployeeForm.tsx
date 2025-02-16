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

  const validatePersonalDetails = (data: any): boolean => {
    // Check basic required fields
    if (!data.employeeId?.trim()) {
      toast.error("Employee ID is required");
      return false;
    }
    if (!data.firstName?.trim()) {
      toast.error("First name is required");
      return false;
    }
    if (!data.lastName?.trim()) {
      toast.error("Last name is required");
      return false;
    }
    if (!data.email?.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!data.phone?.trim()) {
      toast.error("Phone number is required");
      return false;
    }
    if (!data.dateOfBirth) {
      toast.error("Date of birth is required");
      return false;
    }
    if (!data.gender) {
      toast.error("Gender is required");
      return false;
    }
    if (!data.bloodGroup) {
      toast.error("Blood group is required");
      return false;
    }
    if (!data.maritalStatus) {
      toast.error("Marital status is required");
      return false;
    }
    if (!data.aadharNumber?.trim()) {
      toast.error("Aadhar number is required");
      return false;
    }
    if (!data.panNumber?.trim()) {
      toast.error("PAN number is required");
      return false;
    }

    // Validate present address
    if (!data.presentAddress?.addressLine1?.trim()) {
      toast.error("Present address line is required");
      return false;
    }

    return true;
  };

  const handleSaveAndNext = async (completedData?: any) => {
    if (activeTab === "personal") {
      setIsSubmitting(true);
      try {
        if (!completedData) {
          toast.error("Please complete all required fields");
          return;
        }

        // Validate all required fields before proceeding
        if (!validatePersonalDetails(completedData)) {
          setIsSubmitting(false);
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
          presentAddress: {
            addressLine1: completedData.presentAddress?.addressLine1 || '',
            country: completedData.presentAddress?.country || '',
            state: completedData.presentAddress?.state || '',
            city: completedData.presentAddress?.city || '',
            zipCode: completedData.presentAddress?.zipCode || ''
          },
          permanentAddress: completedData.permanentAddress ? {
            addressLine1: completedData.permanentAddress.addressLine1 || '',
            country: completedData.permanentAddress.country || '',
            state: completedData.permanentAddress.state || '',
            city: completedData.permanentAddress.city || '',
            zipCode: completedData.permanentAddress.zipCode || ''
          } : undefined,
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
