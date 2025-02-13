
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

export interface Address {
  addressLine1: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
}

export interface FamilyMember {
  name: string;
  relationship: string;
  occupation: string;
  phone: string;
}

export interface PersonalDetailsData {
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  bloodGroup: string;
  maritalStatus: string;
  presentAddress: Address;
  permanentAddress: Address;
  emergencyContacts?: EmergencyContact[];  // Made optional with ?
  familyDetails?: FamilyMember[];          // Made optional with ?
}

export interface FormComponentProps<T = any> {
  onComplete: (completed: boolean, data?: T) => void;
  initialData?: T | null;
}

export interface EducationData {
  [key: string]: any;
}

export interface BankAccountData {
  [key: string]: any;
}

export interface PersonalDetailsFormProps extends FormComponentProps<PersonalDetailsData> {}

export interface EducationFormProps extends FormComponentProps<EducationData> {}

export interface ExperienceFormProps {
  onComplete: (completed: boolean, data?: Experience[]) => void;
  experiences?: Experience[];
}

export interface BankAccountFormProps extends FormComponentProps<BankAccountData> {}
