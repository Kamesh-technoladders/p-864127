
import React from "react";
import { PersonalDetailsForm } from "../PersonalDetailsForm";
import { EducationForm } from "../EducationForm";
import { ExperienceForm } from "../ExperienceForm";
import { BankAccountForm } from "../BankAccountForm";
import { FormProgress, FormData } from "@/utils/progressCalculator";
import { Experience } from "../types";
import { toast } from "sonner";

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
  switch (activeTab) {
    case "personal":
      return (
        <PersonalDetailsForm
          onComplete={(completed: boolean, data?: any) => {
            updateSectionProgress("personal", completed);
            if (completed && data) {
              updateFormData("personal", data);
              handleSaveAndNext();
            } else {
              toast.error("Please fill in all required fields");
            }
          }}
          initialData={formData.personal}
        />
      );
    case "education":
      return (
        <>
          <EducationForm
            onComplete={(completed: boolean, data?: any) => {
              updateSectionProgress("education", completed);
              if (completed && data) {
                updateFormData("education", data);
              }
            }}
            initialData={formData.education}
          />
          <div className="shrink-0 h-px mt-[29px] border-[rgba(239,242,255,1)] border-solid border-2" />
          <ExperienceForm
            onComplete={(completed: boolean, data?: Experience[]) => {
              updateSectionProgress("experience", completed);
              if (completed && data) {
                updateFormData("experience", data);
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
            updateSectionProgress("bank", completed);
            if (completed && data) {
              updateFormData("bank", data);
            }
          }}
          initialData={formData.bank}
        />
      );
    default:
      return null;
  }
};
