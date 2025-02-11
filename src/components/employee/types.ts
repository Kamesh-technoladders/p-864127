
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
