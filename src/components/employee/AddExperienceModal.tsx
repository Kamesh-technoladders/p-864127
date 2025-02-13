
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Experience } from "@/services/types/employee.types";
import { ExperienceFormFields } from "./experience/ExperienceFormFields";
import { ExperienceDocumentUploads } from "./experience/ExperienceDocumentUploads";
import { EmploymentModalActions } from "./profile/modals/components/EmploymentModalActions";

interface AddExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Experience) => Promise<void>;
  initialData?: Experience | null;
}

export const AddExperienceModal: React.FC<AddExperienceModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Partial<Experience>>({
    jobTitle: "",
    company: "",
    location: "",
    employmentType: "Full Time",
    startDate: "",
    endDate: "",
    payslips: [],
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setIsEditing(true);
    } else {
      setFormData({
        jobTitle: "",
        company: "",
        location: "",
        employmentType: "Full Time",
        startDate: "",
        endDate: "",
        payslips: [],
      });
      setIsEditing(false);
    }
  }, [initialData, isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await onSave(formData as Experience);
      onClose();
    } catch (error) {
      console.error("Error saving experience:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileUpload = (field: keyof Experience) => async (file: File): Promise<void> => {
    if (field === 'payslips') {
      setFormData((prev) => ({
        ...prev,
        payslips: [...(prev.payslips || []), file],
      }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: file }));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0">
        <DialogHeader className="p-3 bg-gradient-to-r from-[#30409F] to-[#4B5FBD]">
          <div className="flex justify-between items-center text-white">
            <DialogTitle className="text-white">
              {initialData ? "Edit Experience" : "Add Experience"}
            </DialogTitle>
            <EmploymentModalActions
              isEditing={isEditing}
              loading={isSubmitting}
              onEdit={() => setIsEditing(true)}
              onCancel={() => {
                setIsEditing(false);
                if (!initialData) onClose();
              }}
              onSave={handleSubmit}
              onClose={onClose}
            />
          </div>
        </DialogHeader>

        <div className="p-6">
          <ExperienceFormFields
            formData={formData}
            handleInputChange={handleInputChange}
            setFormData={setFormData}
          />

          <ExperienceDocumentUploads
            formData={formData}
            handleFileUpload={handleFileUpload}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
