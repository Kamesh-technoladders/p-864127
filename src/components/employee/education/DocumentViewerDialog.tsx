
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
      <DialogOverlay className="bg-black/95 backdrop-blur-sm" />
      <DialogContent className={`
        w-[85vw] 
        h-[85vh] 
        max-w-none 
        p-0 
        overflow-hidden
        bg-white/90
        backdrop-blur-md
        border
        border-white/20
        shadow-2xl
        transition-all
        duration-300
        rounded-xl
        before:absolute
        before:inset-0
        before:z-[-1]
        before:bg-gradient-to-br
        before:from-white/30
        before:to-transparent
        before:rounded-xl
      `}>
        <div className="flex items-center justify-between p-4 border-b border-white/20 backdrop-blur-md bg-white/30">
          <h3 className="text-lg font-semibold text-gray-900">
            {documentType} Document
          </h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 p-0 rounded-full hover:bg-white/20 transition-colors"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="relative w-full h-full bg-white/80">
          <iframe
            src={documentUrl}
            className="w-full h-[calc(85vh-65px)]"
            style={{ border: 'none' }}
            title={`${documentType} Document Viewer`}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
