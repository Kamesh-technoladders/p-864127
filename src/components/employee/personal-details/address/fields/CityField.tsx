
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CityFieldProps {
  form: UseFormReturn<any>;
  prefix: string;
  disabled?: boolean;
}

export const CityField: React.FC<CityFieldProps> = ({ form, prefix, disabled }) => {
  return (
    <FormField
      control={form.control}
      name={`${prefix}.city`}
      render={({ field }) => (
        <FormItem className="space-y-2">
          <FormLabel className="text-[#1A1F2C] font-semibold">
            City<span className="text-[#DD0101]">*</span>
          </FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value} disabled={disabled}>
            <FormControl>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="bangalore">Bangalore</SelectItem>
              <SelectItem value="mumbai">Mumbai</SelectItem>
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
};
