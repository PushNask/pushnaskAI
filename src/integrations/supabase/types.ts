export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      ai_analysis_results: {
        Row: {
          analysis_type: string
          content: string
          created_at: string | null
          id: string
          metadata: Json | null
          recommendations: Json | null
          results: Json | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          analysis_type: string
          content: string
          created_at?: string | null
          id?: string
          metadata?: Json | null
          recommendations?: Json | null
          results?: Json | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          analysis_type?: string
          content?: string
          created_at?: string | null
          id?: string
          metadata?: Json | null
          recommendations?: Json | null
          results?: Json | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      ai_prompts: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          metadata: Json | null
          name: string
          prompt_text: string
          service_type: string
          updated_at: string | null
          version: number | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          metadata?: Json | null
          name: string
          prompt_text: string
          service_type: string
          updated_at?: string | null
          version?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          metadata?: Json | null
          name?: string
          prompt_text?: string
          service_type?: string
          updated_at?: string | null
          version?: number | null
        }
        Relationships: []
      }
      audit_logs: {
        Row: {
          created_at: string | null
          details: Json | null
          event_type: string
          id: string
          metadata: Json | null
          resource_id: string | null
          resource_type: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          details?: Json | null
          event_type: string
          id?: string
          metadata?: Json | null
          resource_id?: string | null
          resource_type?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          details?: Json | null
          event_type?: string
          id?: string
          metadata?: Json | null
          resource_id?: string | null
          resource_type?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      cv_analysis_results: {
        Row: {
          analysis_type: string
          created_at: string | null
          cv_id: string | null
          id: string
          recommendations: Json | null
          results: Json | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          analysis_type: string
          created_at?: string | null
          cv_id?: string | null
          id?: string
          recommendations?: Json | null
          results?: Json | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          analysis_type?: string
          created_at?: string | null
          cv_id?: string | null
          id?: string
          recommendations?: Json | null
          results?: Json | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cv_analysis_results_cv_id_fkey"
            columns: ["cv_id"]
            isOneToOne: false
            referencedRelation: "user_cvs"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          current_role: string | null
          email: string
          field_of_study: string | null
          full_name: string | null
          id: string
          preferred_industries: string[] | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          current_role?: string | null
          email: string
          field_of_study?: string | null
          full_name?: string | null
          id: string
          preferred_industries?: string[] | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          current_role?: string | null
          email?: string
          field_of_study?: string | null
          full_name?: string | null
          id?: string
          preferred_industries?: string[] | null
          updated_at?: string
        }
        Relationships: []
      }
      service_configs: {
        Row: {
          created_at: string | null
          enabled: boolean | null
          id: string
          last_used: string | null
          preferences: Json | null
          service_type: Database["public"]["Enums"]["service_type"] | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          enabled?: boolean | null
          id?: string
          last_used?: string | null
          preferences?: Json | null
          service_type?: Database["public"]["Enums"]["service_type"] | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          enabled?: boolean | null
          id?: string
          last_used?: string | null
          preferences?: Json | null
          service_type?: Database["public"]["Enums"]["service_type"] | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_cvs: {
        Row: {
          analysis_results: Json | null
          content: string | null
          created_at: string | null
          id: string
          parsed_data: Json | null
          updated_at: string | null
          user_id: string
          version: number | null
        }
        Insert: {
          analysis_results?: Json | null
          content?: string | null
          created_at?: string | null
          id?: string
          parsed_data?: Json | null
          updated_at?: string | null
          user_id: string
          version?: number | null
        }
        Update: {
          analysis_results?: Json | null
          content?: string | null
          created_at?: string | null
          id?: string
          parsed_data?: Json | null
          updated_at?: string | null
          user_id?: string
          version?: number | null
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          career_goals: Json | null
          created_at: string | null
          education_history: Json | null
          id: string
          interests: string[] | null
          job_role: string | null
          metadata: Json | null
          skills: string[] | null
          status: Database["public"]["Enums"]["user_status"] | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          career_goals?: Json | null
          created_at?: string | null
          education_history?: Json | null
          id?: string
          interests?: string[] | null
          job_role?: string | null
          metadata?: Json | null
          skills?: string[] | null
          status?: Database["public"]["Enums"]["user_status"] | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          career_goals?: Json | null
          created_at?: string | null
          education_history?: Json | null
          id?: string
          interests?: string[] | null
          job_role?: string | null
          metadata?: Json | null
          skills?: string[] | null
          status?: Database["public"]["Enums"]["user_status"] | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      connection_stats: {
        Row: {
          active_connections: number | null
          blocks_hit: number | null
          blocks_read: number | null
          committed_transactions: number | null
          database_name: unknown | null
          rolled_back_transactions: number | null
          rows_deleted: number | null
          rows_fetched: number | null
          rows_inserted: number | null
          rows_returned: number | null
          rows_updated: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      log_event: {
        Args: {
          p_user_id: string
          p_event_type: string
          p_resource_type: string
          p_resource_id?: string
          p_details?: Json
          p_metadata?: Json
        }
        Returns: string
      }
    }
    Enums: {
      service_type: "career" | "global" | "education" | "entrepreneurial"
      user_status: "active" | "pending" | "suspended"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
