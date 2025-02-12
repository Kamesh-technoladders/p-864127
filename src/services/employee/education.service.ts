
import { supabase } from "@/integrations/supabase/client";
import { Education } from "../types/employee.types";
import { documentService } from "./document.service";

export const educationService = {
  async createEducation(employeeId: string, education: Education) {
    const educationData = [
      { employee_id: employeeId, type: 'ssc', document_url: null },
      { employee_id: employeeId, type: 'hsc', document_url: null },
      { employee_id: employeeId, type: 'degree', document_url: null }
    ];

    const { error } = await supabase
      .from('employee_education')
      .insert(educationData);

    if (error) throw error;
  },

  async updateEducation(employeeId: string, education: Partial<Education>) {
    const promises = [];

    if (education.ssc) {
      promises.push(
        documentService.uploadDocument(
          education.ssc,
          employeeId,
          'education',
          'ssc'
        )
      );
    }

    if (education.hsc) {
      promises.push(
        documentService.uploadDocument(
          education.hsc,
          employeeId,
          'education',
          'hsc'
        )
      );
    }

    if (education.degree) {
      promises.push(
        documentService.uploadDocument(
          education.degree,
          employeeId,
          'education',
          'degree'
        )
      );
    }

    await Promise.all(promises);
  }
};
