
import React, { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { AddressFields } from "./AddressFields";
import { City, State } from "country-state-city";

interface PermanentAddressSectionProps {
  form: UseFormReturn<any>;
  showValidation?: boolean;
}

export const PermanentAddressSection: React.FC<PermanentAddressSectionProps> = ({ form, showValidation }) => {
  const handleSameAsPresent = async (checked: boolean) => {
    if (checked) {
      const presentAddress = form.getValues("presentAddress");
      
      // First set the country
      form.setValue("permanentAddress.country", presentAddress.country);
      
      // Wait for next render to ensure country is set
      await new Promise(resolve => setTimeout(resolve, 0));
      
      // Get states for the selected country
      const states = State.getStatesOfCountry(presentAddress.country);
      const stateExists = states.some(state => state.isoCode === presentAddress.state);
      
      if (stateExists) {
        // Set state if it exists for the selected country
        form.setValue("permanentAddress.state", presentAddress.state);
        
        // Wait for next render to ensure state is set
        await new Promise(resolve => setTimeout(resolve, 0));
        
        // Get cities for the selected state
        const cities = City.getCitiesOfState(presentAddress.country, presentAddress.state);
        const cityExists = cities.some(city => city.name === presentAddress.city);
        
        if (cityExists) {
          // Set city if it exists for the selected state
          form.setValue("permanentAddress.city", presentAddress.city);
        }
      }
      
      // Set other fields
      form.setValue("permanentAddress.addressLine1", presentAddress.addressLine1);
      form.setValue("permanentAddress.zipCode", presentAddress.zipCode);
    }
  };

  // Reset permanent address fields when unchecking
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "sameAsPresent" && !value.sameAsPresent) {
        form.setValue("permanentAddress.addressLine1", "");
        form.setValue("permanentAddress.country", "");
        form.setValue("permanentAddress.state", "");
        form.setValue("permanentAddress.city", "");
        form.setValue("permanentAddress.zipCode", "");
      }
    });

    return () => subscription.unsubscribe();
  }, [form]);

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
        showValidation={showValidation}
      />
    </div>
  );
};
