
export interface Document {
  documentType: 'aadhar' | 'uan' | 'pan' | 'esic';
  documentNumber: string;
  documentUrl?: string;
  fileName?: string;
}

export interface EmployeeData {
  id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  dateOfBirth: string | null;
  gender: string | null;
  bloodGroup: string | null;
  maritalStatus: string | null;
  department: string | null;
  position: string | null;
  employmentStatus: string | null;
  documents: Document[];
}
