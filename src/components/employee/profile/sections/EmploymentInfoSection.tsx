
import React from "react";
import { Briefcase } from "lucide-react";
import { InfoCard } from "../InfoCard";

interface EmploymentInfoSectionProps {
  employeeId: string;
  onEdit: () => void;
}

export const EmploymentInfoSection: React.FC<EmploymentInfoSectionProps> = ({
  employeeId,
  onEdit,
}) => {
  return (
    <InfoCard 
      title="Employment Details" 
      icon={Briefcase}
      onEdit={onEdit}
    >
      <div className="space-y-4 p-2">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-500">Employee ID</span>
            <span>{employeeId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Department</span>
            <span>Engineering</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Position</span>
            <span>Software Engineer</span>
          </div>
        </div>
      </div>
    </InfoCard>
  );
};
