
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Experience } from "@/services/types/employee.types";
import { ExperienceCard } from "../experience/ExperienceCard";
import { AddExperienceModal } from "../AddExperienceModal";
import { DeleteConfirmationDialog } from "../experience/DeleteConfirmationDialog";
import { experienceService } from "@/services/employee/experience.service";
import { toast } from "sonner";

interface ExperienceSectionProps {
  data: Experience[];
  employeeId: string;
  onUpdate: () => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  data,
  employeeId,
  onUpdate,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(
    null
  );

  const handleEdit = (experience: Experience) => {
    setSelectedExperience(experience);
    setIsModalOpen(true);
  };

  const handleDelete = (experience: Experience) => {
    setSelectedExperience(experience);
    setIsDeleteDialogOpen(true);
  };

  const handleViewDocument = (docType: string) => {
    console.log('Viewing document:', docType);
  };

  const handleDownloadDocument = (docType: string) => {
    console.log('Downloading document:', docType);
  };

  const handleSave = async (formData: Experience) => {
    try {
      if (selectedExperience) {
        await experienceService.updateExperience(employeeId, selectedExperience.id, formData);
        toast.success('Experience updated successfully');
      } else {
        await experienceService.createExperience(employeeId, formData);
        toast.success('Experience added successfully');
      }
      onUpdate();
      setIsModalOpen(false);
      setSelectedExperience(null);
    } catch (error) {
      console.error('Error saving experience:', error);
      toast.error(selectedExperience ? 'Failed to update experience' : 'Failed to add experience');
    }
  };

  const handleConfirmDelete = async () => {
    if (selectedExperience) {
      try {
        await experienceService.deleteExperience(employeeId, selectedExperience.id);
        toast.success('Experience deleted successfully');
        onUpdate();
        setIsDeleteDialogOpen(false);
        setSelectedExperience(null);
      } catch (error) {
        console.error('Error deleting experience:', error);
        toast.error('Failed to delete experience');
      }
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-[#30409F]">Experience</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setSelectedExperience(null);
            setIsModalOpen(true);
          }}
          className="h-6 w-6 text-gray-500 hover:text-gray-700"
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>

      <div className="space-y-4">
        {data.map((experience) => (
          <ExperienceCard
            key={experience.id}
            experience={experience}
            onEdit={() => handleEdit(experience)}
            onDelete={() => handleDelete(experience)}
            onViewDocument={handleViewDocument}
            onDownloadDocument={handleDownloadDocument}
          />
        ))}
        
        {data.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No experience records found. Click the plus icon to add your work history.
          </div>
        )}
      </div>

      <AddExperienceModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedExperience(null);
        }}
        onSave={handleSave}
        initialData={selectedExperience}
      />

      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setSelectedExperience(null);
        }}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};
