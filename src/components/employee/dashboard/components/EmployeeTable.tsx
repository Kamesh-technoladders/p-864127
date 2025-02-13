
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2 } from "lucide-react";
import { Employee } from "@/hooks/useEmployees";

interface EmployeeTableProps {
  employees: Employee[];
  isLoading: boolean;
  error: string | null;
}

export const EmployeeTable: React.FC<EmployeeTableProps> = ({ 
  employees, 
  isLoading, 
  error 
}) => {
  const navigate = useNavigate();

  const handleNameClick = (employeeId: string) => {
    console.log('Navigating to employee profile:', employeeId);
    navigate(`/employee/${employeeId}`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <input type="checkbox" className="rounded border-gray-300" />
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Employee ID</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Blood Group</TableHead>
            <TableHead>Join Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.length > 0 ? (
            employees.map((employee) => (
              <TableRow key={employee.id} className="hover:bg-brand-accent/10">
                <TableCell>
                  <input type="checkbox" className="rounded border-gray-300" />
                </TableCell>
                <TableCell>
                  <div 
                    className="flex items-center gap-3 cursor-pointer hover:text-brand-primary transition-colors"
                    onClick={() => handleNameClick(employee.id)}
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="" />
                      <AvatarFallback>
                        {employee.first_name.charAt(0).toUpperCase()}
                        {employee.last_name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{`${employee.first_name} ${employee.last_name}`}</div>
                      <div className="text-sm text-brand-secondary">{employee.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{employee.employee_id}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.gender || '-'}</TableCell>
                <TableCell>{employee.blood_group || '-'}</TableCell>
                <TableCell>{new Date(employee.created_at).toLocaleDateString()}</TableCell>
                <TableCell>
                  <span className="status-pill status-pill-invited">Active</span>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                No employees found. Add an employee by clicking the "Add Employee" button.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
