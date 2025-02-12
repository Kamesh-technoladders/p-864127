
import { documentService } from "@/services/employee/document.service";

export const uploadDocument = async (
  file: File,
  type: 'education' | 'experience' | 'bank',
  employeeId: string,
  documentType: string
): Promise<string> => {
  try {
    const document = await documentService.uploadDocument(
      file,
      employeeId,
      type,
      documentType
    );
    return document.file_path;
  } catch (error) {
    console.error('Error uploading document:', error);
    throw error;
  }
};
