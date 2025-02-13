
import React from "react";
import { ProfileHeader } from "./ProfileHeader";
import { StatsBar } from "./StatsBar";
import { PersonalInfoSection } from "./sections/PersonalInfoSection";
import { EmploymentInfoSection } from "./sections/EmploymentInfoSection";
import { EducationSection } from "./sections/EducationSection";
import { BankInfoSection } from "./sections/BankInfoSection";
import { MetricsSection } from "./sections/MetricsSection";
import { EmploymentDetailsModal } from "./modals/EmploymentDetailsModal";
import { PersonalDetailsEditModal } from "../modals/PersonalDetailsEditModal";

interface ProfileContentProps {
  employeeData: any;
  isEmploymentModalOpen: boolean;
  isPersonalModalOpen: boolean;
  setIsEmploymentModalOpen: (value: boolean) => void;
  setIsPersonalModalOpen: (value: boolean) => void;
  handleEdit: (section: string) => void;
  handleUpdateEmployment: (data: any) => Promise<void>;
  handleUpdatePersonal: (data: any) => Promise<void>;
  calculateYearsOfExperience: (date: string) => string;
}

export const ProfileContent: React.FC<ProfileContentProps> = ({
  employeeData,
  isEmploymentModalOpen,
  isPersonalModalOpen,
  setIsEmploymentModalOpen,
  setIsPersonalModalOpen,
  handleEdit,
  handleUpdateEmployment,
  handleUpdatePersonal,
  calculateYearsOfExperience
}) => {
  const personalData = {
    employeeId: employeeData.employee_id,
    firstName: employeeData.first_name,
    lastName: employeeData.last_name,
    email: employeeData.email,
    phone: employeeData.phone || '',
    dateOfBirth: employeeData.date_of_birth || '',
    gender: employeeData.gender || '',
    bloodGroup: employeeData.blood_group || '',
    maritalStatus: employeeData.marital_status || '',
    presentAddress: employeeData.present_address || {
      addressLine1: '',
      country: '',
      state: '',
      city: '',
      zipCode: ''
    },
    permanentAddress: employeeData.permanent_address || {
      addressLine1: '',
      country: '',
      state: '',
      city: '',
      zipCode: ''
    },
    emergencyContacts: employeeData.emergency_contacts || [],
    familyDetails: employeeData.family_details || []
  };

  return (
    <>
      <ProfileHeader
        employeeId={employeeData.employee_id}
        firstName={employeeData.first_name}
        lastName={employeeData.last_name}
        email={employeeData.email}
      />

      <StatsBar
        joinedDate={new Date(employeeData.created_at).toLocaleDateString()}
        department="Engineering"
        designation="Software Engineer"
        yearsOfExperience={calculateYearsOfExperience(employeeData.created_at)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
        <PersonalInfoSection
          phone={employeeData.phone}
          dateOfBirth={employeeData.date_of_birth}
          maritalStatus={employeeData.marital_status}
          onEdit={() => handleEdit("personal")}
        />

        <EmploymentInfoSection
          employeeId={employeeData.employee_id}
          onEdit={() => handleEdit("employment")}
        />

        <EducationSection
          onEdit={() => handleEdit("education")}
        />

        <BankInfoSection
          onEdit={() => handleEdit("bank")}
        />

        <MetricsSection employeeId={employeeData.id} />
      </div>

      <EmploymentDetailsModal
        isOpen={isEmploymentModalOpen}
        onClose={() => setIsEmploymentModalOpen(false)}
        employeeId={employeeData?.id || ''}
        initialData={{
          employeeId: employeeData?.employee_id || '',
          department: 'Engineering',
          position: 'Software Engineer',
          joinedDate: employeeData?.created_at || '',
          employmentHistory: [
            {
              title: 'Senior Developer',
              date: 'Jan 2023',
              description: 'Promoted to Senior Developer role',
              type: 'promotion'
            },
            {
              title: 'Developer',
              date: 'Jan 2022',
              description: 'Joined as Developer',
              type: 'join'
            }
          ]
        }}
        onUpdate={handleUpdateEmployment}
      />

      <PersonalDetailsEditModal
        isOpen={isPersonalModalOpen}
        onClose={() => setIsPersonalModalOpen(false)}
        data={personalData}
        employeeId={employeeData.id}
        onUpdate={handleUpdatePersonal}
      />
    </>
  );
};
