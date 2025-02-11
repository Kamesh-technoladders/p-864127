
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
      <div>
        <div className="text-[rgba(48,64,159,1)] font-bold">Contact Info</div>
        <div className="text-[rgba(80,80,80,1)] text-xs mt-1">
          Add your address details here.
        </div>
      </div>

      <div className="grid grid-cols-2 gap-12">
        {/* Present Address */}
        <div className="space-y-6">
          <h3 className="font-semibold text-[#1A1F2C]">Present Address</h3>
          
          <FormField
            control={form.control}
            name="presentAddress.addressLine1"
            render={({ field }) => (
              <FormItem className="space-y-2">
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
                <FormItem className="space-y-2">
                  <FormLabel className="text-[#1A1F2C] font-semibold">
                    Country<span className="text-[#DD0101]">*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
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
              name="presentAddress.state"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-[#1A1F2C] font-semibold">
                    State<span className="text-[#DD0101]">*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
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
              name="presentAddress.city"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-[#1A1F2C] font-semibold">
                    City<span className="text-[#DD0101]">*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
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
              name="presentAddress.zipCode"
              render={({ field }) => (
                <FormItem className="space-y-2">
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

        {/* Permanent Address */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-[#1A1F2C]">Permanent Address</h3>
            <FormField
              control={form.control}
              name="sameAsPresent"
              render={({ field }) => (
                <div className="flex items-center space-x-2">
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
                    className="text-sm font-medium leading-none text-gray-700"
                  >
                    Same as present address
                  </label>
                </div>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="permanentAddress.addressLine1"
            render={({ field }) => (
              <FormItem className="space-y-2">
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
              name="permanentAddress.country"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-[#1A1F2C] font-semibold">
                    Country<span className="text-[#DD0101]">*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
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
              name="permanentAddress.state"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-[#1A1F2C] font-semibold">
                    State<span className="text-[#DD0101]">*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
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
              name="permanentAddress.city"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-[#1A1F2C] font-semibold">
                    City<span className="text-[#DD0101]">*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
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
              name="permanentAddress.zipCode"
              render={({ field }) => (
                <FormItem className="space-y-2">
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
      </div>
    </div>
  );
};

