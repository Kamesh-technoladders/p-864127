
import React from "react";
import { UploadField } from "../UploadField";
import { Experience } from "@/services/types/employee.types";

interface ExperienceDocumentUploadsProps {
  formData: Partial<Experience>;
  handleFileUpload: (field: keyof Experience) => (file: File) => void;
}

export const ExperienceDocumentUploads: React.FC<ExperienceDocumentUploadsProps> = ({
  formData,
  handleFileUpload,
}) => {
  return (
    <div className="space-y-4">
      <UploadField
        label="Offer Letter"
        onUpload={handleFileUpload("offerLetter")}
        value={formData.offerLetter?.name}
      />

      <UploadField
        label="Separation Letter"
        onUpload={handleFileUpload("separationLetter")}
        value={formData.separationLetter?.name}
      />

      <UploadField
        label="Payslips"
        onUpload={handleFileUpload("payslips")}
        value={
          formData.payslips?.length
            ? `${formData.payslips.length} files selected`
            : undefined
        }
        showProgress
      />
    </div>
  );
};
