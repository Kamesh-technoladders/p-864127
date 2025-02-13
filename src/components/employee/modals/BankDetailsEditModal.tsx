
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BankAccountForm } from "../BankAccountForm";
import { BankDetails } from "@/services/types/employee.types";
import { toast } from "sonner";
import { bankDetailsService } from "@/services/employee/bankDetails.service";
import { Banknote } from "lucide-react";

interface BankDetailsEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: BankDetails;
  employeeId: string;
  onUpdate: () => void;
}

export const BankDetailsEditModal: React.FC<BankDetailsEditModalProps> = ({
  isOpen,
  onClose,
  data,
  employeeId,
  onUpdate,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleComplete = async (completed: boolean, formData?: BankDetails) => {
    if (completed && formData) {
      try {
        setIsSubmitting(true);
        await bankDetailsService.updateBankDetails(employeeId, formData);
        toast.success("Bank details updated successfully");
        onUpdate();
        onClose();
      } catch (error) {
        console.error("Error updating bank details:", error);
        toast.error("Failed to update bank details");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden bg-white/90 backdrop-blur-lg border border-white/20 shadow-2xl max-h-[90vh] flex flex-col">
        <DialogHeader className="p-3 bg-gradient-to-r from-[#30409F] to-[#4B5FBD] sticky top-0 z-10">
          <div className="flex items-center gap-1.5">
            <Banknote className="w-3.5 h-3.5 text-white" />
            <DialogTitle className="text-sm font-semibold text-white tracking-tight">Edit Bank Details</DialogTitle>
          </div>
        </DialogHeader>
        <div className="overflow-y-auto flex-1 p-3">
          <BankAccountForm 
            onComplete={handleComplete} 
            initialData={data} 
            isSubmitting={isSubmitting}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
