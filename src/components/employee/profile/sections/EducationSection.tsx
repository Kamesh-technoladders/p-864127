
import React from "react";
import { GraduationCap } from "lucide-react";
import { InfoCard } from "../InfoCard";

interface EducationSectionProps {
  onEdit: () => void;
  education: any;
  experience: any[];
}

export const EducationSection: React.FC<EducationSectionProps> = ({
  onEdit,
  education,
  experience,
}) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

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
            <span>{education?.type === 'degree' ? 'Bachelor\'s' : 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Experience</span>
            <span>{experience?.length > 0 ? `${experience.length} years` : 'N/A'}</span>
          </div>
        </div>
        
        {experience && experience.length > 0 && (
          <div className="pt-4 border-t border-gray-100">
            <h4 className="text-sm font-medium mb-2">Experience Timeline</h4>
            <div className="space-y-3">
              {experience.map((exp) => (
                <div key={exp.id} className="text-sm">
                  <div className="font-medium">{exp.job_title} at {exp.company}</div>
                  <div className="text-gray-500">
                    {formatDate(exp.start_date)} - {exp.end_date ? formatDate(exp.end_date) : 'Present'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-gray-100">
          <h4 className="text-sm font-medium mb-2">Education Timeline</h4>
          <div className="space-y-3">
            {education?.degree && (
              <div className="text-sm">
                <div className="font-medium">Bachelor's Degree</div>
                <div className="text-gray-500">Educational Documents Available</div>
              </div>
            )}
            {education?.hsc && (
              <div className="text-sm">
                <div className="font-medium">Higher Secondary</div>
                <div className="text-gray-500">HSC Certificate Available</div>
              </div>
            )}
            {education?.ssc && (
              <div className="text-sm">
                <div className="font-medium">Secondary School</div>
                <div className="text-gray-500">SSC Certificate Available</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </InfoCard>
  );
};
