
export interface UploadedFile {
  id: string;
  name: string;
  type: string;
  url?: string;
}

export interface DocumentMetadata {
  id: string;
  file_name: string;
  file_path: string;
  mime_type: string;
}

export interface EmployeeDocument {
  id: string;
  employee_id: string;
  document_type: string;
  category: string;
  file_name: string;
  file_path: string;
  file_size?: number;
  mime_type: string; // Changed from optional to required
  upload_date: string;
  status: string;
}
