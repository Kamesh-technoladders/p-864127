
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { AddressFields } from "./AddressFields";

interface PresentAddressSectionProps {
  form: UseFormReturn<any>;
}

export const PresentAddressSection: React.FC<PresentAddressSectionProps> = ({ form }) => {
  return (
    <div className="space-y-6">
      <h3 className="font-semibold text-[#1A1F2C]">Present Address</h3>
      <AddressFields form={form} prefix="presentAddress" />
    </div>
  );
};
