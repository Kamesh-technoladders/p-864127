
import { supabase } from "@/integrations/supabase/client";

export const uploadDocument = async (
  file: File,
  type: 'education' | 'experience' | 'bank',
  employeeId: string
): Promise<string> => {
  try {
    if (!file || !type || !employeeId) {
      throw new Error('Missing required fields for upload');
    }

    // Create a properly structured FormData object
    const formData = new FormData();
    formData.append('file', file, file.name); // Include filename explicitly
    formData.append('type', type);
    formData.append('employeeId', employeeId);

    // Use the supabase client to handle the URL construction
    const { data, error } = await supabase.functions.invoke('upload-document', {
      body: formData,
      headers: {
        'Accept': 'application/json',
      },
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
