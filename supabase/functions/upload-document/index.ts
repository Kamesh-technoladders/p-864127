
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, accept',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json'
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { 
      headers: corsHeaders,
      status: 204
    });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file');
    const type = formData.get('type');

    console.log('Received form data:', {
      file: file ? 'File present' : 'No file',
      type: type || 'No type'
    });

    if (!file || !type) {
      return new Response(
        JSON.stringify({ 
          error: 'Missing required fields',
          details: {
            file: !file ? 'Missing file' : 'Present',
            type: !type ? 'Missing type' : type
          }
        }),
        { 
          headers: corsHeaders,
          status: 400 
        }
      );
    }

    // Validate file is actually a File object
    if (!(file instanceof File)) {
      return new Response(
        JSON.stringify({ error: 'Invalid file format' }),
        { 
          headers: corsHeaders,
          status: 400 
        }
      );
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Create a properly structured file name
    const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const fileName = `${type}/${crypto.randomUUID()}-${sanitizedFileName}`;
    
    console.log('Attempting to upload file:', fileName);

    // Upload file to storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('employee-documents')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return new Response(
        JSON.stringify({ 
          error: 'Upload failed',
          details: uploadError.message
        }),
        { 
          headers: corsHeaders,
          status: 500 
        }
      );
    }

    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from('employee-documents')
      .getPublicUrl(fileName);

    console.log('Upload successful, public URL:', publicUrl);

    return new Response(
      JSON.stringify({ 
        url: publicUrl,
        fileName: sanitizedFileName
      }),
      { 
        headers: corsHeaders,
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error processing request:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Server error',
        details: error.message
      }),
      { 
        headers: corsHeaders,
        status: 500 
      }
    );
  }
});
