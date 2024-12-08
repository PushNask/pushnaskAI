import { z } from "https://deno.land/x/zod@v3.16.1/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

class RateLimiter {
  private requests: Map<string, number[]> = new Map();

  isRateLimited(userId: string, config: RateLimitConfig): boolean {
    const now = Date.now();
    const windowStart = now - config.windowMs;
    
    // Get existing requests
    let userRequests = this.requests.get(userId) || [];
    
    // Remove old requests
    userRequests = userRequests.filter(timestamp => timestamp > windowStart);
    
    // Check if rate limited
    if (userRequests.length >= config.maxRequests) {
      return true;
    }
    
    // Add new request
    userRequests.push(now);
    this.requests.set(userId, userRequests);
    
    return false;
  }
}

const rateLimiter = new RateLimiter();

async function validateAuth(req: Request): Promise<string> {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader) {
    throw new Error('Missing authorization header');
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  );

  const { data: { user }, error } = await supabase.auth.getUser(authHeader.replace('Bearer ', ''));
  
  if (error || !user) {
    throw new Error('Invalid authorization');
  }

  return user.id;
}

function handleError(error: unknown) {
  console.error('Error:', error);
  
  if (error instanceof z.ZodError) {
    return new Response(
      JSON.stringify({
        error: 'Validation error',
        details: error.errors
      }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }

  if (error instanceof Error) {
    const status = error.message.includes('authorization') ? 401 : 500;
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }

  return new Response(
    JSON.stringify({ error: 'An unexpected error occurred' }),
    {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    }
  );
}

export {
  corsHeaders,
  rateLimiter,
  validateAuth,
  handleError,
  type RateLimitConfig
};