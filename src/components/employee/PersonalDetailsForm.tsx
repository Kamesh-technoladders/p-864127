
import React, { useState, useEffect } from "react";
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
  addressLine1: z.string().min(1, "Please enter address"),
  country: z.string().min(1, "Please select country"),
  state: z.string().min(1, "Please select state"),
  city: z.string().min(1, "Please select city"),
  zipCode: z.string().min(1, "Please enter ZIP code")
});

const personalDetailsSchema = z.object({
  employeeId: z.string().min(1, "Please enter Employee ID"),
  firstName: z.string().min(1, "Please enter First Name"),
  lastName: z.string().min(1, "Please enter Last Name"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number (min. 10 digits)"),
  dateOfBirth: z.string().min(1, "Please select Date of Birth"),
  gender: z.string().min(1, "Please select Gender"),
  bloodGroup: z.string().min(1, "Please select Blood Group"),
  maritalStatus: z.string().min(1, "Please select Marital Status"),
  presentAddress: addressSchema,
  permanentAddress: addressSchema,
  sameAsPresent: z.boolean().optional()
});

export const PersonalDetailsForm: React.FC<PersonalDetailsFormProps> = ({ onComplete, initialData }) => {
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([
    { relationship: "", name: "", phone: "" }
  ]);
  const [familyDetails, setFamilyDetails] = useState<FamilyMember[]>([
    { relationship: "", name: "", occupation: "", phone: "" }
  ]);
  const [showValidation, setShowValidation] = useState(false);
  const [emergencyContactErrors, setEmergencyContactErrors] = useState<string[][]>([]);
  const [familyDetailErrors, setFamilyDetailErrors] = useState<string[][]>([]);

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
    resolver: zodResolver(personalDetailsSchema),
    mode: "onChange"
  });

  useEffect(() => {
    if (showValidation) {
      const errors = emergencyContacts.map(contact => validateEmergencyContact(contact));
      setEmergencyContactErrors(errors);
    }
  }, [emergencyContacts, showValidation]);

  useEffect(() => {
    if (showValidation) {
      const errors = familyDetails.map(member => validateFamilyMember(member));
      setFamilyDetailErrors(errors);
    }
  }, [familyDetails, showValidation]);

  const validateEmergencyContact = (contact: EmergencyContact): string[] => {
    const errors: string[] = [];
    if (!contact.relationship.trim()) errors.push("Please select relationship");
    if (!contact.name.trim()) errors.push("Please enter contact name");
    if (!contact.phone.trim()) errors.push("Please enter contact phone number");
    return errors;
  };

  const validateFamilyMember = (member: FamilyMember): string[] => {
    const errors: string[] = [];
    if (!member.relationship.trim()) errors.push("Please select relationship");
    if (!member.name.trim()) errors.push("Please enter family member name");
    if (!member.occupation.trim()) errors.push("Please enter occupation");
    if (!member.phone.trim()) errors.push("Please enter phone number");
    return errors;
  };

  const validateForm = () => {
    setShowValidation(true);

    console.log('Validating form...');
    console.log('Form errors:', form.formState.errors);
    console.log('Emergency contacts:', emergencyContacts);
    console.log('Family details:', familyDetails);

    // Validate emergency contacts
    const emergencyErrors = emergencyContacts.map(contact => validateEmergencyContact(contact));
    setEmergencyContactErrors(emergencyErrors);
    const hasValidEmergencyContact = emergencyContacts.some(contact => validateEmergencyContact(contact).length === 0);
    
    if (!hasValidEmergencyContact) {
      toast.error("Please add at least one complete emergency contact");
      return false;
    }

    // Validate family members
    const familyErrors = familyDetails.map(member => validateFamilyMember(member));
    setFamilyDetailErrors(familyErrors);
    const hasValidFamilyMember = familyDetails.some(member => validateFamilyMember(member).length === 0);
    
    if (!hasValidFamilyMember) {
      toast.error("Please add at least one complete family member");
      return false;
    }

    const hasErrors = Object.keys(form.formState.errors).length > 0;
    if (hasErrors) {
      // Show specific field errors
      Object.entries(form.formState.errors).forEach(([key, value]) => {
        if (typeof value === 'object' && value?.message) {
          toast.error(value.message as string);
        }
      });
      return false;
    }

    return true;
  };

  const handleSubmit = form.handleSubmit((data) => {
    console.log('Form submitted with data:', data);
    const formIsValid = validateForm();
    if (!formIsValid) {
      onComplete(false);
      return;
    }

    // Filter out empty contacts and family members
    const validEmergencyContacts = emergencyContacts.filter(contact => validateEmergencyContact(contact).length === 0);
    const validFamilyMembers = familyDetails.filter(member => validateFamilyMember(member).length === 0);

    const formData = {
      ...data,
      emergencyContacts: validEmergencyContacts,
      familyDetails: validFamilyMembers
    };

    console.log('Form data:', formData);
    onComplete(true, formData);
  });

  return (
    <div className="flex w-[622px] max-w-full flex-col text-sm font-medium ml-[15px]">
      <Form {...form}>
        <form id="personalDetailsForm" onSubmit={handleSubmit} className="space-y-6">
          <BasicInfoSection form={form} showValidation={showValidation} />
          
          <AddressSection form={form} showValidation={showValidation} />

          <EmergencyContactsSection
            contacts={emergencyContacts}
            onContactsChange={setEmergencyContacts}
            errors={emergencyContactErrors}
            showValidation={showValidation}
          />

          <FamilyDetailsSection
            familyMembers={familyDetails}
            onFamilyMembersChange={setFamilyDetails}
            errors={familyDetailErrors}
            showValidation={showValidation}
          />
        </form>
      </Form>
    </div>
  );
};
