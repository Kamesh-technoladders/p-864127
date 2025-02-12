
export interface FormProgress {
  personal: boolean;
  education: boolean;
  experience: boolean;
  bank: boolean;
}

export interface FormData {
  personal: any;
  education: any;
  experience: any[];
  bank: any;
}

export const calculateProgress = (progress: FormProgress): number => {
  // Calculate weighted progress
  let totalProgress = 0;
  
  // Personal Details (25%)
  if (progress.personal) totalProgress += 25;
  
  // Education & Experience (50% combined)
  if (progress.education) totalProgress += 25;
  if (progress.experience) totalProgress += 25;
  
  // Bank Details (25%)
  if (progress.bank) totalProgress += 25;
  
  return totalProgress;
};

export const getProgressMessage = (progress: FormProgress): string => {
  const incomplete = [];
  
  if (!progress.personal) {
    incomplete.push("Personal Details");
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
