
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UploadField } from "../../UploadField";
import { UseFormReturn } from "react-hook-form";

interface PanSectionProps {
  form: UseFormReturn<any>;
  handleUpload: (file: File, type: string) => Promise<void>;
  panFile: File | null;
}

export const PanSection: React.FC<PanSectionProps> = ({
  form,
  handleUpload,
  panFile,
}) => {
  return (
    <div className="flex items-start gap-4">
      <div className="w-[300px]">
        <FormLabel className="block text-[#1A1F2C] font-semibold mb-2">
          PAN Number<span className="text-[#DD0101]">*</span>
        </FormLabel>
        <FormField
          control={form.control}
          name="panNumber"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input 
                  {...field}
                  className="h-12 border-[#C8C8C9] focus:border-[#9b87f5]"
                  placeholder="Enter PAN number (ABCDE1234F)"
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
          label="Upload PAN" 
          required 
          onUpload={(file) => handleUpload(file, "pan")}
          value={panFile?.name}
        />
      </div>
    </div>
  );
};
