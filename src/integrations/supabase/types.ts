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
      credit_batches: {
        Row: {
          completed_at: string | null
          created_at: string | null
          created_by: string | null
          failed_at: string | null
          id: string
          metadata: Json | null
          price_per_credit: number
          quantity: number
          service_id: string
          status: Database["public"]["Enums"]["batch_status"]
          total_value: number | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          created_by?: string | null
          failed_at?: string | null
          id?: string
          metadata?: Json | null
          price_per_credit: number
          quantity: number
          service_id: string
          status?: Database["public"]["Enums"]["batch_status"]
          total_value?: number | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          created_by?: string | null
          failed_at?: string | null
          id?: string
          metadata?: Json | null
          price_per_credit?: number
          quantity?: number
          service_id?: string
          status?: Database["public"]["Enums"]["batch_status"]
          total_value?: number | null
        }
        Relationships: []
      }
      credit_transactions: {
        Row: {
          amount: number
          created_at: string | null
          credit_id: string | null
          id: string
          metadata: Json | null
          payment_method: string | null
          payment_reference: string | null
          payment_status: Database["public"]["Enums"]["payment_status"] | null
          type: Database["public"]["Enums"]["transaction_type"]
          user_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          credit_id?: string | null
          id?: string
          metadata?: Json | null
          payment_method?: string | null
          payment_reference?: string | null
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          type: Database["public"]["Enums"]["transaction_type"]
          user_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          credit_id?: string | null
          id?: string
          metadata?: Json | null
          payment_method?: string | null
          payment_reference?: string | null
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          type?: Database["public"]["Enums"]["transaction_type"]
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "credit_transactions_credit_id_fkey"
            columns: ["credit_id"]
            isOneToOne: false
            referencedRelation: "credits"
            referencedColumns: ["id"]
          },
        ]
      }
      credits: {
        Row: {
          batch_id: string | null
          code: string
          created_at: string | null
          expires_at: string
          id: string
          issued_at: string | null
          issued_to: string | null
          metadata: Json | null
          payment_id: string | null
          redeemed_at: string | null
          redeemed_by: string | null
          service_id: string
          status: Database["public"]["Enums"]["credit_status"]
          value: number
        }
        Insert: {
          batch_id?: string | null
          code: string
          created_at?: string | null
          expires_at: string
          id?: string
          issued_at?: string | null
          issued_to?: string | null
          metadata?: Json | null
          payment_id?: string | null
          redeemed_at?: string | null
          redeemed_by?: string | null
          service_id: string
          status?: Database["public"]["Enums"]["credit_status"]
          value: number
        }
        Update: {
          batch_id?: string | null
          code?: string
          created_at?: string | null
          expires_at?: string
          id?: string
          issued_at?: string | null
          issued_to?: string | null
          metadata?: Json | null
          payment_id?: string | null
          redeemed_at?: string | null
          redeemed_by?: string | null
          service_id?: string
          status?: Database["public"]["Enums"]["credit_status"]
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "credits_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "credit_batches"
            referencedColumns: ["id"]
          },
        ]
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
      payments: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          metadata: Json | null
          payment_intent_id: string | null
          payment_method: string | null
          payment_status: Database["public"]["Enums"]["payment_status"] | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          metadata?: Json | null
          payment_intent_id?: string | null
          payment_method?: string | null
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          metadata?: Json | null
          payment_intent_id?: string | null
          payment_method?: string | null
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          country_of_residence: string | null
          created_at: string
          current_role: string | null
          education_level: string | null
          email: string
          field_of_study: string | null
          full_name: string | null
          id: string
          nationality: string | null
          phone_number: string | null
          preferred_industries: string[] | null
          updated_at: string
          willing_to_relocate: boolean | null
          work_experience: string | null
          work_preference: string | null
        }
        Insert: {
          avatar_url?: string | null
          country_of_residence?: string | null
          created_at?: string
          current_role?: string | null
          education_level?: string | null
          email: string
          field_of_study?: string | null
          full_name?: string | null
          id: string
          nationality?: string | null
          phone_number?: string | null
          preferred_industries?: string[] | null
          updated_at?: string
          willing_to_relocate?: boolean | null
          work_experience?: string | null
          work_preference?: string | null
        }
        Update: {
          avatar_url?: string | null
          country_of_residence?: string | null
          created_at?: string
          current_role?: string | null
          education_level?: string | null
          email?: string
          field_of_study?: string | null
          full_name?: string | null
          id?: string
          nationality?: string | null
          phone_number?: string | null
          preferred_industries?: string[] | null
          updated_at?: string
          willing_to_relocate?: boolean | null
          work_experience?: string | null
          work_preference?: string | null
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
      expire_old_credits: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      insert_credit_batch: {
        Args: {
          p_credits: Json[]
          p_batch_id: string
        }
        Returns: undefined
      }
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
      batch_status: "pending" | "processing" | "completed" | "failed"
      credit_status:
        | "active"
        | "issued"
        | "redeemed"
        | "expired"
        | "revoked"
        | "inactive"
        | "pending"
        | "failed"
      payment_status: "pending" | "completed" | "failed" | "refunded"
      service_type: "career" | "global" | "education" | "entrepreneurial"
      transaction_type:
        | "purchase"
        | "redemption"
        | "refund"
        | "expiration"
        | "revocation"
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
