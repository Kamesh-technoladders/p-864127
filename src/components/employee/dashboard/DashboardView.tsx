
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FormData } from "@/utils/progressCalculator";

interface DashboardViewProps {
  formData: FormData;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ formData }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Employee Details</h2>
      
      <div className="bg-white rounded-lg shadow p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Field</TableHead>
              <TableHead>Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {formData.personal && (
              <>
                <TableRow>
                  <TableCell className="font-medium">Employee ID</TableCell>
                  <TableCell>{formData.personal.employeeId}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Name</TableCell>
                  <TableCell>
                    {`${formData.personal.firstName} ${formData.personal.lastName}`}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Email</TableCell>
                  <TableCell>{formData.personal.email}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Phone</TableCell>
                  <TableCell>{formData.personal.phone}</TableCell>
                </TableRow>
              </>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
