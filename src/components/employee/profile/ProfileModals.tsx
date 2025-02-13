
import React from "react";
import { EmploymentDetailsModal } from "./modals/EmploymentDetailsModal";
import { PersonalDetailsEditModal } from "../modals/PersonalDetailsEditModal";
import { EducationEditModal } from "../modals/EducationEditModal";
import { BankDetailsEditModal } from "../modals/BankDetailsEditModal";

interface ProfileModalsProps {
  employeeData: any;
  isEmploymentModalOpen: boolean;
  isPersonalModalOpen: boolean;
  isEducationModalOpen: boolean;
  isBankModalOpen: boolean;
  onCloseEmploymentModal: () => void;
  onClosePersonalModal: () => void;
  onCloseEducationModal: () => void;
  onCloseBankModal: () => void;
  onUpdateEmployment: (data: any) => Promise<void>;
  onUpdate: () => void;
}

export const ProfileModals: React.FC<ProfileModalsProps> = ({
  employeeData,
  isEmploymentModalOpen,
  isPersonalModalOpen,
  isEducationModalOpen,
  isBankModalOpen,
  onCloseEmploymentModal,
  onClosePersonalModal,
  onCloseEducationModal,
  onCloseBankModal,
  onUpdateEmployment,
  onUpdate,
}) => {
  const presentAddress = employeeData.employee_addresses?.find(addr => addr.type === 'present');

  return (
    <>
      <EmploymentDetailsModal
        isOpen={isEmploymentModalOpen}
        onClose={onCloseEmploymentModal}
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
        onUpdate={onUpdateEmployment}
      />

      <PersonalDetailsEditModal
        isOpen={isPersonalModalOpen}
        onClose={onClosePersonalModal}
        data={{
          employeeId: employeeData.employee_id,
          firstName: employeeData.first_name,
          lastName: employeeData.last_name,
          email: employeeData.email,
          phone: employeeData.phone,
          dateOfBirth: employeeData.date_of_birth,
          gender: employeeData.gender,
          bloodGroup: employeeData.blood_group,
          maritalStatus: employeeData.marital_status,
          presentAddress: presentAddress || {
            addressLine1: '',
            country: '',
            state: '',
            city: '',
            zipCode: ''
          },
          permanentAddress: {
            addressLine1: '',
            country: '',
            state: '',
            city: '',
            zipCode: ''
          }
        }}
        employeeId={employeeData.id}
        onUpdate={onUpdate}
      />

      <EducationEditModal
        isOpen={isEducationModalOpen}
        onClose={onCloseEducationModal}
        data={employeeData.employee_education?.[0] || {}}
        employeeId={employeeData.id}
        onUpdate={onUpdate}
      />

      <BankDetailsEditModal
        isOpen={isBankModalOpen}
        onClose={onCloseBankModal}
        data={employeeData.employee_bank_details?.[0] || {}}
        employeeId={employeeData.id}
        onUpdate={onUpdate}
      />
    </>
  );
};
