
import React, { useState, useEffect } from "react";
import { GraduationCap, FileText } from "lucide-react";
import { InfoCard } from "../InfoCard";
import { EducationEditModal } from "../../modals/EducationEditModal";
import { educationService } from "@/services/employee/education.service";

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

  if (isLoading) {
    return (
      <InfoCard 
        title="Education" 
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
        title="Education" 
        icon={GraduationCap}
        onEdit={handleEdit}
      >
        <div className="space-y-4 p-2">
          <div className="space-y-3">
            {educationData?.map((doc: any) => (
              <div key={doc.id} className="flex items-center gap-2 text-sm">
                <FileText className="h-4 w-4 text-blue-600" />
                <div>
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
              </div>
            ))}
            {(!educationData || educationData.length === 0) && (
              <div className="text-center py-4 text-gray-500">
                No education documents uploaded
              </div>
            )}
          </div>
        </div>
      </InfoCard>

      <EducationEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        employeeId={employeeId}
        onUpdate={fetchEducationData}
        initialData={{
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
