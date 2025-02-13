
import React from "react";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogOverlay
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DocumentViewerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  documentUrl?: string;
  documentType: string;
}

export const DocumentViewerDialog: React.FC<DocumentViewerDialogProps> = ({
  isOpen,
  onClose,
  documentUrl,
  documentType,
}) => {
  if (!documentUrl) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-black/80" />
      <DialogContent className="w-[50vw] h-[50vh] max-w-none p-0 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">
            {documentType} Document
          </h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 p-0 hover:bg-gray-100 rounded-full"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="relative w-full h-full">
          <iframe
            src={documentUrl}
            className="w-full h-[calc(50vh-65px)]"
            style={{ border: 'none' }}
            title={`${documentType} Document Viewer`}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
