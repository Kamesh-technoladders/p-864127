
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UploadField } from "../UploadField";
import { UseFormReturn } from "react-hook-form";
import { DocumentFormData } from "./documentValidation";

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
    <div className="space-y-6 mt-6">
      {/* Profile Picture Row */}
      <div className="flex items-start gap-4">
        <div className="w-[300px]">
          <FormLabel className="block text-[#1A1F2C] font-semibold mb-2">
            Profile Name<span className="text-[#DD0101]">*</span>
          </FormLabel>
          <FormField
            control={form.control}
            name="profileName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input 
                    {...field}
                    className="h-12 border-[#C8C8C9] focus:border-[#9b87f5]"
                    placeholder="Enter your profile name"
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
            label="Profile Picture" 
            required 
            onUpload={(file) => handleUpload(file, "profile")}
            showProgress
            value={profilePhoto?.name}
          />
        </div>
      </div>

      {/* Aadhar Row */}
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

      {/* PAN Row */}
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

      {/* ESIC Row */}
      <div className="flex items-start gap-4">
        <div className="w-[300px]">
          <FormLabel className="block text-[#1A1F2C] font-semibold mb-2">
            ESIC Number
          </FormLabel>
          <FormField
            control={form.control}
            name="esicNumber"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input 
                    {...field}
                    className="h-12 border-[#C8C8C9] focus:border-[#9b87f5]"
                    placeholder="Enter 17-digit ESIC number"
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
            label="Upload ESIC" 
            onUpload={(file) => handleUpload(file, "esic")}
            value={esicFile?.name}
          />
        </div>
      </div>

      {/* UAN Row */}
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
    </div>
  );
};
