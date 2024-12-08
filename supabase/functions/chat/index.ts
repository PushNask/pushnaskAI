import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, serviceType, userId } = await req.json();

    // Get user profile for context
    const { data: profile } = await supabaseClient
      .from('user_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    // Convert messages to Anthropic format
    const anthropicMessages = messages.map((msg: any) => ({
      role: msg.role === 'user' ? 'user' : 'assistant',
      content: msg.content
    }));

    // Add system message based on service type and user profile
    const systemMessage = generateSystemPrompt(serviceType, profile);
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
    console.error('Error in chat function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
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