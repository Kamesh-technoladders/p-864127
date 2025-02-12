
import React, { useState, useEffect } from "react";
import { UploadField } from "./UploadField";
import { EducationFormProps } from "./types";
import { uploadDocument } from "@/utils/uploadDocument";
import { toast } from "sonner";

export const EducationForm: React.FC<EducationFormProps> = ({ onComplete, initialData }) => {
  const [ssc, setSsc] = useState<File | null>(null);
  const [hsc, setHsc] = useState<File | null>(null);
  const [degree, setDegree] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      // Handle initial data if provided
    }
  }, [initialData]);

  useEffect(() => {
    const educationData = {
      ssc,
      hsc,
      degree
    };
    
    // Pass both completion status and data
    onComplete(!!ssc && !!hsc && !!degree, educationData);
  }, [ssc, hsc, degree, onComplete]);

  const handleFileUpload = async (file: File, type: 'ssc' | 'hsc' | 'degree') => {
    try {
      setIsSubmitting(true);
      
      switch (type) {
        case 'ssc':
          setSsc(file);
          break;
        case 'hsc':
          setHsc(file);
          break;
        case 'degree':
          setDegree(file);
          break;
      }
      
      toast.success(`${type.toUpperCase()} document uploaded successfully`);
    } catch (error) {
      console.error(`Error uploading ${type} document:`, error);
      toast.error(`Failed to upload ${type.toUpperCase()} document`);
    } finally {
      setIsSubmitting(false);
    }
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
          onUpload={(file) => handleFileUpload(file, 'ssc')}
          showProgress
          value={ssc?.name}
          currentFile={ssc ? { name: ssc.name, type: ssc.type } : null}
        />
      </div>

      <div className="mt-6">
        <UploadField 
          label="HSC/Diploma" 
          required 
          onUpload={(file) => handleFileUpload(file, 'hsc')}
          showProgress
          value={hsc?.name}
          currentFile={hsc ? { name: hsc.name, type: hsc.type } : null}
        />
      </div>

      <div className="mt-6">
        <UploadField 
          label="Degree" 
          required 
          onUpload={(file) => handleFileUpload(file, 'degree')}
          showProgress
          value={degree?.name}
          currentFile={degree ? { name: degree.name, type: degree.type } : null}
        />
      </div>
    </div>
  );
};
