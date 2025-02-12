import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PersonalDetailsForm } from "../PersonalDetailsForm";
import { PersonalDetailsData } from "../types";
import { toast } from "sonner";
import { employeeService } from "@/services/employee/employee.service";

interface PersonalDetailsEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PersonalDetailsData;
  employeeId: string;
  onUpdate: () => void;
}

export const PersonalDetailsEditModal: React.FC<PersonalDetailsEditModalProps> = ({
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
          personal: formData,
        });
        toast.success("Personal details updated successfully");
        onUpdate();
        onClose();
      } catch (error) {
        console.error("Error updating personal details:", error);
        toast.error("Failed to update personal details");
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Edit Personal Details</DialogTitle>
        </DialogHeader>
        <PersonalDetailsForm onComplete={handleComplete} initialData={data} />
      </DialogContent>
    </Dialog>
  );
};
