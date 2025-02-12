
import React from "react";
import { Dialog } from "@/components/ui/dialog";
import { BankAccountForm } from "../BankAccountForm";
import { BankAccountData } from "../types";
import { toast } from "sonner";
import { employeeService } from "@/services/employee/employee.service";
import { Banknote } from "lucide-react";
import { ModalHeader } from "./common/ModalHeader";
import { ModalContent } from "./common/ModalContent";

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
  const [isEditing, setIsEditing] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleComplete = async (completed: boolean, formData?: any) => {
    if (completed && formData) {
      try {
        setLoading(true);
        await employeeService.updateEmployee(employeeId, {
          bank: formData,
        });
        toast.success("Bank details updated successfully");
        onUpdate();
        onClose();
      } catch (error) {
        console.error("Error updating bank details:", error);
        toast.error("Failed to update bank details");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader
          title="Bank Details"
          icon={Banknote}
          isEditing={isEditing}
          onEdit={() => setIsEditing(true)}
          onCancel={() => setIsEditing(false)}
          onSave={() => handleComplete(true, data)}
          loading={loading}
          gradientFrom="#4CAF50"
          gradientTo="#81C784"
        />
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          <BankAccountForm onComplete={handleComplete} initialData={data} />
        </div>
      </ModalContent>
    </Dialog>
  );
};
