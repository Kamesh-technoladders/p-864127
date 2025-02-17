
import { useState } from "react";
import { toast } from "sonner";
import { BankAccountData } from "@/components/employee/types";
import { employeeService } from "@/services/employee/employee.service";
import { validateBankDetails } from "@/utils/formValidation";
import { FormState } from "./useFormStateMachine";
import { EmployeeData } from "@/services/types/employee.types";

export const useBankDetailsSubmission = (
  setFormState: (state: FormState) => void,
  updateFormData: (section: string, data: any) => void,
  setIsFormCompleted: (completed: boolean) => void
) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBankDetailsSubmission = async (
    completedData: BankAccountData,
    formData: {
      personal: any;
      education: any;
      experience: any[];
    }
  ) => {
    setIsSubmitting(true);
    setFormState('VALIDATING');
    try {
      if (!validateBankDetails(completedData)) {
        setFormState('ERROR');
        setIsSubmitting(false);
        return false;
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
      return true;
    } catch (error: any) {
      console.error('Error saving employee data:', error);
      toast.error(error.message || "Failed to save employee information. Please try again.");
      setFormState('ERROR');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    handleBankDetailsSubmission
  };
};
