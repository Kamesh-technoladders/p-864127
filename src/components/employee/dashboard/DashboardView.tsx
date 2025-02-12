
import React from "react";
import { FormData } from "@/utils/progressCalculator";
import { ProgressStats } from "./components/ProgressStats";
import { ActionButtons } from "./components/ActionButtons";
import { FilterBar } from "./components/FilterBar";
import { EmployeeTable } from "./components/EmployeeTable";

interface DashboardViewProps {
  formData: FormData;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ formData }) => {
  // Transform form data for display
  const employeeData = formData.personal ? [
    {
      name: `${formData.personal.firstName} ${formData.personal.lastName}`,
      email: formData.personal.email,
      jobTitle: formData.experience?.[0]?.jobTitle || "Not specified",
      department: "Not specified",
      site: formData.personal.presentAddress.city || "Not specified",
      salary: "Not specified",
      startDate: formData.experience?.[0]?.startDate || "Not specified",
      lifecycle: "Full-time",
      status: "Active"
    }
  ] : [];

  return (
    <div className="space-y-8">
      {/* Title and Progress Section */}
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-brand-primary">People</h1>
        <ProgressStats employeeCount={employeeData.length} />
        <div className="flex justify-between items-center">
          <ActionButtons />
        </div>
      </div>

      <FilterBar />
      <EmployeeTable employees={employeeData} />
    </div>
  );
};
