
import type { 
  Document as EmployeeDocument,
  Experience as EmployeeExperience,
  Education as EmployeeEducation,
  BankDetails,
  Address,
  EmergencyContact,
  FamilyMember,
  PersonalInfo
} from "@/services/types/employee.types";

export type { 
  Address,
  EmergencyContact,
  FamilyMember,
  BankDetails as BankAccountData,
  EmployeeEducation as EducationData
};

export interface Experience extends EmployeeExperience {}

export interface PersonalDetailsData extends PersonalInfo {
  id?: string;
  sameAsPresent?: boolean;
  // Remove redundant declarations since they're inherited from PersonalInfo:
  // aadharNumber, panNumber, etc.
}

export interface FormComponentProps<T = any> {
  onComplete: (completed: boolean, data?: T) => void;
  initialData?: T | null;
  isSubmitting?: boolean;
}

export interface PersonalDetailsFormProps extends FormComponentProps<PersonalDetailsData> {
  isCheckingEmail?: boolean;
  emailError?: string | null;
}

export interface EducationFormProps extends FormComponentProps<EmployeeEducation> {}

export interface ExperienceFormProps {
  onComplete: (completed: boolean, data?: Experience[]) => void;
  experiences?: Experience[];
}

export interface BankAccountFormProps extends FormComponentProps<BankDetails> {}
