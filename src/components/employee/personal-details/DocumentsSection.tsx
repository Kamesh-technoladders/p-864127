
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UploadField } from "../UploadField";
import { UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DocumentFormData, documentSchema } from "./documentValidation";

interface DocumentsSectionProps {
  form: UseFormReturn<any>;
  handleUpload: (file: File, type: string) => Promise<void>;
  profilePhoto: File | null;
  aadharFile: File | null;
  panFile: File | null;
  esicFile: File | null;
  uanFile: File | null;
}

export const DocumentsSection: React.FC<DocumentsSectionProps> = ({
  form,
  handleUpload,
  profilePhoto,
  aadharFile,
  panFile,
  esicFile,
  uanFile,
}) => {
  return (
    <div className="space-y-4 mt-6">
      <UploadField 
        label="Profile Picture" 
        required 
        onUpload={(file) => handleUpload(file, "profile")}
        showProgress
        value={profilePhoto?.name}
      />

      <div className="grid grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="aadharNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#1A1F2C] font-semibold">
                Aadhar Number<span className="text-[#DD0101]">*</span>
              </FormLabel>
              <div className="space-y-2">
                <FormControl>
                  <Input 
                    {...field}
                    className="h-12 border-[#C8C8C9] focus:border-[#9b87f5]"
                    placeholder="Enter 12-digit Aadhar number"
                  />
                </FormControl>
                <FormMessage />
                <UploadField 
                  label="Upload Aadhar" 
                  required 
                  onUpload={(file) => handleUpload(file, "aadhar")}
                  value={aadharFile?.name}
                />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="panNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#1A1F2C] font-semibold">
                PAN Number<span className="text-[#DD0101]">*</span>
              </FormLabel>
              <div className="space-y-2">
                <FormControl>
                  <Input 
                    {...field}
                    className="h-12 border-[#C8C8C9] focus:border-[#9b87f5]"
                    placeholder="Enter PAN number (ABCDE1234F)"
                  />
                </FormControl>
                <FormMessage />
                <UploadField 
                  label="Upload PAN" 
                  required 
                  onUpload={(file) => handleUpload(file, "pan")}
                  value={panFile?.name}
                />
              </div>
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="esicNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#1A1F2C] font-semibold">
                ESIC Number
              </FormLabel>
              <div className="space-y-2">
                <FormControl>
                  <Input 
                    {...field}
                    className="h-12 border-[#C8C8C9] focus:border-[#9b87f5]"
                    placeholder="Enter 17-digit ESIC number"
                  />
                </FormControl>
                <FormMessage />
                <UploadField 
                  label="Upload ESIC" 
                  onUpload={(file) => handleUpload(file, "esic")}
                  value={esicFile?.name}
                />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="uanNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#1A1F2C] font-semibold">
                UAN Number
              </FormLabel>
              <div className="space-y-2">
                <FormControl>
                  <Input 
                    {...field}
                    className="h-12 border-[#C8C8C9] focus:border-[#9b87f5]"
                    placeholder="Enter 12-digit UAN number"
                  />
                </FormControl>
                <FormMessage />
                <UploadField 
                  label="Upload UAN" 
                  onUpload={(file) => handleUpload(file, "uan")}
                  value={uanFile?.name}
                />
              </div>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
