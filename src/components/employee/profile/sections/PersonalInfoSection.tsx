
import React from "react";
import { UserCircle } from "lucide-react";
import { InfoCard } from "../InfoCard";

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
      return date.toLocaleDateString('en-GB'); // Format as DD/MM/YYYY
    } catch (error) {
      console.error('Error formatting date:', dateStr, error);
      return 'Invalid date';
    }
  };

  return (
    <InfoCard 
      title="Personal Information" 
      icon={UserCircle}
      onEdit={onEdit}
    >
      <div className="space-y-4 p-2">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-500">Phone</span>
            <span>{phone || 'Not specified'}</span>
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
        <div className="pt-4 border-t border-gray-100">
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
