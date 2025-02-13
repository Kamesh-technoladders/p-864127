
import React, { useState } from "react";
import { LoaderCircle, FileText, X, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface UploadedFile {
  name: string;
  type: string;
  url?: string;
  size?: number;
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
  multiple?: boolean;
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
  multiple = false,
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
      } catch (error) {
        console.error("Upload error:", error);
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
  const fileSize = currentFile?.size ? formatFileSize(currentFile.size) : '';

  const formatFileSize = (size: number): string => {
    if (size < 1024) return size + ' B';
    if (size < 1024 * 1024) return (size / 1024).toFixed(1) + ' KB';
    return (size / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="text-[rgba(48,48,48,1)] font-semibold">
        {label}
        {required && <span className="text-[rgba(221,1,1,1)]">*</span>}
      </div>
      <div className="self-stretch flex flex-col gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          {currentFile ? (
            <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg w-full">
              {isImage ? (
                <img 
                  src={currentFile.url} 
                  alt={currentFile.name}
                  className="h-8 w-8 object-cover rounded"
                />
              ) : (
                <FileText className="h-6 w-6 text-gray-500" />
              )}
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-sm font-medium truncate">{currentFile.name}</span>
                <span className="text-xs text-gray-500">
                  {currentFile.type.split('/')[1].toUpperCase()} {fileSize && `• ${fileSize}`}
                </span>
              </div>
              {onRemove && (
                <button
                  onClick={onRemove}
                  className="p-1 hover:bg-gray-200 rounded-full shrink-0"
                >
                  <X className="h-4 w-4 text-gray-500" />
                </button>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-between w-full p-4 border border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
              {isUploading ? (
                <div className="flex items-center gap-2">
                  <LoaderCircle className="animate-spin h-4 w-4" />
                  <span>Uploading...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">{value || `Upload ${label}`}</span>
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
                  multiple={multiple}
                />
              </label>
            </div>
          )}
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
