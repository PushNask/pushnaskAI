import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AnalysisRequest {
  type: 'cv' | 'career' | 'education';
  content: string;
  userId: string;
  metadata?: Record<string, unknown>;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { type, content, userId, metadata } = await req.json() as AnalysisRequest;

    // Get the appropriate prompt based on analysis type
    const { data: promptData, error: promptError } = await supabase
      .from('ai_prompts')
      .select('prompt_text')
      .eq('service_type', type)
      .eq('is_active', true)
      .single();

    if (promptError || !promptData) {
      throw new Error('Failed to fetch prompt');
    }

    // Call OpenAI API for analysis
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: promptData.prompt_text,
          },
          {
            role: 'user',
            content,
          },
        ],
      }),
    });

    if (!openaiResponse.ok) {
      throw new Error('OpenAI API request failed');
    }

    const aiResult = await openaiResponse.json();
    const analysisContent = aiResult.choices[0].message.content;

    // Parse the AI response
    let results;
    let recommendations;
    try {
      const parsed = JSON.parse(analysisContent);
      results = parsed.results || parsed;
      recommendations = parsed.recommendations || [];
    } catch (e) {
      results = { content: analysisContent };
      recommendations = [];
    }

    // Store analysis results
    const { data: analysisData, error: analysisError } = await supabase
      .from('ai_analysis_results')
      .insert({
        user_id: userId,
        analysis_type: type,
        content,
        results,
        recommendations,
        metadata,
      })
      .select()
      .single();

    if (analysisError) {
      throw analysisError;
    }

    // Get additional context from Anthropic for enhanced recommendations
    const anthropicResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': Deno.env.get('ANTHROPIC_API_KEY') || '',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        messages: [
          {
            role: 'user',
            content: `Based on this analysis: ${JSON.stringify(results)}, provide additional career development insights and recommendations.`
          }
        ],
        max_tokens: 1024,
      }),
    });

    if (!anthropicResponse.ok) {
      console.error('Anthropic API request failed, continuing with OpenAI results only');
    } else {
      const anthropicData = await anthropicResponse.json();
      const enhancedRecommendations = anthropicData.content[0].text;

      // Update the analysis with enhanced recommendations
      await supabase
        .from('ai_analysis_results')
        .update({
          metadata: {
            ...metadata,
            enhanced_recommendations: enhancedRecommendations
          }
        })
        .eq('id', analysisData.id);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        data: analysisData 
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );

  } catch (error) {
    console.error('Error in ai-advisor function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message 
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        }
      }
    );
  }
});