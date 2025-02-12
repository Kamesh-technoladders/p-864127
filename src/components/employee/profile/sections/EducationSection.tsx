
import React from "react";
import { GraduationCap } from "lucide-react";
import { InfoCard } from "../InfoCard";

interface EducationSectionProps {
  onEdit: () => void;
}

export const EducationSection: React.FC<EducationSectionProps> = ({
  onEdit,
}) => {
  return (
    <InfoCard 
      title="Education & Experience" 
      icon={GraduationCap}
      onEdit={onEdit}
    >
      <div className="space-y-4 p-2">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-500">Highest Degree</span>
            <span>Bachelor's</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Experience</span>
            <span>5 years</span>
          </div>
        </div>
        <div className="pt-4 border-t border-gray-100">
          <h4 className="text-sm font-medium mb-2">Education Timeline</h4>
          <div className="space-y-3">
            <div className="text-sm">
              <div className="font-medium">B.Tech in Computer Science</div>
              <div className="text-gray-500">2015 - 2019</div>
            </div>
            <div className="text-sm">
              <div className="font-medium">Higher Secondary</div>
              <div className="text-gray-500">2013 - 2015</div>
            </div>
          </div>
        </div>
      </div>
    </InfoCard>
  );
};
