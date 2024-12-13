import { Json } from "@/integrations/supabase/types";

export interface CVData {
  region: string;
  [key: string]: any; // Allow for other CV fields
}

export interface UserCV {
  id: string;
  user_id: string;
  content: string | null;
  parsed_data: CVData | null;
  analysis_results: Json | null;
  version: number | null;
  created_at: string | null;
  updated_at: string | null;
}