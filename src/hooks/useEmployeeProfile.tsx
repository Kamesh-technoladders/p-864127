
import { useState, useCallback, useEffect } from "react";
import { useEmployeeData } from "./useEmployeeData";
import { toast } from "sonner";
import { differenceInMonths, parseISO } from "date-fns";
import { supabase } from "@/integrations/supabase/client";

export const useEmployeeProfile = (id: string | undefined) => {
  const { isLoading, employeeData, error, fetchEmployeeData, updateEmployee } = useEmployeeData(id);
  const [isEmploymentModalOpen, setIsEmploymentModalOpen] = useState(false);
  const [isPersonalModalOpen, setIsPersonalModalOpen] = useState(false);
  const [totalExperience, setTotalExperience] = useState("0.0 years");

  const calculateTotalExperience = useCallback(() => {
    console.log('Calculating total experience with data:', employeeData?.experience);
    
    if (!employeeData?.experience || !Array.isArray(employeeData.experience) || employeeData.experience.length === 0) {
      console.log('No experience data found');
      setTotalExperience("0.0 years");
      return;
    }

    // Sort experiences by start date
    const sortedExperiences = [...employeeData.experience].sort(
      (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );

    let totalMonths = 0;
    let lastEndDate: Date | null = null;

    sortedExperiences.forEach((exp) => {
      if (!exp.startDate) {
        console.log('Skipping experience record with no start date:', exp);
        return;
      }
      
      const startDate = parseISO(exp.startDate);
      const endDate = exp.endDate ? parseISO(exp.endDate) : new Date();
      
      console.log('Processing experience:', {
        start: startDate.toISOString(),
        end: endDate.toISOString(),
        experience: exp
      });

      if (!lastEndDate || startDate > lastEndDate) {
        // Non-overlapping experience
        totalMonths += differenceInMonths(endDate, startDate);
        lastEndDate = endDate;
      } else if (endDate > lastEndDate) {
        // Partially overlapping experience
        totalMonths += differenceInMonths(endDate, lastEndDate);
        lastEndDate = endDate;
      }
    });

    const years = totalMonths / 12;
    console.log('Total years calculated:', years);
    setTotalExperience(`${years.toFixed(1)} years`);
  }, [employeeData?.experience]);

  // Subscribe to experience and work time changes
  useEffect(() => {
    if (!id) return;

    calculateTotalExperience();

    const experienceChannel = supabase
      .channel('experience-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'employee_experiences',
          filter: `employee_id=eq.${id}`
        },
        () => {
          console.log('Experience data changed, refreshing...');
          fetchEmployeeData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(experienceChannel);
    };
  }, [id, fetchEmployeeData, calculateTotalExperience]);

  // Recalculate when data changes
  useEffect(() => {
    calculateTotalExperience();
  }, [employeeData?.experience, calculateTotalExperience]);

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
    totalExperience,
    fetchEmployeeData
  };
};
