
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UploadField } from "../../UploadField";
import { UseFormReturn } from "react-hook-form";

interface UanSectionProps {
  form: UseFormReturn<any>;
  handleUpload: (file: File, type: string) => Promise<void>;
  uanFile: File | null;
}

export const UanSection: React.FC<UanSectionProps> = ({
  form,
  handleUpload,
  uanFile,
}) => {
  return (
    <div className="flex items-start gap-4">
      <div className="w-[300px]">
        <FormLabel className="block text-[#1A1F2C] font-semibold mb-2">
          UAN Number
        </FormLabel>
        <FormField
          control={form.control}
          name="uanNumber"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input 
                  {...field}
                  className="h-12 border-[#C8C8C9] focus:border-[#9b87f5]"
                  placeholder="Enter 12-digit UAN number"
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
          label="Upload UAN" 
          onUpload={(file) => handleUpload(file, "uan")}
          value={uanFile?.name}
        />
      </div>
    </div>
  );
};
