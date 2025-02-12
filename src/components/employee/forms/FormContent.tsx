
import React from "react";
import { PersonalDetailsForm } from "../PersonalDetailsForm";
import { EducationForm } from "../EducationForm";
import { ExperienceForm } from "../ExperienceForm";
import { BankAccountForm } from "../BankAccountForm";
import { FormProgress, FormData } from "@/utils/progressCalculator";
import { Experience } from "../types";
import { useParams } from "react-router-dom";

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
  const { id: employeeId } = useParams<{ id: string }>();

  if (!employeeId) {
    throw new Error("Employee ID is required");
  }

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
          employeeId={employeeId}
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
          employeeId={employeeId}
        />
      );
    default:
      return null;
  }
};
