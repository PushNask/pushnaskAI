import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";
import { Configuration, OpenAIApi } from "https://esm.sh/openai@3.1.0";
import { z } from "https://deno.land/x/zod@v3.16.1/mod.ts";
import { corsHeaders, rateLimiter, validateAuth, handleError } from "../utils/security.ts";

// Input validation schema
const AnalyzeRequestSchema = z.object({
  cvId: z.string().uuid()
});

// Rate limit configuration
const RATE_LIMIT = {
  maxRequests: 5,
  windowMs: 300000 // 5 minutes
};

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
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Validate authentication
    const userId = await validateAuth(req);
    
    // Check rate limit
    if (rateLimiter.isRateLimited(userId, RATE_LIMIT)) {
      throw new Error('Rate limit exceeded. Please try again later.');
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Parse and validate request
    const { cvId } = AnalyzeRequestSchema.parse(await req.json());

    // Verify CV ownership
    const { data: cv, error: cvError } = await supabaseClient
      .from('user_cvs')
      .select('content')
      .eq('id', cvId)
      .eq('user_id', userId)
      .single();

    if (cvError || !cv) {
      throw new Error('CV not found or access denied');
    }

    // Initialize OpenAI
    const openai = new OpenAIApi(new Configuration({
      apiKey: Deno.env.get('OPENAI_API_KEY'),
    }));

    // Analyze CV with OpenAI
    const completion = await openai.createChatCompletion({
      model: "gpt-4o-mini",
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
    });

    const analysis: CVAnalysis = JSON.parse(completion.data.choices[0].message?.content || '{}');

    // Update CV with analysis results
    const { error: updateError } = await supabaseClient
      .from('user_cvs')
      .update({
        analysis_results: analysis,
        updated_at: new Date().toISOString()
      })
      .eq('id', cvId)
      .eq('user_id', userId);

    if (updateError) {
      throw updateError;
    }

    return new Response(
      JSON.stringify({ success: true, analysis }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return handleError(error);
  }
});