// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://zzhranwgnmbamhajflcv.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp6aHJhbndnbm1iYW1oYWpmbGN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM2MDAyNjksImV4cCI6MjA0OTE3NjI2OX0.9vuevMTRTrAi9g3tRxjLGwFEVjKUMlfcV0uOXeoIAzA";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);