
import React, { useState, useEffect } from "react";
import { GraduationCap } from "lucide-react";
import { InfoCard } from "../InfoCard";
import { EducationEditModal } from "../../modals/EducationEditModal";
import { educationService } from "@/services/employee/education.service";
import { format } from "date-fns";

interface EducationSectionProps {
  employeeId: string;
  onEdit: () => void;
}

export const EducationSection: React.FC<EducationSectionProps> = ({
  employeeId,
  onEdit,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [educationData, setEducationData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchEducationData = async () => {
    try {
      setIsLoading(true);
      const data = await educationService.fetchEducation(employeeId);
      setEducationData(data);
    } catch (error) {
      console.error("Error fetching education data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (employeeId) {
      fetchEducationData();
    }
  }, [employeeId]);

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const formatDate = (date: string) => {
    if (!date) return 'Not specified';
    try {
      return format(new Date(date), 'MMM yyyy');
    } catch (error) {
      return 'Invalid date';
    }
  };

  if (isLoading) {
    return (
      <InfoCard 
        title="Education & Experience" 
        icon={GraduationCap}
        onEdit={handleEdit}
      >
        <div className="p-4">Loading...</div>
      </InfoCard>
    );
  }

  return (
    <>
      <InfoCard 
        title="Education & Experience" 
        icon={GraduationCap}
        onEdit={handleEdit}
      >
        <div className="space-y-4 p-2">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500">Institute</span>
              <span>{educationData?.[0]?.institute || 'Not specified'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Year Completed</span>
              <span>{educationData?.[0]?.year_completed ? formatDate(educationData[0].year_completed) : 'Not specified'}</span>
            </div>
          </div>
          <div className="pt-4 border-t border-gray-100">
            <h4 className="text-sm font-medium mb-2">Documents</h4>
            <div className="space-y-3">
              {educationData?.map((doc: any) => (
                <div key={doc.id} className="text-sm">
                  <div className="font-medium">{doc.type.toUpperCase()}</div>
                  {doc.document_url ? (
                    <a 
                      href={doc.document_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View Document
                    </a>
                  ) : (
                    <span className="text-gray-500">No document uploaded</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </InfoCard>

      <EducationEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        employeeId={employeeId}
        onUpdate={fetchEducationData}
        initialData={{
          institute: educationData?.[0]?.institute,
          yearCompleted: educationData?.[0]?.year_completed,
          ssc: educationData?.find((doc: any) => doc.type === 'ssc')?.document_url
            ? {
                name: 'SSC Certificate',
                url: educationData.find((doc: any) => doc.type === 'ssc').document_url
              }
            : undefined,
          hsc: educationData?.find((doc: any) => doc.type === 'hsc')?.document_url
            ? {
                name: 'HSC Certificate',
                url: educationData.find((doc: any) => doc.type === 'hsc').document_url
              }
            : undefined,
          degree: educationData?.find((doc: any) => doc.type === 'degree')?.document_url
            ? {
                name: 'Degree Certificate',
                url: educationData.find((doc: any) => doc.type === 'degree').document_url
              }
            : undefined,
        }}
      />
    </>
  );
};
