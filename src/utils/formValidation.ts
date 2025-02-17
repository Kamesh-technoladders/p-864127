
import { PersonalDetailsData, EducationData, BankAccountData } from '@/components/employee/types';
import { toast } from 'sonner';

export const validatePersonalDetails = (data: PersonalDetailsData): boolean => {
  console.log('Validating personal details:', data);

  if (!data) {
    toast.error("Form data is missing");
    return false;
  }

  // Required field validations
  const requiredFields: Array<{ field: keyof PersonalDetailsData; label: string }> = [
    { field: 'employeeId', label: 'Employee ID' },
    { field: 'firstName', label: 'First name' },
    { field: 'lastName', label: 'Last name' },
    { field: 'email', label: 'Email' },
    { field: 'phone', label: 'Phone number' },
    { field: 'dateOfBirth', label: 'Date of birth' },
    { field: 'gender', label: 'Gender' },
    { field: 'bloodGroup', label: 'Blood group' },
    { field: 'maritalStatus', label: 'Marital status' },
    { field: 'aadharNumber', label: 'Aadhar number' },
    { field: 'panNumber', label: 'PAN number' },
  ];

  for (const { field, label } of requiredFields) {
    if (!data[field]) {
      toast.error(`${label} is required`);
      return false;
    }
  }

  // Address validation
  if (!data.presentAddress?.addressLine1?.trim()) {
    toast.error("Present address line is required");
    return false;
  }

  // Document validation
  if (!data.documents || data.documents.length === 0) {
    toast.error("Required documents are missing");
    return false;
  }

  return true;
};

export const validateEducation = (data: EducationData): boolean => {
  if (!data) {
    toast.error("Education data is missing");
    return false;
  }

  const requiredFields = ['type', 'institute', 'yearCompleted'];
  for (const field of requiredFields) {
    if (!data[field as keyof EducationData]) {
      toast.error(`${field} is required`);
      return false;
    }
  }

  return true;
};

export const validateBankDetails = (data: BankAccountData): boolean => {
  if (!data) {
    toast.error("Bank details are missing");
    return false;
  }

  const requiredFields = [
    'accountHolderName',
    'accountNumber',
    'ifscCode',
    'bankName',
    'branchName',
    'accountType'
  ];

  for (const field of requiredFields) {
    if (!data[field as keyof BankAccountData]) {
      toast.error(`${field} is required`);
      return false;
    }
  }

  return true;
};
