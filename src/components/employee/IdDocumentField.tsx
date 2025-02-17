
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AlertCircle, Loader2, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { uploadDocument } from "@/utils/uploadDocument";
import { cn } from "@/lib/utils";

interface IdDocumentFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onDocumentUpload: (url: string) => void;
  documentUrl?: string;
  onDocumentDelete: () => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  pattern?: string;
  className?: string;
}

export const IdDocumentField: React.FC<IdDocumentFieldProps> = ({
  label,
  value,
  onChange,
  onDocumentUpload,
  documentUrl,
  onDocumentDelete,
  error,
  placeholder,
  required,
  pattern,
  className,
}) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.includes('pdf') && !file.type.includes('image')) {
      toast.error('Please upload a PDF or image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size should be less than 5MB');
      return;
    }

    setIsUploading(true);
    try {
      const url = await uploadDocument(file, 'id-documents', label.toLowerCase().replace(' ', '-'));
      onDocumentUpload(url);
      toast.success(`${label} document uploaded successfully`);
    } catch (error) {
      console.error('Error uploading document:', error);
      toast.error(`Failed to upload ${label} document`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={`space-y-1 ${className}`}>
      <Label>
        {label}
        {required && <span className="text-red-500">*</span>}
      </Label>
      <div className="flex gap-1">
        <div className="flex-grow">
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            pattern={pattern}
            className={cn("h-5 max-w-[100px]", error ? "border-red-500" : "")}
          />
          {error && (
            <div className="text-red-500 text-[9px] flex items-center gap-1 mt-0.5">
              <AlertCircle className="h-2.5 w-2.5" />
              <span>{error}</span>
            </div>
          )}
        </div>
        <div className="flex-shrink-0">
          {documentUrl ? (
            <Button
              type="button"
              variant="destructive"
              size="icon"
              onClick={onDocumentDelete}
              disabled={isUploading}
              className="h-5 w-5"
            >
              <X className="h-3 w-3" />
            </Button>
          ) : (
            <div className="relative">
              <Button
                type="button"
                variant="secondary"
                size="icon"
                disabled={isUploading}
                asChild
                className="h-5 w-5"
              >
                <label>
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                  />
                  {isUploading ? (
                    <Loader2 className="h-3 w-3 animate-spin" />
                  ) : (
                    <Upload className="h-3 w-3" />
                  )}
                </label>
              </Button>
            </div>
          )}
        </div>
      </div>
      {documentUrl && (
        <div className="text-[9px] text-green-600">
          Document uploaded successfully
        </div>
      )}
    </div>
  );
};
