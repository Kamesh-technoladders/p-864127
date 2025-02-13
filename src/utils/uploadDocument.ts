
import { supabase } from "@/integrations/supabase/client";

export const uploadDocument = async (
  file: File,
  type: 'education' | 'experience' | 'bank',
  employeeId: string
): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    formData.append('employeeId', employeeId);

    const { data, error } = await supabase.functions.invoke('upload-document', {
      body: formData
    });

    if (error) {
      console.error('Upload error:', error);
      throw error;
    }

    if (!data?.url) {
      throw new Error('No URL returned from upload');
    }

    return data.url;
  } catch (error) {
    console.error('Upload document error:', error);
    throw error;
  }
};
