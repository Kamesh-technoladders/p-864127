
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { AddressLineField } from "./fields/AddressLineField";
import { CountryField } from "./fields/CountryField";
import { StateField } from "./fields/StateField";
import { CityField } from "./fields/CityField";
import { ZipCodeField } from "./fields/ZipCodeField";

interface AddressFieldsProps {
  form: UseFormReturn<any>;
  prefix: string;
  disabled?: boolean;
}

export const AddressFields: React.FC<AddressFieldsProps> = ({ form, prefix, disabled }) => {
  return (
    <div className="space-y-4">
      <AddressLineField form={form} prefix={prefix} disabled={disabled} />

      <div className="grid grid-cols-2 gap-4">
        <CountryField form={form} prefix={prefix} disabled={disabled} />
        <StateField form={form} prefix={prefix} disabled={disabled} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <CityField form={form} prefix={prefix} disabled={disabled} />
        <ZipCodeField form={form} prefix={prefix} disabled={disabled} />
      </div>
    </div>
  );
};
