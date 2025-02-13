
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { AddressFields } from "./AddressFields";

interface PresentAddressSectionProps {
  form: UseFormReturn<any>;
  showValidation?: boolean;
}

export const PresentAddressSection: React.FC<PresentAddressSectionProps> = ({ form, showValidation }) => {
  return (
    <div className="space-y-6">
      <div className="h-9 flex items-center">
        <h3 className="font-semibold text-[#1A1F2C]">Present Address</h3>
      </div>
      <AddressFields form={form} prefix="presentAddress" showValidation={showValidation} />
    </div>
  );
};
