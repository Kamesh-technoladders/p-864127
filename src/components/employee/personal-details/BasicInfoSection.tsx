
import React from "react";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";

const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

interface BasicInfoSectionProps {
  form: UseFormReturn<any>;
}

export const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({ form }) => {
  return (
    <div>
      <div className="text-[rgba(48,64,159,1)] font-bold">Basic Info</div>
      <div className="text-[rgba(80,80,80,1)] text-xs mt-1">
        Add your personal information here.
      </div>

      <div className="mt-6">
        <FormField
          control={form.control}
          name="employeeId"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#1A1F2C] font-semibold">
                Employee ID<span className="text-[#DD0101]">*</span>
              </FormLabel>
              <FormControl>
                <Input 
                  {...field}
                  className="h-12 border-[#C8C8C9] focus:border-[#9b87f5]"
                  placeholder="Enter employee ID"
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-2 gap-6 mt-6">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#1A1F2C] font-semibold">
                First Name<span className="text-[#DD0101]">*</span>
              </FormLabel>
              <FormControl>
                <Input 
                  {...field}
                  className="h-12 border-[#C8C8C9] focus:border-[#9b87f5]"
                  placeholder="Enter first name"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#1A1F2C] font-semibold">
                Last Name<span className="text-[#DD0101]">*</span>
              </FormLabel>
              <FormControl>
                <Input 
                  {...field}
                  className="h-12 border-[#C8C8C9] focus:border-[#9b87f5]"
                  placeholder="Enter last name"
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-2 gap-6 mt-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#1A1F2C] font-semibold">
                Email<span className="text-[#DD0101]">*</span>
              </FormLabel>
              <FormControl>
                <Input 
                  {...field}
                  type="email"
                  className="h-12 border-[#C8C8C9] focus:border-[#9b87f5]"
                  placeholder="Enter email address"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#1A1F2C] font-semibold">
                Phone Number<span className="text-[#DD0101]">*</span>
              </FormLabel>
              <div className="flex gap-2">
                <Select>
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="+91" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="+91">+91</SelectItem>
                    <SelectItem value="+1">+1</SelectItem>
                  </SelectContent>
                </Select>
                <FormControl>
                  <Input 
                    {...field}
                    type="tel"
                    className="h-12 border-[#C8C8C9] focus:border-[#9b87f5]"
                    placeholder="Enter phone number"
                  />
                </FormControl>
              </div>
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-3 gap-6 mt-6">
        <FormField
          control={form.control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#1A1F2C] font-semibold">
                Date of Birth<span className="text-[#DD0101]">*</span>
              </FormLabel>
              <FormControl>
                <Input 
                  {...field}
                  type="date"
                  className="h-12 border-[#C8C8C9] focus:border-[#9b87f5]"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#1A1F2C] font-semibold">
                Gender<span className="text-[#DD0101]">*</span>
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bloodGroup"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#1A1F2C] font-semibold">
                Blood Group<span className="text-[#DD0101]">*</span>
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select blood group" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {bloodGroups.map((group) => (
                    <SelectItem key={group} value={group}>
                      {group}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
      </div>

      <div className="mt-6">
        <FormField
          control={form.control}
          name="maritalStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#1A1F2C] font-semibold">
                Marital Status<span className="text-[#DD0101]">*</span>
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="married" id="married" />
                    <Label htmlFor="married">Married</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="unmarried" id="unmarried" />
                    <Label htmlFor="unmarried">Unmarried</Label>
                  </div>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
