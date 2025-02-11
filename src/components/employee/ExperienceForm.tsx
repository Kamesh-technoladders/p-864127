
import React, { useState } from "react";
import { AddExperienceModal, ExperienceData } from "./AddExperienceModal";
import { toast } from "sonner";
import { Experience, ExperienceFormProps } from "./types";
import { ExperienceCard } from "./experience/ExperienceCard";
import { DeleteConfirmationDialog } from "./experience/DeleteConfirmationDialog";

export const ExperienceForm: React.FC<ExperienceFormProps> = ({ onComplete, experiences = [] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(
    null
  );
  const [experiencesList, setExperiencesList] = useState<Experience[]>(experiences);

  const handleAddExperience = (data: ExperienceData) => {
    try {
      if (selectedExperience) {
        // Edit mode
        setExperiencesList((prev) =>
          prev.map((exp) =>
            exp.id === selectedExperience.id ? { ...data, id: exp.id } : exp
          )
        );
        toast.success("Experience updated successfully");
      } else {
        // Add mode
        const newExperience: Experience = {
          ...data,
          id: Date.now().toString(),
        };
        setExperiencesList((prev) => [...prev, newExperience]);
        toast.success("Experience added successfully");
      }
      setSelectedExperience(null);
      onComplete(true, experiencesList);
    } catch (error) {
      console.error("Error handling experience:", error);
      toast.error(
        selectedExperience
          ? "Failed to update experience"
          : "Failed to add experience"
      );
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

  const confirmDelete = () => {
    if (selectedExperience) {
      setExperiencesList((prev) =>
        prev.filter((exp) => exp.id !== selectedExperience.id)
      );
      toast.success("Experience deleted successfully");
      setIsDeleteDialogOpen(false);
      setSelectedExperience(null);
      onComplete(true, experiencesList);
    }
  };

  return (
    <div className="flex w-full flex-col mt-[30px] px-4">
      <div className="text-[rgba(48,64,159,1)] text-sm font-bold">
        Experience
      </div>
      <div className="text-[rgba(80,80,80,1)] text-xs font-medium mt-1">
        Add your previous working experience and internship details.
      </div>

      {experiencesList.map((experience) => (
        <ExperienceCard
          key={experience.id}
          experience={experience}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}

      <button
        onClick={() => {
          setSelectedExperience(null);
          setIsModalOpen(true);
        }}
        className="flex items-stretch gap-2 text-sm text-[rgba(221,1,1,1)] font-medium mt-3.5"
      >
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/94b97c43fd3a409f8a2658d3c3f998e3/94ba00a354d444e81c8d49b7bd51add7537c14e2c575d31fbdfae2aad48e7d91?placeholderIfAbsent=true"
          className="aspect-[1] object-contain w-4 shrink-0"
          alt="Add icon"
        />
        Add Experience
      </button>

      <AddExperienceModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedExperience(null);
        }}
        onSave={handleAddExperience}
        initialData={selectedExperience}
      />

      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setSelectedExperience(null);
        }}
        onConfirm={confirmDelete}
      />
    </div>
  );
};
