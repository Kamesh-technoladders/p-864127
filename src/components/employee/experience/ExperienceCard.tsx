
import React, { useState } from "react";
import { format } from "date-fns";
import { FileText, Pencil, Trash2, Eye, Download } from "lucide-react";
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
  const [isDownloading, setIsDownloading] = useState(false);

  const formatDate = (date: string) => {
    if (!date) return "Present";
    return format(new Date(date), "MMM yyyy");
  };

  const hasDocuments = experience.offerLetter || experience.separationLetter || experience.payslips?.length > 0;

  const handleDownload = async (docType: keyof Pick<Experience, 'offerLetter' | 'separationLetter' | 'payslips'>) => {
    try {
      setIsDownloading(true);
      await onDownloadDocument(docType);
    } finally {
      setIsDownloading(false);
    }
  };

  const renderDocumentActions = (docType: keyof Pick<Experience, 'offerLetter' | 'separationLetter' | 'payslips'>, label: string) => {
    if (!experience[docType]) return null;
    
    return (
      <div className="flex items-center gap-1 text-xs justify-between p-2 hover:bg-gray-50/80 rounded-lg transition-colors duration-200">
        <div className="flex items-center gap-2">
          <FileText className="h-3 w-3 text-gray-400" />
          <span className="text-gray-600">{label}</span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 rounded-full hover:bg-white/80 text-gray-500 hover:text-gray-700 transition-colors"
            onClick={() => onViewDocument(docType)}
          >
            <Eye className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 rounded-full hover:bg-white/80 text-gray-500 hover:text-gray-700 transition-colors"
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
    <div className="bg-white rounded-lg border border-gray-100/80 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] backdrop-blur-sm transition-all duration-200 hover:shadow-[0_4px_12px_-4px_rgba(0,0,0,0.1)] h-[16rem]">
      <div className="p-4 border-b border-gray-100/80">
        <div className="flex justify-between items-start">
          <div className="space-y-1.5">
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
              className="h-7 w-7 rounded-full hover:bg-gray-100/80 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <Pencil className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(experience)}
              className="h-7 w-7 rounded-full hover:bg-red-50 text-red-500 hover:text-red-600 transition-colors"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-3 overflow-y-auto scrollbar-elegant h-[calc(100%-8rem)]">
        {hasDocuments && (
          <div className="space-y-1">
            {renderDocumentActions('offerLetter', 'Offer Letter')}
            {renderDocumentActions('separationLetter', 'Separation Letter')}
            {experience.payslips?.map((payslip, index) => (
              <div key={index} className="flex items-center gap-1 text-xs justify-between p-2 hover:bg-gray-50/80 rounded-lg transition-colors duration-200">
                <div className="flex items-center gap-2">
                  <FileText className="h-3 w-3 text-gray-400" />
                  <span className="text-gray-600">Payslip {index + 1}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 rounded-full hover:bg-white/80 text-gray-500 hover:text-gray-700 transition-colors"
                    onClick={() => onViewDocument('payslips')}
                  >
                    <Eye className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 rounded-full hover:bg-white/80 text-gray-500 hover:text-gray-700 transition-colors"
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
    </div>
  );
};
