
import React from "react";
import { BasicDetailsFields } from "./components/BasicDetailsFields";
import { PersonalInfoFields } from "./components/PersonalInfoFields";
import { DocumentFields } from "./components/DocumentFields";
import { ProfilePictureUpload } from "./ProfilePictureUpload";

interface BasicInfoSectionProps {
  register: any;
  errors: any;
  isCheckingEmail?: boolean;
  emailError?: string | null;
  isCheckingPhone?: boolean;
  phoneError?: string | null;
  onProfilePictureChange?: (url: string) => void;
  onProfilePictureDelete?: () => Promise<void>;
  profilePictureUrl?: string;
  setValue: (name: string, value: any) => void;
  watch: (name: string) => any;
}

export const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({
  register,
  isCheckingEmail,
  emailError,
  isCheckingPhone,
  phoneError,
  onProfilePictureChange,
  onProfilePictureDelete,
  profilePictureUrl,
  setValue,
  watch,
}) => {
  return (
    <div className="space-y-4">
      <div className="text-[rgba(48,64,159,1)] font-bold">Personal Info</div>
      <div className="text-[rgba(80,80,80,1)] text-xs mb-4">
        Fill in your personal details below.
      </div>

      <div className="mb-6">
        <ProfilePictureUpload
          value={profilePictureUrl}
          onChange={(url) => onProfilePictureChange?.(url)}
          onDelete={onProfilePictureDelete}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <BasicDetailsFields
          form={register}
          isCheckingEmail={isCheckingEmail}
          emailError={emailError}
          isCheckingPhone={isCheckingPhone}
          phoneError={phoneError}
        />
        <PersonalInfoFields form={register} />
        <DocumentFields
          form={register}
          setValue={setValue}
          watch={watch}
        />
      </div>
    </div>
  );
};
