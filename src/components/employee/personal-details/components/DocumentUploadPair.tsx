
import React, { useState } from "react";
import { Document } from "@/services/types/employee.types";
import { UploadField } from "../../UploadField";
import { DocumentField } from "./DocumentField";
import { UseFormReturn } from "react-hook-form";
import { getDocumentByType } from "../utils/documentUtils";
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

interface DocumentUploadPairProps {
  form: UseFormReturn<any>;
  documentType: Document['documentType'];
  documents: Document[];
  label: string;
  required?: boolean;
  updateDocumentNumber: (type: Document['documentType'], value: string) => void;
  onUpload: (file: File) => Promise<void>;
  onDelete?: (type: Document['documentType']) => Promise<void>;
}

export const DocumentUploadPair: React.FC<DocumentUploadPairProps> = ({
  form,
  documentType,
  documents,
  label,
  required,
  updateDocumentNumber,
  onUpload,
  onDelete
}) => {
  const [showReplaceDialog, setShowReplaceDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const currentDocument = getDocumentByType(documents, documentType);

  const handleUpload = async (file: File) => {
    if (currentDocument?.documentUrl) {
      setPendingFile(file);
      setShowReplaceDialog(true);
      return;
    }
    await processUpload(file);
  };

  const processUpload = async (file: File) => {
    try {
      await onUpload(file);
      setPendingFile(null);
      setShowReplaceDialog(false);
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  const handleReplace = async () => {
    if (pendingFile) {
      await processUpload(pendingFile);
    }
  };

  const handleDelete = async () => {
    try {
      if (onDelete) {
        await onDelete(documentType);
        toast.success(`${label} document deleted successfully`);
        setShowDeleteDialog(false);
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(`Failed to delete ${label.toLowerCase()} document`);
    }
  };

  // Only show the document UI if there's a valid document URL
  const showDocument = currentDocument?.documentUrl && currentDocument.documentUrl !== '';

  return (
    <>
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <DocumentField
            form={form}
            documentType={documentType}
            documents={documents}
            label={label}
            required={required}
            updateDocumentNumber={updateDocumentNumber}
          />
        </div>
        <div className="w-64">
          <UploadField
            label={`${label} Card`}
            required={required}
            onUpload={handleUpload}
            currentFile={showDocument ? {
              name: currentDocument?.fileName || `${label} Card`,
              type: 'application/pdf',
              url: currentDocument?.documentUrl
            } : undefined}
            onRemove={() => setShowDeleteDialog(true)}
            showProgress
            compact
          />
        </div>
      </div>

      <AlertDialog open={showReplaceDialog} onOpenChange={setShowReplaceDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Replace Document</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to replace the current {label} document? This action cannot be undone.
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
              Are you sure you want to delete the {label} document? This action cannot be undone.
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
    </>
  );
};
