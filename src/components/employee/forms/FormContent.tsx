
import React from "react";
import { PersonalDetailsForm } from "../PersonalDetailsForm";
import { EducationForm } from "../EducationForm";
import { ExperienceForm } from "../ExperienceForm";
import { BankAccountForm } from "../BankAccountForm";
import { FormProgress, FormData } from "@/utils/progressCalculator";
import { Experience, PersonalDetailsData } from "../types";

interface FormContentProps {
  activeTab: string;
  formData: FormData;
  updateSectionProgress: (section: keyof FormProgress, completed: boolean) => void;
  updateFormData: (section: keyof FormData, data: any) => void;
  isCheckingEmail?: boolean;
  emailError?: string | null;
  isSubmitting?: boolean;
}

export const FormContent: React.FC<FormContentProps> = ({
  activeTab,
  formData,
  updateSectionProgress,
  updateFormData,
  isCheckingEmail,
  emailError,
  isSubmitting,
}) => {
  switch (activeTab) {
    case "personal":
      return (
        <PersonalDetailsForm
          onComplete={(completed: boolean, data?: any) => {
            if (completed && data) {
              // The actual saving to backend is handled in useEmployeeForm
              // This just passes the data up
              updateFormData("personal", data);
              updateSectionProgress("personal", completed);
            }
          }}
          initialData={formData.personal}
          isCheckingEmail={isCheckingEmail}
          emailError={emailError}
          isSubmitting={isSubmitting}
        />
      );
    case "education":
      return (
        <>
          <EducationForm
            onComplete={(completed: boolean, data?: any) => {
              if (completed && data) {
                updateFormData("education", data);
                updateSectionProgress("education", completed);
              }
            }}
            initialData={formData.education}
          />
          <div className="shrink-0 h-px mt-[29px] border-[rgba(239,242,255,1)] border-solid border-2" />
          <ExperienceForm
            onComplete={(completed: boolean, data?: Experience[]) => {
              if (completed && data) {
                updateFormData("experience", data);
                updateSectionProgress("experience", completed);
              }
            }}
            experiences={formData.experience}
          />
        </>
      );
    case "bank":
      return (
        <BankAccountForm
          onComplete={(completed: boolean, data?: any) => {
            if (completed && data) {
              updateFormData("bank", data);
              updateSectionProgress("bank", completed);
            }
          }}
          initialData={formData.bank}
        />
      );
    default:
      return null;
  }
};
