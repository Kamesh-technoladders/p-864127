import React, { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { UploadField } from "../UploadField";
import { MAX_FILE_SIZE, ACCEPTED_FILE_TYPES } from "./bankAccountSchema";
import { documentService } from "@/services/employee/document.service";
import { uploadDocument } from "@/utils/uploadDocument";
import { UploadedFile } from "@/types/document.types";

interface DocumentUploadsProps {
  setValue: (field: string, value: any) => void;
  formValues: {
    cancelledCheque?: File;
    passbookCopy?: File;
  };
  employeeId: string;
}

export const DocumentUploads: React.FC<DocumentUploadsProps> = ({
  setValue,
  formValues,
  employeeId,
}) => {
  const { toast } = useToast();
  const [documents, setDocuments] = useState<Record<string, UploadedFile>>({});

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const docs = await documentService.getEmployeeDocuments(employeeId, 'bank');
        const docMap = docs.reduce((acc, doc) => {
          acc[doc.document_type] = {
            id: doc.id,
            name: doc.file_name,
            type: doc.mime_type,
            url: doc.file_path
          };
          return acc;
        }, {} as Record<string, UploadedFile>);
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
        acc[doc.document_type] = {
          id: doc.id,
          name: doc.file_name,
          type: doc.mime_type,
          url: doc.file_path
        };
        return acc;
      }, {} as Record<string, UploadedFile>);
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
          currentFile={documents['cancelled_cheque']}
          documentId={documents['cancelled_cheque']?.id}
        />
        
        <UploadField
          label="Bank Passbook/Statement"
          required
          onUpload={handleFileUpload("passbookCopy")}
          value={formValues.passbookCopy?.name}
          showProgress
          currentFile={documents['passbook']}
          documentId={documents['passbook']?.id}
        />
      </div>
    </div>
  );
};
