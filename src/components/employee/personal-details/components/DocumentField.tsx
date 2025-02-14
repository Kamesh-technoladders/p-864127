
import React from "react";
import { FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { Document } from "@/services/types/employee.types";
import { AlertCircle } from "lucide-react";
import { getErrorMessage, getDocumentByType, getValidationType } from "../utils/documentUtils";
import { documentSchema } from "../documentValidation";

interface DocumentFieldProps {
  form: UseFormReturn<any>;
  documentType: Document['documentType'];
  documents: Document[];
  label: string;
  required?: boolean;
  updateDocumentNumber: (type: Document['documentType'], value: string) => void;
}

export const DocumentField: React.FC<DocumentFieldProps> = ({
  form,
  documentType,
  documents,
  label,
  required,
  updateDocumentNumber,
}) => {
  const validationType = getValidationType(documentType);
  const currentDocument = getDocumentByType(documents, documentType);
  const error = getErrorMessage(validationType, currentDocument?.documentNumber || '');

  return (
    <FormField
      control={form.control}
      name={validationType}
      render={({ field }) => (
        <div className="space-y-2">
          <label className="text-sm font-medium">
            {label}{required && <span className="text-red-500">*</span>}
          </label>
          <div className="relative">
            <Input
              {...field}
              value={currentDocument?.documentNumber || ''}
              onChange={(e) => updateDocumentNumber(documentType, 
                documentType === 'pan' ? e.target.value.toUpperCase() : e.target.value
              )}
              placeholder={`Enter ${label}`}
              className={`h-11 ${error ? 'border-red-500' : ''}`}
            />
            {error && (
              <div className="flex items-center gap-1 mt-1 text-xs text-red-500">
                <AlertCircle className="h-3 w-3" />
                <span>{error}</span>
              </div>
            )}
          </div>
        </div>
      )}
    />
  );
};
