import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { z } from "https://deno.land/x/zod@v3.16.1/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";
import { corsHeaders, rateLimiter, validateAuth, handleError } from "../utils/security.ts";

// Input validation schema
const ChatRequestSchema = z.object({
  messages: z.array(z.object({
    role: z.enum(['user', 'assistant', 'system']),
    content: z.string().min(1).max(4000)
  })),
  serviceType: z.enum(['career', 'global', 'education', 'business']),
  userId: z.string().uuid()
});

// Rate limit configuration
const RATE_LIMIT: { maxRequests: number; windowMs: number } = {
  maxRequests: 20,
  windowMs: 60000 // 1 minute
};

serve(async (req) => {
  // Handle CORS preflight requests
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

    // Parse and validate request body
    const body = await req.json();
    const validatedData = ChatRequestSchema.parse(body);

    // Verify user is accessing their own data
    if (validatedData.userId !== userId) {
      throw new Error('Unauthorized access');
    }

    // Get user profile for context
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { data: profile } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    // Convert messages to Anthropic format
    const anthropicMessages = validatedData.messages.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'assistant',
      content: msg.content
    }));

    // Add system message based on service type and user profile
    const systemMessage = generateSystemPrompt(validatedData.serviceType, profile);
    anthropicMessages.unshift({ role: 'system', content: systemMessage });

    console.log('Sending request to Anthropic:', { messages: anthropicMessages });

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': Deno.env.get('ANTHROPIC_API_KEY') || '',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        messages: anthropicMessages,
        max_tokens: 1024,
      }),
    });

    const data = await response.json();
    console.log('Received response from Anthropic:', data);

    if (!response.ok) {
      throw new Error(data.error?.message || 'Error calling Anthropic API');
    }

    // Extract just the text content from the response
    const content = data.content[0].text;

    return new Response(
      JSON.stringify({ content }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return handleError(error);
  }
});

function generateSystemPrompt(serviceType: string, profile: any): string {
  const basePrompt = "You are a professional AI advisor for PushNask, specializing in providing personalized guidance. ";
  
  const servicePrompts = {
    career: `You are a career development expert. Focus on providing actionable advice for career growth, skill development, and professional opportunities. The user's current role is ${profile?.job_role || 'not specified'}.`,
    global: "You are an international opportunities expert. Help users explore global prospects, whether for work, education, or business ventures.",
    education: "You are an educational guidance counselor. Assist users in finding the right educational paths, programs, and learning opportunities.",
    business: "You are a business development advisor. Guide users in entrepreneurial ventures, from ideation to execution and growth strategies."
  };

  return basePrompt + (servicePrompts[serviceType as keyof typeof servicePrompts] || basePrompt);
}