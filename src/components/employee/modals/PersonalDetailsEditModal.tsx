
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PersonalDetailsForm } from "../PersonalDetailsForm";
import { PersonalDetailsData } from "../types";
import { Button } from "@/components/ui/button";
import { UserCircle, X } from "lucide-react";
import { toast } from "sonner";

interface PersonalDetailsEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PersonalDetailsData;
  employeeId: string;
  onUpdate: (data: PersonalDetailsData) => void;
}

export const PersonalDetailsEditModal: React.FC<PersonalDetailsEditModalProps> = ({
  isOpen,
  onClose,
  data,
  employeeId,
  onUpdate,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleComplete = async (completed: boolean, formData?: any) => {
    if (completed && formData) {
      try {
        setIsSubmitting(true);
        await onUpdate(formData);
        toast.success("Personal details updated successfully");
        onClose();
      } catch (error) {
        console.error("Error updating personal details:", error);
        toast.error("Failed to update personal details");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden bg-white border border-gray-200 shadow-2xl max-h-[90vh] flex flex-col">
        <DialogHeader className="p-3 bg-gradient-to-r from-[#30409F] to-[#4B5FBD] sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1.5">
              <UserCircle className="w-3.5 h-3.5 text-white" />
              <DialogTitle className="text-sm font-semibold text-white tracking-tight">
                Edit Personal Details
              </DialogTitle>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6 text-white hover:bg-white/20"
              onClick={onClose}
            >
              <X className="h-3.5 w-3.5" />
            </Button>
          </div>
        </DialogHeader>
        <div className="overflow-y-auto flex-1 p-3">
          <PersonalDetailsForm 
            onComplete={handleComplete} 
            initialData={data}
            isSubmitting={isSubmitting}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
