
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UploadField } from "../../UploadField";
import { UseFormReturn } from "react-hook-form";

interface AadharSectionProps {
  form: UseFormReturn<any>;
  handleUpload: (file: File, type: string) => Promise<void>;
  aadharFile: File | null;
}

export const AadharSection: React.FC<AadharSectionProps> = ({
  form,
  handleUpload,
  aadharFile,
}) => {
  return (
    <div className="flex items-start gap-4">
      <div className="w-[300px]">
        <FormLabel className="block text-[#1A1F2C] font-semibold mb-2">
          Aadhar Number<span className="text-[#DD0101]">*</span>
        </FormLabel>
        <FormField
          control={form.control}
          name="aadharNumber"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input 
                  {...field}
                  className="h-12 border-[#C8C8C9] focus:border-[#9b87f5]"
                  placeholder="Enter 12-digit Aadhar number"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="w-[300px]">
        <div className="mb-2 invisible">Spacer</div>
        <UploadField 
          label="Upload Aadhar" 
          required 
          onUpload={(file) => handleUpload(file, "aadhar")}
          value={aadharFile?.name}
        />
      </div>
    </div>
  );
};
