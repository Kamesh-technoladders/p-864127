
import React, { useState, useEffect } from "react";
import { UploadField } from "./UploadField";

interface PersonalDetailsFormProps {
  onComplete: (completed: boolean) => void;
}

export const PersonalDetailsForm: React.FC<PersonalDetailsFormProps> = ({ onComplete }) => {
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);

  useEffect(() => {
    onComplete(!!profilePhoto);
  }, [profilePhoto, onComplete]);

  const handleUpload = async (file: File) => {
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        setProfilePhoto(file);
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
          value={profilePhoto?.name}
        />
      </div>
    </div>
  );
};
