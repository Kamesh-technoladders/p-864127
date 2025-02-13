
import React from "react";
import { UploadField } from "../UploadField";
import { Experience } from "@/services/types/employee.types";
import { DocumentUploadsProps } from "../types/ExperienceTypes";

export const ExperienceDocumentUploads: React.FC<DocumentUploadsProps> = ({
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
