
import React, { useState } from "react";
import { Document } from "@/services/types/employee.types";
import { UploadField } from "../../UploadField";
import { DocumentField } from "./DocumentField";
import { UseFormReturn } from "react-hook-form";
import { getDocumentByType } from "../utils/documentUtils";
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
}

export const DocumentUploadPair: React.FC<DocumentUploadPairProps> = ({
  form,
  documentType,
  documents,
  label,
  required,
  updateDocumentNumber,
  onUpload,
}) => {
  const [showReplaceDialog, setShowReplaceDialog] = useState(false);
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
            currentFile={currentDocument?.documentUrl ? {
              name: currentDocument?.fileName || `${label} Card`,
              type: 'application/pdf',
              url: currentDocument?.documentUrl
            } : undefined}
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
    </>
  );
};
