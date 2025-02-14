
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
    <div className="flex items-center gap-4">
      <div className="flex-1">
        <DocumentField
          form={form}
          documentType={documentType}
          documents={documents}
          label={label}
          required={required}
          updateDocumentNumber={updateDocumentNumber}
        />
      </div>
      <div className="w-32">
        <UploadField
          label={`+ Upload`}
          required={required}
          onUpload={onUpload}
          currentFile={currentDocument?.documentUrl ? {
            name: currentDocument?.fileName || 'Document',
            type: 'application/pdf',
            url: currentDocument?.documentUrl
          } : undefined}
          showProgress
          compact
        />
      </div>
    </div>
  );
};
