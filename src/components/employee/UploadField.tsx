
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
  compact?: boolean;
}

const formatFileSize = (size: number): string => {
  if (size < 1024) return size + ' B';
  if (size < 1024 * 1024) return (size / 1024).toFixed(1) + ' KB';
  return (size / (1024 * 1024)).toFixed(1) + ' MB';
};

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
  compact = false,
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

  const isImage = currentFile?.type?.startsWith('image/');
  const fileSize = currentFile?.size ? formatFileSize(currentFile.size) : '';
  const fileType = currentFile?.type ? currentFile.type.split('/')[1].toUpperCase() : '';

  return (
    <div className={`flex flex-col ${compact ? 'gap-1' : 'gap-2'}`}>
      <div className="text-[rgba(48,48,48,1)] font-semibold text-[6px]">
        {label}
        {required && <span className="text-[rgba(221,1,1,1)]">*</span>}
      </div>
      <div className="self-stretch flex flex-col gap-1">
        <div className="flex items-center gap-2 flex-wrap">
          {currentFile ? (
            <div className={`flex items-center gap-2 ${compact ? 'p-1.5' : 'p-2'} bg-gray-50 rounded-lg w-full`}>
              {isImage ? (
                <img 
                  src={currentFile.url} 
                  alt={currentFile.name}
                  className="h-6 w-6 object-cover rounded"
                />
              ) : (
                <FileText className="h-5 w-5 text-gray-500" />
              )}
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-[6px] font-medium truncate">{currentFile.name}</span>
                {!compact && fileType && (
                  <span className="text-[6px] text-gray-500">
                    {fileType} {fileSize && `• ${fileSize}`}
                  </span>
                )}
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
            <div className={`flex items-center justify-between w-full ${compact ? 'p-2' : 'p-4'} border border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors`}>
              {isUploading ? (
                <div className="flex items-center gap-2">
                  <LoaderCircle className="animate-spin h-4 w-4" />
                  <span className="text-[6px]">Uploading...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-gray-500" />
                  <span className="text-[6px] text-gray-600">{value || `Upload ${label}`}</span>
                </div>
              )}
              <label className="text-[rgba(225,1,2,1)] text-[6px] font-semibold cursor-pointer">
                + Upload
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
            <Progress value={progress} className="h-1" />
            <div className="text-[6px] text-gray-500 mt-1 text-right">{progress}%</div>
          </div>
        )}
        {error && (
          <div className="flex items-center gap-1 mt-1 text-[6px] text-[#DD0101]">
            <AlertCircle className="h-3 w-3" />
            <span>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
};
