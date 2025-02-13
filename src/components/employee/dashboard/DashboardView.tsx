
import React, { useState, useMemo } from "react";
import { ProgressStats } from "./components/ProgressStats";
import { ActionButtons } from "./components/ActionButtons";
import { FilterBar } from "./components/FilterBar";
import { EmployeeTable } from "./components/EmployeeTable";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { useEmployees } from "@/hooks/useEmployees";
import { Employee } from "@/hooks/useEmployees";

interface DashboardViewProps {
  onAddEmployee: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onAddEmployee }) => {
  const { employees, isLoading, error } = useEmployees();
  const [searchValue, setSearchValue] = useState("");

  const filteredEmployees = useMemo(() => {
    if (!searchValue.trim() || !employees) return employees;

    const searchLower = searchValue.toLowerCase();
    return employees.filter((employee) => 
      employee.first_name.toLowerCase().includes(searchLower) ||
      employee.last_name.toLowerCase().includes(searchLower) ||
      employee.email.toLowerCase().includes(searchLower) ||
      employee.employee_id.toLowerCase().includes(searchLower)
    );
  }, [employees, searchValue]);

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
      <div className="flex justify-between items-center">
        <ActionButtons />
      </div>
      <FilterBar 
        searchValue={searchValue}
        onSearchChange={setSearchValue}
      />
      <EmployeeTable 
        employees={filteredEmployees || []} 
        isLoading={isLoading} 
        error={error} 
      />
    </div>
  );
};
