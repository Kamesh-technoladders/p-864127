
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { EducationForm } from "../EducationForm";
import { EducationData } from "../types";
import { toast } from "sonner";
import { employeeService } from "@/services/employee/employee.service";
import { Edit2, Save, X, GraduationCap } from "lucide-react";

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
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-white/90 backdrop-blur-lg border border-white/20 shadow-2xl">
        <DialogHeader className="p-6 bg-gradient-to-r from-[#2196F3] to-[#64B5F6]">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <GraduationCap className="w-6 h-6 text-white" />
              <h2 className="text-2xl font-semibold text-white tracking-tight">
                Education Details
              </h2>
            </div>
            <div className="flex items-center gap-2">
              {!isEditing ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                  className="hover:bg-white/20 text-white"
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditing(false)}
                    className="hover:bg-white/20 text-white"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleComplete(true, data)}
                    disabled={loading}
                    className="hover:bg-white/20 text-white"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                </>
              )}
            </div>
          </div>
        </DialogHeader>
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          <EducationForm onComplete={handleComplete} initialData={data} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
