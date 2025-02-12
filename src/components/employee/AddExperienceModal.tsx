
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { ExperienceForm } from "./experience/ExperienceForm";
import { DocumentUploads } from "./experience/DocumentUploads";
import { FormActions } from "./experience/FormActions";
import { useParams } from "react-router-dom";

export interface ExperienceData {
  jobTitle: string;
  company: string;
  location: string;
  employmentType: string;
  startDate: string;
  endDate: string;
  offerLetter?: File;
  separationLetter?: File;
  payslips: File[];
}

interface AddExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (experience: ExperienceData) => void;
  initialData?: ExperienceData | null;
}

export const AddExperienceModal: React.FC<AddExperienceModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const { id: employeeId } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<ExperienceData>({
    jobTitle: "",
    company: "",
    location: "",
    employmentType: "Full Time",
    startDate: "",
    endDate: "",
    payslips: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData, isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (field: keyof ExperienceData) => async (file: File) => {
    if (!file) return;

    setFormData((prev) => {
      if (field === "payslips") {
        return {
          ...prev,
          payslips: [...prev.payslips, file],
        };
      }
      return { ...prev, [field]: file };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      onSave(formData);
      onClose();
      setFormData({
        jobTitle: "",
        company: "",
        location: "",
        employmentType: "Full Time",
        startDate: "",
        endDate: "",
        payslips: [],
      });
    } catch (error) {
      toast.error("Failed to save experience");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">
            {initialData ? "Edit Experience" : "Add Experience"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <ExperienceForm
            formData={formData}
            handleInputChange={handleInputChange}
          />
          <DocumentUploads
            formData={formData}
            handleFileUpload={handleFileUpload}
            employeeId={employeeId || ""}
          />
          <FormActions onClose={onClose} isSubmitting={isSubmitting} />
        </form>
      </DialogContent>
    </Dialog>
  );
};
