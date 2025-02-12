
import React, { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { UploadField } from "../UploadField";
import { validateDocument } from "@/utils/documentValidation";
import { documentService } from "@/services/employee/document.service";
import { uploadDocument } from "@/utils/uploadDocument";

interface DocumentUploadsProps {
  setValue: (field: string, value: any) => void;
  formValues: {
    ssc?: File;
    hsc?: File;
    degree?: File;
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
        const docs = await documentService.getEmployeeDocuments(employeeId, 'education');
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

  const handleFileUpload = (fieldName: "ssc" | "hsc" | "degree") => async (file: File) => {
    const validation = validateDocument(file);
    
    if (!validation.isValid) {
      toast({
        title: "Invalid file",
        description: validation.error,
        variant: "destructive",
      });
      return;
    }

    try {
      const documentType = fieldName.toLowerCase();
      await uploadDocument(file, 'education', employeeId, documentType);
      setValue(fieldName, file);
      
      const docs = await documentService.getEmployeeDocuments(employeeId, 'education');
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
    <div className="space-y-4">
      <UploadField
        label="SSC Certificate"
        required
        onUpload={handleFileUpload("ssc")}
        value={formValues.ssc?.name}
        showProgress
        currentFile={documents['ssc'] ? {
          name: documents['ssc'].file_name,
          type: documents['ssc'].mime_type,
          id: documents['ssc'].id,
        } : undefined}
        documentId={documents['ssc']?.id}
      />
      
      <UploadField
        label="HSC Certificate"
        required
        onUpload={handleFileUpload("hsc")}
        value={formValues.hsc?.name}
        showProgress
        currentFile={documents['hsc'] ? {
          name: documents['hsc'].file_name,
          type: documents['hsc'].mime_type,
          id: documents['hsc'].id,
        } : undefined}
        documentId={documents['hsc']?.id}
      />
      
      <UploadField
        label="Degree Certificate"
        required
        onUpload={handleFileUpload("degree")}
        value={formValues.degree?.name}
        showProgress
        currentFile={documents['degree'] ? {
          name: documents['degree'].file_name,
          type: documents['degree'].mime_type,
          id: documents['degree'].id,
        } : undefined}
        documentId={documents['degree']?.id}
      />
    </div>
  );
};
