
import React, { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { City } from "country-state-city";

interface CityFieldProps {
  form: UseFormReturn<any>;
  prefix: string;
  disabled?: boolean;
  countryCode?: string;
  stateCode?: string;
}

export const CityField: React.FC<CityFieldProps> = ({ 
  form, 
  prefix, 
  disabled,
  countryCode,
  stateCode 
}) => {
  const [cities, setCities] = useState<any[]>([]);

  useEffect(() => {
    const fetchCities = async () => {
      if (countryCode && stateCode) {
        const citiesList = City.getCitiesOfState(countryCode, stateCode);
        setCities(citiesList);
      } else {
        setCities([]);
      }
    };
    fetchCities();
  }, [countryCode, stateCode]);

  useEffect(() => {
    // Reset city value when state changes
    if (stateCode) {
      form.setValue(`${prefix}.city`, '');
    }
  }, [stateCode, form, prefix]);

  return (
    <FormField
      control={form.control}
      name={`${prefix}.city`}
      render={({ field }) => (
        <FormItem className="space-y-2">
          <FormLabel className="text-[#1A1F2C] font-semibold">
            City<span className="text-[#DD0101]">*</span>
          </FormLabel>
          <Select 
            onValueChange={field.onChange} 
            value={field.value}
            disabled={disabled || !stateCode}
          >
            <FormControl>
              <SelectTrigger className="h-12">
                <SelectValue placeholder={!stateCode ? "Select state first" : "Select city"} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {cities.map((city) => (
                <SelectItem key={city.name} value={city.name}>
                  {city.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
};
