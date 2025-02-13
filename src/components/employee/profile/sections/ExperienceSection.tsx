
import React, { useState, useEffect } from "react";
import { GraduationCap, Plus } from "lucide-react";
import { InfoCard } from "../InfoCard";
import { Button } from "@/components/ui/button";
import { experienceService } from "@/services/employee/experience.service";
import { format } from "date-fns";
import { AddExperienceModal } from "../../AddExperienceModal";
import { Experience } from "@/services/types/employee.types";
import { toast } from "sonner";
import { DeleteConfirmationDialog } from "../../experience/DeleteConfirmationDialog";

interface ExperienceSectionProps {
  employeeId: string;
  onEdit: () => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  employeeId,
  onEdit,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchExperiences = async () => {
    try {
      setIsLoading(true);
      const data = await experienceService.fetchExperiences(employeeId);
      setExperiences(data);
    } catch (error) {
      console.error("Error fetching experiences:", error);
      toast.error("Failed to load experience data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (employeeId) {
      fetchExperiences();
    }
  }, [employeeId]);

  const handleSave = async (formData: Experience) => {
    try {
      if (selectedExperience) {
        await experienceService.updateExperience(employeeId, selectedExperience.id, formData);
        toast.success("Experience updated successfully");
      } else {
        await experienceService.createExperience(employeeId, formData);
        toast.success("Experience added successfully");
      }
      fetchExperiences();
      setIsModalOpen(false);
      setSelectedExperience(null);
    } catch (error) {
      console.error("Error saving experience:", error);
      toast.error("Failed to save experience");
    }
  };

  const handleEdit = (experience: Experience) => {
    setSelectedExperience(experience);
    setIsModalOpen(true);
  };

  const handleDelete = (experience: Experience) => {
    setSelectedExperience(experience);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedExperience) {
      try {
        await experienceService.deleteExperience(employeeId, selectedExperience.id);
        toast.success("Experience deleted successfully");
        fetchExperiences();
        setIsDeleteDialogOpen(false);
        setSelectedExperience(null);
      } catch (error) {
        console.error("Error deleting experience:", error);
        toast.error("Failed to delete experience");
      }
    }
  };

  if (isLoading) {
    return (
      <InfoCard 
        title="Experience" 
        icon={GraduationCap}
        onEdit={onEdit}
      >
        <div className="p-4">Loading...</div>
      </InfoCard>
    );
  }

  return (
    <>
      <InfoCard 
        title="Experience" 
        icon={GraduationCap}
        action={
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
            onClick={() => {
              setSelectedExperience(null);
              setIsModalOpen(true);
            }}
          >
            <Plus className="h-4 w-4" />
            Add Experience
          </Button>
        }
      >
        <div className="space-y-4 p-2">
          {experiences.map((experience) => (
            <div key={experience.id} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{experience.jobTitle}</h4>
                  <p className="text-sm text-gray-600">{experience.company}</p>
                  <p className="text-sm text-gray-500">
                    {format(new Date(experience.startDate), 'MMM yyyy')} - 
                    {experience.endDate 
                      ? format(new Date(experience.endDate), ' MMM yyyy')
                      : ' Present'}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(experience)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(experience)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
          
          {experiences.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No experience records found. Click 'Add Experience' to add your work history.
            </div>
          )}
        </div>
      </InfoCard>

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
    </>
  );
};
