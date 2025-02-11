
import React from "react";
import { UploadField } from "../UploadField";
import { ExperienceData } from "../AddExperienceModal";

interface DocumentUploadsProps {
  formData: ExperienceData;
  handleFileUpload: (field: keyof ExperienceData) => (file: File) => void;
}

export const DocumentUploads: React.FC<DocumentUploadsProps> = ({
  formData,
  handleFileUpload,
}) => {
  return (
    <div className="space-y-4">
      <UploadField
        label="Offer Letter"
        required
        onUpload={handleFileUpload("offerLetter")}
        value={formData.offerLetter?.name}
      />
      <UploadField
        label="Separation Letter"
        required
        onUpload={handleFileUpload("separationLetter")}
        value={formData.separationLetter?.name}
      />
      <UploadField
        label="Payslip"
        required
        onUpload={handleFileUpload("payslips")}
        value={
          formData.payslips.length > 0
            ? `${formData.payslips.length} file(s) selected`
            : undefined
        }
      />
    </div>
  );
};
