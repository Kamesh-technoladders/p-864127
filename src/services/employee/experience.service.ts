
import { supabase } from "@/integrations/supabase/client";
import { Experience } from "../types/employee.types";
import { uploadDocument } from "@/utils/uploadDocument";

export const experienceService = {
  async fetchExperiences(employeeId: string) {
    const { data, error } = await supabase
      .from('employee_experiences')
      .select('*')
      .eq('employee_id', employeeId)
      .eq('status', 'active')
      .order('start_date', { ascending: false });

    if (error) throw error;
    return data;
  },

  async createExperience(employeeId: string, experience: Experience) {
    const { data, error } = await supabase
      .from('employee_experiences')
      .insert({
        employee_id: employeeId,
        job_title: experience.jobTitle,
        company: experience.company,
        location: experience.location,
        employment_type: experience.employmentType,
        start_date: experience.startDate,
        end_date: experience.endDate,
        status: 'active'
      })
      .select()
      .single();

    if (error) throw error;

    // Handle document uploads if present
    if (experience.offerLetter || experience.separationLetter || experience.payslips.length > 0) {
      await this.uploadExperienceDocuments(employeeId, data.id, experience);
    }

    return data;
  },

  async updateExperience(employeeId: string, experienceId: string, experience: Experience) {
    const { error } = await supabase
      .from('employee_experiences')
      .update({
        job_title: experience.jobTitle,
        company: experience.company,
        location: experience.location,
        employment_type: experience.employmentType,
        start_date: experience.startDate,
        end_date: experience.endDate
      })
      .eq('id', experienceId)
      .eq('employee_id', employeeId);

    if (error) throw error;

    // Handle document uploads if present
    if (experience.offerLetter || experience.separationLetter || experience.payslips.length > 0) {
      await this.uploadExperienceDocuments(employeeId, experienceId, experience);
    }
  },

  async deleteExperience(employeeId: string, experienceId: string) {
    // Soft delete by updating status
    const { error } = await supabase
      .from('employee_experiences')
      .update({ status: 'inactive' })
      .eq('id', experienceId)
      .eq('employee_id', employeeId);

    if (error) throw error;
  },

  private async uploadExperienceDocuments(
    employeeId: string,
    experienceId: string,
    experience: Experience
  ) {
    const uploadPromises = [];

    if (experience.offerLetter) {
      uploadPromises.push(
        uploadDocument(experience.offerLetter, 'experience', employeeId)
          .then(async (url) => {
            const { error } = await supabase
              .from('employee_experiences')
              .update({ offer_letter_url: url })
              .eq('id', experienceId);
            if (error) throw error;
          })
      );
    }

    if (experience.separationLetter) {
      uploadPromises.push(
        uploadDocument(experience.separationLetter, 'experience', employeeId)
          .then(async (url) => {
            const { error } = await supabase
              .from('employee_experiences')
              .update({ separation_letter_url: url })
              .eq('id', experienceId);
            if (error) throw error;
          })
      );
    }

    if (experience.payslips.length > 0) {
      const payslipUrls = await Promise.all(
        experience.payslips.map(file => 
          uploadDocument(file, 'experience', employeeId)
        )
      );

      uploadPromises.push(
        supabase
          .from('employee_experiences')
          .update({ payslips: payslipUrls })
          .eq('id', experienceId)
      );
    }

    await Promise.all(uploadPromises);
  }
};
