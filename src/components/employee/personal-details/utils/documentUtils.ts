
import { Document } from "@/services/types/employee.types";
import { documentSchema } from "../documentValidation";

export const validateDocument = (type: keyof typeof documentSchema.shape, value: string) => {
  try {
    const validationType = {
      [type]: true
    };
    const validationObject = { [type]: value };
    const validationSchema = documentSchema.pick(validationType as any);
    validationSchema.parse(validationObject);
    return true;
  } catch (error) {
    if (error instanceof Error) {
      return false;
    }
    return false;
  }
};

export const getErrorMessage = (type: keyof typeof documentSchema.shape, value: string) => {
  try {
    const validationType = {
      [type]: true
    };
    const validationObject = { [type]: value };
    const validationSchema = documentSchema.pick(validationType as any);
    validationSchema.parse(validationObject);
    return null;
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }
    return "Invalid format";
  }
};

export const getDocumentByType = (documents: Document[], type: Document['documentType']) => 
  documents.find(doc => doc.documentType === type);

export const getValidationType = (documentType: Document['documentType']): keyof typeof documentSchema.shape => {
  const types = {
    'aadhar': 'aadharNumber',
    'pan': 'panNumber',
    'uan': 'uanNumber',
    'esic': 'esicNumber'
  } as const;
  
  return types[documentType] as keyof typeof documentSchema.shape;
};
