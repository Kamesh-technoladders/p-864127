
import React, { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Country } from "country-state-city";

interface CountryFieldProps {
  form: UseFormReturn<any>;
  prefix: string;
  disabled?: boolean;
  onCountryChange?: (countryCode: string) => void;
}

export const CountryField: React.FC<CountryFieldProps> = ({ form, prefix, disabled, onCountryChange }) => {
  const [countries, setCountries] = useState<any[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      const allCountries = Country.getAllCountries();
      setCountries(allCountries);
    };
    fetchCountries();
  }, []);

  return (
    <FormField
      control={form.control}
      name={`${prefix}.country`}
      render={({ field }) => (
        <FormItem className="space-y-2">
          <FormLabel className="text-[#1A1F2C] font-semibold">
            Country<span className="text-[#DD0101]">*</span>
          </FormLabel>
          <Select 
            onValueChange={(value) => {
              field.onChange(value);
              onCountryChange?.(value);
            }} 
            value={field.value} 
            disabled={disabled}
          >
            <FormControl>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country.isoCode} value={country.isoCode}>
                  {country.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
};
