
import React, { useState } from "react";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { BasicInfoSection } from "./personal-details/BasicInfoSection";
import { AddressSection } from "./personal-details/AddressSection";
import { EmergencyContactsSection } from "./personal-details/EmergencyContactsSection";
import { FamilyDetailsSection } from "./personal-details/FamilyDetailsSection";
import { PersonalDetailsFormProps } from "./types";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

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

const addressSchema = z.object({
  addressLine1: z.string().min(1, "Address is required"),
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  zipCode: z.string().min(1, "ZIP code is required")
});

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
  presentAddress: addressSchema,
  permanentAddress: addressSchema,
  sameAsPresent: z.boolean().optional()
});

const validateEmergencyContact = (contact: EmergencyContact) => {
  return (
    contact.relationship.trim() !== "" &&
    contact.name.trim() !== "" &&
    contact.phone.trim() !== ""
  );
};

const validateFamilyMember = (member: FamilyMember) => {
  return (
    member.relationship.trim() !== "" &&
    member.name.trim() !== "" &&
    member.occupation.trim() !== "" &&
    member.phone.trim() !== ""
  );
};

export const PersonalDetailsForm: React.FC<PersonalDetailsFormProps> = ({ onComplete, initialData }) => {
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([
    { relationship: "", name: "", phone: "" }
  ]);
  const [familyDetails, setFamilyDetails] = useState<FamilyMember[]>([
    { relationship: "", name: "", occupation: "", phone: "" }
  ]);

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

  const validateForm = () => {
    // Validate emergency contacts
    const hasValidEmergencyContact = emergencyContacts.some(validateEmergencyContact);
    if (!hasValidEmergencyContact) {
      toast.error("Please add at least one emergency contact with all fields filled");
      return false;
    }

    // Check for incomplete emergency contacts
    const hasIncompleteEmergencyContact = emergencyContacts.some(
      contact => 
        (contact.relationship || contact.name || contact.phone) && 
        !validateEmergencyContact(contact)
    );
    if (hasIncompleteEmergencyContact) {
      toast.error("Please complete all fields for emergency contacts or remove incomplete ones");
      return false;
    }

    // Validate family members
    const hasValidFamilyMember = familyDetails.some(validateFamilyMember);
    if (!hasValidFamilyMember) {
      toast.error("Please add at least one family member with all fields filled");
      return false;
    }

    // Check for incomplete family members
    const hasIncompleteFamilyMember = familyDetails.some(
      member => 
        (member.relationship || member.name || member.occupation || member.phone) && 
        !validateFamilyMember(member)
    );
    if (hasIncompleteFamilyMember) {
      toast.error("Please complete all fields for family members or remove incomplete ones");
      return false;
    }

    return true;
  };

  const handleSubmit = form.handleSubmit((data) => {
    const formIsValid = validateForm();
    if (!formIsValid) {
      onComplete(false);
      return;
    }

    // Filter out empty contacts and family members
    const validEmergencyContacts = emergencyContacts.filter(validateEmergencyContact);
    const validFamilyMembers = familyDetails.filter(validateFamilyMember);

    const formData = {
      ...data,
      emergencyContacts: validEmergencyContacts,
      familyDetails: validFamilyMembers
    };

    console.log('Form submitted:', formData);
    onComplete(true, formData);
  });

  return (
    <div className="flex w-[622px] max-w-full flex-col text-sm font-medium ml-[15px]">
      <Form {...form}>
        <form id="personalDetailsForm" onSubmit={handleSubmit} className="space-y-6">
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
        </form>
      </Form>
    </div>
  );
};
