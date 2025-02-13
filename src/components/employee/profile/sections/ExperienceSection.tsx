
import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Experience } from '@/services/types/employee.types';
import { ExperienceCard } from '../../experience/ExperienceCard';
import { AddExperienceModal } from '../../AddExperienceModal';
import { DeleteConfirmationDialog } from '../../experience/DeleteConfirmationDialog';
import { experienceService } from '@/services/employee/experience.service';
import { toast } from 'sonner';

interface ExperienceSectionProps {
  employeeId: string;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ employeeId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [experiences, setExperiences] = useState<Experience[]>([]);

  useEffect(() => {
    fetchExperiences();
  }, [employeeId]);

  const fetchExperiences = async () => {
    try {
      const data = await experienceService.fetchExperiences(employeeId);
      // Transform API data to match Experience type
      const transformedData: Experience[] = data.map((exp: any) => ({
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
      setExperiences(transformedData);
    } catch (error) {
      console.error('Error fetching experiences:', error);
      toast.error('Failed to load experiences');
    }
  };

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

  const handleViewDocument = (docType: string) => {
    // Handle document viewing
    console.log('Viewing document:', docType);
  };

  const handleDownloadDocument = (docType: string) => {
    // Handle document downloading
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
      setIsModalOpen(false);
      setSelectedExperience(null);
      fetchExperiences();
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
        setIsDeleteDialogOpen(false);
        setSelectedExperience(null);
        fetchExperiences();
      } catch (error) {
        console.error('Error deleting experience:', error);
        toast.error('Failed to delete experience');
      }
    }
  };

  return (
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
            onViewDocument={handleViewDocument}
            onDownloadDocument={handleDownloadDocument}
          />
        ))}
        {experiences.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No experience records found. Click 'Add Experience' to add your work history.
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
