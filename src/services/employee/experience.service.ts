
import { supabase } from "@/integrations/supabase/client";
import { Experience } from "../types/employee.types";

export const experienceService = {
  async createExperiences(employeeId: string, experiences: Experience[]) {
    if (experiences.length === 0) return;

    const experienceData = experiences.map(exp => ({
      employee_id: employeeId,
      job_title: exp.jobTitle,
      company: exp.company,
      location: exp.location,
      employment_type: exp.employmentType,
      start_date: exp.startDate,
      end_date: exp.endDate
    }));

    const { error } = await supabase
      .from('employee_experiences')
      .insert(experienceData);

    if (error) throw error;
  },

  async updateExperiences(employeeId: string, experiences: Experience[]) {
    // First delete all existing experiences
    const { error: deleteError } = await supabase
      .from('employee_experiences')
      .delete()
      .eq('employee_id', employeeId);

    if (deleteError) throw deleteError;

    // Then insert the new ones
    if (experiences.length > 0) {
      await this.createExperiences(employeeId, experiences);
    }
  }
};
