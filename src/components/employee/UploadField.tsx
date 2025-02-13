
import React, { useState } from "react";
import { LoaderCircle, FileText, X, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface UploadedFile {
  name: string;
  type: string;
  url?: string;
}

interface UploadFieldProps {
  label: string;
  value?: string;
  required?: boolean;
  onUpload: (file: File) => Promise<void>;
  showProgress?: boolean;
  currentFile?: UploadedFile | null;
  onRemove?: () => void;
  error?: string;
}

export const UploadField: React.FC<UploadFieldProps> = ({
  label,
  value,
  required,
  onUpload,
  showProgress = false,
  currentFile,
  onRemove,
  error,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      setProgress(0);
      
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

  const isImage = currentFile?.type.startsWith('image/');

  return (
    <div className="flex flex-col gap-2">
      <div className="text-[rgba(48,48,48,1)] font-semibold">
        {label}
        {required && <span className="text-[rgba(221,1,1,1)]">*</span>}
      </div>
      <div className="self-stretch flex flex-col gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          {currentFile ? (
            <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
              {isImage ? (
                <img 
                  src={currentFile.url} 
                  alt={currentFile.name}
                  className="h-8 w-8 object-cover rounded"
                />
              ) : (
                <FileText className="h-6 w-6 text-gray-500" />
              )}
              <span className="text-sm">{currentFile.name}</span>
              {onRemove && (
                <button
                  onClick={onRemove}
                  className="p-1 hover:bg-gray-200 rounded-full"
                >
                  <X className="h-4 w-4 text-gray-500" />
                </button>
              )}
            </div>
          ) : (
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
          )}
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
        {error && (
          <div className="flex items-center gap-1 mt-1 text-xs text-[#DD0101]">
            <AlertCircle className="h-3 w-3" />
            <span>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
};
