
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { AddressFields } from "./AddressFields";

interface PermanentAddressSectionProps {
  form: UseFormReturn<any>;
}

export const PermanentAddressSection: React.FC<PermanentAddressSectionProps> = ({ form }) => {
  const handleSameAsPresent = (checked: boolean) => {
    if (checked) {
      const presentAddress = form.getValues("presentAddress");
      form.setValue("permanentAddress.addressLine1", presentAddress.addressLine1);
      form.setValue("permanentAddress.country", presentAddress.country);
      form.setValue("permanentAddress.state", presentAddress.state);
      form.setValue("permanentAddress.city", presentAddress.city);
      form.setValue("permanentAddress.zipCode", presentAddress.zipCode);
    }
  };

  return (
    <div className="space-y-6">
      <div className="h-9 flex items-center justify-between">
        <h3 className="font-semibold text-[#1A1F2C]">Permanent Address</h3>
        <FormField
          control={form.control}
          name="sameAsPresent"
          render={({ field }) => (
            <div className="flex items-center gap-2">
              <Checkbox
                id="sameAsPresent"
                checked={field.value}
                onCheckedChange={(checked: boolean) => {
                  field.onChange(checked);
                  handleSameAsPresent(checked);
                }}
              />
              <label
                htmlFor="sameAsPresent"
                className="text-sm leading-none text-gray-700 cursor-pointer"
              >
                Same as present address
              </label>
            </div>
          )}
        />
      </div>
      <AddressFields 
        form={form} 
        prefix="permanentAddress" 
        disabled={form.watch("sameAsPresent")}
      />
    </div>
  );
};
