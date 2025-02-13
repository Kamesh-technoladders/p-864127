import React, { useState } from "react";
import { GraduationCap, Briefcase, FileText, Plus, Eye, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InfoCard } from "../InfoCard";
import { ExperienceCard } from "../../experience/ExperienceCard";
import { AddExperienceModal } from "../../AddExperienceModal";
import { DeleteConfirmationDialog } from "../../experience/DeleteConfirmationDialog";
import { experienceService } from "@/services/employee/experience.service";
import { Experience } from "@/services/types/employee.types";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DocumentViewerDialog } from "../../education/DocumentViewerDialog";

interface EducationSectionProps {
  employeeId: string;
  onEdit: () => void;
}

interface Document {
  name: string;
  url: string;
  type: string;
}

export const EducationSection: React.FC<EducationSectionProps> = ({
  employeeId,
  onEdit,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [viewingDocument, setViewingDocument] = useState<Document | null>(null);

  const educationDocuments = [
    { name: "SSC Certificate", url: "", type: "SSC" },
    { name: "HSC Certificate", url: "", type: "HSC" },
    { name: "Degree Certificate", url: "", type: "Degree" }
  ];

  const handleDocumentView = (document: Document) => {
    setViewingDocument(document);
  };

  const handleDocumentDownload = async (document: Document) => {
    try {
      if (!document.url) {
        toast.error("Document URL not available");
        return;
      }

      const response = await fetch(document.url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `${document.name}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Error downloading document:", error);
      toast.error("Failed to download document");
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
        {educationDocuments.map((doc) => (
          <div key={doc.type} className="flex items-center gap-2 text-sm text-gray-600 p-2 hover:bg-gray-50 rounded-lg">
            <FileText className="h-4 w-4" />
            <span>{doc.name}</span>
            <div className="ml-auto flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-gray-600 hover:text-gray-900"
                onClick={() => handleDocumentView(doc)}
              >
                <Eye className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-gray-600 hover:text-gray-900"
                onClick={() => handleDocumentDownload(doc)}
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
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
            onViewDocument={(docType) => handleDocumentView({
              name: `${docType} - ${experience.company}`,
              url: experience[docType] as string,
              type: docType
            })}
            onDownloadDocument={(docType) => handleDocumentDownload({
              name: `${docType} - ${experience.company}`,
              url: experience[docType] as string,
              type: docType
            })}
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

      <DocumentViewerDialog
        isOpen={!!viewingDocument}
        onClose={() => setViewingDocument(null)}
        documentUrl={viewingDocument?.url}
        documentType={viewingDocument?.type || ""}
      />
    </InfoCard>
  );
};
