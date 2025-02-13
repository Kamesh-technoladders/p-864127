
export interface Address {
  addressLine1: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
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
  education: Education;
  experience: Experience[];
  bank: BankDetails;
}
