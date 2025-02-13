
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

  const validateForm = () => {
    if (!formData.jobTitle || !formData.company || !formData.location) {
      toast.error("Please fill in all required fields");
      return false;
    }

    if (!formData.startDate || !formData.endDate) {
      toast.error("Please select both start and end dates");
      return false;
    }

    if (new Date(formData.startDate) > new Date(formData.endDate)) {
      toast.error("Start date cannot be after end date");
      return false;
    }

    if (!formData.offerLetter) {
      toast.error("Please upload offer letter");
      return false;
    }

    if (!formData.separationLetter) {
      toast.error("Please upload separation letter");
      return false;
    }

    if (formData.payslips.length === 0) {
      toast.error("Please upload at least one payslip");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

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

  const handleFileUpload = (field: keyof ExperienceData) => async (file: File) => {
    if (!file) return;

    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    if (file.size > MAX_FILE_SIZE) {
      toast.error("File size should not exceed 5MB");
      return;
    }

    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Only PDF, JPG, and PNG files are allowed");
      return;
    }

    // Simulate upload delay for progress bar
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        if (field === "payslips") {
          if (formData.payslips.length >= 3) {
            toast.error("Maximum 3 payslips allowed");
            resolve();
            return;
          }
          setFormData((prev) => ({
            ...prev,
            payslips: [...prev.payslips, file],
          }));
        } else {
          setFormData((prev) => ({ ...prev, [field]: file }));
        }
        resolve();
      }, 2000);
    });
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
          />
          <FormActions onClose={onClose} isSubmitting={isSubmitting} />
        </form>
      </DialogContent>
    </Dialog>
  );
};
