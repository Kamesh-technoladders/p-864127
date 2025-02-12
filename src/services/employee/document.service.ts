
import { supabase } from "@/integrations/supabase/client";

export interface EmployeeDocument {
  id: string;
  employee_id: string;
  document_type: string;
  category: string;
  file_name: string;
  file_path: string;
  file_size?: number;
  mime_type?: string;
  upload_date: string;
  status: string;
}

class DocumentService {
  async uploadDocument(
    file: File,
    employeeId: string,
    category: string,
    documentType: string
  ): Promise<EmployeeDocument> {
    try {
      // Create form data for the function call
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', category);
      formData.append('employeeId', employeeId);
      formData.append('documentType', documentType);

      // Call the Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('upload-document', {
        body: formData,
      });

      if (error) throw error;

      // Get document details from the response
      const { data: document, error: dbError } = await supabase
        .from('employee_documents')
        .select()
        .eq('employee_id', employeeId)
        .eq('document_type', documentType)
        .eq('category', category)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (dbError) throw dbError;
      return document;
    } catch (error) {
      console.error('Error uploading document:', error);
      throw error;
    }
  }

  async downloadDocument(documentId: string): Promise<string> {
    const { data: document, error: fetchError } = await supabase
      .from('employee_documents')
      .select('*')
      .eq('id', documentId)
      .single();

    if (fetchError) throw fetchError;

    const { data: fileData, error: downloadError } = await supabase.storage
      .from('employee-documents')
      .download(document.file_path);

    if (downloadError) throw downloadError;

    const url = URL.createObjectURL(fileData);
    return url;
  }

  async getEmployeeDocuments(employeeId: string, category?: string): Promise<EmployeeDocument[]> {
    let query = supabase
      .from('employee_documents')
      .select('*')
      .eq('employee_id', employeeId)
      .eq('status', 'active');

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  }
}

export const documentService = new DocumentService();
