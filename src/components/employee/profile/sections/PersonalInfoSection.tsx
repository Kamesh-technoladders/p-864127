
import React from "react";
import { UserCircle } from "lucide-react";
import { InfoCard } from "../InfoCard";

interface PersonalInfoSectionProps {
  phone: string;
  dateOfBirth: string;
  maritalStatus: string;
  gender: string;
  bloodGroup: string;
  state: string;
  country: string;
  onEdit: () => void;
}

export const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({
  phone,
  dateOfBirth,
  maritalStatus,
  gender,
  bloodGroup,
  state,
  country,
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
            <span className="capitalize">{maritalStatus}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Gender</span>
            <span className="capitalize">{gender}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Blood Group</span>
            <span>{bloodGroup}</span>
          </div>
        </div>
        <div className="pt-4 border-t border-gray-100">
          <h4 className="text-sm font-medium mb-2">Location Information</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">State</span>
              <span className="capitalize">{state}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Country</span>
              <span className="capitalize">{country}</span>
            </div>
          </div>
        </div>
      </div>
    </InfoCard>
  );
};
