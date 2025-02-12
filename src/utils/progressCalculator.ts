
export interface FormProgress {
  personal: boolean;
  education: boolean;
  experience: boolean;
  bank: boolean;
  employment: boolean;
}

export interface FormData {
  personal: {
    employeeId: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    gender: string;
    bloodGroup: string;
    maritalStatus: string;
    presentAddress: {
      addressLine1: string;
      country: string;
      state: string;
      city: string;
      zipCode: string;
    };
    permanentAddress: {
      addressLine1: string;
      country: string;
      state: string;
      city: string;
      zipCode: string;
    };
    emergencyContacts?: Array<{
      relationship: string;
      name: string;
      phone: string;
    }>;
    familyDetails?: Array<{
      relationship: string;
      name: string;
      occupation: string;
      phone: string;
    }>;
  } | null;
  employment: {
    department: string;
    position: string;
    employmentStartDate: string;
    employmentStatus: 'active' | 'inactive' | 'onLeave';
  } | null;
  education: any;
  experience: any[];
  bank: any;
}

export const calculateProgress = (progress: FormProgress): number => {
  // Calculate weighted progress
  let totalProgress = 0;
  
  // Personal Details (20%)
  if (progress.personal) totalProgress += 20;
  
  // Employment Details (20%)
  if (progress.employment) totalProgress += 20;
  
  // Education & Experience (40% combined)
  if (progress.education) totalProgress += 20;
  if (progress.experience) totalProgress += 20;
  
  // Bank Details (20%)
  if (progress.bank) totalProgress += 20;
  
  return totalProgress;
};

export const getProgressMessage = (progress: FormProgress): string => {
  const incomplete = [];
  
  if (!progress.personal) {
    incomplete.push("Personal Details");
  }
  
  if (!progress.employment) {
    incomplete.push("Employment Details");
  }
  
  // Check both education and experience together
  if (!progress.education || !progress.experience) {
    incomplete.push("Education & Experience");
  }
  
  if (!progress.bank) {
    incomplete.push("Bank Account Details");
  }

  if (incomplete.length === 0) {
    return "All sections completed! You can proceed.";
  }

  return `Please complete the following sections: ${incomplete.join(", ")}`;
};
