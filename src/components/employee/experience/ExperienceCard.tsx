
import React, { useState } from "react";
import { format } from "date-fns";
import { FileText, Pencil, Trash2, ChevronDown, ChevronUp, Eye, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Experience } from "@/services/types/employee.types";
import { toast } from "sonner";

interface ExperienceCardProps {
  experience: Experience;
  onEdit: (experience: Experience) => void;
  onDelete: (experience: Experience) => void;
  onViewDocument: (docType: keyof Pick<Experience, 'offerLetter' | 'separationLetter' | 'payslips'>) => void;
  onDownloadDocument: (docType: keyof Pick<Experience, 'offerLetter' | 'separationLetter' | 'payslips'>) => void;
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({
  experience,
  onEdit,
  onDelete,
  onViewDocument,
  onDownloadDocument,
}) => {
  const [isDocsExpanded, setIsDocsExpanded] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const formatDate = (date: string) => {
    if (!date) return "Present";
    return format(new Date(date), "MMM yyyy");
  };

  const hasDocuments = experience.offerLetter || experience.separationLetter || experience.payslips?.length > 0;

  const handleDownload = async (docType: keyof Pick<Experience, 'offerLetter' | 'separationLetter' | 'payslips'>) => {
    try {
      setIsDownloading(true);
      const url = experience[docType];
      if (typeof url !== 'string' || !url) {
        toast.error("Document URL not available");
        return;
      }

      const response = await fetch(url);
      if (!response.ok) throw new Error('Download failed');
      
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = window.document.createElement('a');
      link.href = downloadUrl;
      link.download = `${docType}_${experience.company}.pdf`;
      window.document.body.appendChild(link);
      link.click();
      window.document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
      toast.success("Document downloaded successfully");
    } catch (error) {
      console.error("Error downloading document:", error);
      toast.error("Failed to download document");
    } finally {
      setIsDownloading(false);
    }
  };

  const renderDocumentActions = (docType: keyof Pick<Experience, 'offerLetter' | 'separationLetter' | 'payslips'>, label: string) => {
    if (!experience[docType]) return null;
    
    return (
      <div className="flex items-center gap-1 text-xs justify-between p-2 hover:bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2">
          <FileText className="h-3 w-3" />
          <span className="text-gray-700">{label}</span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 text-gray-600 hover:text-gray-900"
            onClick={() => onViewDocument(docType)}
          >
            <Eye className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 text-gray-600 hover:text-gray-900"
            onClick={() => handleDownload(docType)}
            disabled={isDownloading}
          >
            <Download className="h-3 w-3" />
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-3 max-h-[16rem] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 hover:scrollbar-thumb-gray-300 pr-4">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-gray-900">
            {experience.jobTitle}
          </h3>
          <p className="text-xs text-gray-600">{experience.company}</p>
          <p className="text-[10px] text-gray-500">
            {formatDate(experience.startDate)} - {formatDate(experience.endDate)}
          </p>
          <p className="text-[10px] text-gray-500">{experience.location}</p>
          <p className="text-[10px] text-gray-500">{experience.employmentType}</p>
        </div>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(experience)}
            className="h-6 w-6 text-gray-500 hover:text-gray-700"
          >
            <Pencil className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(experience)}
            className="h-6 w-6 text-red-500 hover:text-red-700"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {hasDocuments && (
        <div className="mt-2 pt-2 border-t border-gray-100">
          <button
            onClick={() => setIsDocsExpanded(!isDocsExpanded)}
            className="flex items-center justify-between w-full text-xs font-medium text-gray-900 hover:bg-gray-50 rounded-lg p-1"
          >
            <span>Documents</span>
            {isDocsExpanded ? (
              <ChevronUp className="h-3 w-3" />
            ) : (
              <ChevronDown className="h-3 w-3" />
            )}
          </button>
          
          {isDocsExpanded && (
            <div className="mt-1 space-y-1 overflow-y-auto">
              {renderDocumentActions('offerLetter', 'Offer Letter')}
              {renderDocumentActions('separationLetter', 'Separation Letter')}
              {experience.payslips?.map((payslip, index) => (
                <div key={index} className="flex items-center gap-1 text-xs justify-between p-2 hover:bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <FileText className="h-3 w-3" />
                    <span className="text-gray-700">Payslip {index + 1}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 text-gray-600 hover:text-gray-900"
                      onClick={() => onViewDocument('payslips')}
                    >
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 text-gray-600 hover:text-gray-900"
                      onClick={() => handleDownload('payslips')}
                      disabled={isDownloading}
                    >
                      <Download className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
