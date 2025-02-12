
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Experience } from "../types";
import { ExperienceCard } from "../experience/ExperienceCard";
import { AddExperienceModal } from "../AddExperienceModal";
import { DeleteConfirmationDialog } from "../experience/DeleteConfirmationDialog";
import { employeeService } from "@/services/employee/employee.service";
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

  const handleSave = async (formData: any) => {
    try {
      if (selectedExperience) {
        // Update existing experience
        await employeeService.updateEmployee(employeeId, {
          experience: data.map((exp) =>
            exp.id === selectedExperience.id ? { ...formData, id: exp.id } : exp
          ),
        });
        toast.success("Experience updated successfully");
      } else {
        // Add new experience
        await employeeService.updateEmployee(employeeId, {
          experience: [...data, { ...formData, id: Date.now().toString() }],
        });
        toast.success("Experience added successfully");
      }
      onUpdate();
      setIsModalOpen(false);
      setSelectedExperience(null);
    } catch (error) {
      console.error("Error saving experience:", error);
      toast.error(
        selectedExperience
          ? "Failed to update experience"
          : "Failed to add experience"
      );
    }
  };

  const handleConfirmDelete = async () => {
    if (selectedExperience) {
      try {
        await employeeService.updateEmployee(employeeId, {
          experience: data.filter((exp) => exp.id !== selectedExperience.id),
        });
        toast.success("Experience deleted successfully");
        onUpdate();
        setIsDeleteDialogOpen(false);
        setSelectedExperience(null);
      } catch (error) {
        console.error("Error deleting experience:", error);
        toast.error("Failed to delete experience");
      }
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-[#30409F]">Experience</h2>
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
      </div>

      <div className="space-y-4">
        {data.map((experience) => (
          <ExperienceCard
            key={experience.id}
            experience={experience}
            onEdit={() => handleEdit(experience)}
            onDelete={() => handleDelete(experience)}
          />
        ))}
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
