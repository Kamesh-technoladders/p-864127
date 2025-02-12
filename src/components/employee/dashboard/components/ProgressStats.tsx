
import React from "react";
import { Progress } from "@/components/ui/progress";

interface ProgressStatsProps {
  employeeCount: number;
}

export const ProgressStats: React.FC<ProgressStatsProps> = ({ employeeCount }) => {
  return (
    <div className="grid grid-cols-4 gap-6">
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-brand-secondary">Total Employees</span>
          <span className="text-sm font-bold">{employeeCount}</span>
        </div>
        <Progress value={employeeCount > 0 ? 100 : 0} className="h-2 bg-gray-100" />
      </div>
      
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-brand-secondary">Active</span>
          <span className="text-sm font-bold">{employeeCount}</span>
        </div>
        <Progress value={employeeCount > 0 ? 100 : 0} className="h-2 bg-gray-100" />
      </div>
      
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-brand-secondary">On Leave</span>
          <span className="text-sm font-bold">0</span>
        </div>
        <Progress value={0} className="h-2 bg-gray-100" />
      </div>
      
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-brand-secondary">Inactive</span>
          <span className="text-sm font-bold">0</span>
        </div>
        <Progress value={0} className="h-2 bg-gray-100" />
      </div>
    </div>
  );
};
