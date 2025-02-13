
import React, { useState } from "react";
import { format } from "date-fns";
import { FileText, Pencil, Trash2, ChevronDown, ChevronUp, Eye, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Experience } from "@/services/types/employee.types";

interface ExperienceCardProps {
  experience: Experience;
  onEdit: (experience: Experience) => void;
  onDelete: (experience: Experience) => void;
  onViewDocument: (docType: keyof Pick<Experience, 'offerLetter' | 'separationLetter'>) => void;
  onDownloadDocument: (docType: keyof Pick<Experience, 'offerLetter' | 'separationLetter'>) => void;
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({
  experience,
  onEdit,
  onDelete,
  onViewDocument,
  onDownloadDocument,
}) => {
  const [isDocsExpanded, setIsDocsExpanded] = useState(false);

  const formatDate = (date: string) => {
    if (!date) return "Present";
    return format(new Date(date), "MMM yyyy");
  };

  const hasDocuments = experience.offerLetter || experience.separationLetter || experience.payslips?.length > 0;

  const renderDocumentActions = (docType: keyof Pick<Experience, 'offerLetter' | 'separationLetter'>, label: string) => {
    if (!experience[docType]) return null;
    
    return (
      <div className="flex items-center gap-1 text-sm text-blue-600 justify-between p-2 hover:bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          <span>{label}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-600 hover:text-gray-900"
            onClick={() => onViewDocument(docType)}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-600 hover:text-gray-900"
            onClick={() => onDownloadDocument(docType)}
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-gray-900">
            {experience.jobTitle}
          </h3>
          <p className="text-gray-600">{experience.company}</p>
          <p className="text-sm text-gray-500">
            {formatDate(experience.startDate)} - {formatDate(experience.endDate)}
          </p>
          <p className="text-sm text-gray-500">{experience.location}</p>
          <p className="text-sm text-gray-500">{experience.employmentType}</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(experience)}
            className="text-gray-500 hover:text-gray-700"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(experience)}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {hasDocuments && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <button
            onClick={() => setIsDocsExpanded(!isDocsExpanded)}
            className="flex items-center justify-between w-full text-sm font-medium text-gray-900"
          >
            <span>Documents</span>
            {isDocsExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
          
          {isDocsExpanded && (
            <div className="mt-2 space-y-2">
              {renderDocumentActions('offerLetter', 'Offer Letter')}
              {renderDocumentActions('separationLetter', 'Separation Letter')}
              {experience.payslips?.map((payslip, index) => (
                <div key={index} className="flex items-center gap-1 text-sm text-blue-600 justify-between p-2 hover:bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span>Payslip {index + 1}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-600 hover:text-gray-900"
                      onClick={() => onViewDocument('payslips')}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-600 hover:text-gray-900"
                      onClick={() => onDownloadDocument('payslips')}
                    >
                      <Download className="h-4 w-4" />
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
