import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BankAccountForm } from "../BankAccountForm";
import { BankAccountData } from "../types";
import { toast } from "sonner";
import { employeeService } from "@/services/employee/employee.service";

interface BankDetailsEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: BankAccountData;
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
  const handleComplete = async (completed: boolean, formData?: any) => {
    if (completed && formData) {
      try {
        await employeeService.updateEmployee(employeeId, {
          bank: formData,
        });
        toast.success("Bank details updated successfully");
        onUpdate();
        onClose();
      } catch (error) {
        console.error("Error updating bank details:", error);
        toast.error("Failed to update bank details");
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Edit Bank Details</DialogTitle>
        </DialogHeader>
        <BankAccountForm onComplete={handleComplete} initialData={data} />
      </DialogContent>
    </Dialog>
  );
};
