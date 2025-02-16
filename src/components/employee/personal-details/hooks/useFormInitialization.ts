
import { useState, useEffect } from "react";
import { EmergencyContact, FamilyMember } from "../../types";
import type { Document as EmployeeDocument } from "@/services/types/employee.types";

export const useFormInitialization = (initialData: any) => {
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([]);
  const [familyDetails, setFamilyDetails] = useState<FamilyMember[]>([]);
  const [documents, setDocuments] = useState<EmployeeDocument[]>([]);

  useEffect(() => {
    if (initialData) {
      // Initialize emergency contacts
      setEmergencyContacts(
        initialData.emergencyContacts && initialData.emergencyContacts.length > 0
          ? initialData.emergencyContacts
          : [{ relationship: "", name: "", phone: "" }]
      );

      // Initialize family details
      setFamilyDetails(
        initialData.familyDetails && initialData.familyDetails.length > 0
          ? initialData.familyDetails
          : [{ relationship: "", name: "", occupation: "", phone: "" }]
      );

      // Initialize documents
      if (initialData.documents) {
        setDocuments(initialData.documents);
      }
    }
  }, [initialData]);

  return {
    emergencyContacts,
    setEmergencyContacts,
    familyDetails,
    setFamilyDetails,
    documents,
    setDocuments
  };
};
