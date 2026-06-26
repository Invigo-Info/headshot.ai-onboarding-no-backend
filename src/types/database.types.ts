export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      albums: {
        Row: {
          created_at: string
          generated_count: number | null
          id: string
          pack_id: string
          status: Database["public"]["Enums"]["album_status"]
          subscription_id: string | null
          training_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          generated_count?: number | null
          id?: string
          pack_id: string
          status?: Database["public"]["Enums"]["album_status"]
          subscription_id?: string | null
          training_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          generated_count?: number | null
          id?: string
          pack_id?: string
          status?: Database["public"]["Enums"]["album_status"]
          subscription_id?: string | null
          training_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "albums_pack_id_fkey"
            columns: ["pack_id"]
            isOneToOne: false
            referencedRelation: "packs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "albums_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "subscriptions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "albums_training_id_fkey"
            columns: ["training_id"]
            isOneToOne: false
            referencedRelation: "trainings"
            referencedColumns: ["id"]
          },
        ]
      }
      edited_images: {
        Row: {
          created_at: string
          id: string
          metadata: Json | null
          storage_path: Json | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          metadata?: Json | null
          storage_path?: Json | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          metadata?: Json | null
          storage_path?: Json | null
          user_id?: string | null
        }
        Relationships: []
      }
      generated_images: {
        Row: {
          album_id: string
          created_at: string
          edited: boolean | null
          favourite: boolean | null
          height: number | null
          id: string
          storage_path: string
          width: number | null
        }
        Insert: {
          album_id: string
          created_at?: string
          edited?: boolean | null
          favourite?: boolean | null
          height?: number | null
          id?: string
          storage_path: string
          width?: number | null
        }
        Update: {
          album_id?: string
          created_at?: string
          edited?: boolean | null
          favourite?: boolean | null
          height?: number | null
          id?: string
          storage_path?: string
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "generated_images_album_id_fkey"
            columns: ["album_id"]
            isOneToOne: false
            referencedRelation: "albums"
            referencedColumns: ["id"]
          },
        ]
      }
      image_uplods_for_edit: {
        Row: {
          created_at: string
          id: string
          storage_path: Json | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          storage_path?: Json | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          storage_path?: Json | null
          user_id?: string | null
        }
        Relationships: []
      }
      orders: {
        Row: {
          editor_credits_granted: boolean | null
          id: string
          pack_id: string
          price_id: string
          purchased_at: string
          qty: number
          status: Database["public"]["Enums"]["order_status"]
          stripe_checkout_session_id: string | null
          used: boolean | null
          user_id: string
        }
        Insert: {
          editor_credits_granted?: boolean | null
          id?: string
          pack_id: string
          price_id: string
          purchased_at?: string
          qty?: number
          status?: Database["public"]["Enums"]["order_status"]
          stripe_checkout_session_id?: string | null
          used?: boolean | null
          user_id: string
        }
        Update: {
          editor_credits_granted?: boolean | null
          id?: string
          pack_id?: string
          price_id?: string
          purchased_at?: string
          qty?: number
          status?: Database["public"]["Enums"]["order_status"]
          stripe_checkout_session_id?: string | null
          used?: boolean | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_pack_id_fkey"
            columns: ["pack_id"]
            isOneToOne: false
            referencedRelation: "packs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_price_id_fkey"
            columns: ["price_id"]
            isOneToOne: false
            referencedRelation: "prices"
            referencedColumns: ["id"]
          },
        ]
      }
      packs: {
        Row: {
          attire: Json | null
          background: Json | null
          description: string | null
          display_images: string[] | null
          id: string
          is_active: boolean | null
          pro: boolean | null
          product_id: string
          prompts: Json | null
          slug: string
          title: string
        }
        Insert: {
          attire?: Json | null
          background?: Json | null
          description?: string | null
          display_images?: string[] | null
          id?: string
          is_active?: boolean | null
          pro?: boolean | null
          product_id: string
          prompts?: Json | null
          slug: string
          title: string
        }
        Update: {
          attire?: Json | null
          background?: Json | null
          description?: string | null
          display_images?: string[] | null
          id?: string
          is_active?: boolean | null
          pro?: boolean | null
          product_id?: string
          prompts?: Json | null
          slug?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "packs_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      prices: {
        Row: {
          amount_cents: number
          currency: string | null
          headshot_count: number | null
          id: string
          interval: Database["public"]["Enums"]["price_interval"]
          plan_name: string | null
          product_id: string
          stripe_price_id: string | null
        }
        Insert: {
          amount_cents: number
          currency?: string | null
          headshot_count?: number | null
          id?: string
          interval: Database["public"]["Enums"]["price_interval"]
          plan_name?: string | null
          product_id: string
          stripe_price_id?: string | null
        }
        Update: {
          amount_cents?: number
          currency?: string | null
          headshot_count?: number | null
          id?: string
          interval?: Database["public"]["Enums"]["price_interval"]
          plan_name?: string | null
          product_id?: string
          stripe_price_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "prices_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          description: string | null
          id: string
          name: string
          product_type: Database["public"]["Enums"]["product_type"]
        }
        Insert: {
          description?: string | null
          id: string
          name: string
          product_type: Database["public"]["Enums"]["product_type"]
        }
        Update: {
          description?: string | null
          id?: string
          name?: string
          product_type?: Database["public"]["Enums"]["product_type"]
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          review_dismissed_at: string | null
          stripe_customer_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          review_dismissed_at?: string | null
          stripe_customer_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          review_dismissed_at?: string | null
          stripe_customer_id?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      reviews: {
        Row: {
          album_id: string
          created_at: string
          headshot_url: string | null
          id: string
          job_title: string | null
          rating: number
          review_text: string | null
          reviewer_email: string | null
          reviewer_name: string | null
          share_consent: boolean | null
          user_id: string
        }
        Insert: {
          album_id: string
          created_at?: string
          headshot_url?: string | null
          id?: string
          job_title?: string | null
          rating: number
          review_text?: string | null
          reviewer_email?: string | null
          reviewer_name?: string | null
          share_consent?: boolean | null
          user_id: string
        }
        Update: {
          album_id?: string
          created_at?: string
          headshot_url?: string | null
          id?: string
          job_title?: string | null
          rating?: number
          review_text?: string | null
          reviewer_email?: string | null
          reviewer_name?: string | null
          share_consent?: boolean | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_album_id_fkey"
            columns: ["album_id"]
            isOneToOne: false
            referencedRelation: "albums"
            referencedColumns: ["id"]
          },
        ]
      }
      subscription_pack_usage: {
        Row: {
          album_id: string
          id: string
          pack_id: string
          subscription_id: string
          used_at: string
          user_id: string | null
        }
        Insert: {
          album_id: string
          id?: string
          pack_id: string
          subscription_id: string
          used_at?: string
          user_id?: string | null
        }
        Update: {
          album_id?: string
          id?: string
          pack_id?: string
          subscription_id?: string
          used_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subscription_pack_usage_album_id_fkey"
            columns: ["album_id"]
            isOneToOne: false
            referencedRelation: "albums"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscription_pack_usage_pack_id_fkey"
            columns: ["pack_id"]
            isOneToOne: false
            referencedRelation: "packs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscription_pack_usage_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "subscriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          created_at: string
          current_period_end: string
          current_period_start: string
          id: string
          max_models: number
          packs_per_period: number
          price_id: string
          status: Database["public"]["Enums"]["subscription_status"]
          stripe_subscription_id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          current_period_end: string
          current_period_start: string
          id?: string
          max_models?: number
          packs_per_period?: number
          price_id: string
          status: Database["public"]["Enums"]["subscription_status"]
          stripe_subscription_id?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          current_period_end?: string
          current_period_start?: string
          id?: string
          max_models?: number
          packs_per_period?: number
          price_id?: string
          status?: Database["public"]["Enums"]["subscription_status"]
          stripe_subscription_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_price_id_fkey"
            columns: ["price_id"]
            isOneToOne: false
            referencedRelation: "prices"
            referencedColumns: ["id"]
          },
        ]
      }
      trainings: {
        Row: {
          created_at: string
          id: string
          replicate_trained_model_version: string | null
          replicate_training_id: string | null
          status: Database["public"]["Enums"]["training_status"]
          uploaded_images: string[] | null
          user_id: string
          user_selection: Json | null
        }
        Insert: {
          created_at?: string
          id?: string
          replicate_trained_model_version?: string | null
          replicate_training_id?: string | null
          status?: Database["public"]["Enums"]["training_status"]
          uploaded_images?: string[] | null
          user_id: string
          user_selection?: Json | null
        }
        Update: {
          created_at?: string
          id?: string
          replicate_trained_model_version?: string | null
          replicate_training_id?: string | null
          status?: Database["public"]["Enums"]["training_status"]
          uploaded_images?: string[] | null
          user_id?: string
          user_selection?: Json | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      album_status: "generating" | "done" | "failed" | "training"
      order_status: "paid" | "unpaid" | "refunded"
      price_interval: "one_time" | "week" | "year"
      product_type: "one_time" | "subscription"
      subscription_status: "active" | "past_due" | "canceled" | "inactive"
      training_status: "queued" | "processing" | "ready" | "failed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      album_status: ["generating", "done", "failed", "training"],
      order_status: ["paid", "unpaid", "refunded"],
      price_interval: ["one_time", "week", "year"],
      product_type: ["one_time", "subscription"],
      subscription_status: ["active", "past_due", "canceled", "inactive"],
      training_status: ["queued", "processing", "ready", "failed"],
    },
  },
} as const
