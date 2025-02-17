
import { useState } from "react";
import { toast } from "sonner";
import { PersonalDetailsData } from "@/components/employee/types";
import { personalInfoService } from "@/services/employee/personalInfo.service";
import { validatePersonalDetails } from "@/utils/formValidation";
import { FormState } from "./useFormStateMachine";

export const usePersonalDetailsSubmission = (
  setFormState: (state: FormState) => void,
  updateFormData: (section: string, data: any) => void,
  updateSectionProgress: (section: string, completed: boolean) => void,
  setActiveTab: (tab: string) => void
) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePersonalDetailsSubmission = async (completedData: PersonalDetailsData) => {
    setIsSubmitting(true);
    setFormState('VALIDATING');
    try {
      if (!completedData) {
        toast.error("Please complete all required fields");
        return false;
      }

      console.log('Form submission data:', completedData);

      if (!validatePersonalDetails(completedData)) {
        setFormState('ERROR');
        setIsSubmitting(false);
        return false;
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
      return true;
    } catch (error: any) {
      console.error('Error saving personal details:', error);
      toast.error(error.message || "Failed to save personal details. Please try again.");
      updateSectionProgress("personal", false);
      setFormState('ERROR');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    handlePersonalDetailsSubmission
  };
};
