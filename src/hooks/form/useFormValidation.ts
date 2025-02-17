
import { EmergencyContact, FamilyMember } from "../../components/employee/types";
import { PersonalDetailsFormSchema } from "@/components/employee/personal-details/schema/personalDetailsSchema";

export const useFormValidation = () => {
  const validateForm = (
    formData: PersonalDetailsFormSchema,
    emergencyContacts: EmergencyContact[],
    familyDetails: FamilyMember[],
    setEmergencyContacts: React.Dispatch<React.SetStateAction<EmergencyContact[]>>,
    setFamilyDetails: React.Dispatch<React.SetStateAction<FamilyMember[]>>
  ): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];

    // Validate required base fields
    if (!formData.employeeId?.trim()) {
      errors.push("Employee ID is required");
    }

    if (!formData.firstName?.trim()) {
      errors.push("First name is required");
    }

    if (!formData.lastName?.trim()) {
      errors.push("Last name is required");
    }

    if (!formData.email?.trim()) {
      errors.push("Email is required");
    }

    if (!formData.phone?.trim()) {
      errors.push("Phone number is required");
    }

    // Validate emergency contacts
    const hasValidEmergencyContact = emergencyContacts.some(
      contact => 
        contact.name.trim() !== "" && 
        contact.relationship.trim() !== "" && 
        contact.phone.trim() !== ""
    );

    if (!hasValidEmergencyContact) {
      errors.push("At least one emergency contact is required");
    }

    // Validate family members
    const hasValidFamilyMember = familyDetails.some(
      member => 
        member.name.trim() !== "" && 
        member.relationship.trim() !== "" && 
        member.occupation.trim() !== "" && 
        member.phone.trim() !== ""
    );

    if (!hasValidFamilyMember) {
      errors.push("At least one family member is required");
    }

    // Clean up incomplete entries
    if (!hasValidEmergencyContact) {
      setEmergencyContacts(prevContacts => 
        prevContacts.filter(contact => 
          contact.name.trim() !== "" || 
          contact.relationship.trim() !== "" || 
          contact.phone.trim() !== ""
        )
      );
    }

    if (!hasValidFamilyMember) {
      setFamilyDetails(prevMembers => 
        prevMembers.filter(member => 
          member.name.trim() !== "" || 
          member.relationship.trim() !== "" || 
          member.occupation.trim() !== "" || 
          member.phone.trim() !== ""
        )
      );
    }

    // Validate address
    if (!formData.presentAddress?.addressLine1?.trim()) {
      errors.push("Present address is required");
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  };

  return { validateForm };
};
