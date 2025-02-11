
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AddressFieldsProps {
  form: UseFormReturn<any>;
  prefix: string;
  disabled?: boolean;
}

export const AddressFields: React.FC<AddressFieldsProps> = ({ form, prefix, disabled }) => {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name={`${prefix}.addressLine1`}
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel className="text-[#1A1F2C] font-semibold">
              Address Line 1<span className="text-[#DD0101]">*</span>
            </FormLabel>
            <FormControl>
              <Input 
                {...field}
                disabled={disabled}
                className="h-12 border-[#C8C8C9] focus:border-[#9b87f5]"
                placeholder="Enter address"
              />
            </FormControl>
          </FormItem>
        )}
      />

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name={`${prefix}.country`}
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-[#1A1F2C] font-semibold">
                Country<span className="text-[#DD0101]">*</span>
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value} disabled={disabled}>
                <FormControl>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="india">India</SelectItem>
                  <SelectItem value="usa">USA</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

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
      </div>

      <div className="grid grid-cols-2 gap-4">
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

        <FormField
          control={form.control}
          name={`${prefix}.zipCode`}
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-[#1A1F2C] font-semibold">
                ZIP Code<span className="text-[#DD0101]">*</span>
              </FormLabel>
              <FormControl>
                <Input 
                  {...field}
                  disabled={disabled}
                  className="h-12 border-[#C8C8C9] focus:border-[#9b87f5]"
                  placeholder="Enter ZIP code"
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
