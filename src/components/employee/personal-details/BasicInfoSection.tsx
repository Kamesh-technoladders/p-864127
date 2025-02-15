
import React from "react";
import { FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AlertCircle, Loader2 } from "lucide-react";
import { ProfilePictureUpload } from "./ProfilePictureUpload";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BLOOD_GROUPS, MARITAL_STATUS } from "./schema/personalDetailsSchema";
import { Label } from "@/components/ui/label";

interface BasicInfoSectionProps {
  register: any;
  errors: any;
  isCheckingEmail?: boolean;
  emailError?: string | null;
  isCheckingPhone?: boolean;
  phoneError?: string | null;
  isCheckingAadhar?: boolean;
  aadharError?: string | null;
  isCheckingPan?: boolean;
  panError?: string | null;
  onProfilePictureChange?: (url: string) => void;
  onProfilePictureDelete?: () => Promise<void>;
  profilePictureUrl?: string;
  setValue: (name: string, value: any) => void;
  watch: (name: string) => any;
}

export const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({ 
  register, 
  errors,
  isCheckingEmail,
  emailError,
  isCheckingPhone,
  phoneError,
  isCheckingAadhar,
  aadharError,
  isCheckingPan,
  panError,
  onProfilePictureChange,
  onProfilePictureDelete,
  profilePictureUrl,
  setValue,
  watch
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
              <div className="relative">
                <Input
                  {...field}
                  type="tel"
                  placeholder="Enter phone number"
                  className={phoneError || errors.phone ? "border-red-500" : ""}
                />
                {isCheckingPhone && (
                  <div className="absolute right-2 top-2">
                    <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
                  </div>
                )}
              </div>
              {(errors.phone || phoneError) && (
                <div className="text-red-500 text-xs flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  <span>{phoneError || errors.phone?.message}</span>
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
                  className={emailError || errors.email ? "border-red-500" : ""}
                />
                {isCheckingEmail && (
                  <div className="absolute right-2 top-2">
                    <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
                  </div>
                )}
              </div>
              {(errors.email || emailError) && (
                <div className="text-red-500 text-xs flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  <span>{emailError || errors.email?.message}</span>
                </div>
              )}
            </div>
          )}
        />

        <FormField
          control={register.control}
          name="dateOfBirth"
          render={({ field }) => (
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Date of Birth<span className="text-red-500">*</span>
              </label>
              <Input
                {...field}
                type="date"
                max={new Date().toISOString().split('T')[0]}
                className={errors.dateOfBirth ? "border-red-500" : ""}
              />
              {errors.dateOfBirth && (
                <div className="text-red-500 text-xs flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  <span>{errors.dateOfBirth.message}</span>
                </div>
              )}
            </div>
          )}
        />

        <FormField
          control={register.control}
          name="bloodGroup"
          render={({ field }) => (
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Blood Group<span className="text-red-500">*</span>
              </label>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className={errors.bloodGroup ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select blood group" />
                </SelectTrigger>
                <SelectContent>
                  {BLOOD_GROUPS.map((group) => (
                    <SelectItem key={group} value={group}>
                      {group}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.bloodGroup && (
                <div className="text-red-500 text-xs flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  <span>{errors.bloodGroup.message}</span>
                </div>
              )}
            </div>
          )}
        />

        <FormField
          control={register.control}
          name="maritalStatus"
          render={({ field }) => (
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Marital Status<span className="text-red-500">*</span>
              </label>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="married" id="married" />
                  <Label htmlFor="married">Married</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="unmarried" id="unmarried" />
                  <Label htmlFor="unmarried">Unmarried</Label>
                </div>
              </RadioGroup>
              {errors.maritalStatus && (
                <div className="text-red-500 text-xs flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  <span>{errors.maritalStatus.message}</span>
                </div>
              )}
            </div>
          )}
        />

        <FormField
          control={register.control}
          name="aadharNumber"
          render={({ field }) => (
            <IdDocumentField
              label="Aadhar Number"
              value={field.value}
              onChange={(value) => {
                field.onChange(value);
                setValue('aadharUrl', '');
              }}
              onDocumentUpload={(url) => setValue('aadharUrl', url)}
              documentUrl={watch('aadharUrl')}
              onDocumentDelete={() => setValue('aadharUrl', '')}
              error={errors.aadharNumber?.message}
              placeholder="Enter 12-digit Aadhar number"
              required
              pattern="\d{12}"
            />
          )}
        />

        <FormField
          control={register.control}
          name="panNumber"
          render={({ field }) => (
            <IdDocumentField
              label="PAN Number"
              value={field.value}
              onChange={(value) => {
                field.onChange(value);
                setValue('panUrl', '');
              }}
              onDocumentUpload={(url) => setValue('panUrl', url)}
              documentUrl={watch('panUrl')}
              onDocumentDelete={() => setValue('panUrl', '')}
              error={errors.panNumber?.message}
              placeholder="Enter PAN number"
              required
              pattern="[A-Z]{5}[0-9]{4}[A-Z]"
            />
          )}
        />

        <FormField
          control={register.control}
          name="uanNumber"
          render={({ field }) => (
            <IdDocumentField
              label="UAN Number"
              value={field.value}
              onChange={(value) => {
                field.onChange(value);
                setValue('uanUrl', '');
              }}
              onDocumentUpload={(url) => setValue('uanUrl', url)}
              documentUrl={watch('uanUrl')}
              onDocumentDelete={() => setValue('uanUrl', '')}
              error={errors.uanNumber?.message}
              placeholder="Enter 12-digit UAN number (optional)"
              pattern="\d{12}"
            />
          )}
        />

        <FormField
          control={register.control}
          name="esicNumber"
          render={({ field }) => (
            <IdDocumentField
              label="ESIC Number"
              value={field.value}
              onChange={(value) => {
                field.onChange(value);
                setValue('esicUrl', '');
              }}
              onDocumentUpload={(url) => setValue('esicUrl', url)}
              documentUrl={watch('esicUrl')}
              onDocumentDelete={() => setValue('esicUrl', '')}
              error={errors.esicNumber?.message}
              placeholder="Enter 17-digit ESIC number (optional)"
              pattern="\d{17}"
            />
          )}
        />
      </div>
    </div>
  );
};
