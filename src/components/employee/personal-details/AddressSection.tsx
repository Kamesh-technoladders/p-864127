
import React from "react";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";

interface AddressSectionProps {
  form: UseFormReturn<any>;
}

export const AddressSection: React.FC<AddressSectionProps> = ({ form }) => {
  return (
    <div>
      <div className="text-[rgba(48,64,159,1)] font-bold">Contact Info</div>
      <div className="text-[rgba(80,80,80,1)] text-xs mt-1">
        Add your address details here.
      </div>

      <div className="grid grid-cols-2 gap-8 mt-6">
        <div className="space-y-4">
          <h3 className="font-semibold text-[#1A1F2C]">Present Address</h3>
          <FormField
            control={form.control}
            name="presentAddress.addressLine1"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#1A1F2C] font-semibold">
                  Address Line 1<span className="text-[#DD0101]">*</span>
                </FormLabel>
                <FormControl>
                  <Input 
                    {...field}
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
              name="presentAddress.country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#1A1F2C] font-semibold">
                    Country<span className="text-[#DD0101]">*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
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
              name="presentAddress.state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#1A1F2C] font-semibold">
                    State<span className="text-[#DD0101]">*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
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
              name="presentAddress.city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#1A1F2C] font-semibold">
                    City<span className="text-[#DD0101]">*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
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
              name="presentAddress.zipCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#1A1F2C] font-semibold">
                    ZIP Code<span className="text-[#DD0101]">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input 
                      {...field}
                      className="h-12 border-[#C8C8C9] focus:border-[#9b87f5]"
                      placeholder="Enter ZIP code"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="space