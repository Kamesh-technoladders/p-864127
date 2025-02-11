
import React, { useState } from "react";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { BasicInfoSection } from "./personal-details/BasicInfoSection";
import { AddressSection } from "./personal-details/AddressSection";
import { EmergencyContactsSection } from "./personal-details/EmergencyContactsSection";
import { FamilyDetailsSection } from "./personal-details/FamilyDetailsSection";
import { PersonalDetailsFormProps } from "./types";

interface EmergencyContact {
  relationship: string;
  name: string;
  phone: string;
}

interface FamilyMember {
  relationship: string;
  name: string;
  occupation: string;
  phone: string;
}

export const PersonalDetailsForm: React.FC<PersonalDetailsFormProps> = ({ onComplete, initialData }) => {
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([
    { relationship: "", name: "", phone: "" }
  ]);
  const [familyDetails, setFamilyDetails] = useState<FamilyMember[]>([
    { relationship: "", name: "", occupation: "", phone: "" }
  ]);

  const form = useForm({
    defaultValues: initialData || {}
  });

  const handleSubmit = form.handleSubmit((data) => {
    console.log('Form submitted:', { data, emergencyContacts, familyDetails });
    onComplete(true, data);
  });

  return (
    <div className="flex w-[622px] max-w-full flex-col text-sm font-medium ml-[15px]">
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <BasicInfoSection form={form} />
          
          <AddressSection form={form} />

          <EmergencyContactsSection
            contacts={emergencyContacts}
            onContactsChange={setEmergencyContacts}
          />

          <FamilyDetailsSection
            familyMembers={familyDetails}
            onFamilyMembersChange={setFamilyDetails}
          />

          <div className="flex justify-end pt-6">
            <Button type="submit" className="bg-[#DD0101] hover:bg-[#DD0101]/90">
              Save & Next
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
