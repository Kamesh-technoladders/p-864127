
import { toast } from "sonner";
import { EducationData } from "@/components/employee/types";
import { employeeService } from "@/services/employee/employee.service";
import { validateEducation } from "@/utils/formValidation";
import { FormState } from "./useFormStateMachine";

export const useEducationSubmission = (
  setFormState: (state: FormState) => void,
  updateFormData: (section: string, data: any) => void,
  updateSectionProgress: (section: string, completed: boolean) => void,
  setActiveTab: (tab: string) => void
) => {
  const handleEducationSubmission = async (completedData: EducationData, employeeId: string) => {
    setFormState('VALIDATING');
    try {
      if (!validateEducation(completedData)) {
        setFormState('ERROR');
        return false;
      }

      setFormState('SUBMITTING');
      await employeeService.updateEmployee(employeeId, {
        education: completedData
      });

      updateFormData("education", completedData);
      updateSectionProgress("education", true);
      setActiveTab("bank");
      setFormState('SUCCESS');
      toast.success("Education details saved successfully!");
      return true;
    } catch (error: any) {
      console.error('Error saving education details:', error);
      toast.error(error.message || "Failed to save education details. Please try again.");
      updateSectionProgress("education", false);
      setFormState('ERROR');
      return false;
    }
  };

  return {
    handleEducationSubmission
  };
};
