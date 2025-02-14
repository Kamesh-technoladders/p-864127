
import React from "react";
import { FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AlertCircle, Loader2 } from "lucide-react";

interface BasicInfoSectionProps {
  register: any;
  errors: any;
  isCheckingEmail?: boolean;
  emailError?: string | null;
}

export const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({ 
  register, 
  errors,
  isCheckingEmail,
  emailError
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
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
