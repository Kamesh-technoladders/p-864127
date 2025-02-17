
import React from "react";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { BasicInfoSection } from "./personal-details/BasicInfoSection";
import { AddressSection } from "./personal-details/AddressSection";
import { EmergencyContactsSection } from "./personal-details/EmergencyContactsSection";
import { FamilyDetailsSection } from "./personal-details/FamilyDetailsSection";
import { PersonalDetailsFormProps } from "./types";
import { zodResolver } from "@hookform/resolvers/zod";
import { personalDetailsSchema, PersonalDetailsFormSchema } from "./personal-details/schema/personalDetailsSchema";
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

  const form = useForm<PersonalDetailsFormSchema>({
    defaultValues: {
      profilePictureUrl: initialData?.profilePictureUrl || "",
      employeeId: initialData?.employeeId || "",
      firstName: initialData?.firstName || "",
      lastName: initialData?.lastName || "",
      email: initialData?.email || "",
      phone: initialData?.phone || "",
      dateOfBirth: initialData?.dateOfBirth ? new Date(initialData.dateOfBirth) : undefined,
      bloodGroup: initialData?.bloodGroup as any || undefined,
      maritalStatus: initialData?.maritalStatus as any || undefined,
      aadharNumber: initialData?.aadharNumber || "",
      aadharUrl: initialData?.aadharUrl || "",
      panNumber: initialData?.panNumber || "",
      panUrl: initialData?.panUrl || "",
      uanNumber: initialData?.uanNumber || "",
      uanUrl: initialData?.uanUrl || "",
      esicNumber: initialData?.esicNumber || "",
      esicUrl: initialData?.esicUrl || "",
      presentAddress: initialData?.presentAddress || defaultAddressValues,
      permanentAddress: initialData?.permanentAddress || defaultAddressValues,
      sameAsPresent: false
    },
    resolver: zodResolver(personalDetailsSchema)
  });

  const handleSubmit = form.handleSubmit((data) => {
    console.log('Form data before validation:', data);
    
    const validation = validateForm(
      emergencyContacts,
      familyDetails,
      setEmergencyContacts,
      setFamilyDetails
    );
    
    if (!validation.isValid) {
      validation.errors.forEach(error => toast.error(error));
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
      employeeId: data.employeeId.trim(),
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      email: data.email.trim(),
      phone: data.phone.trim(),
      dateOfBirth: data.dateOfBirth?.toISOString(),
      gender: data.gender,
      bloodGroup: data.bloodGroup,
      maritalStatus: data.maritalStatus,
      aadharNumber: data.aadharNumber.trim(),
      aadharUrl: data.aadharUrl,
      panNumber: data.panNumber.trim(),
      panUrl: data.panUrl,
      uanNumber: data.uanNumber.trim(),
      uanUrl: data.uanUrl,
      esicNumber: data.esicNumber.trim(),
      esicUrl: data.esicUrl,
      emergencyContacts: validEmergencyContacts,
      familyDetails: validFamilyDetails,
      documents,
      profilePictureUrl: data.profilePictureUrl,
      presentAddress: {
        addressLine1: data.presentAddress.addressLine1.trim(),
        country: data.presentAddress.country.trim(),
        state: data.presentAddress.state.trim(),
        city: data.presentAddress.city.trim(),
        zipCode: data.presentAddress.zipCode.trim()
      },
      permanentAddress: data.permanentAddress ? {
        addressLine1: data.permanentAddress.addressLine1.trim(),
        country: data.permanentAddress.country.trim(),
        state: data.permanentAddress.state.trim(),
        city: data.permanentAddress.city.trim(),
        zipCode: data.permanentAddress.zipCode.trim()
      } : undefined
    };

    console.log('Form submitted:', formData);
    onComplete(true, formData);
  });

  return (
    <Form {...form}>
      <form id="personalDetailsForm" onSubmit={handleSubmit} className="space-y-6">
        <BasicInfoSection
          register={form}
          errors={form.formState.errors}
          isCheckingEmail={isCheckingEmail}
          emailError={emailError}
          profilePictureUrl={form.watch("profilePictureUrl")}
          onProfilePictureChange={(url) => form.setValue("profilePictureUrl", url)}
          onProfilePictureDelete={async () => {
            form.setValue("profilePictureUrl", "");
            return Promise.resolve();
          }}
          documents={documents}
          onDocumentsChange={setDocuments}
          setValue={form.setValue}
          watch={form.watch}
        />
        
        <div className="pt-2">
          <AddressSection form={form} />
        </div>

        <div className="pt-2">
          <EmergencyContactsSection
            contacts={emergencyContacts}
            onContactsChange={setEmergencyContacts}
            maritalStatus={form.watch("maritalStatus")}
          />
        </div>

        <div className="pt-2">
          <FamilyDetailsSection
            familyMembers={familyDetails}
            onFamilyMembersChange={setFamilyDetails}
            maritalStatus={form.watch("maritalStatus")}
          />
        </div>
      </form>
    </Form>
  );
};
