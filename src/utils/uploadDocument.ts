
import { supabase } from "@/integrations/supabase/client";

export const uploadDocument = async (
  file: File,
  bucketName: string,
  type: string
): Promise<string> => {
  try {
    if (!file || !bucketName || !type) {
      throw new Error('Missing required fields for upload');
    }

    // Create a properly structured FormData object
    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('type', type);

    // Upload to storage bucket
    const fileName = `${type}/${crypto.randomUUID()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      throw uploadError;
    }

    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucketName)
      .getPublicUrl(fileName);

    return publicUrl;
  } catch (error) {
    console.error('Upload document error:', error);
    throw error;
  }
};
