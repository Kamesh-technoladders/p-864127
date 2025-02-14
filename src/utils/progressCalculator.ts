
import { PersonalDetailsData, EducationData, Experience, BankAccountData } from "@/components/employee/types";

export interface FormProgress {
  personal: boolean;
  education: boolean;
  experience: boolean;
  bank: boolean;
}

export interface FormData {
  personal: PersonalDetailsData | null;
  education: EducationData | null;
  experience: Experience[];
  bank: BankAccountData | null;
}

export const calculateProgress = (formData: FormData): FormProgress => {
  const hasPersonalData = !!formData.personal;
  const hasEducationData = !!formData.education;
  const hasExperienceData = formData.experience && formData.experience.length > 0;
  const hasBankData = !!formData.bank;

  return {
    personal: hasPersonalData,
    education: hasEducationData,
    experience: hasExperienceData,
    bank: hasBankData,
  };
};
