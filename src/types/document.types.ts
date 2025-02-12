
export interface DocumentMetadata {
  id: string;
  file_name: string;
  file_path: string;
  mime_type: string;
}

export interface EmployeeDocument extends DocumentMetadata {
  employee_id: string;
  document_type: string;
  category: string;
  file_size?: number;
  upload_date: string;
  status: string;
}
