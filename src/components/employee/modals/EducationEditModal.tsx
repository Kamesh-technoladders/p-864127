
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UploadField } from "../UploadField";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { educationService } from "@/services/employee/education.service";

interface EducationEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  employeeId: string;
  onUpdate: () => void;
  initialData?: {
    ssc?: { name: string; url: string };
    hsc?: { name: string; url: string };
    degree?: { name: string; url: string };
    institute?: string;
    yearCompleted?: string;
  };
}

export const EducationEditModal: React.FC<EducationEditModalProps> = ({
  isOpen,
  onClose,
  employeeId,
  onUpdate,
  initialData,
}) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [formData, setFormData] = React.useState({
    institute: initialData?.institute || '',
    yearCompleted: initialData?.yearCompleted || '',
    ssc: null as File | null,
    hsc: null as File | null,
    degree: null as File | null,
  });

  const handleFileUpload = (field: 'ssc' | 'hsc' | 'degree') => async (file: File) => {
    setFormData(prev => ({ ...prev, [field]: file }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      await educationService.updateEducation(employeeId, formData);
      toast.success("Education details updated successfully");
      onUpdate();
      onClose();
    } catch (error) {
      console.error("Error updating education:", error);
      toast.error("Failed to update education details");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Education Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Institute Name</label>
              <Input
                name="institute"
                value={formData.institute}
                onChange={handleInputChange}
                placeholder="Enter institute name"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Year Completed</label>
              <Input
                name="yearCompleted"
                type="date"
                value={formData.yearCompleted}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="space-y-4">
            <UploadField
              label="SSC Certificate"
              required
              onUpload={handleFileUpload('ssc')}
              value={formData.ssc?.name || initialData?.ssc?.name}
              currentFile={formData.ssc || (initialData?.ssc ? { name: initialData.ssc.name, type: 'application/pdf' } : null)}
            />

            <UploadField
              label="HSC Certificate"
              required
              onUpload={handleFileUpload('hsc')}
              value={formData.hsc?.name || initialData?.hsc?.name}
              currentFile={formData.hsc || (initialData?.hsc ? { name: initialData.hsc.name, type: 'application/pdf' } : null)}
            />

            <UploadField
              label="Degree Certificate"
              required
              onUpload={handleFileUpload('degree')}
              value={formData.degree?.name || initialData?.degree?.name}
              currentFile={formData.degree || (initialData?.degree ? { name: initialData.degree.name, type: 'application/pdf' } : null)}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
