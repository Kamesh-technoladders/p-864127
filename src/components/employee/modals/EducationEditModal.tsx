import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EducationForm } from "../EducationForm";
import { EducationData } from "../types";
import { toast } from "sonner";
import { employeeService } from "@/services/employee/employee.service";

interface EducationEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: EducationData;
  employeeId: string;
  onUpdate: () => void;
}

export const EducationEditModal: React.FC<EducationEditModalProps> = ({
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
          education: formData,
        });
        toast.success("Education details updated successfully");
        onUpdate();
        onClose();
      } catch (error) {
        console.error("Error updating education details:", error);
        toast.error("Failed to update education details");
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Edit Education Details</DialogTitle>
        </DialogHeader>
        <EducationForm onComplete={handleComplete} initialData={data} />
      </DialogContent>
    </Dialog>
  );
};
