import React, { useState } from "react";
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
  showValidation?: boolean;
}

export const AddressFields: React.FC<AddressFieldsProps> = ({ 
  form, 
  prefix, 
  disabled,
  showValidation 
}) => {
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedState, setSelectedState] = useState<string>('');

  const handleCountryChange = (countryCode: string) => {
    setSelectedCountry(countryCode);
    setSelectedState(''); // Reset state when country changes
  };

  const handleStateChange = (stateCode: string) => {
    setSelectedState(stateCode);
  };

  return (
    <div className="space-y-6">
      <AddressLineField form={form} prefix={prefix} disabled={disabled} />

      <div className="grid grid-cols-2 gap-4">
        <CountryField 
          form={form} 
          prefix={prefix} 
          disabled={disabled}
          onCountryChange={handleCountryChange}
        />
        <StateField 
          form={form} 
          prefix={prefix} 
          disabled={disabled}
          countryCode={selectedCountry}
          onStateChange={handleStateChange}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <CityField 
          form={form} 
          prefix={prefix} 
          disabled={disabled}
          countryCode={selectedCountry}
          stateCode={selectedState}
        />
        <ZipCodeField form={form} prefix={prefix} disabled={disabled} />
      </div>
    </div>
  );
};
