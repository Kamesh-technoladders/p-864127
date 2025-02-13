
import React, { useState, useMemo } from "react";
import { ProgressStats } from "./components/ProgressStats";
import { FilterBar } from "./components/FilterBar";
import { EmployeeTable } from "./components/EmployeeTable";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { useEmployees } from "@/hooks/useEmployees";
import { Employee } from "@/hooks/useEmployees";
import { toast } from "sonner";

interface DashboardViewProps {
  onAddEmployee: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onAddEmployee }) => {
  const { employees, isLoading, error, refetch } = useEmployees();
  const [searchValue, setSearchValue] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredEmployees = useMemo(() => {
    if (!employees) return [];

    return employees.filter((employee) => {
      // Search filter
      const searchLower = searchValue.toLowerCase().trim();
      const matchesSearch = !searchLower || 
        employee.first_name.toLowerCase().includes(searchLower) ||
        employee.last_name.toLowerCase().includes(searchLower) ||
        employee.email.toLowerCase().includes(searchLower) ||
        employee.employee_id.toLowerCase().includes(searchLower);

      // Status filter
      const matchesStatus = selectedStatus === 'all' || 
        employee.employment_status === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [employees, searchValue, selectedStatus]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-brand-primary">People</h1>
        <Button onClick={onAddEmployee} className="bg-red-600 hover:bg-red-700">
          <UserPlus className="w-3.5 h-3.5 mr-2" />
          Add Employee
        </Button>
      </div>
      <ProgressStats employeeCount={employees?.length || 0} />
      <FilterBar 
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        employees={employees || []}
      />
      <EmployeeTable 
        employees={filteredEmployees} 
        isLoading={isLoading} 
        error={error}
        onRefresh={refetch}
      />
    </div>
  );
};
