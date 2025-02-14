
import React from "react";
import { FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UploadField } from "../UploadField";
import { Document } from "@/services/types/employee.types";
import { UseFormReturn } from "react-hook-form";
import { uploadDocument } from "@/utils/uploadDocument";
import { documentSchema } from "./documentValidation";
import { AlertCircle } from "lucide-react";
import { toast } from "sonner";

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

  const validateDocument = (type: string, value: string) => {
    try {
      const validationObject = { [type]: value };
      documentSchema.pick({ [type]: true }).parse(validationObject);
      return true;
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      return false;
    }
  };

  const updateDocumentNumber = (documentType: Document['documentType'], value: string) => {
    const validationType = {
      'aadhar': 'aadharNumber',
      'pan': 'panNumber',
      'uan': 'uanNumber',
      'esic': 'esicNumber'
    }[documentType];

    if (validationType && !validateDocument(validationType, value)) {
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

  const getDocumentByType = (type: Document['documentType']) => 
    documents.find(doc => doc.documentType === type);

  const getErrorMessage = (type: string, value: string) => {
    try {
      const validationObject = { [type]: value };
      documentSchema.pick({ [type]: true }).parse(validationObject);
      return null;
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
      return "Invalid format";
    }
  };

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
                <div className="relative">
                  <Input
                    {...field}
                    value={getDocumentByType('aadhar')?.documentNumber || ''}
                    onChange={(e) => updateDocumentNumber('aadhar', e.target.value)}
                    placeholder="Enter Aadhar number"
                    className={`h-11 ${getErrorMessage('aadharNumber', field.value) ? 'border-red-500' : ''}`}
                  />
                  {getErrorMessage('aadharNumber', getDocumentByType('aadhar')?.documentNumber || '') && (
                    <div className="flex items-center gap-1 mt-1 text-xs text-red-500">
                      <AlertCircle className="h-3 w-3" />
                      <span>{getErrorMessage('aadharNumber', getDocumentByType('aadhar')?.documentNumber || '')}</span>
                    </div>
                  )}
                </div>
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
                <div className="relative">
                  <Input
                    {...field}
                    value={getDocumentByType('pan')?.documentNumber || ''}
                    onChange={(e) => updateDocumentNumber('pan', e.target.value.toUpperCase())}
                    placeholder="Enter PAN number"
                    className={`h-11 ${getErrorMessage('panNumber', field.value) ? 'border-red-500' : ''}`}
                  />
                  {getErrorMessage('panNumber', getDocumentByType('pan')?.documentNumber || '') && (
                    <div className="flex items-center gap-1 mt-1 text-xs text-red-500">
                      <AlertCircle className="h-3 w-3" />
                      <span>{getErrorMessage('panNumber', getDocumentByType('pan')?.documentNumber || '')}</span>
                    </div>
                  )}
                </div>
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
                <div className="relative">
                  <Input
                    {...field}
                    value={getDocumentByType('uan')?.documentNumber || ''}
                    onChange={(e) => updateDocumentNumber('uan', e.target.value)}
                    placeholder="Enter UAN number"
                    className={`h-11 ${getErrorMessage('uanNumber', field.value) ? 'border-red-500' : ''}`}
                  />
                  {getErrorMessage('uanNumber', getDocumentByType('uan')?.documentNumber || '') && (
                    <div className="flex items-center gap-1 mt-1 text-xs text-red-500">
                      <AlertCircle className="h-3 w-3" />
                      <span>{getErrorMessage('uanNumber', getDocumentByType('uan')?.documentNumber || '')}</span>
                    </div>
                  )}
                </div>
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
                <div className="relative">
                  <Input
                    {...field}
                    value={getDocumentByType('esic')?.documentNumber || ''}
                    onChange={(e) => updateDocumentNumber('esic', e.target.value)}
                    placeholder="Enter ESIC number"
                    className={`h-11 ${getErrorMessage('esicNumber', field.value) ? 'border-red-500' : ''}`}
                  />
                  {getErrorMessage('esicNumber', getDocumentByType('esic')?.documentNumber || '') && (
                    <div className="flex items-center gap-1 mt-1 text-xs text-red-500">
                      <AlertCircle className="h-3 w-3" />
                      <span>{getErrorMessage('esicNumber', getDocumentByType('esic')?.documentNumber || '')}</span>
                    </div>
                  )}
                </div>
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
