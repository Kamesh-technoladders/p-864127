
import { supabase } from "@/integrations/supabase/client";
import { PersonalInfo, EmergencyContact, FamilyDetail } from "../types/employee.types";

export const personalInfoService = {
  async checkEmployeeIdExists(employeeId: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('employees')
      .select('id')
      .eq('employee_id', employeeId)
      .maybeSingle();

    if (error) {
      throw error;
    }

    return !!data;
  },

  async createPersonalInfo(personalInfo: PersonalInfo) {
    // Create employee record
    const { data: employee, error: employeeError } = await supabase
      .from('employees')
      .insert({
        employee_id: personalInfo.employeeId,
        first_name: personalInfo.firstName,
        last_name: personalInfo.lastName,
        email: personalInfo.email,
        phone: personalInfo.phone,
        date_of_birth: personalInfo.dateOfBirth,
        gender: personalInfo.gender,
        blood_group: personalInfo.bloodGroup,
        marital_status: personalInfo.maritalStatus
      })
      .select()
      .single();

    if (employeeError) throw employeeError;

    // Insert addresses
    const addresses = [
      {
        employee_id: employee.id,
        type: 'present',
        address_line1: personalInfo.presentAddress.addressLine1,
        country: personalInfo.presentAddress.country,
        state: personalInfo.presentAddress.state,
        city: personalInfo.presentAddress.city,
        zip_code: personalInfo.presentAddress.zipCode
      },
      {
        employee_id: employee.id,
        type: 'permanent',
        address_line1: personalInfo.permanentAddress.addressLine1,
        country: personalInfo.permanentAddress.country,
        state: personalInfo.permanentAddress.state,
        city: personalInfo.permanentAddress.city,
        zip_code: personalInfo.permanentAddress.zipCode
      }
    ];

    const { error: addressError } = await supabase
      .from('employee_addresses')
      .insert(addresses);

    if (addressError) throw addressError;

    // Insert emergency contacts
    if (personalInfo.emergencyContacts?.length > 0) {
      const emergencyContacts = personalInfo.emergencyContacts.map(contact => ({
        employee_id: employee.id,
        relationship: contact.relationship,
        name: contact.name,
        phone: contact.phone
      }));

      const { error: emergencyContactError } = await supabase
        .from('employee_emergency_contacts')
        .insert(emergencyContacts);

      if (emergencyContactError) throw emergencyContactError;
    }

    // Insert family details
    if (personalInfo.familyDetails?.length > 0) {
      const familyDetails = personalInfo.familyDetails.map(detail => ({
        employee_id: employee.id,
        relationship: detail.relationship,
        name: detail.name,
        occupation: detail.occupation,
        phone: detail.phone
      }));

      const { error: familyDetailError } = await supabase
        .from('employee_family_details')
        .insert(familyDetails);

      if (familyDetailError) throw familyDetailError;
    }

    return employee;
  },

  async updatePersonalInfo(employeeId: string, personalInfo: Partial<PersonalInfo>) {
    // Update employee details
    const { error: employeeError } = await supabase
      .from('employees')
      .update({
        first_name: personalInfo.firstName,
        last_name: personalInfo.lastName,
        email: personalInfo.email,
        phone: personalInfo.phone,
        date_of_birth: personalInfo.dateOfBirth,
        gender: personalInfo.gender,
        blood_group: personalInfo.bloodGroup,
        marital_status: personalInfo.maritalStatus
      })
      .eq('id', employeeId);

    if (employeeError) throw employeeError;

    // Update addresses if provided
    if (personalInfo.presentAddress) {
      const { error: presentAddressError } = await supabase
        .from('employee_addresses')
        .update({
          address_line1: personalInfo.presentAddress.addressLine1,
          country: personalInfo.presentAddress.country,
          state: personalInfo.presentAddress.state,
          city: personalInfo.presentAddress.city,
          zip_code: personalInfo.presentAddress.zipCode
        })
        .eq('employee_id', employeeId)
        .eq('type', 'present');

      if (presentAddressError) throw presentAddressError;
    }

    if (personalInfo.permanentAddress) {
      const { error: permanentAddressError } = await supabase
        .from('employee_addresses')
        .update({
          address_line1: personalInfo.permanentAddress.addressLine1,
          country: personalInfo.permanentAddress.country,
          state: personalInfo.permanentAddress.state,
          city: personalInfo.permanentAddress.city,
          zip_code: personalInfo.permanentAddress.zipCode
        })
        .eq('employee_id', employeeId)
        .eq('type', 'permanent');

      if (permanentAddressError) throw permanentAddressError;
    }

    // Update emergency contacts if provided
    if (personalInfo.emergencyContacts) {
      // Delete existing emergency contacts
      const { error: deleteEmergencyError } = await supabase
        .from('employee_emergency_contacts')
        .delete()
        .eq('employee_id', employeeId);

      if (deleteEmergencyError) throw deleteEmergencyError;

      // Insert new emergency contacts
      if (personalInfo.emergencyContacts.length > 0) {
        const emergencyContacts = personalInfo.emergencyContacts.map(contact => ({
          employee_id: employeeId,
          relationship: contact.relationship,
          name: contact.name,
          phone: contact.phone
        }));

        const { error: emergencyContactError } = await supabase
          .from('employee_emergency_contacts')
          .insert(emergencyContacts);

        if (emergencyContactError) throw emergencyContactError;
      }
    }

    // Update family details if provided
    if (personalInfo.familyDetails) {
      // Delete existing family details
      const { error: deleteFamilyError } = await supabase
        .from('employee_family_details')
        .delete()
        .eq('employee_id', employeeId);

      if (deleteFamilyError) throw deleteFamilyError;

      // Insert new family details
      if (personalInfo.familyDetails.length > 0) {
        const familyDetails = personalInfo.familyDetails.map(detail => ({
          employee_id: employeeId,
          relationship: detail.relationship,
          name: detail.name,
          occupation: detail.occupation,
          phone: detail.phone
        }));

        const { error: familyDetailError } = await supabase
          .from('employee_family_details')
          .insert(familyDetails);

        if (familyDetailError) throw familyDetailError;
      }
    }
  }
};
