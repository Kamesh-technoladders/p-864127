
import React from "react";
import { ProfileHeader } from "./ProfileHeader";
import { StatsBar } from "./StatsBar";
import { PersonalInfoSection } from "./sections/PersonalInfoSection";
import { EmploymentInfoSection } from "./sections/EmploymentInfoSection";
import { EducationSection } from "./sections/EducationSection";
import { BankInfoSection } from "./sections/BankInfoSection";
import { MetricsSection } from "./sections/MetricsSection";
import { calculateYearsOfExperience } from "@/utils/dateUtils";

interface ProfileContentProps {
  employeeData: any;
  onEdit: (section: string) => void;
}

export const ProfileContent = ({ employeeData, onEdit }: ProfileContentProps) => {
  const presentAddress = employeeData.employee_addresses?.find(addr => addr.type === 'present');

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
          gender={employeeData.gender}
          bloodGroup={employeeData.blood_group}
          state={presentAddress?.state || 'N/A'}
          country={presentAddress?.country || 'N/A'}
          onEdit={() => onEdit("personal")}
        />

        <EmploymentInfoSection
          employeeId={employeeData.employee_id}
          onEdit={() => onEdit("employment")}
        />

        <EducationSection
          education={employeeData.employee_education?.[0]}
          experience={employeeData.employee_experiences}
          onEdit={() => onEdit("education")}
        />

        <BankInfoSection
          data={employeeData.employee_bank_details?.[0]}
          onEdit={() => onEdit("bank")}
        />

        <MetricsSection employeeId={employeeData.id} />
      </div>
    </>
  );
};
