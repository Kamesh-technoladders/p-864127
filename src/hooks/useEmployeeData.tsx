
import { useState, useCallback } from "react";
import { employeeService } from "@/services/employee/employee.service";
import { toast } from "sonner";

export const useEmployeeData = (employeeId: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [employeeData, setEmployeeData] = useState<any>(null);

  const fetchEmployeeData = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await employeeService.getEmployee(employeeId);
      setEmployeeData(data);
    } catch (error) {
      console.error("Error fetching employee data:", error);
      toast.error("Failed to fetch employee data");
    } finally {
      setIsLoading(false);
    }
  }, [employeeId]);

  const updateEmployee = useCallback(
    async (section: string, data: any) => {
      try {
        await employeeService.updateEmployee(employeeId, {
          [section]: data,
        });
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
    fetchEmployeeData,
    updateEmployee,
  };
};
