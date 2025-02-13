
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const formData = await req.formData()
    const file = formData.get('file')
    const type = formData.get('type')
    const documentType = formData.get('documentType')
    const experienceId = formData.get('experienceId')

    if (!file || !type || !experienceId) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Create a unique file name
    const fileName = `${experienceId}/${type}/${crypto.randomUUID()}-${file.name}`
    
    // Upload file to storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('employee-documents')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (uploadError) {
      throw uploadError
    }

    // Get the public URL of the uploaded file
    const { data: { publicUrl } } = supabase.storage
      .from('employee-documents')
      .getPublicUrl(fileName)

    // Update the experience record with the document URL
    let updateData = {}
    switch (documentType) {
      case 'offerLetter':
        updateData = { offer_letter_url: publicUrl }
        break
      case 'separationLetter':
        updateData = { separation_letter_url: publicUrl }
        break
      case 'payslips':
        // For payslips, we append to the existing array
        const { data: currentExperience } = await supabase
          .from('employee_experiences')
          .select('payslips')
          .eq('id', experienceId)
          .single()
        
        const currentPayslips = currentExperience?.payslips || []
        updateData = { 
          payslips: [...currentPayslips, publicUrl]
        }
        break
      default:
        updateData = { document_url: publicUrl }
    }

    const { error: updateError } = await supabase
      .from('employee_experiences')
      .update(updateData)
      .eq('id', experienceId)

    if (updateError) {
      throw updateError
    }

    return new Response(
      JSON.stringify({ url: publicUrl }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error processing request:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
