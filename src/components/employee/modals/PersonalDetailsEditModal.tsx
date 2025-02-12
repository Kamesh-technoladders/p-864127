
import React from "react";
import { Dialog } from "@/components/ui/dialog";
import { PersonalDetailsForm } from "../PersonalDetailsForm";
import { PersonalDetailsData } from "../types";
import { toast } from "sonner";
import { employeeService } from "@/services/employee/employee.service";
import { UserCircle } from "lucide-react";
import { ModalHeader } from "./common/ModalHeader";
import { ModalContent } from "./common/ModalContent";

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
  const [isEditing, setIsEditing] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleComplete = async (completed: boolean, formData?: any) => {
    if (completed && formData) {
      try {
        setLoading(true);
        await employeeService.updateEmployee(employeeId, {
          personal: formData,
        });
        toast.success("Personal details updated successfully");
        onUpdate();
        onClose();
      } catch (error) {
        console.error("Error updating personal details:", error);
        toast.error("Failed to update personal details");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader
          title="Personal Details"
          icon={UserCircle}
          isEditing={isEditing}
          onEdit={() => setIsEditing(true)}
          onCancel={() => setIsEditing(false)}
          onSave={() => handleComplete(true, data)}
          loading={loading}
          gradientFrom="#ee9ca7"
          gradientTo="#ffdde1"
        />
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          <PersonalDetailsForm onComplete={handleComplete} initialData={data} />
        </div>
      </ModalContent>
    </Dialog>
  );
};
