import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface EmployeeData {
  personal: {
    employeeId: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    gender: string;
    bloodGroup: string;
    maritalStatus: string;
    presentAddress: {
      addressLine1: string;
      country: string;
      state: string;
      city: string;
      zipCode: string;
    };
    permanentAddress: {
      addressLine1: string;
      country: string;
      state: string;
      city: string;
      zipCode: string;
    };
  };
  education: {
    ssc?: File;
    hsc?: File;
    degree?: File;
  };
  experience: Array<{
    id: string;
    jobTitle: string;
    company: string;
    location: string;
    employmentType: string;
    startDate: string;
    endDate: string;
    offerLetter?: File;
    separationLetter?: File;
    payslips: File[];
  }>;
  bank: {
    accountHolderName: string;
    accountNumber: string;
    ifscCode: string;
    bankName: string;
    branchName: string;
    accountType: string;
    bankPhone?: string;
    cancelledCheque?: File;
    passbookCopy?: File;
  };
}

export const employeeService = {
  async checkEmployeeIdExists(employeeId: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('employees')
      .select('id')
      .eq('employee_id', employeeId)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 means no rows returned
      throw error;
    }

    return !!data;
  },

  async createEmployee(data: EmployeeData) {
    try {
      // Check if employee ID already exists
      const exists = await this.checkEmployeeIdExists(data.personal.employeeId);
      if (exists) {
        throw new Error(`Employee ID ${data.personal.employeeId} already exists`);
      }

      // First, create the employee record
      const { data: employee, error: employeeError } = await supabase
        .from('employees')
        .insert({
          employee_id: data.personal.employeeId,
          first_name: data.personal.firstName,
          last_name: data.personal.lastName,
          email: data.personal.email,
          phone: data.personal.phone,
          date_of_birth: data.personal.dateOfBirth,
          gender: data.personal.gender,
          blood_group: data.personal.bloodGroup,
          marital_status: data.personal.maritalStatus
        })
        .select()
        .single();

      if (employeeError) throw employeeError;

      // Insert addresses
      const addresses = [
        {
          employee_id: employee.id,
          type: 'present',
          address_line1: data.personal.presentAddress.addressLine1,
          country: data.personal.presentAddress.country,
          state: data.personal.presentAddress.state,
          city: data.personal.presentAddress.city,
          zip_code: data.personal.presentAddress.zipCode
        },
        {
          employee_id: employee.id,
          type: 'permanent',
          address_line1: data.personal.permanentAddress.addressLine1,
          country: data.personal.permanentAddress.country,
          state: data.personal.permanentAddress.state,
          city: data.personal.permanentAddress.city,
          zip_code: data.personal.permanentAddress.zipCode
        }
      ];

      const { error: addressError } = await supabase
        .from('employee_addresses')
        .insert(addresses);

      if (addressError) throw addressError;

      // Insert bank details
      const { error: bankError } = await supabase
        .from('employee_bank_details')
        .insert({
          employee_id: employee.id,
          account_holder_name: data.bank.accountHolderName,
          account_number: data.bank.accountNumber,
          ifsc_code: data.bank.ifscCode,
          bank_name: data.bank.bankName,
          branch_name: data.bank.branchName,
          account_type: data.bank.accountType,
          bank_phone: data.bank.bankPhone
        });

      if (bankError) throw bankError;

      // Insert experiences
      if (data.experience.length > 0) {
        const experiences = data.experience.map(exp => ({
          employee_id: employee.id,
          job_title: exp.jobTitle,
          company: exp.company,
          location: exp.location,
          employment_type: exp.employmentType,
          start_date: exp.startDate,
          end_date: exp.endDate
        }));

        const { error: experienceError } = await supabase
          .from('employee_experiences')
          .insert(experiences);

        if (experienceError) throw experienceError;
      }

      return employee;
    } catch (error: any) {
      console.error('Error creating employee:', error);
      // If it's our custom error for duplicate employee ID, throw it as is
      if (error.message && error.message.includes('Employee ID')) {
        throw error;
      }
      throw error;
    }
  },

  async updateEmployee(employeeId: string, data: Partial<EmployeeData>) {
    try {
      if (data.personal) {
        const { error: employeeError } = await supabase
          .from('employees')
          .update({
            first_name: data.personal.firstName,
            last_name: data.personal.lastName,
            email: data.personal.email,
            phone: data.personal.phone,
            date_of_birth: data.personal.dateOfBirth,
            gender: data.personal.gender,
            blood_group: data.personal.bloodGroup,
            marital_status: data.personal.maritalStatus
          })
          .eq('id', employeeId);

        if (employeeError) throw employeeError;

        if (data.personal.presentAddress) {
          const { error: presentAddressError } = await supabase
            .from('employee_addresses')
            .update({
              address_line1: data.personal.presentAddress.addressLine1,
              country: data.personal.presentAddress.country,
              state: data.personal.presentAddress.state,
              city: data.personal.presentAddress.city,
              zip_code: data.personal.presentAddress.zipCode
            })
            .eq('employee_id', employeeId)
            .eq('type', 'present');

          if (presentAddressError) throw presentAddressError;
        }

        if (data.personal.permanentAddress) {
          const { error: permanentAddressError } = await supabase
            .from('employee_addresses')
            .update({
              address_line1: data.personal.permanentAddress.addressLine1,
              country: data.personal.permanentAddress.country,
              state: data.personal.permanentAddress.state,
              city: data.personal.permanentAddress.city,
              zip_code: data.personal.permanentAddress.zipCode
            })
            .eq('employee_id', employeeId)
            .eq('type', 'permanent');

          if (permanentAddressError) throw permanentAddressError;
        }
      }

      if (data.bank) {
        const { error: bankError } = await supabase
          .from('employee_bank_details')
          .update({
            account_holder_name: data.bank.accountHolderName,
            account_number: data.bank.accountNumber,
            ifsc_code: data.bank.ifscCode,
            bank_name: data.bank.bankName,
            branch_name: data.bank.branchName,
            account_type: data.bank.accountType,
            bank_phone: data.bank.bankPhone
          })
          .eq('employee_id', employeeId);

        if (bankError) throw bankError;
      }

      return true;
    } catch (error) {
      console.error('Error updating employee:', error);
      throw error;
    }
  },

  async getEmployee(employeeId: string) {
    try {
      const { data: employee, error: employeeError } = await supabase
        .from('employees')
        .select(`
          *,
          employee_addresses (
            *
          ),
          employee_bank_details (
            *
          ),
          employee_education (
            *
          ),
          employee_experiences (
            *
          )
        `)
        .eq('id', employeeId)
        .single();

      if (employeeError) throw employeeError;

      return employee;
    } catch (error) {
      console.error('Error fetching employee:', error);
      throw error;
    }
  }
};
