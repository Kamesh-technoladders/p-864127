
import React from "react";
import { UserCircle, Copy } from "lucide-react";
import { InfoCard } from "../InfoCard";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip";

interface PersonalInfoSectionProps {
  phone: string;
  dateOfBirth: string;
  maritalStatus: string;
  onEdit: () => void;
}

export const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({
  phone,
  dateOfBirth,
  maritalStatus,
  onEdit,
}) => {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'Not specified';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-GB');
    } catch (error) {
      console.error('Error formatting date:', dateStr, error);
      return 'Invalid date';
    }
  };

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${type} copied to clipboard`);
  };

  return (
    <InfoCard 
      title="Personal Information" 
      icon={UserCircle}
      onEdit={onEdit}
    >
      <div className="space-y-3 p-2">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Phone</span>
            <div className="flex items-center gap-2">
              <span>{phone || 'Not specified'}</span>
              {phone && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => handleCopy(phone, 'Phone number')}
                        className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Copy phone number</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Date of Birth</span>
            <span>{formatDate(dateOfBirth)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Marital Status</span>
            <span>{maritalStatus || 'Not specified'}</span>
          </div>
        </div>
        <div className="pt-3 border-t border-gray-100">
          <h4 className="text-sm font-medium mb-2">Additional Information</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Nationality</span>
              <span>Indian</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Languages</span>
              <span>English, Hindi</span>
            </div>
          </div>
        </div>
      </div>
    </InfoCard>
  );
};
