
import React, { useState, useEffect } from "react";
import { GraduationCap, Plus } from "lucide-react";
import { InfoCard } from "../InfoCard";
import { Button } from "@/components/ui/button";
import { experienceService } from "@/services/employee/experience.service";
import { Experience } from "@/services/types/employee.types";
import { ExperienceCard } from "../../experience/ExperienceCard";
import { AddExperienceModal } from "../../AddExperienceModal";
import { DeleteConfirmationDialog } from "../../experience/DeleteConfirmationDialog";
import { toast } from "sonner";

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
      // Map API response to Experience type
      const mappedExperiences: Experience[] = data.map(exp => ({
        id: exp.id,
        jobTitle: exp.job_title,
        company: exp.company,
        location: exp.location,
        employmentType: exp.employment_type,
        startDate: exp.start_date,
        endDate: exp.end_date,
        offerLetter: exp.offer_letter_url,
        separationLetter: exp.separation_letter_url,
        payslips: exp.payslips || []
      }));
      setExperiences(mappedExperiences);
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

  const handleEdit = (experience: Experience) => {
    setSelectedExperience(experience);
    setIsModalOpen(true);
  };

  const handleDelete = (experience: Experience) => {
    setSelectedExperience(experience);
    setIsDeleteDialogOpen(true);
  };

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
        headerAction={
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
        <div className="max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 space-y-4 p-2">
          {experiences.map((experience) => (
            <ExperienceCard
              key={experience.id}
              experience={experience}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
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
