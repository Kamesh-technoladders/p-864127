
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const formData = await req.formData()
    const file = formData.get('file')
    const type = formData.get('type')
    const employeeId = formData.get('employeeId')

    if (!file || !type || !employeeId) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const fileName = `${employeeId}/${type}/${crypto.randomUUID()}-${file.name}`
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('employee-documents')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (uploadError) {
      throw uploadError
    }

    const { data: documentUrl } = supabase.storage
      .from('employee-documents')
      .getPublicUrl(fileName)

    let tableToUpdate = ''
    switch (type) {
      case 'education':
        tableToUpdate = 'employee_education'
        break
      case 'experience':
        tableToUpdate = 'employee_experiences'
        break
      case 'bank':
        tableToUpdate = 'employee_bank_details'
        break
      default:
        throw new Error('Invalid document type')
    }

    const { error: updateError } = await supabase
      .from(tableToUpdate)
      .update({ document_url: documentUrl.publicUrl })
      .eq('employee_id', employeeId)

    if (updateError) {
      throw updateError
    }

    return new Response(
      JSON.stringify({ url: documentUrl.publicUrl }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
