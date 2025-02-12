
import React from "react";
import { PersonalDetailsForm } from "../PersonalDetailsForm";
import { EmploymentDetailsForm } from "../EmploymentDetailsForm";
import { EducationForm } from "../EducationForm";
import { BankAccountForm } from "../BankAccountForm";
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
  // The employeeId will come from formData.personal when needed
  const employeeId = formData.personal?.employeeId;

  switch (activeTab) {
    case "personal":
      return (
        <PersonalDetailsForm
          onComplete={(completed: boolean, data?: any) => {
            updateSectionProgress("personal", completed);
            if (completed && data) {
              updateFormData("personal", data);
              handleSaveAndNext();
            }
          }}
          initialData={formData.personal}
        />
      );
    case "employment":
      return (
        <EmploymentDetailsForm
          onComplete={(completed: boolean, data?: any) => {
            updateSectionProgress("employment", completed);
            if (completed && data) {
              updateFormData("employment", data);
              handleSaveAndNext();
            }
          }}
          initialData={formData.employment}
          employeeId={employeeId || ""}
        />
      );
    case "education":
      return (
        <EducationForm
          onComplete={(completed: boolean, data?: any) => {
            updateSectionProgress("education", completed);
            if (completed && data) {
              updateFormData("education", data);
            }
          }}
          initialData={formData.education}
          employeeId={employeeId || ""}
        />
      );
    case "bank":
      return (
        <BankAccountForm
          onComplete={(completed: boolean, data?: any) => {
            updateSectionProgress("bank", completed);
            if (completed && data) {
              updateFormData("bank", data);
            }
          }}
          initialData={formData.bank}
          employeeId={employeeId || ""}
        />
      );
    default:
      return null;
  }
};
