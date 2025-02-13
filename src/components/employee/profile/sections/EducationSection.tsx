
import React, { useState } from "react";
import { GraduationCap, Briefcase, FileText, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InfoCard } from "../InfoCard";
import { ExperienceCard } from "../../experience/ExperienceCard";
import { AddExperienceModal } from "../../AddExperienceModal";
import { DeleteConfirmationDialog } from "../../experience/DeleteConfirmationDialog";
import { experienceService } from "@/services/employee/experience.service";
import { Experience } from "@/services/types/employee.types";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface EducationSectionProps {
  employeeId: string;
  onEdit: () => void;
}

export const EducationSection: React.FC<EducationSectionProps> = ({
  employeeId,
  onEdit,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [experiences, setExperiences] = useState<Experience[]>([]);

  const handleAddExperience = () => {
    setSelectedExperience(null);
    setIsModalOpen(true);
  };

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
      setIsModalOpen(false);
      setSelectedExperience(null);
    } catch (error) {
      console.error("Error saving experience:", error);
      toast.error(selectedExperience ? "Failed to update experience" : "Failed to add experience");
    }
  };

  const handleConfirmDelete = async () => {
    if (selectedExperience) {
      try {
        await experienceService.deleteExperience(employeeId, selectedExperience.id);
        toast.success("Experience deleted successfully");
        setIsDeleteDialogOpen(false);
        setSelectedExperience(null);
      } catch (error) {
        console.error("Error deleting experience:", error);
        toast.error("Failed to delete experience");
      }
    }
  };

  const renderEducationSection = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Documents</h3>
        <Button variant="outline" size="sm" onClick={onEdit}>Edit</Button>
      </div>
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <FileText className="h-4 w-4" />
          <span>SSC Certificate</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <FileText className="h-4 w-4" />
          <span>HSC Certificate</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <FileText className="h-4 w-4" />
          <span>Degree Certificate</span>
        </div>
      </div>
    </div>
  );

  const renderExperienceSection = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Work History</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={handleAddExperience}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Experience
        </Button>
      </div>
      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
        {experiences.map((experience) => (
          <ExperienceCard
            key={experience.id}
            experience={experience}
            onEdit={() => handleEdit(experience)}
            onDelete={() => handleDelete(experience)}
          />
        ))}
        {experiences.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No experience records found. Click 'Add Experience' to add your work history.
          </div>
        )}
      </div>
    </div>
  );

  return (
    <InfoCard title="Education & Experience" icon={GraduationCap}>
      <Tabs defaultValue="education" className="w-full">
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="education" className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            Education
          </TabsTrigger>
          <TabsTrigger value="experience" className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            Experience
          </TabsTrigger>
        </TabsList>
        <div className="mt-4">
          <TabsContent value="education">
            {renderEducationSection()}
          </TabsContent>
          <TabsContent value="experience">
            {renderExperienceSection()}
          </TabsContent>
        </div>
      </Tabs>

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
    </InfoCard>
  );
};
