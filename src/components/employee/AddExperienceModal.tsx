
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UploadField } from "./UploadField";

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
  const [formData, setFormData] = React.useState<ExperienceData>({
    jobTitle: "",
    company: "",
    location: "",
    employmentType: "Full Time",
    startDate: "",
    endDate: "",
    payslips: [],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleFileUpload = (field: keyof ExperienceData) => (file: File) => {
    if (field === "payslips") {
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
            />
            <UploadField
              label="Separation Letter"
              required
              onUpload={handleFileUpload("separationLetter")}
            />
            <UploadField
              label="Payslip"
              required
              onUpload={handleFileUpload("payslips")}
            />
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              onClick={onClose}
              className="bg-[rgba(221,1,1,0.1)] text-[rgba(221,1,1,1)]"
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-[rgba(221,1,1,1)]">
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
