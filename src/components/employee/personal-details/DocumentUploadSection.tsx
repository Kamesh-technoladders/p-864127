
import React from "react";
import { FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UploadField } from "../UploadField";
import { Document } from "@/services/types/employee.types";
import { UseFormReturn } from "react-hook-form";
import { uploadDocument } from "@/utils/uploadDocument";

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

  const getDocumentByType = (type: Document['documentType']) => 
    documents.find(doc => doc.documentType === type);

  return (
    <div>
      <div className="text-[rgba(48,64,159,1)] font-bold mb-4">Document Upload</div>
      <div className="text-[rgba(80,80,80,1)] text-xs mb-6">
        Upload your identity and verification documents here.
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="aadharNumber"
            render={({ field }) => (
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Aadhar Number<span className="text-red-500">*</span>
                </label>
                <Input
                  {...field}
                  value={getDocumentByType('aadhar')?.documentNumber || ''}
                  onChange={(e) => updateDocumentNumber('aadhar', e.target.value)}
                  placeholder="Enter Aadhar number"
                  className="h-11"
                />
              </div>
            )}
          />
          <UploadField
            label="Aadhar Card"
            required
            onUpload={handleFileUpload('aadhar')}
            currentFile={getDocumentByType('aadhar')?.documentUrl ? {
              name: getDocumentByType('aadhar')?.fileName || 'Aadhar Card',
              type: 'application/pdf',
              url: getDocumentByType('aadhar')?.documentUrl
            } : undefined}
            showProgress
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="panNumber"
            render={({ field }) => (
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  PAN Number<span className="text-red-500">*</span>
                </label>
                <Input
                  {...field}
                  value={getDocumentByType('pan')?.documentNumber || ''}
                  onChange={(e) => updateDocumentNumber('pan', e.target.value)}
                  placeholder="Enter PAN number"
                  className="h-11"
                />
              </div>
            )}
          />
          <UploadField
            label="PAN Card"
            required
            onUpload={handleFileUpload('pan')}
            currentFile={getDocumentByType('pan')?.documentUrl ? {
              name: getDocumentByType('pan')?.fileName || 'PAN Card',
              type: 'application/pdf',
              url: getDocumentByType('pan')?.documentUrl
            } : undefined}
            showProgress
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="uanNumber"
            render={({ field }) => (
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  UAN Number
                </label>
                <Input
                  {...field}
                  value={getDocumentByType('uan')?.documentNumber || ''}
                  onChange={(e) => updateDocumentNumber('uan', e.target.value)}
                  placeholder="Enter UAN number"
                  className="h-11"
                />
              </div>
            )}
          />
          <UploadField
            label="UAN Card"
            onUpload={handleFileUpload('uan')}
            currentFile={getDocumentByType('uan')?.documentUrl ? {
              name: getDocumentByType('uan')?.fileName || 'UAN Card',
              type: 'application/pdf',
              url: getDocumentByType('uan')?.documentUrl
            } : undefined}
            showProgress
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="esicNumber"
            render={({ field }) => (
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  ESIC Number
                </label>
                <Input
                  {...field}
                  value={getDocumentByType('esic')?.documentNumber || ''}
                  onChange={(e) => updateDocumentNumber('esic', e.target.value)}
                  placeholder="Enter ESIC number"
                  className="h-11"
                />
              </div>
            )}
          />
          <UploadField
            label="ESIC Card"
            onUpload={handleFileUpload('esic')}
            currentFile={getDocumentByType('esic')?.documentUrl ? {
              name: getDocumentByType('esic')?.fileName || 'ESIC Card',
              type: 'application/pdf',
              url: getDocumentByType('esic')?.documentUrl
            } : undefined}
            showProgress
          />
        </div>
      </div>
    </div>
  );
};
