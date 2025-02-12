
import React from "react";
import { DialogContent } from "@/components/ui/dialog";

interface ModalContentProps {
  children: React.ReactNode;
}

export const ModalContent: React.FC<ModalContentProps> = ({ children }) => {
  return (
    <DialogContent className="max-w-4xl p-0 overflow-hidden bg-white border shadow-md">
      {children}
    </DialogContent>
  );
};
