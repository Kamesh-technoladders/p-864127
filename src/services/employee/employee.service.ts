
import { EmployeeData } from "../types/employee.types";
import { personalInfoService } from "./personalInfo.service";
import { bankDetailsService } from "./bankDetails.service";
import { experienceService } from "./experience.service";
import { educationService } from "./education.service";
import { supabase } from "@/integrations/supabase/client";

export const employeeService = {
  async createEmployee(data: EmployeeData) {
    try {
      // Check if employee ID already exists
      const exists = await personalInfoService.checkEmployeeIdExists(data.personal.employeeId);
      if (exists) {
        throw new Error(`Employee ID ${data.personal.employeeId} already exists`);
      }

      // Create personal info and get the employee record
      const employee = await personalInfoService.createPersonalInfo(data.personal);

      // Create bank details
      await bankDetailsService.createBankDetails(employee.id, data.bank);

      // Create education records
      await educationService.createEducation(employee.id, data.education);

      // Create experiences
      await experienceService.createExperiences(employee.id, data.experience);

      return employee;
    } catch (error: any) {
      console.error('Error creating employee:', error);
      if (error.message && error.message.includes('Employee ID')) {
        throw error;
      }
      throw error;
    }
  },

  async updateEmployee(employeeId: string, data: Partial<EmployeeData>) {
    try {
      if (data.personal) {
        await personalInfoService.updatePersonalInfo(employeeId, data.personal);
      }

      if (data.education) {
        await educationService.updateEducation(employeeId, data.education);
      }

      if (data.bank) {
        await bankDetailsService.updateBankDetails(employeeId, data.bank);
      }

      if (data.experience) {
        await experienceService.updateExperiences(employeeId, data.experience);
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
