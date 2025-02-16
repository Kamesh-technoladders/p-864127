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
    <div className="flex items-start gap-6">
      <div className="flex-1">
        <Label className="mb-2 block">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
        <Input
          value={currentDocument?.documentNumber || ''}
          onChange={(e) => updateDocumentNumber(documentType, e.target.value)}
          placeholder={placeholder}
          pattern={pattern}
        />
      </div>

      <div className="flex-shrink-0">
        <div className="relative group">
          {currentDocument?.documentUrl ? (
            <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
              <FileText className="h-8 w-8 text-gray-400" />
              <div className="absolute inset-0 bg-black/40 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <label className="cursor-pointer p-2 rounded-full hover:bg-white/20 transition-colors">
                  <Replace className="h-5 w-5 text-white" />
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
                  className="p-2 rounded-full hover:bg-white/20 transition-colors"
                  disabled={isUploading}
                >
                  <Trash2 className="h-5 w-5 text-white" />
                </button>
              </div>
            </div>
          ) : (
            <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
              <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                {isUploading ? (
                  <Loader2 className="h-6 w-6 text-gray-400 animate-spin" />
                ) : (
                  <>
                    <FileText className="h-6 w-6 text-gray-400 mb-2" />
                    <span className="text-xs text-gray-500">Upload {label}</span>
                  </>
                )}
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

        {currentDocument?.fileName && !isUploading && (
          <div className="mt-2 text-xs text-gray-600 text-center max-w-[96px] truncate">
            {currentDocument.fileName}
          </div>
        )}
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
