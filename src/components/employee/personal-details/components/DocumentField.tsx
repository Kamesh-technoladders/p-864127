
import React from "react";
import { FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { Document } from "@/services/types/employee.types";
import { getErrorMessage, getDocumentByType, getValidationType } from "../utils/documentUtils";
import { documentSchema } from "../documentValidation";
import { toast } from "sonner";
import { AlertCircle } from "lucide-react";

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

  React.useEffect(() => {
    if (error) {
      toast.error(error, {
        duration: 2000,
        icon: <AlertCircle className="h-4 w-4" />
      });
    }
  }, [error]);

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
          </div>
        </div>
      )}
    />
  );
};
