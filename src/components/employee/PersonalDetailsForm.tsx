
import React from "react";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { BasicInfoSection } from "./personal-details/BasicInfoSection";
import { AddressSection } from "./personal-details/AddressSection";
import { EmergencyContactsSection } from "./personal-details/EmergencyContactsSection";
import { FamilyDetailsSection } from "./personal-details/FamilyDetailsSection";
import { DocumentUploadSection } from "./personal-details/DocumentUploadSection";
import { PersonalDetailsFormProps } from "./types";
import { zodResolver } from "@hookform/resolvers/zod";
import { personalDetailsSchema } from "./personal-details/schema/personalDetailsSchema";
import { useFormValidation } from "./personal-details/hooks/useFormValidation";
import { useFormInitialization } from "./personal-details/hooks/useFormInitialization";
import { toast } from "sonner";

export const PersonalDetailsForm: React.FC<PersonalDetailsFormProps> = ({ 
  onComplete, 
  initialData,
  isCheckingEmail,
  emailError,
  isSubmitting
}) => {
  const { validateForm } = useFormValidation();
  const {
    emergencyContacts,
    setEmergencyContacts,
    familyDetails,
    setFamilyDetails,
    documents,
    setDocuments
  } = useFormInitialization(initialData);

  const defaultAddressValues = {
    addressLine1: "",
    country: "",
    state: "",
    city: "",
    zipCode: ""
  };

  const form = useForm({
    defaultValues: {
      ...initialData,
      profilePictureUrl: initialData?.profilePictureUrl || "",
      presentAddress: initialData?.presentAddress || defaultAddressValues,
      permanentAddress: initialData?.permanentAddress || defaultAddressValues,
      sameAsPresent: false
    },
    resolver: zodResolver(personalDetailsSchema)
  });

  const handleSubmit = form.handleSubmit((data) => {
    // Validate both emergency contacts and family details
    const isValid = validateForm(emergencyContacts, familyDetails, setEmergencyContacts, setFamilyDetails);
    
    if (!isValid) {
      toast.error("Please add at least one emergency contact and one family member");
      onComplete(false);
      return;
    }

    const validEmergencyContacts = emergencyContacts.filter(
      contact => 
        contact.name.trim() !== "" && 
        contact.relationship.trim() !== "" && 
        contact.phone.trim() !== ""
    );

    const validFamilyDetails = familyDetails.filter(
      member => 
        member.name.trim() !== "" && 
        member.relationship.trim() !== "" && 
        member.occupation.trim() !== "" && 
        member.phone.trim() !== ""
    );

    const formData = {
      ...data,
      emergencyContacts: validEmergencyContacts,
      familyDetails: validFamilyDetails,
      documents,
      profilePictureUrl: data.profilePictureUrl,
      // Ensure address data is properly structured
      presentAddress: {
        addressLine1: data.presentAddress.addressLine1,
        country: data.presentAddress.country,
        state: data.presentAddress.state,
        city: data.presentAddress.city,
        zipCode: data.presentAddress.zipCode
      },
      permanentAddress: {
        addressLine1: data.permanentAddress.addressLine1,
        country: data.permanentAddress.country,
        state: data.permanentAddress.state,
        city: data.permanentAddress.city,
        zipCode: data.permanentAddress.zipCode
      }
    };

    console.log('Form submitted:', formData);
    onComplete(true, formData);
  });

  const handleProfilePictureDelete = async (): Promise<void> => {
    return new Promise<void>((resolve) => {
      form.setValue("profilePictureUrl", "");
      toast.success("Profile picture deleted successfully");
      resolve();
    });
  };

  return (
    <div className="flex w-[622px] max-w-full flex-col text-sm font-medium ml-[15px]">
      <Form {...form}>
        <form id="personalDetailsForm" onSubmit={handleSubmit} className="space-y-6">
          <BasicInfoSection
            register={form}
            errors={form.formState.errors}
            isCheckingEmail={isCheckingEmail}
            emailError={emailError}
            profilePictureUrl={form.watch("profilePictureUrl")}
            onProfilePictureChange={(url) => form.setValue("profilePictureUrl", url)}
            onProfilePictureDelete={handleProfilePictureDelete}
          />
          
          <div className="pt-2">
            <DocumentUploadSection
              form={form}
              documents={documents}
              onDocumentsChange={setDocuments}
            />
          </div>

          <div className="pt-2">
            <AddressSection form={form} />
          </div>

          <div className="pt-2">
            <EmergencyContactsSection
              contacts={emergencyContacts}
              onContactsChange={setEmergencyContacts}
            />
          </div>

          <div className="pt-2">
            <FamilyDetailsSection
              familyMembers={familyDetails}
              onFamilyMembersChange={setFamilyDetails}
            />
          </div>
        </form>
      </Form>
    </div>
  );
};
