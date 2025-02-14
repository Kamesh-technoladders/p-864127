
import { supabase } from "@/integrations/supabase/client";
import { PersonalInfo } from "../types/employee.types";

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
        marital_status: personalInfo.maritalStatus,
        joined_date: new Date().toISOString()
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

    return employee;
  },

  async updatePersonalInfo(employeeId: string, personalInfo: Partial<PersonalInfo>) {
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
  }
};
