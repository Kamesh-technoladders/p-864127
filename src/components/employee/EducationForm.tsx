
import React from "react";
import { UploadField } from "./UploadField";

export const EducationForm = () => {
  const handleUpload = async (file: File) => {
    // Simulate upload process
    return new Promise<void>((resolve) => {
      console.log("Uploading file:", file);
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  };

  return (
    <div className="flex w-[622px] max-w-full flex-col text-sm font-medium ml-[15px]">
      <div className="text-[rgba(48,64,159,1)] font-bold">Education</div>
      <div className="text-[rgba(80,80,80,1)] text-xs mt-1">
        Add your course and certificate here.
      </div>

      <div className="mt-6">
        <UploadField 
          label="SSC" 
          required 
          onUpload={handleUpload}
          showProgress 
        />
      </div>

      <div className="mt-6">
        <UploadField 
          label="HSC/Diploma" 
          required 
          onUpload={handleUpload}
          showProgress
        />
      </div>

      <div className="mt-6">
        <UploadField 
          label="Degree" 
          required 
          onUpload={handleUpload}
          showProgress
        />
      </div>

      <button className="flex items-stretch gap-2 text-[rgba(221,1,1,1)] mt-[29px]">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/94b97c43fd3a409f8a2658d3c3f998e3/94ba00a354d444e81c8d49b7bd51add7537c14e2c575d31fbdfae2aad48e7d91?placeholderIfAbsent=true"
          className="aspect-[1] object-contain w-4 shrink-0"
          alt="Add icon"
        />
        <span>Add additional Exam/Course</span>
      </button>
    </div>
  );
};

