
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UploadField } from "./UploadField";
import { toast } from "sonner";

interface AddExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (experience: ExperienceData) => void;
}

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

export const AddExperienceModal: React.FC<AddExperienceModalProps> = ({
  isOpen,
  onClose,
  onSave,
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
      toast.success("Experience added successfully");
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
      toast.error("Failed to add experience");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileUpload = (field: keyof ExperienceData) => (file: File) => {
    if (!file) return;

    // Validate file size (5MB limit)
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    if (file.size > MAX_FILE_SIZE) {
      toast.error("File size should not exceed 5MB");
      return;
    }

    // Validate file type
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Only PDF, JPG, and PNG files are allowed");
      return;
    }

    if (field === "payslips") {
      if (formData.payslips.length >= 3) {
        toast.error("Maximum 3 payslips allowed");
        return;
      }
      setFormData((prev) => ({
        ...prev,
        payslips: [...prev.payslips, file],
      }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: file }));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">Add Experience</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-[rgba(48,48,48,1)]">
                Job Title
                <span className="text-[rgba(221,1,1,1)]">*</span>
              </label>
              <Input
                required
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleInputChange}
                placeholder="Enter job title"
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-[rgba(48,48,48,1)]">
                Company Name
                <span className="text-[rgba(221,1,1,1)]">*</span>
              </label>
              <Input
                required
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="Enter company name"
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-[rgba(48,48,48,1)]">
                Location
                <span className="text-[rgba(221,1,1,1)]">*</span>
              </label>
              <Input
                required
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Enter location"
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-[rgba(48,48,48,1)]">
                Employment Type
                <span className="text-[rgba(221,1,1,1)]">*</span>
              </label>
              <Input
                required
                name="employmentType"
                value={formData.employmentType}
                onChange={handleInputChange}
                placeholder="Select employment type"
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-[rgba(48,48,48,1)]">
                Start Date
                <span className="text-[rgba(221,1,1,1)]">*</span>
              </label>
              <Input
                required
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-[rgba(48,48,48,1)]">
                End Date
                <span className="text-[rgba(221,1,1,1)]">*</span>
              </label>
              <Input
                required
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                className="mt-1"
              />
            </div>
          </div>

          <div className="space-y-4">
            <UploadField
              label="Offer Letter"
              required
              onUpload={handleFileUpload("offerLetter")}
              value={formData.offerLetter?.name}
            />
            <UploadField
              label="Separation Letter"
              required
              onUpload={handleFileUpload("separationLetter")}
              value={formData.separationLetter?.name}
            />
            <UploadField
              label="Payslip"
              required
              onUpload={handleFileUpload("payslips")}
              value={formData.payslips.length > 0 ? `${formData.payslips.length} file(s) selected` : undefined}
            />
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              onClick={onClose}
              className="bg-[rgba(221,1,1,0.1)] text-[rgba(221,1,1,1)]"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-[rgba(221,1,1,1)]"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
