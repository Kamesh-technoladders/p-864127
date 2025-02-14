
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
      console.error('Error checking employee ID:', error);
      throw new Error('Failed to check employee ID');
    }

    return !!data;
  },

  async checkEmailExists(email: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('employees')
      .select('id')
      .eq('email', email)
      .maybeSingle();

    if (error) {
      console.error('Error checking email:', error);
      throw new Error('Failed to check email');
    }

    return !!data;
  },

  async createPersonalInfo(personalInfo: PersonalInfo) {
    try {
      // Check if email already exists
      const emailExists = await this.checkEmailExists(personalInfo.email);
      if (emailExists) {
        throw new Error(`Email ${personalInfo.email} is already registered`);
      }

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
          employment_start_date: new Date().toISOString(),
          present_address: {
            addressLine1: personalInfo.presentAddress.addressLine1,
            country: personalInfo.presentAddress.country,
            state: personalInfo.presentAddress.state,
            city: personalInfo.presentAddress.city,
            zipCode: personalInfo.presentAddress.zipCode
          },
          permanent_address: {
            addressLine1: personalInfo.permanentAddress.addressLine1,
            country: personalInfo.permanentAddress.country,
            state: personalInfo.permanentAddress.state,
            city: personalInfo.permanentAddress.city,
            zipCode: personalInfo.permanentAddress.zipCode
          }
        })
        .select()
        .single();

      if (employeeError) {
        if (employeeError.code === '23505' && employeeError.message.includes('employees_email_key')) {
          throw new Error(`Email ${personalInfo.email} is already registered`);
        }
        console.error('Error creating employee:', employeeError);
        throw employeeError;
      }

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

      if (addressError) {
        console.error('Error creating employee addresses:', addressError);
        throw addressError;
      }

      return employee;
    } catch (error: any) {
      console.error('Error in createPersonalInfo:', error);
      throw new Error(error.message || 'Failed to create employee information');
    }
  },

  async updatePersonalInfo(employeeId: string, personalInfo: Partial<PersonalInfo>) {
    try {
      const updateData: any = {
        first_name: personalInfo.firstName,
        last_name: personalInfo.lastName,
        email: personalInfo.email,
        phone: personalInfo.phone,
        date_of_birth: personalInfo.dateOfBirth,
        gender: personalInfo.gender,
        blood_group: personalInfo.bloodGroup,
        marital_status: personalInfo.maritalStatus
      };

      if (personalInfo.presentAddress) {
        updateData.present_address = {
          addressLine1: personalInfo.presentAddress.addressLine1,
          country: personalInfo.presentAddress.country,
          state: personalInfo.presentAddress.state,
          city: personalInfo.presentAddress.city,
          zipCode: personalInfo.presentAddress.zipCode
        };
      }

      if (personalInfo.permanentAddress) {
        updateData.permanent_address = {
          addressLine1: personalInfo.permanentAddress.addressLine1,
          country: personalInfo.permanentAddress.country,
          state: personalInfo.permanentAddress.state,
          city: personalInfo.permanentAddress.city,
          zipCode: personalInfo.permanentAddress.zipCode
        };
      }

      const { error: employeeError } = await supabase
        .from('employees')
        .update(updateData)
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
    } catch (error: any) {
      console.error('Error in updatePersonalInfo:', error);
      throw new Error(error.message || 'Failed to update employee information');
    }
  }
};
