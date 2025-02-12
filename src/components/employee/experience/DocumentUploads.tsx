
import React, { useEffect, useState } from "react";
import { UploadField } from "../UploadField";
import { validateDocument } from "@/utils/documentValidation";
import { documentService } from "@/services/employee/document.service";
import { uploadDocument } from "@/utils/uploadDocument";
import { toast } from "sonner";

interface DocumentUploadsProps {
  employeeId: string;
  experienceId?: string;
  formData: {
    offerLetter?: File;
    separationLetter?: File;
    payslips: File[];
  };
  handleFileUpload: (field: "offerLetter" | "separationLetter" | "payslips") => (file: File) => Promise<void>;
}

interface DocumentMetadata {
  id: string;
  file_name: string;
  file_path: string;
  mime_type: string;
}

export const DocumentUploads: React.FC<DocumentUploadsProps> = ({
  employeeId,
  experienceId,
  formData,
  handleFileUpload,
}) => {
  const [documents, setDocuments] = useState<Record<string, DocumentMetadata>>({});

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        if (experienceId) {
          const docs = await documentService.getEmployeeDocuments(employeeId, 'experience');
          const docMap = docs.reduce((acc, doc) => {
            acc[doc.document_type] = doc;
            return acc;
          }, {} as Record<string, DocumentMetadata>);
          setDocuments(docMap);
        }
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    if (employeeId && experienceId) {
      fetchDocuments();
    }
  }, [employeeId, experienceId]);

  const validateAndUpload = async (file: File, field: "offerLetter" | "separationLetter" | "payslips") => {
    const validation = validateDocument(file);
    
    if (!validation.isValid) {
      toast.error(validation.error);
      return;
    }

    if (field === "payslips" && formData.payslips.length >= 3) {
      toast.error("Maximum 3 payslips allowed");
      return;
    }

    try {
      await handleFileUpload(field)(file);
      
      if (experienceId) {
        const docs = await documentService.getEmployeeDocuments(employeeId, 'experience');
        const docMap = docs.reduce((acc, doc) => {
          acc[doc.document_type] = doc;
          return acc;
        }, {} as Record<string, DocumentMetadata>);
        setDocuments(docMap);
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload document");
    }
  };

  return (
    <div className="space-y-4">
      <UploadField
        label="Offer Letter"
        required
        onUpload={(file) => validateAndUpload(file, "offerLetter")}
        value={formData.offerLetter?.name}
        showProgress
        currentFile={documents['offer_letter'] ? {
          name: documents['offer_letter'].file_name,
          type: documents['offer_letter'].mime_type,
          id: documents['offer_letter'].id,
        } : undefined}
        documentId={documents['offer_letter']?.id}
      />
      
      <UploadField
        label="Separation Letter"
        required
        onUpload={(file) => validateAndUpload(file, "separationLetter")}
        value={formData.separationLetter?.name}
        showProgress
        currentFile={documents['separation_letter'] ? {
          name: documents['separation_letter'].file_name,
          type: documents['separation_letter'].mime_type,
          id: documents['separation_letter'].id,
        } : undefined}
        documentId={documents['separation_letter']?.id}
      />
      
      <UploadField
        label="Payslip"
        required
        onUpload={(file) => validateAndUpload(file, "payslips")}
        value={
          formData.payslips.length > 0
            ? `${formData.payslips.length} file(s) selected`
            : undefined
        }
        showProgress
        currentFile={documents['payslip'] ? {
          name: documents['payslip'].file_name,
          type: documents['payslip'].mime_type,
          id: documents['payslip'].id,
        } : undefined}
        documentId={documents['payslip']?.id}
      />
    </div>
  );
};
