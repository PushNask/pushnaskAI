import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";
import { z } from "https://deno.land/x/zod@v3.16.1/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Input validation schemas
const AnalysisRequestSchema = z.object({
  userId: z.string().uuid(),
  serviceType: z.enum(['career', 'global', 'education', 'business']),
  content: z.string().min(1),
  metadata: z.record(z.unknown()).optional(),
});

// Rate limiting implementation
const rateLimiter = new Map<string, number>();
const RATE_LIMIT = 10; // requests per minute
const RATE_WINDOW = 60000; // 1 minute in milliseconds

function isRateLimited(userId: string): boolean {
  const now = Date.now();
  const userRequests = rateLimiter.get(userId) || 0;
  
  if (userRequests >= RATE_LIMIT) {
    return true;
  }
  
  rateLimiter.set(userId, userRequests + 1);
  setTimeout(() => rateLimiter.set(userId, (rateLimiter.get(userId) || 1) - 1), RATE_WINDOW);
  
  return false;
}

async function retryWithBackoff<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3
): Promise<T> {
  let lastError: Error | null = null;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      const delay = Math.min(1000 * Math.pow(2, i), 10000);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError;
}

serve(async (req) => {
  console.log('Received request:', req.method);
  
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Parse and validate request
    const requestData = await req.json();
    const validatedData = AnalysisRequestSchema.parse(requestData);
    
    // Check rate limit
    if (isRateLimited(validatedData.userId)) {
      throw new Error('Rate limit exceeded. Please try again later.');
    }

    // Get appropriate prompt
    const { data: promptData, error: promptError } = await supabase
      .from('ai_prompts')
      .select('prompt_text')
      .eq('service_type', validatedData.serviceType)
      .eq('is_active', true)
      .single();

    if (promptError || !promptData) {
      throw new Error('Failed to fetch appropriate prompt');
    }

    // Call OpenAI with retry logic
    const openaiResponse = await retryWithBackoff(async () => {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
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
              content: validatedData.content,
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.statusText}`);
      }

      return response.json();
    });

    const initialAnalysis = openaiResponse.choices[0].message.content;

    // Get enhanced insights from Anthropic
    const anthropicResponse = await retryWithBackoff(async () => {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
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
              content: `Based on this analysis: ${initialAnalysis}, provide additional insights and recommendations.`
            }
          ],
          max_tokens: 1024,
        }),
      });

      if (!response.ok) {
        throw new Error(`Anthropic API error: ${response.statusText}`);
      }

      return response.json();
    });

    // Store analysis results
    const { error: insertError } = await supabase
      .from('ai_analysis_results')
      .insert({
        user_id: validatedData.userId,
        analysis_type: validatedData.serviceType,
        content: validatedData.content,
        results: {
          initial_analysis: initialAnalysis,
          enhanced_insights: anthropicResponse.content[0].text
        },
        metadata: {
          ...validatedData.metadata,
          timestamp: new Date().toISOString(),
          service_type: validatedData.serviceType
        }
      });

    if (insertError) {
      throw new Error(`Failed to store analysis results: ${insertError.message}`);
    }

    // Return combined analysis
    return new Response(
      JSON.stringify({
        success: true,
        analysis: {
          initial: initialAnalysis,
          enhanced: anthropicResponse.content[0].text
        }
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
    
    const statusCode = error instanceof z.ZodError ? 400 : 500;
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: errorMessage,
        details: error instanceof z.ZodError ? error.errors : undefined
      }),
      { 
        status: statusCode,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        }
      }
    );
  }
});