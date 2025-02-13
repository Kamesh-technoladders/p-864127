
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface StateFieldProps {
  form: UseFormReturn<any>;
  prefix: string;
  disabled?: boolean;
}

export const StateField: React.FC<StateFieldProps> = ({ form, prefix, disabled }) => {
  return (
    <FormField
      control={form.control}
      name={`${prefix}.state`}
      render={({ field }) => (
        <FormItem className="space-y-2">
          <FormLabel className="text-[#1A1F2C] font-semibold">
            State<span className="text-[#DD0101]">*</span>
          </FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value} disabled={disabled}>
            <FormControl>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="karnataka">Karnataka</SelectItem>
              <SelectItem value="maharashtra">Maharashtra</SelectItem>
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
};
