
import React, { useState, useEffect } from "react";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { BasicInfoSection } from "./personal-details/BasicInfoSection";
import { AddressSection } from "./personal-details/AddressSection";
import { EmergencyContactsSection } from "./personal-details/EmergencyContactsSection";
import { FamilyDetailsSection } from "./personal-details/FamilyDetailsSection";
import { DocumentUploadSection } from "./personal-details/DocumentUploadSection";
import { PersonalDetailsFormProps, EmergencyContact, FamilyMember } from "./types";
import { Document } from "@/services/types/employee.types";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const personalDetailsSchema = z.object({
  employeeId: z.string().min(1, "Employee ID is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.string().min(1, "Gender is required"),
  bloodGroup: z.string().min(1, "Blood group is required"),
  maritalStatus: z.string().min(1, "Marital status is required"),
  presentAddress: z.object({
    addressLine1: z.string().min(1, "Address is required"),
    country: z.string().min(1, "Country is required"),
    state: z.string().min(1, "State is required"),
    city: z.string().min(1, "City is required"),
    zipCode: z.string().min(1, "ZIP code is required")
  }),
  permanentAddress: z.object({
    addressLine1: z.string().min(1, "Address is required"),
    country: z.string().min(1, "Country is required"),
    state: z.string().min(1, "State is required"),
    city: z.string().min(1, "City is required"),
    zipCode: z.string().min(1, "ZIP code is required")
  }),
  sameAsPresent: z.boolean().optional()
});

export const PersonalDetailsForm: React.FC<PersonalDetailsFormProps> = ({ 
  onComplete, 
  initialData,
  isCheckingEmail,
  emailError,
  isSubmitting
}) => {
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([]);
  const [familyDetails, setFamilyDetails] = useState<FamilyMember[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {
    if (initialData) {
      setEmergencyContacts(
        initialData.emergencyContacts && initialData.emergencyContacts.length > 0
          ? initialData.emergencyContacts
          : [{ relationship: "", name: "", phone: "" }]
      );

      setFamilyDetails(
        initialData.familyDetails && initialData.familyDetails.length > 0
          ? initialData.familyDetails
          : [{ relationship: "", name: "", occupation: "", phone: "" }]
      );
    }
  }, [initialData]);

  const form = useForm({
    defaultValues: {
      ...initialData,
      presentAddress: initialData?.presentAddress || {
        addressLine1: "",
        country: "",
        state: "",
        city: "",
        zipCode: ""
      },
      permanentAddress: initialData?.permanentAddress || {
        addressLine1: "",
        country: "",
        state: "",
        city: "",
        zipCode: ""
      },
      sameAsPresent: false
    },
    resolver: zodResolver(personalDetailsSchema)
  });

  const handleSubmit = form.handleSubmit((data) => {
    if (!validateForm()) {
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
      documents
    };

    console.log('Form submitted:', formData);
    onComplete(true, formData);
  });

  const validateForm = () => {
    const hasValidEmergencyContact = emergencyContacts.some(
      contact => 
        contact.name.trim() !== "" && 
        contact.relationship.trim() !== "" && 
        contact.phone.trim() !== ""
    );

    const hasValidFamilyMember = familyDetails.some(
      member => 
        member.name.trim() !== "" && 
        member.relationship.trim() !== "" && 
        member.occupation.trim() !== "" && 
        member.phone.trim() !== ""
    );

    if (!hasValidEmergencyContact) {
      setEmergencyContacts(contacts => 
        contacts.filter(contact => 
          contact.name.trim() !== "" || 
          contact.relationship.trim() !== "" || 
          contact.phone.trim() !== ""
        )
      );
    }

    if (!hasValidFamilyMember) {
      setFamilyDetails(members => 
        members.filter(member => 
          member.name.trim() !== "" || 
          member.relationship.trim() !== "" || 
          member.occupation.trim() !== "" || 
          member.phone.trim() !== ""
        )
      );
    }

    return true;
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
