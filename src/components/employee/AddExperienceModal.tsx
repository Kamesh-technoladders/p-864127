
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UploadField } from "./UploadField";
import { Experience } from "@/services/types/employee.types";

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

  const handleFileUpload = (field: keyof Experience) => async (file: File) => {
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
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Job Title</label>
              <Input
                required
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleInputChange}
                placeholder="Enter job title"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Company</label>
              <Input
                required
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="Enter company name"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Location</label>
              <Input
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Enter location"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Employment Type</label>
              <Select
                value={formData.employmentType}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, employmentType: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full Time">Full Time</SelectItem>
                  <SelectItem value="Part Time">Part Time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Internship">Internship</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Start Date</label>
              <Input
                required
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="text-sm font-medium">End Date</label>
              <Input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="space-y-4">
            <UploadField
              label="Offer Letter"
              onUpload={handleFileUpload("offerLetter")}
              value={formData.offerLetter?.name}
            />

            <UploadField
              label="Separation Letter"
              onUpload={handleFileUpload("separationLetter")}
              value={formData.separationLetter?.name}
            />

            <UploadField
              label="Payslips"
              onUpload={handleFileUpload("payslips")}
              value={
                formData.payslips?.length
                  ? `${formData.payslips.length} files selected`
                  : undefined
              }
              showProgress
            />
          </div>

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
