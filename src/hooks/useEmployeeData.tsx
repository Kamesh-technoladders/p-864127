
import { useState, useCallback } from "react";
import { employeeService } from "@/services/employee/employee.service";
import { toast } from "sonner";
import { EmployeeData, PersonalInfo } from "@/services/types/employee.types";
import { supabase } from "@/integrations/supabase/client";

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
      const { data, error } = await supabase
        .from('employees')
        .select('*')
        .eq('id', employeeId)
        .maybeSingle();

      if (error) throw error;
      
      if (!data) {
        throw new Error('Employee not found');
      }

      setEmployeeData(data);
    } catch (error: any) {
      console.error("Error fetching employee data:", error);
      const errorMessage = error.message === 'Invalid UUID' 
        ? 'Invalid employee ID format. Please use a valid UUID.'
        : error.message === 'Employee not found'
        ? 'Employee not found. Please check the ID and try again.'
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
        let updateData: Partial<EmployeeData>;
        
        if (section === 'personal') {
          const personalInfo: PersonalInfo = {
            employeeId: data.employeeId,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            dateOfBirth: data.dateOfBirth,
            gender: data.gender,
            bloodGroup: data.bloodGroup,
            maritalStatus: data.maritalStatus,
            presentAddress: data.presentAddress,
            permanentAddress: data.permanentAddress,
            emergencyContacts: data.emergencyContacts || [],
            familyDetails: data.familyDetails || []
          };
          updateData = { personal: personalInfo };
        } else {
          updateData = { [section]: data };
        }

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
