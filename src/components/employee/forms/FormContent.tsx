
import React from "react";
import { PersonalDetailsForm } from "../../employee/PersonalDetailsForm";
import { EducationForm } from "../../employee/EducationForm";
import { ExperienceForm } from "../../employee/ExperienceForm";
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
            if (completed && data) {
              updateFormData("personal", data);
              updateSectionProgress("personal", true);
              handleSaveAndNext();
            } else {
              updateSectionProgress("personal", false);
            }
          }}
          initialData={formData.personal}
        />
      );
    case "education":
      return (
        <div className="space-y-8">
          <EducationForm
            onComplete={(completed: boolean, data?: any) => {
              console.log('Education form completion:', { completed, data });
              if (completed && data) {
                updateFormData("education", data);
                updateSectionProgress("education", true);
              } else {
                updateSectionProgress("education", false);
              }
            }}
            initialData={formData.education}
            employeeId={employeeId}
          />
          
          <ExperienceForm
            onComplete={(completed: boolean, data?: Experience[]) => {
              console.log('Experience form completion:', { completed, data });
              if (completed && data) {
                updateFormData("experience", data);
                updateSectionProgress("experience", true);
              } else {
                updateSectionProgress("experience", false);
              }
            }}
            experiences={formData.experience}
            employeeId={employeeId}
          />
        </div>
      );
    case "bank":
      return (
        <BankAccountForm
          onComplete={(completed: boolean, data?: any) => {
            console.log('Bank account form completion:', { completed, data });
            if (completed && data) {
              updateFormData("bank", data);
              updateSectionProgress("bank", true);
            } else {
              updateSectionProgress("bank", false);
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
