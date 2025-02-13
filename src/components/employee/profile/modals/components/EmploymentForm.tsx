
import React from 'react';
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface EmploymentFormProps {
  formData: {
    employeeId: string;
    department: string;
    position: string;
  };
  isEditing: boolean;
  onChange: (field: string, value: string) => void;
}

export const EmploymentForm: React.FC<EmploymentFormProps> = ({
  formData,
  isEditing,
  onChange,
}) => {
  return (
    <div className="space-y-2">
      <div>
        <label className="text-[10px] text-gray-600 mb-0.5 block">Employee ID</label>
        <Input
          value={formData.employeeId}
          readOnly
          className="h-6 text-[11px] bg-gray-50"
        />
      </div>
      <div>
        <label className="text-[10px] text-gray-600 mb-0.5 block">Department</label>
        <Input
          value={formData.department}
          onChange={(e) => onChange('department', e.target.value)}
          readOnly={!isEditing}
          className={cn(
            "h-6 text-[11px] transition-colors duration-200",
            !isEditing && "bg-gray-50"
          )}
        />
      </div>
      <div>
        <label className="text-[10px] text-gray-600 mb-0.5 block">Position</label>
        <Input
          value={formData.position}
          onChange={(e) => onChange('position', e.target.value)}
          readOnly={!isEditing}
          className={cn(
            "h-6 text-[11px] transition-colors duration-200",
            !isEditing && "bg-gray-50"
          )}
        />
      </div>
    </div>
  );
};
