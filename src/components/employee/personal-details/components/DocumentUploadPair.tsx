
import React from "react";
import { Document } from "@/services/types/employee.types";
import { UploadField } from "../../UploadField";
import { DocumentField } from "./DocumentField";
import { UseFormReturn } from "react-hook-form";
import { getDocumentByType } from "../utils/documentUtils";

interface DocumentUploadPairProps {
  form: UseFormReturn<any>;
  documentType: Document['documentType'];
  documents: Document[];
  label: string;
  required?: boolean;
  updateDocumentNumber: (type: Document['documentType'], value: string) => void;
  onUpload: (file: File) => Promise<void>;
}

export const DocumentUploadPair: React.FC<DocumentUploadPairProps> = ({
  form,
  documentType,
  documents,
  label,
  required,
  updateDocumentNumber,
  onUpload,
}) => {
  const currentDocument = getDocumentByType(documents, documentType);

  return (
    <div className="flex-1">
      <UploadField
        label={`+ Upload ${label} Card`}
        required={required}
        onUpload={onUpload}
        currentFile={currentDocument?.documentUrl ? {
          name: currentDocument?.fileName || `${label} Card`,
          type: 'application/pdf',
          url: currentDocument?.documentUrl
        } : undefined}
        showProgress
        compact
        minimal
      />
    </div>
  );
};
