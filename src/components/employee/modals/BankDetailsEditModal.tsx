
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
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Edit Bank Details</DialogTitle>
        </DialogHeader>
        <BankAccountForm 
          onComplete={handleComplete} 
          initialData={data} 
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
};
