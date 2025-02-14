
import { useState, useEffect } from "react";
import { EmergencyContact, FamilyMember } from "../../types";
import type { Document as EmployeeDocument } from "@/services/types/employee.types";

export const useFormInitialization = (initialData: any) => {
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([]);
  const [familyDetails, setFamilyDetails] = useState<FamilyMember[]>([]);
  const [documents, setDocuments] = useState<EmployeeDocument[]>([]);

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

  return {
    emergencyContacts,
    setEmergencyContacts,
    familyDetails,
    setFamilyDetails,
    documents,
    setDocuments
  };
};
