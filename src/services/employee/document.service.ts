
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
      const fileName = `${employeeId}/${category}/${documentType}/${crypto.randomUUID()}-${file.name}`;
      
      // Upload file to storage
      const { error: uploadError } = await supabase.storage
        .from('employee-documents')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('employee-documents')
        .getPublicUrl(fileName);

      // Create document metadata
      const { data: document, error: dbError } = await supabase
        .from('employee_documents')
        .insert({
          employee_id: employeeId,
          document_type: documentType,
          category,
          file_name: file.name,
          file_path: fileName,
          file_size: file.size,
          mime_type: file.type,
        })
        .select()
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
