
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UploadField } from "./UploadField";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface PersonalDetailsFormProps {
  onComplete: (completed: boolean) => void;
}

interface PersonalDetailsFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  emergencyContactRelation: string;
}

export const PersonalDetailsForm: React.FC<PersonalDetailsFormProps> = ({ onComplete }) => {
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const form = useForm<PersonalDetailsFormData>();

  useEffect(() => {
    const isComplete = !!profilePhoto && Object.keys(form.getValues()).every(
      (key) => !!form.getValues()[key as keyof PersonalDetailsFormData]
    );
    onComplete(isComplete);
  }, [profilePhoto, form, onComplete]);

  const handleUpload = async (file: File) => {
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        setProfilePhoto(file);
        resolve();
      }, 2000);
    });
  };

  return (
    <div className="flex flex-col w-full max-w-[1024px] mx-auto px-6 py-8">
      <div className="text-[rgba(48,64,159,1)] text-xl font-bold mb-2">
        Personal Details
      </div>
      <div className="text-[rgba(80,80,80,1)] text-sm mb-8">
        Add your personal information and photo.
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Profile Photo Section */}
        <div className="col-span-full">
          <UploadField 
            label="Profile Photo" 
            required 
            onUpload={handleUpload} 
            showProgress
            value={profilePhoto?.name}
          />
        </div>

        {/* Basic Information */}
        <Form {...form}>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6 col-span-full">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#1A1F2C] font-semibold">
                    First Name<span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      className="h-12 border-[#C8C8C9] focus:border-[#9b87f5]"
                      placeholder="Enter your first name"
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
                    Last Name<span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      className="h-12 border-[#C8C8C9] focus:border-[#9b87f5]"
                      placeholder="Enter your last name"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#1A1F2C] font-semibold">
                    Email Address<span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      type="email"
                      className="h-12 border-[#C8C8C9] focus:border-[#9b87f5]"
                      placeholder="Enter your email address"
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
                    Phone Number<span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      type="tel"
                      className="h-12 border-[#C8C8C9] focus:border-[#9b87f5]"
                      placeholder="Enter your phone number"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#1A1F2C] font-semibold">
                    Date of Birth<span className="text-red-600">*</span>
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

            <div className="col-span-full">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#1A1F2C] font-semibold">
                      Current Address<span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        className="h-12 border-[#C8C8C9] focus:border-[#9b87f5]"
                        placeholder="Enter your current address"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* Emergency Contact Section */}
            <div className="col-span-full mt-4">
              <h3 className="text-lg font-semibold text-[#1A1F2C] mb-4">
                Emergency Contact Details
              </h3>
            </div>

            <FormField
              control={form.control}
              name="emergencyContactName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#1A1F2C] font-semibold">
                    Contact Name<span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      className="h-12 border-[#C8C8C9] focus:border-[#9b87f5]"
                      placeholder="Enter emergency contact name"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="emergencyContactNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#1A1F2C] font-semibold">
                    Contact Number<span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      type="tel"
                      className="h-12 border-[#C8C8C9] focus:border-[#9b87f5]"
                      placeholder="Enter emergency contact number"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="emergencyContactRelation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#1A1F2C] font-semibold">
                    Relationship<span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        {...field} 
                        className="h-12 border-[#C8C8C9] focus:border-[#9b87f5] pr-10"
                        placeholder="Select relationship"
                      />
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </div>
  );
};
