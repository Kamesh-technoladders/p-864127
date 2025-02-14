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

export interface Document {
  documentType: 'aadhar' | 'uan' | 'pan' | 'esic';
  documentNumber: string;
  documentUrl?: string;
  fileName?: string;
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
  emergencyContacts: EmergencyContact[];
  familyDetails: FamilyMember[];
  documents: Document[];
}

export interface Education {
  ssc?: File;
  hsc?: File;
  degree?: File;
  institute?: string;
  yearCompleted?: string;
}

export interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  employmentType: string;
  startDate: string;
  endDate: string;
  offerLetter?: File | string;
  separationLetter?: File | string;
  payslips: (File | string)[];
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

export interface EmployeeDetailsResponse {
  id: string;
  employee_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  date_of_birth: string | null;
  gender: string | null;
  blood_group: string | null;
  marital_status: string | null;
  department: string | null;
  position: string | null;
  employment_status: string | null;
  created_at: string;
  updated_at: string;
  present_address: {
    addressLine1: string;
    country: string;
    state: string;
    city: string;
    zipCode: string;
  } | null;
  permanent_address: {
    addressLine1: string;
    country: string;
    state: string;
    city: string;
    zipCode: string;
  } | null;
  emergency_contacts: Array<{
    name: string;
    relationship: string;
    phone: string;
  }> | null;
  family_details: Array<{
    name: string;
    relationship: string;
    occupation: string;
    phone: string;
  }> | null;
  experience?: Array<{
    id: string;
    job_title: string;
    company: string;
    location: string | null;
    employment_type: string | null;
    start_date: string;
    end_date: string | null;
    offer_letter_url: string | null;
    separation_letter_url: string | null;
    payslips: string[] | null;
  }>;
}

export interface EmployeeBasicInfo {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: string;
  bloodGroup?: string;
  maritalStatus?: string;
  department?: string;  // Added this field
  position?: string;    // Added this field
}
