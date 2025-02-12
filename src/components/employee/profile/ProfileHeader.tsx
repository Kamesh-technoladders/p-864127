
import React from "react";

interface ProfileHeaderProps {
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  employeeId,
  firstName,
  lastName,
  email,
}) => {
  const fullName = `${firstName} ${lastName}`;

  return (
    <div className="relative w-full h-[200px] rounded-xl overflow-hidden mb-8 backdrop-blur-sm">
      <div className="absolute inset-0 bg-gradient-to-r from-[#ee9ca7]/90 to-[#ffdde1]/90" />
      <div className="absolute inset-0 bg-white/10 backdrop-filter backdrop-blur-[2px]" />
      <div className="relative z-10 flex items-end p-6 h-full">
        <div className="flex items-end gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/80 shadow-lg backdrop-blur-sm">
              <div className="w-full h-full bg-gray-300" />
            </div>
            <div className="absolute -top-2 -right-2 bg-brand-accent text-brand-primary px-2 py-1 rounded-lg text-sm font-medium shadow-sm backdrop-blur-sm">
              ID: {employeeId}
            </div>
          </div>
          <div className="mb-2 bg-black/20 px-4 py-2 rounded-lg backdrop-blur-sm">
            <h1 className="text-2xl font-bold text-white">{fullName}</h1>
            <p className="text-white/80">{email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
