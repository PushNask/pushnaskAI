import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";
import Stripe from "https://esm.sh/stripe@14.21.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
    });

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    );

    // Get the authorization header from the request
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    // Get the JWT token from the authorization header
    const token = authHeader.replace('Bearer ', '');
    
    // Get the user from Supabase
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError || !user) {
      throw new Error('Error getting user');
    }

    // Parse the request body
    const { serviceId, quantity } = await req.json();
    
    // Get service price from the configuration
    const servicePrices = {
      career: 499, // $4.99
      global: 1299, // $12.99
      education: 800, // $8.00
      entrepreneurial: 1200, // $12.00
    };

    const amount = servicePrices[serviceId as keyof typeof servicePrices] * quantity;
    if (!amount) {
      throw new Error('Invalid service ID');
    }

    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${quantity} Credits for ${serviceId}`,
              description: `Purchase ${quantity} credits for the ${serviceId} service`,
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/dashboard`,
      customer_email: user.email,
      metadata: {
        userId: user.id,
        serviceId,
        quantity,
      },
    });

    // Create a payment record in our database
    const { error: paymentError } = await supabaseClient
      .from('payments')
      .insert({
        user_id: user.id,
        amount: amount / 100, // Convert from cents to dollars
        payment_intent_id: session.payment_intent,
        payment_method: 'stripe',
        metadata: {
          serviceId,
          quantity,
          checkout_session_id: session.id,
        },
      });

    if (paymentError) {
      console.error('Error creating payment record:', paymentError);
      throw new Error('Error creating payment record');
    }

    return new Response(
      JSON.stringify({ sessionId: session.id, url: session.url }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});