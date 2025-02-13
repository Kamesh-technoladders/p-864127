
export const calculateYearsOfExperience = (joinedDate: string) => {
  const joined = new Date(joinedDate);
  const now = new Date();
  const years = now.getFullYear() - joined.getFullYear();
  const months = now.getMonth() - joined.getMonth();
  if (months < 0) {
    return `${years - 1} years`;
  }
  return `${years} years`;
};
