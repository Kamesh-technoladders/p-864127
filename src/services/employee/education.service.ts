
import { supabase } from "@/integrations/supabase/client";
import { Education } from "../types/employee.types";

export const educationService = {
  async fetchEducation(employeeId: string) {
    const { data, error } = await supabase
      .from('employee_education')
      .select('*')
      .eq('employee_id', employeeId);

    if (error) throw error;
    return data;
  },

  async createEducation(employeeId: string, education: Education) {
    const educationData = [
      { 
        employee_id: employeeId, 
        type: 'ssc', 
        document_url: null,
        document_type: 'certificate',
        institute: education.institute,
        year_completed: education.yearCompleted
      },
      { 
        employee_id: employeeId, 
        type: 'hsc', 
        document_url: null,
        document_type: 'certificate',
        institute: education.institute,
        year_completed: education.yearCompleted
      },
      { 
        employee_id: employeeId, 
        type: 'degree', 
        document_url: null,
        document_type: 'certificate',
        institute: education.institute,
        year_completed: education.yearCompleted
      }
    ];

    const { error } = await supabase
      .from('employee_education')
      .insert(educationData);

    if (error) throw error;
  },

  async updateEducation(employeeId: string, education: Partial<Education>) {
    const uploadDocument = async (file: File, type: string) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', 'education');
      formData.append('employeeId', employeeId);
      
      const response = await fetch('/api/upload-document', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`Failed to upload ${type} document`);
      }
      
      const { url } = await response.json();
      
      const { error } = await supabase
        .from('employee_education')
        .update({ 
          document_url: url,
          institute: education.institute,
          year_completed: education.yearCompleted
        })
        .eq('employee_id', employeeId)
        .eq('type', type);

      if (error) throw error;
    };

    const promises = [];

    if (education.ssc) {
      promises.push(uploadDocument(education.ssc, 'ssc'));
    }

    if (education.hsc) {
      promises.push(uploadDocument(education.hsc, 'hsc'));
    }

    if (education.degree) {
      promises.push(uploadDocument(education.degree, 'degree'));
    }

    // If only institute or year completed is updated without new documents
    if (!education.ssc && !education.hsc && !education.degree && (education.institute || education.yearCompleted)) {
      promises.push(
        supabase
          .from('employee_education')
          .update({
            institute: education.institute,
            year_completed: education.yearCompleted
          })
          .eq('employee_id', employeeId)
      );
    }

    await Promise.all(promises);
  }
};
