
import React from "react";
import { PersonalDetailsForm } from "../../employee/PersonalDetailsForm";
import { EmploymentDetailsForm } from "../../employee/EmploymentDetailsForm";
import { EducationForm } from "../../employee/EducationForm";
import { BankAccountForm } from "../../employee/BankAccountForm";
import { FormProgress, FormData } from "@/utils/progressCalculator";
import { Experience } from "../types";

interface FormContentProps {
  activeTab: string;
  formData: FormData;
  updateSectionProgress: (section: keyof FormProgress, completed: boolean) => void;
  updateFormData: (section: keyof FormData, data: any) => void;
  handleSaveAndNext: () => void;
}

export const FormContent: React.FC<FormContentProps> = ({
  activeTab,
  formData,
  updateSectionProgress,
  updateFormData,
  handleSaveAndNext,
}) => {
  const employeeId = formData.personal?.employeeId || "";

  switch (activeTab) {
    case "personal":
      return (
        <PersonalDetailsForm
          onComplete={(completed: boolean, data?: any) => {
            console.log('Personal details form completion:', { completed, data });
            updateSectionProgress("personal", completed);
            if (completed && data) {
              updateFormData("personal", data);
              if (completed) handleSaveAndNext();
            }
          }}
          initialData={formData.personal}
        />
      );
    case "education":
      return (
        <EducationForm
          onComplete={(completed: boolean, data?: any) => {
            console.log('Education form completion:', { completed, data });
            updateSectionProgress("education", completed);
            if (completed && data) {
              updateFormData("education", data);
            }
          }}
          initialData={formData.education}
          employeeId={employeeId}
        />
      );
    case "bank":
      return (
        <BankAccountForm
          onComplete={(completed: boolean, data?: any) => {
            console.log('Bank account form completion:', { completed, data });
            updateSectionProgress("bank", completed);
            if (completed && data) {
              updateFormData("bank", data);
            }
          }}
          initialData={formData.bank}
          employeeId={employeeId}
        />
      );
    default:
      return null;
  }
};
