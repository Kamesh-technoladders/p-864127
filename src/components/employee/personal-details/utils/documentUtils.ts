
import React from 'react';
import { Document } from "@/services/types/employee.types";
import { documentSchema } from "../documentValidation";
import { toast } from "sonner";
import { AlertCircle } from "lucide-react";

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
      toast.error(error.message, {
        duration: 2000,
        icon: React.createElement(AlertCircle, { className: "h-4 w-4" })
      });
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
