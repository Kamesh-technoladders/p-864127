
import React, { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { UploadField } from "../UploadField";
import { MAX_FILE_SIZE, ACCEPTED_FILE_TYPES } from "./bankAccountSchema";
import { documentService } from "@/services/employee/document.service";

interface DocumentUploadsProps {
  setValue: (field: string, value: any) => void;
  formValues: {
    cancelledCheque?: File;
    passbookCopy?: File;
  };
  employeeId: string;
}

interface DocumentMetadata {
  id: string;
  file_name: string;
  file_path: string;
  mime_type: string;
}

export const DocumentUploads: React.FC<DocumentUploadsProps> = ({
  setValue,
  formValues,
  employeeId,
}) => {
  const { toast } = useToast();
  const [documents, setDocuments] = useState<Record<string, DocumentMetadata>>({});

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const docs = await documentService.getEmployeeDocuments(employeeId, 'bank');
        const docMap = docs.reduce((acc, doc) => {
          acc[doc.document_type] = doc;
          return acc;
        }, {} as Record<string, DocumentMetadata>);
        setDocuments(docMap);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    if (employeeId) {
      fetchDocuments();
    }
  }, [employeeId]);

  const handleFileUpload = (fieldName: "cancelledCheque" | "passbookCopy") => async (file: File) => {
    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF or image file (PNG, JPG)",
        variant: "destructive",
      });
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast({
        title: "File too large",
        description: "File size should not exceed 5MB",
        variant: "destructive",
      });
      return;
    }

    try {
      const documentType = fieldName === 'cancelledCheque' ? 'cancelled_cheque' : 'passbook';
      await uploadDocument(file, 'bank', employeeId, documentType);
      setValue(fieldName, file);
      
      // Refresh documents after upload
      const docs = await documentService.getEmployeeDocuments(employeeId, 'bank');
      const docMap = docs.reduce((acc, doc) => {
        acc[doc.document_type] = doc;
        return acc;
      }, {} as Record<string, DocumentMetadata>);
      setDocuments(docMap);
      
      toast({
        title: "File uploaded",
        description: "Document uploaded successfully!",
      });
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Upload failed",
        description: "Failed to upload document. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="col-span-2">
      <div className="space-y-4">
        <UploadField
          label="Cancelled Cheque"
          required
          onUpload={handleFileUpload("cancelledCheque")}
          value={formValues.cancelledCheque?.name}
          showProgress
          currentFile={documents['cancelled_cheque'] ? {
            name: documents['cancelled_cheque'].file_name,
            type: documents['cancelled_cheque'].mime_type,
            id: documents['cancelled_cheque'].id,
          } : undefined}
          documentId={documents['cancelled_cheque']?.id}
        />
        
        <UploadField
          label="Bank Passbook/Statement"
          required
          onUpload={handleFileUpload("passbookCopy")}
          value={formValues.passbookCopy?.name}
          showProgress
          currentFile={documents['passbook'] ? {
            name: documents['passbook'].file_name,
            type: documents['passbook'].mime_type,
            id: documents['passbook'].id,
          } : undefined}
          documentId={documents['passbook']?.id}
        />
      </div>
    </div>
  );
};
