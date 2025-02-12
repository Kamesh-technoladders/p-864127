
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
            <span>{phone}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Date of Birth</span>
            <span>{new Date(dateOfBirth).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Marital Status</span>
            <span>{maritalStatus}</span>
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
