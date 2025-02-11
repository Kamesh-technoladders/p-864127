
export interface FormProgress {
  personal: boolean;
  education: boolean;
  documents: boolean;
}

export const calculateProgress = (progress: FormProgress): number => {
  const totalSections = Object.keys(progress).length;
  const completedSections = Object.values(progress).filter(Boolean).length;
  return Math.round((completedSections / totalSections) * 100);
};

export const getProgressMessage = (progress: FormProgress): string => {
  const remaining = Object.entries(progress)
    .filter(([_, completed]) => !completed)
    .map(([section]) => section.charAt(0).toUpperCase() + section.slice(1))
    .join(", ");

  if (remaining) {
    return `Please complete the following sections: ${remaining}`;
  }
  return "All sections completed! You can proceed.";
};
