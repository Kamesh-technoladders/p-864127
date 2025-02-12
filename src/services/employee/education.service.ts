
import { supabase } from "@/integrations/supabase/client";
import { Education } from "../types/employee.types";

export const educationService = {
  async createEducation(employeeId: string, education: Education) {
    const educationData = [
      { employee_id: employeeId, type: 'ssc' },
      { employee_id: employeeId, type: 'hsc' },
      { employee_id: employeeId, type: 'degree' }
    ];

    const { error } = await supabase
      .from('employee_education')
      .insert(educationData);

    if (error) throw error;
  },

  async updateEducation(employeeId: string, education: Partial<Education>) {
    // Update each document type if provided
    const promises = [];

    if (education.ssc) {
      promises.push(
        supabase
          .from('employee_education')
          .update({ document_url: 'url_here' }) // URL will be set by upload function
          .eq('employee_id', employeeId)
          .eq('type', 'ssc')
      );
    }

    if (education.hsc) {
      promises.push(
        supabase
          .from('employee_education')
          .update({ document_url: 'url_here' })
          .eq('employee_id', employeeId)
          .eq('type', 'hsc')
      );
    }

    if (education.degree) {
      promises.push(
        supabase
          .from('employee_education')
          .update({ document_url: 'url_here' })
          .eq('employee_id', employeeId)
          .eq('type', 'degree')
      );
    }

    await Promise.all(promises);
  }
};
