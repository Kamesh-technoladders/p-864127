
import { supabase } from "@/integrations/supabase/client";

export const uploadDocument = async (
  file: File,
  type: 'education' | 'experience' | 'bank',
  employeeId: string
): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('type', type);
  formData.append('employeeId', employeeId);

  const { data, error } = await supabase.functions.invoke('upload-document', {
    body: formData
  });

  if (error) throw error;
  return data.url;
};
