
import React from "react";
import { UploadField } from "../UploadField";
import { Experience } from "@/services/types/employee.types";
import { DocumentUploadsProps } from "../types/ExperienceTypes";

export const ExperienceDocumentUploads: React.FC<DocumentUploadsProps> = ({
  formData,
  handleFileUpload,
}) => {
  const getDisplayValue = (value: File | string | undefined): string | undefined => {
    if (!value) return undefined;
    if (value instanceof File) return value.name;
    return value; // If it's a string (URL), return it as is
  };

  return (
    <div className="space-y-4">
      <UploadField
        label="Offer Letter"
        onUpload={handleFileUpload("offerLetter")}
        value={getDisplayValue(formData.offerLetter)}
      />

      <UploadField
        label="Separation Letter"
        onUpload={handleFileUpload("separationLetter")}
        value={getDisplayValue(formData.separationLetter)}
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
