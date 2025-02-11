
import React, { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface UploadFieldProps {
  label: string;
  value?: string;
  required?: boolean;
  onUpload: (file: File) => Promise<void>;
  showProgress?: boolean;
}

export const UploadField: React.FC<UploadFieldProps> = ({
  label,
  value,
  required,
  onUpload,
  showProgress = false,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      setProgress(0);
      
      // Start progress simulation
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 200);

      try {
        await onUpload(file);
        setProgress(100);
      } finally {
        clearInterval(progressInterval);
        setTimeout(() => {
          setIsUploading(false);
          setProgress(0);
        }, 500);
      }
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="text-[rgba(48,48,48,1)] font-semibold">
        {label}
        {required && <span className="text-[rgba(221,1,1,1)]">*</span>}
      </div>
      <div className="self-stretch flex flex-col gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex flex-col relative self-stretch aspect-[6.714] w-[282px] text-black whitespace-nowrap px-[17px] py-3 rounded-lg">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/94b97c43fd3a409f8a2658d3c3f998e3/0a53a1504e43595cc9560861e8d5e40c68e5fe5999fff3792f25e0b28f9cb9cb?placeholderIfAbsent=true"
              className="absolute h-full w-full object-cover inset-0"
              alt=""
            />
            {isUploading ? (
              <div className="flex items-center gap-2">
                <LoaderCircle className="animate-spin h-4 w-4" />
                <span>Uploading...</span>
              </div>
            ) : (
              value || label
            )}
          </div>
          <label className="text-[rgba(225,1,2,1)] font-semibold cursor-pointer">
            + Upload File
            <input
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept=".pdf,.png,.jpg,.jpeg"
              disabled={isUploading}
            />
          </label>
          <div className="text-[rgba(102,102,102,1)]">
            (Supported format .PDF, .PNG, .JPG)
          </div>
        </div>
        {showProgress && isUploading && (
          <div className="w-full">
            <Progress value={progress} className="h-2" />
            <div className="text-xs text-gray-500 mt-1 text-right">{progress}%</div>
          </div>
        )}
      </div>
    </div>
  );
};
