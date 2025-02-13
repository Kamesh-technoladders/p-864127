
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Experience } from "@/services/types/employee.types";
import { ExperienceFormFields } from "./experience/ExperienceFormFields";
import { ExperienceDocumentUploads } from "./experience/ExperienceDocumentUploads";

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
    }
  }, [initialData, isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSave(formData as Experience);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileUpload = (field: keyof Experience) => (file: File) => {
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
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Experience" : "Add Experience"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <ExperienceFormFields
            formData={formData}
            handleInputChange={handleInputChange}
            setFormData={setFormData}
          />

          <ExperienceDocumentUploads
            formData={formData}
            handleFileUpload={handleFileUpload}
          />

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
