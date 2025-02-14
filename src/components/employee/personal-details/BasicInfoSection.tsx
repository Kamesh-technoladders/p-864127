
import React from "react";
import { FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AlertCircle, Loader2 } from "lucide-react";
import { ProfilePictureUpload } from "./ProfilePictureUpload";

interface BasicInfoSectionProps {
  register: any;
  errors: any;
  isCheckingEmail?: boolean;
  emailError?: string | null;
  onProfilePictureChange?: (url: string) => void;
  onProfilePictureDelete?: () => Promise<void>;
  profilePictureUrl?: string;
}

export const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({ 
  register, 
  errors,
  isCheckingEmail,
  emailError,
  onProfilePictureChange,
  onProfilePictureDelete,
  profilePictureUrl
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
        <FormField
          control={register.control}
          name="firstName"
          render={({ field }) => (
            <div className="space-y-2">
              <label className="text-sm font-medium">
                First Name<span className="text-red-500">*</span>
              </label>
              <Input
                {...field}
                placeholder="Enter first name"
                className={errors.firstName ? "border-red-500" : ""}
              />
              {errors.firstName && (
                <div className="text-red-500 text-xs flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  <span>{errors.firstName.message}</span>
                </div>
              )}
            </div>
          )}
        />

        <FormField
          control={register.control}
          name="lastName"
          render={({ field }) => (
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Last Name<span className="text-red-500">*</span>
              </label>
              <Input
                {...field}
                placeholder="Enter last name"
                className={errors.lastName ? "border-red-500" : ""}
              />
              {errors.lastName && (
                <div className="text-red-500 text-xs flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  <span>{errors.lastName.message}</span>
                </div>
              )}
            </div>
          )}
        />

        <FormField
          control={register.control}
          name="employeeId"
          render={({ field }) => (
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Employee ID<span className="text-red-500">*</span>
              </label>
              <Input
                {...field}
                placeholder="Enter employee ID"
                className={errors.employeeId ? "border-red-500" : ""}
              />
              {errors.employeeId && (
                <div className="text-red-500 text-xs flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  <span>{errors.employeeId.message}</span>
                </div>
              )}
            </div>
          )}
        />

        <FormField
          control={register.control}
          name="phone"
          render={({ field }) => (
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Phone Number<span className="text-red-500">*</span>
              </label>
              <Input
                {...field}
                type="tel"
                placeholder="Enter phone number"
                className={errors.phone ? "border-red-500" : ""}
              />
              {errors.phone && (
                <div className="text-red-500 text-xs flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  <span>{errors.phone.message}</span>
                </div>
              )}
            </div>
          )}
        />

        <FormField
          control={register.control}
          name="email"
          render={({ field }) => (
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Email<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Input
                  {...field}
                  type="email"
                  placeholder="Enter email address"
                  className={emailError ? "border-red-500" : ""}
                />
                {isCheckingEmail && (
                  <div className="absolute right-2 top-2">
                    <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
                  </div>
                )}
              </div>
              {emailError && (
                <div className="text-red-500 text-xs flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  <span>{emailError}</span>
                </div>
              )}
            </div>
          )}
        />
      </div>
    </div>
  );
};
