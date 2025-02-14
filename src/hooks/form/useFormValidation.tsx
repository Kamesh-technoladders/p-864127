
import { toast } from "sonner";

export const useFormValidation = () => {
  const validatePersonalSection = (data: any) => {
    if (!data) return false;
    const requiredFields = [
      'employeeId',
      'firstName',
      'lastName',
      'email',
      'phone',
      'dateOfBirth',
      'gender',
      'bloodGroup',
      'maritalStatus',
      'presentAddress',
      'permanentAddress'
    ];

    const isValid = requiredFields.every(field => {
      if (field === 'presentAddress' || field === 'permanentAddress') {
        const address = data[field];
        return address && 
               address.addressLine1 && 
               address.country && 
               address.state && 
               address.city && 
               address.zipCode;
      }
      return data[field];
    });

    if (!isValid) {
      toast.error("Please fill in all required fields in Personal Details");
    }

    return isValid;
  };

  const validateBankSection = (data: any) => {
    if (!data) return false;
    const requiredFields = [
      'accountHolderName',
      'accountNumber',
      'ifscCode',
      'bankName',
      'branchName',
      'accountType'
    ];

    const isValid = requiredFields.every(field => data[field]);
    if (!isValid) {
      toast.error("Please fill in all required fields in Bank Details");
    }
    return isValid;
  };

  return { validatePersonalSection, validateBankSection };
};
