
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

interface UploadedFile {
  id: string;
  name: string;
  type: string;
  url: string;
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
        // Only fetch documents if we have a valid employeeId
        if (employeeId && employeeId.trim()) {
          const docs = await documentService.getEmployeeDocuments(employeeId, 'education');
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
        }
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchDocuments();
  }, [employeeId]);

  const handleFileUpload = (fieldName: "ssc" | "hsc" | "degree") => async (file: File) => {
    if (!employeeId || !employeeId.trim()) {
      toast({
        title: "Error",
        description: "Employee ID is required to upload documents",
        variant: "destructive",
      });
      return;
    }

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
      
      // Refresh documents after upload
      const docs = await documentService.getEmployeeDocuments(employeeId, 'education');
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
    <div className="space-y-4">
      <UploadField
        label="SSC Certificate"
        required
        onUpload={handleFileUpload("ssc")}
        value={formValues.ssc?.name}
        showProgress
        currentFile={documents['ssc']}
        documentId={documents['ssc']?.id}
      />
      
      <UploadField
        label="HSC Certificate"
        required
        onUpload={handleFileUpload("hsc")}
        value={formValues.hsc?.name}
        showProgress
        currentFile={documents['hsc']}
        documentId={documents['hsc']?.id}
      />
      
      <UploadField
        label="Degree Certificate"
        required
        onUpload={handleFileUpload("degree")}
        value={formValues.degree?.name}
        showProgress
        currentFile={documents['degree']}
        documentId={documents['degree']?.id}
      />
    </div>
  );
};
