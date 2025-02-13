
import React, { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { State } from "country-state-city";

interface StateFieldProps {
  form: UseFormReturn<any>;
  prefix: string;
  disabled?: boolean;
  countryCode?: string;
}

export const StateField: React.FC<StateFieldProps> = ({ form, prefix, disabled, countryCode }) => {
  const [states, setStates] = useState<any[]>([]);

  useEffect(() => {
    const fetchStates = async () => {
      if (countryCode) {
        const statesList = State.getStatesOfCountry(countryCode);
        setStates(statesList);
      } else {
        setStates([]);
      }
    };
    fetchStates();
  }, [countryCode]);

  useEffect(() => {
    // Reset state value when country changes
    if (countryCode) {
      form.setValue(`${prefix}.state`, '');
    }
  }, [countryCode, form, prefix]);

  return (
    <FormField
      control={form.control}
      name={`${prefix}.state`}
      render={({ field }) => (
        <FormItem className="space-y-2">
          <FormLabel className="text-[#1A1F2C] font-semibold">
            State<span className="text-[#DD0101]">*</span>
          </FormLabel>
          <Select 
            onValueChange={field.onChange} 
            value={field.value}
            disabled={disabled || !countryCode}
          >
            <FormControl>
              <SelectTrigger className="h-12">
                <SelectValue placeholder={!countryCode ? "Select country first" : "Select state"} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {states.map((state) => (
                <SelectItem key={state.isoCode} value={state.isoCode}>
                  {state.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
};
