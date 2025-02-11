
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

export interface PersonalDetailsFormProps extends FormComponentProps {
  onComplete: (completed: boolean, data?: any) => void;
}

export interface EducationFormProps extends FormComponentProps {
  onComplete: (completed: boolean, data?: any) => void;
}

export interface ExperienceFormProps {
  onComplete: (completed: boolean, data?: Experience[]) => void;
  experiences?: Experience[];
}

export interface BankAccountFormProps extends FormComponentProps {
  onComplete: (completed: boolean, data?: any) => void;
}
