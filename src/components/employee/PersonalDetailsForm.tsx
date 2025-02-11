
import React from "react";
import { UploadField } from "./UploadField";

export const PersonalDetailsForm = () => {
  const handleUpload = async (file: File) => {
    // Simulated upload progress
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  };

  return (
    <div className="flex w-[622px] max-w-full flex-col text-sm font-medium ml-[15px]">
      <div className="text-[rgba(48,64,159,1)] font-bold">Personal Details</div>
      <div className="text-[rgba(80,80,80,1)] text-xs mt-1">
        Add your personal information and photo.
      </div>

      <div className="mt-6">
        <UploadField 
          label="Profile Photo" 
          required 
          onUpload={handleUpload} 
          showProgress
        />
      </div>
    </div>
  );
};
