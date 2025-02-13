
import React from "react";
import { useToast } from "@/components/ui/use-toast";
import { UploadField } from "../UploadField";
import { MAX_FILE_SIZE, ACCEPTED_FILE_TYPES } from "./bankAccountSchema";

interface DocumentUploadsProps {
  setValue: (field: string, value: any) => void;
  formValues: {
    cancelledCheque?: File;
    passbookCopy?: File;
  };
}

export const DocumentUploads: React.FC<DocumentUploadsProps> = ({ setValue, formValues }) => {
  const { toast } = useToast();

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

    setValue(fieldName, file);
    toast({
      title: "File uploaded",
      description: "Document uploaded successfully!",
    });
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
        />
        
        <UploadField
          label="Bank Passbook/Statement"
          required
          onUpload={handleFileUpload("passbookCopy")}
          value={formValues.passbookCopy?.name}
          showProgress
        />
      </div>
    </div>
  );
};
