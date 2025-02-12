
import { supabase } from "@/integrations/supabase/client";
import { Education } from "../types/employee.types";

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
    // Update each document type if provided
    const promises = [];

    if (education.ssc) {
      const formData = new FormData();
      formData.append('file', education.ssc);
      formData.append('type', 'education');
      formData.append('employeeId', employeeId);
      
      const response = await fetch('/api/upload-document', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Failed to upload SSC document');
      }
      
      const { url } = await response.json();
      
      promises.push(
        supabase
          .from('employee_education')
          .update({ document_url: url })
          .eq('employee_id', employeeId)
          .eq('type', 'ssc')
      );
    }

    if (education.hsc) {
      const formData = new FormData();
      formData.append('file', education.hsc);
      formData.append('type', 'education');
      formData.append('employeeId', employeeId);
      
      const response = await fetch('/api/upload-document', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Failed to upload HSC document');
      }
      
      const { url } = await response.json();
      
      promises.push(
        supabase
          .from('employee_education')
          .update({ document_url: url })
          .eq('employee_id', employeeId)
          .eq('type', 'hsc')
      );
    }

    if (education.degree) {
      const formData = new FormData();
      formData.append('file', education.degree);
      formData.append('type', 'education');
      formData.append('employeeId', employeeId);
      
      const response = await fetch('/api/upload-document', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Failed to upload degree document');
      }
      
      const { url } = await response.json();
      
      promises.push(
        supabase
          .from('employee_education')
          .update({ document_url: url })
          .eq('employee_id', employeeId)
          .eq('type', 'degree')
      );
    }

    await Promise.all(promises);
  }
};
