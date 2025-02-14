
import React from "react";
import { FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { Document } from "@/services/types/employee.types";
import { getErrorMessage, getDocumentByType, getValidationType } from "../utils/documentUtils";
import { toast } from "sonner";

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
  const [localValue, setLocalValue] = React.useState(currentDocument?.documentNumber || '');
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    setLocalValue(currentDocument?.documentNumber || '');
  }, [currentDocument?.documentNumber]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = documentType === 'pan' ? e.target.value.toUpperCase() : e.target.value;
    setLocalValue(value);
    updateDocumentNumber(documentType, value);
    
    const validationError = getErrorMessage(validationType, value);
    setError(validationError);
    
    if (validationError && value.length > 0) {
      toast.error(validationError);
    }
  };

  return (
    <FormField
      control={form.control}
      name={validationType}
      render={({ field }) => (
        <div className="space-y-1">
          <label className="text-sm font-medium">
            {label}{required && <span className="text-red-500">*</span>}
          </label>
          <div className="relative">
            <Input
              {...field}
              value={localValue}
              onChange={handleChange}
              placeholder={`Enter ${label}`}
              className={`h-9 ${error ? 'border-red-500' : ''}`}
            />
            {error && (
              <span className="text-xs text-red-500 mt-1 block">
                {error}
              </span>
            )}
          </div>
        </div>
      )}
    />
  );
};
