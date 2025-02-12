export interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  employmentType: string;
  startDate: string;
  endDate: string;
  offerLetter?: File;
  separationLetter?: File;
  payslips: File[];
}

export interface FormComponentProps<T = any> {
  onComplete: (completed: boolean, data?: T) => void;
  initialData?: T | null;
}

export interface PersonalDetailsData {
  // Add specific personal details fields here if needed
  [key: string]: any;
}

export interface EducationData {
  // Add specific education fields here if needed
  [key: string]: any;
}

export interface BankAccountData {
  // Add specific bank account fields here if needed
  [key: string]: any;
}

export interface PersonalDetailsFormProps extends FormComponentProps<PersonalDetailsData> {}

export interface EducationFormProps extends FormComponentProps<EducationData> {
  employeeId: string;
}

export interface ExperienceFormProps {
  onComplete: (completed: boolean, data?: Experience[]) => void;
  experiences?: Experience[];
  employeeId: string;
}

export interface BankAccountFormProps extends FormComponentProps<BankAccountData> {
  employeeId: string;
}
