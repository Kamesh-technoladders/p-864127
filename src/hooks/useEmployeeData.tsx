
import { useState, useCallback } from "react";
import { employeeService } from "@/services/employee/employee.service";
import { toast } from "sonner";

export const useEmployeeData = (employeeId: string | undefined) => {
  const [isLoading, setIsLoading] = useState(false);
  const [employeeData, setEmployeeData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchEmployeeData = useCallback(async () => {
    if (!employeeId) {
      setError("No employee ID provided");
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const data = await employeeService.getEmployee(employeeId);
      setEmployeeData(data);
    } catch (error: any) {
      console.error("Error fetching employee data:", error);
      const errorMessage = error.message === 'Invalid employee ID format' 
        ? 'Invalid employee ID format. Please use a valid UUID.'
        : 'Failed to fetch employee data';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [employeeId]);

  const updateEmployee = useCallback(
    async (section: string, data: any) => {
      if (!employeeId) {
        toast.error("No employee ID provided");
        return;
      }

      try {
        const updateData = section === 'personal' ? {
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          phone: data.phone,
          date_of_birth: data.dateOfBirth,
          gender: data.gender,
          blood_group: data.bloodGroup,
          marital_status: data.maritalStatus,
          present_address: data.presentAddress,
          permanent_address: data.permanentAddress,
          emergency_contacts: data.emergencyContacts,
          family_details: data.familyDetails
        } : { [section]: data };

        await employeeService.updateEmployee(employeeId, updateData);
        await fetchEmployeeData();
        toast.success(`${section} updated successfully`);
      } catch (error) {
        console.error(`Error updating ${section}:`, error);
        toast.error(`Failed to update ${section}`);
        throw error;
      }
    },
    [employeeId, fetchEmployeeData]
  );

  return {
    isLoading,
    employeeData,
    error,
    fetchEmployeeData,
    updateEmployee,
  };
};
