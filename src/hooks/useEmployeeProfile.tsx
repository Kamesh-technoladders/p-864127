
import { useState } from "react";
import { useEmployeeData } from "./useEmployeeData";
import { toast } from "sonner";
import { differenceInMonths } from "date-fns";

export const useEmployeeProfile = (id: string | undefined) => {
  const { isLoading, employeeData, error, fetchEmployeeData, updateEmployee } = useEmployeeData(id);
  const [isEmploymentModalOpen, setIsEmploymentModalOpen] = useState(false);
  const [isPersonalModalOpen, setIsPersonalModalOpen] = useState(false);

  const handleEdit = (section: string) => {
    if (section === "employment") {
      setIsEmploymentModalOpen(true);
    } else if (section === "personal") {
      setIsPersonalModalOpen(true);
    } else {
      toast.info(`Editing ${section} details`);
    }
  };

  const handleUpdateEmployment = async (data: any) => {
    try {
      await updateEmployee("employment", data);
      await fetchEmployeeData();
    } catch (error) {
      throw error;
    }
  };

  const handleUpdatePersonal = async (data: any) => {
    try {
      await updateEmployee("personal", data);
      await fetchEmployeeData();
      setIsPersonalModalOpen(false);
      toast.success("Personal details updated successfully");
    } catch (error) {
      console.error("Error updating personal details:", error);
      toast.error("Failed to update personal details");
    }
  };

  const calculateTotalExperience = () => {
    if (!employeeData?.experience || employeeData.experience.length === 0) {
      return "0.0 years";
    }

    let totalMonths = 0;
    employeeData.experience.forEach((exp) => {
      const start = new Date(exp.startDate);
      const end = exp.endDate ? new Date(exp.endDate) : new Date();
      totalMonths += differenceInMonths(end, start);
    });

    const years = totalMonths / 12;
    return `${years.toFixed(1)} years`;
  };

  const calculateYearsOfExperience = (joinedDate: string) => {
    const joined = new Date(joinedDate);
    const now = new Date();
    const years = now.getFullYear() - joined.getFullYear();
    const months = now.getMonth() - joined.getMonth();
    if (months < 0) {
      return `${years - 1} years`;
    }
    return `${years} years`;
  };

  return {
    isLoading,
    employeeData,
    error,
    isEmploymentModalOpen,
    setIsEmploymentModalOpen,
    isPersonalModalOpen,
    setIsPersonalModalOpen,
    handleEdit,
    handleUpdateEmployment,
    handleUpdatePersonal,
    calculateYearsOfExperience,
    calculateTotalExperience,
    fetchEmployeeData
  };
};
