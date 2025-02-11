
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { ProfileSection } from "./documents/ProfileSection";
import { AadharSection } from "./documents/AadharSection";
import { PanSection } from "./documents/PanSection";
import { EsicSection } from "./documents/EsicSection";
import { UanSection } from "./documents/UanSection";

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
      <ProfileSection
        form={form}
        handleUpload={handleUpload}
        profilePhoto={profilePhoto}
      />
      
      <AadharSection
        form={form}
        handleUpload={handleUpload}
        aadharFile={aadharFile}
      />
      
      <PanSection
        form={form}
        handleUpload={handleUpload}
        panFile={panFile}
      />
      
      <EsicSection
        form={form}
        handleUpload={handleUpload}
        esicFile={esicFile}
      />
      
      <UanSection
        form={form}
        handleUpload={handleUpload}
        uanFile={uanFile}
      />
    </div>
  );
};
