export interface Address {
  addressLine1: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
}

export interface EmergencyContact {
  relationship: string;
  name: string;
  phone: string;
}

export interface FamilyDetail {
  relationship: string;
  name: string;
  occupation: string;
  phone: string;
}

export interface PersonalInfo {
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
  emergencyContacts?: EmergencyContact[];
  familyDetails?: FamilyDetail[];
}

export interface EmploymentInfo {
  department: string;
  position: string;
  employmentStartDate: string;
  employmentStatus: "active" | "inactive" | "onLeave";
}

export interface Education {
  ssc?: File;
  hsc?: File;
  degree?: File;
}

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

export interface BankDetails {
  accountHolderName: string;
  accountNumber: string;
  ifscCode: string;
  bankName: string;
  branchName: string;
  accountType: string;
  bankPhone?: string;
  cancelledCheque?: File;
  passbookCopy?: File;
}

export interface EmployeeData {
  personal: PersonalInfo;
  employment: EmploymentInfo;
  education: Education;
  experience: Experience[];
  bank: BankDetails;
}
