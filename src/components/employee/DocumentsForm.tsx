
import React, { useState, useEffect } from "react";
import { UploadField } from "./UploadField";

interface DocumentsFormProps {
  onComplete: (completed: boolean) => void;
}

export const DocumentsForm: React.FC<DocumentsFormProps> = ({ onComplete }) => {
  const [resume, setResume] = useState<File | null>(null);
  const [identityProof, setIdentityProof] = useState<File | null>(null);

  useEffect(() => {
    onComplete(!!resume && !!identityProof);
  }, [resume, identityProof, onComplete]);

  const handleResumeUpload = async (file: File) => {
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        setResume(file);
        resolve();
      }, 2000);
    });
  };

  const handleIdentityUpload = async (file: File) => {
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        setIdentityProof(file);
        resolve();
      }, 2000);
    });
  };

  return (
    <div className="flex w-[622px] max-w-full flex-col text-sm font-medium ml-[15px]">
      <div className="text-[rgba(48,64,159,1)] font-bold">Documents</div>
      <div className="text-[rgba(80,80,80,1)] text-xs mt-1">
        Upload your important documents here.
      </div>

      <div className="mt-6">
        <UploadField 
          label="Resume/CV" 
          required 
          onUpload={handleResumeUpload}
          showProgress
          value={resume?.name}
        />
      </div>

      <div className="mt-6">
        <UploadField 
          label="Identity Proof" 
          required 
          onUpload={handleIdentityUpload}
          showProgress
          value={identityProof?.name}
        />
      </div>
    </div>
  );
};
