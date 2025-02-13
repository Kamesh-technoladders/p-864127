
import { EmployeeDetailsResponse } from "@/services/types/employee.types";

export const transformEmployeeData = (employeeDetails: EmployeeDetailsResponse) => {
  return {
    id: employeeDetails.id,
    employeeId: employeeDetails.employee_id,
    firstName: employeeDetails.first_name,
    lastName: employeeDetails.last_name,
    email: employeeDetails.email,
    phone: employeeDetails.phone || '',
    dateOfBirth: employeeDetails.date_of_birth || '',
    gender: employeeDetails.gender || '',
    bloodGroup: employeeDetails.blood_group || '',
    maritalStatus: employeeDetails.marital_status || '',
    department: employeeDetails.department || '',
    position: employeeDetails.position || '',
    employmentStatus: employeeDetails.employment_status || '',
    createdAt: employeeDetails.created_at,
    updatedAt: employeeDetails.updated_at,
    presentAddress: employeeDetails.present_address || {
      addressLine1: '',
      country: '',
      state: '',
      city: '',
      zipCode: ''
    },
    permanentAddress: employeeDetails.permanent_address || {
      addressLine1: '',
      country: '',
      state: '',
      city: '',
      zipCode: ''
    },
    emergencyContacts: employeeDetails.emergency_contacts || [],
    familyDetails: employeeDetails.family_details || []
  };
};
