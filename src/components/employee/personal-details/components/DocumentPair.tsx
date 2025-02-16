
import React, { useState } from "react";
import { Document } from "@/services/types/employee.types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { FileText, Loader2, Replace, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

interface DocumentPairProps {
  documentType: Document['documentType'];
  documents: Document[];
  label: string;
  required?: boolean;
  placeholder?: string;
  pattern?: string;
  updateDocumentNumber: (type: Document['documentType'], value: string) => void;
  onUpload: (type: Document['documentType'], file: File) => Promise<void>;
  onDelete: (type: Document['documentType']) => Promise<void>;
}

export const DocumentPair: React.FC<DocumentPairProps> = ({
  documentType,
  documents = [],
  label,
  required,
  placeholder,
  pattern,
  updateDocumentNumber,
  onUpload,
  onDelete,
}) => {
  const [showReplaceDialog, setShowReplaceDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  
  const currentDocument = documents?.find(doc => doc.documentType === documentType);

  const handleUpload = async (file: File) => {
    // Validate file type
    if (!file.type.includes('pdf') && !file.type.includes('image')) {
      toast.error('Please upload a PDF or image file');
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size should be less than 5MB');
      return;
    }

    if (currentDocument?.documentUrl) {
      setPendingFile(file);
      setShowReplaceDialog(true);
      return;
    }

    await processUpload(file);
  };

  const processUpload = async (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);
    
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + 10;
      });
    }, 200);

    try {
      await onUpload(documentType, file);
      setUploadProgress(100);
      toast.success(`${label} uploaded successfully`);
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(`Failed to upload ${label}`);
    } finally {
      clearInterval(progressInterval);
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
        setPendingFile(null);
        setShowReplaceDialog(false);
      }, 500);
    }
  };

  const handleReplace = async () => {
    if (pendingFile) {
      await processUpload(pendingFile);
    }
  };

  const handleDelete = async () => {
    setIsUploading(true);
    try {
      await onDelete(documentType);
      toast.success(`${label} deleted successfully`);
      setShowDeleteDialog(false);
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(`Failed to delete ${label}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <Label>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      
      <div className="flex items-start gap-4">
        <Input
          value={currentDocument?.documentNumber || ''}
          onChange={(e) => updateDocumentNumber(documentType, e.target.value)}
          placeholder={placeholder}
          pattern={pattern}
          className="flex-1"
        />

        <div className="w-[200px] relative">
          {currentDocument?.documentUrl ? (
            <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg w-full group hover:bg-gray-100 transition-colors">
              <FileText className="h-5 w-5 text-gray-500" />
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-xs font-medium truncate">
                  {currentDocument.fileName || 'Document'}
                </span>
                <span className="text-xs text-gray-500">
                  {currentDocument.documentType.toUpperCase()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <label className="cursor-pointer p-1.5 rounded-full hover:bg-gray-200 transition-colors">
                  <Replace className="h-4 w-4 text-gray-500" />
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleUpload(file);
                    }}
                    disabled={isUploading}
                  />
                </label>
                <button
                  onClick={() => setShowDeleteDialog(true)}
                  className="p-1.5 hover:bg-gray-200 rounded-full transition-colors"
                  disabled={isUploading}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </button>
              </div>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
              <label className="w-full h-full flex items-center justify-between p-2 cursor-pointer">
                <div className="flex items-center gap-2">
                  {isUploading ? (
                    <Loader2 className="h-5 w-5 text-gray-400 animate-spin" />
                  ) : (
                    <FileText className="h-5 w-5 text-gray-400" />
                  )}
                  <span className="text-xs text-gray-600">Upload {label}</span>
                </div>
                <span className="text-[rgba(225,1,2,1)] text-xs font-semibold">+ Upload</span>
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleUpload(file);
                  }}
                  disabled={isUploading}
                />
              </label>
            </div>
          )}

          {isUploading && (
            <div className="mt-2">
              <Progress value={uploadProgress} className="h-1" />
              <div className="text-xs text-gray-500 text-right mt-1">
                {uploadProgress}%
              </div>
            </div>
          )}
        </div>
      </div>

      <AlertDialog open={showReplaceDialog} onOpenChange={setShowReplaceDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Replace Document</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to replace the current {label}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setPendingFile(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleReplace}>Replace</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Document</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the {label}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowDeleteDialog(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
