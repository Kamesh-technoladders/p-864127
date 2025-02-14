
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Document } from "@/services/types/employee.types";
import { uploadDocument } from "@/utils/uploadDocument";
import { validateDocument, getValidationType } from "./utils/documentUtils";
import { DocumentUploadPair } from "./components/DocumentUploadPair";

interface DocumentUploadSectionProps {
  form: UseFormReturn<any>;
  documents: Document[];
  onDocumentsChange: (documents: Document[]) => void;
}

export const DocumentUploadSection: React.FC<DocumentUploadSectionProps> = ({
  form,
  documents,
  onDocumentsChange,
}) => {
  const handleFileUpload = (documentType: Document['documentType']) => async (file: File) => {
    try {
      const url = await uploadDocument(file, 'employee-documents', documentType);
      const updatedDocuments = [...documents];
      const existingIndex = documents.findIndex(doc => doc.documentType === documentType);
      
      const newDocument = {
        documentType,
        documentNumber: documents.find(doc => doc.documentType === documentType)?.documentNumber || '',
        documentUrl: url,
        fileName: file.name
      };

      if (existingIndex >= 0) {
        updatedDocuments[existingIndex] = newDocument;
      } else {
        updatedDocuments.push(newDocument);
      }
      
      onDocumentsChange(updatedDocuments);
    } catch (error) {
      console.error('Error uploading document:', error);
    }
  };

  const updateDocumentNumber = (documentType: Document['documentType'], value: string) => {
    const validationType = getValidationType(documentType);

    if (!validateDocument(validationType, value)) {
      return;
    }

    const updatedDocuments = [...documents];
    const existingIndex = documents.findIndex(doc => doc.documentType === documentType);
    
    if (existingIndex >= 0) {
      updatedDocuments[existingIndex] = {
        ...updatedDocuments[existingIndex],
        documentNumber: value
      };
    } else {
      updatedDocuments.push({
        documentType,
        documentNumber: value,
        documentUrl: '',
      });
    }
    
    onDocumentsChange(updatedDocuments);
  };

  return (
    <div>
      <div className="text-[rgba(48,64,159,1)] font-bold mb-4">Document Upload</div>
      <div className="text-[rgba(80,80,80,1)] text-xs mb-6">
        Upload your identity and verification documents here.
      </div>

      <div className="space-y-6">
        <DocumentUploadPair
          form={form}
          documentType="aadhar"
          documents={documents}
          label="Aadhar Number"
          required
          updateDocumentNumber={updateDocumentNumber}
          onUpload={handleFileUpload('aadhar')}
        />

        <DocumentUploadPair
          form={form}
          documentType="pan"
          documents={documents}
          label="PAN Number"
          required
          updateDocumentNumber={updateDocumentNumber}
          onUpload={handleFileUpload('pan')}
        />

        <DocumentUploadPair
          form={form}
          documentType="uan"
          documents={documents}
          label="UAN Number"
          updateDocumentNumber={updateDocumentNumber}
          onUpload={handleFileUpload('uan')}
        />

        <DocumentUploadPair
          form={form}
          documentType="esic"
          documents={documents}
          label="ESIC Number"
          updateDocumentNumber={updateDocumentNumber}
          onUpload={handleFileUpload('esic')}
        />
      </div>
    </div>
  );
};
