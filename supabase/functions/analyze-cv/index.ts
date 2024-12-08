import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1"
import { Configuration, OpenAIApi } from "https://esm.sh/openai@3.1.0"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface CVAnalysis {
  skills: string[];
  experience: {
    role: string;
    duration: string;
    highlights: string[];
  }[];
  recommendations: {
    title: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
  }[];
  improvement_areas: string[];
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const openai = new OpenAIApi(new Configuration({
      apiKey: Deno.env.get('OPENAI_API_KEY'),
    }))

    const { cvId } = await req.json()

    // Fetch CV content
    const { data: cv, error: cvError } = await supabaseClient
      .from('user_cvs')
      .select('content')
      .eq('id', cvId)
      .single()

    if (cvError || !cv) {
      throw new Error('CV not found')
    }

    // Analyze CV with OpenAI
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a professional CV analyzer. Analyze the CV and provide structured feedback."
        },
        {
          role: "user",
          content: cv.content
        }
      ],
    })

    const analysis: CVAnalysis = JSON.parse(completion.data.choices[0].message?.content || '{}')

    // Update CV with analysis results
    const { error: updateError } = await supabaseClient
      .from('user_cvs')
      .update({
        analysis_results: analysis,
        updated_at: new Date().toISOString()
      })
      .eq('id', cvId)

    if (updateError) {
      throw updateError
    }

    return new Response(
      JSON.stringify({ success: true, analysis }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})