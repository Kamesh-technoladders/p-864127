
import React from "react";
import { Dialog } from "@/components/ui/dialog";
import { EducationForm } from "../EducationForm";
import { EducationData } from "../types";
import { toast } from "sonner";
import { employeeService } from "@/services/employee/employee.service";
import { GraduationCap } from "lucide-react";
import { ModalHeader } from "./common/ModalHeader";
import { ModalContent } from "./common/ModalContent";

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
  const [isEditing, setIsEditing] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleComplete = async (completed: boolean, formData?: any) => {
    if (completed && formData) {
      try {
        setLoading(true);
        await employeeService.updateEmployee(employeeId, {
          education: formData,
        });
        toast.success("Education details updated successfully");
        onUpdate();
        onClose();
      } catch (error) {
        console.error("Error updating education details:", error);
        toast.error("Failed to update education details");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader
          title="Education Details"
          icon={GraduationCap}
          isEditing={isEditing}
          onEdit={() => setIsEditing(true)}
          onCancel={() => setIsEditing(false)}
          onSave={() => handleComplete(true, data)}
          loading={loading}
          gradientFrom="#2196F3"
          gradientTo="#64B5F6"
        />
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          <EducationForm 
            onComplete={handleComplete} 
            initialData={data}
            employeeId={employeeId}
          />
        </div>
      </ModalContent>
    </Dialog>
  );
};
