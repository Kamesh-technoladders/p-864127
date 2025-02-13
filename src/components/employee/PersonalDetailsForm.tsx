
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

  // Watch form values and validation state
  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      console.log('Form values changed:', value);
      validateAndUpdateProgress();
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  // Add validation for emergency contacts and family members
  useEffect(() => {
    if (showValidation) {
      const errors = emergencyContacts.map(contact => validateEmergencyContact(contact));
      setEmergencyContactErrors(errors);
    }
    validateAndUpdateProgress();
  }, [emergencyContacts, showValidation]);

  useEffect(() => {
    if (showValidation) {
      const errors = familyDetails.map(member => validateFamilyMember(member));
      setFamilyDetailErrors(errors);
    }
    validateAndUpdateProgress();
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

  const validateAndUpdateProgress = () => {
    const formState = form.getValues();
    const hasValidEmergencyContact = emergencyContacts.some(contact => 
      contact.relationship && contact.name && contact.phone
    );
    const hasValidFamilyMember = familyDetails.some(member => 
      member.relationship && member.name && member.occupation && member.phone
    );

    const isValid = form.formState.isValid && hasValidEmergencyContact && hasValidFamilyMember;
    
    console.log('Form validation state:', {
      isFormValid: form.formState.isValid,
      hasValidEmergencyContact,
      hasValidFamilyMember,
      isValid,
      formState
    });

    if (isValid) {
      const validData = {
        ...formState,
        emergencyContacts: emergencyContacts.filter(contact => 
          contact.relationship && contact.name && contact.phone
        ),
        familyDetails: familyDetails.filter(member => 
          member.relationship && member.name && member.occupation && member.phone
        )
      };
      onComplete(true, validData);
    } else {
      onComplete(false, undefined);
    }
  };

  // Watch for form changes and validate
  useEffect(() => {
    const subscription = form.watch(() => {
      setTimeout(() => {
        validateAndUpdateProgress();
      }, 0);
    });
    return () => subscription.unsubscribe();
  }, [form.watch, emergencyContacts, familyDetails]);

  const handleSubmit = form.handleSubmit((data) => {
    setShowValidation(true);
    
    if (!form.formState.isValid) {
      Object.entries(form.formState.errors).forEach(([key, value]) => {
        if (typeof value === 'object' && value?.message) {
          toast.error(value.message as string);
        }
      });
      return;
    }

    const validEmergencyContacts = emergencyContacts.filter(contact => 
      contact.relationship && contact.name && contact.phone
    );
    const validFamilyMembers = familyDetails.filter(member => 
      member.relationship && member.name && member.occupation && member.phone
    );

    if (!validEmergencyContacts.length) {
      toast.error("Please add at least one complete emergency contact");
      return;
    }

    if (!validFamilyMembers.length) {
      toast.error("Please add at least one complete family member");
      return;
    }

    const formData = {
      ...data,
      emergencyContacts: validEmergencyContacts,
      familyDetails: validFamilyMembers
    };

    console.log('Submitting form data:', formData);
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
