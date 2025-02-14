
import { EmergencyContact, FamilyMember } from "../../types";

export const useFormValidation = () => {
  const validateForm = (
    emergencyContacts: EmergencyContact[],
    familyDetails: FamilyMember[],
    setEmergencyContacts: (contacts: EmergencyContact[]) => void,
    setFamilyDetails: (members: FamilyMember[]) => void
  ) => {
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

  return { validateForm };
};
