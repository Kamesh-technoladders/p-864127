
import React, { useState, useEffect } from 'react';
import { experienceService } from '@/services/employee/experience.service';
import { Experience } from '@/services/types/employee.types';
import { ExperienceCard } from '../../experience/ExperienceCard';
import { DocumentViewerDialog } from '../../education/DocumentViewerDialog';
import { toast } from 'sonner';

interface ExperienceSectionProps {
  employeeId: string;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  employeeId,
}) => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [viewingDocument, setViewingDocument] = useState<{ url: string; type: string } | null>(null);

  useEffect(() => {
    fetchExperiences();
  }, [employeeId]);

  const fetchExperiences = async () => {
    try {
      const data = await experienceService.fetchExperiences(employeeId);
      setExperiences(data);
    } catch (error) {
      console.error('Error fetching experiences:', error);
      toast.error('Failed to load experiences');
    }
  };

  const getDocumentUrl = (docType: keyof Pick<Experience, 'offerLetter' | 'separationLetter' | 'payslips'>, experience: Experience): string | null => {
    const doc = docType === 'payslips' ? experience.payslips?.[0] : experience[docType];
    if (!doc) return null;
    if (typeof doc === 'string') return doc;
    return null;
  };

  const handleViewDocument = (docType: keyof Pick<Experience, 'offerLetter' | 'separationLetter' | 'payslips'>, experience: Experience) => {
    const documentUrl = getDocumentUrl(docType, experience);
    if (!documentUrl) {
      toast.error("Document not available");
      return;
    }
    setViewingDocument({
      url: documentUrl,
      type: docType
    });
  };

  const handleDownloadDocument = async (docType: keyof Pick<Experience, 'offerLetter' | 'separationLetter' | 'payslips'>, experience: Experience) => {
    try {
      const documentUrl = getDocumentUrl(docType, experience);
      if (!documentUrl) {
        toast.error("Document not available");
        return;
      }

      const response = await fetch(documentUrl);
      if (!response.ok) {
        throw new Error('Download failed');
      }
      
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `${docType}_${experience.company}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
      toast.success("Document downloaded successfully");
    } catch (error) {
      console.error("Error downloading document:", error);
      toast.error("Failed to download document");
    }
  };

  return (
    <div className="space-y-4">
      {experiences.map((experience) => (
        <ExperienceCard
          key={experience.id}
          experience={experience}
          onViewDocument={(docType) => handleViewDocument(docType, experience)}
          onDownloadDocument={(docType) => handleDownloadDocument(docType, experience)}
        />
      ))}
      
      {experiences.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No experience records found.
        </div>
      )}

      <DocumentViewerDialog
        isOpen={!!viewingDocument}
        onClose={() => setViewingDocument(null)}
        documentUrl={viewingDocument?.url || ""}
        documentType={viewingDocument?.type || ""}
      />
    </div>
  );
};
