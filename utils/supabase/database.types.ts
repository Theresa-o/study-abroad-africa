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
      articles: {
        Row: {
          author: string | null
          category_id: number | null
          country_id: number | null
          created_at: string
          description: string | null
          id: number
          image: string | null
          slug: string | null
          title: string | null
          url: string | null
        }
        Insert: {
          author?: string | null
          category_id?: number | null
          country_id?: number | null
          created_at?: string
          description?: string | null
          id?: number
          image?: string | null
          slug?: string | null
          title?: string | null
          url?: string | null
        }
        Update: {
          author?: string | null
          category_id?: number | null
          country_id?: number | null
          created_at?: string
          description?: string | null
          id?: number
          image?: string | null
          slug?: string | null
          title?: string | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "post_articles_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "course_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_articles_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "destinations"
            referencedColumns: ["id"]
          },
        ]
      }
      articles_m2m_articles_tags: {
        Row: {
          article_id: number | null
          articles_tags_id: number | null
          created_at: string
          id: number
        }
        Insert: {
          article_id?: number | null
          articles_tags_id?: number | null
          created_at?: string
          id?: number
        }
        Update: {
          article_id?: number | null
          articles_tags_id?: number | null
          created_at?: string
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "articles_m2m_articles_tags_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "articles_m2m_articles_tags_articles_tags_id_fkey"
            columns: ["articles_tags_id"]
            isOneToOne: false
            referencedRelation: "articles_tags"
            referencedColumns: ["id"]
          },
        ]
      }
      articles_tags: {
        Row: {
          created_at: string
          id: number
          name: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      category_m2m_scholarships: {
        Row: {
          category_id: number | null
          created_at: string
          id: number
          scholarship_id: number | null
        }
        Insert: {
          category_id?: number | null
          created_at?: string
          id?: number
          scholarship_id?: number | null
        }
        Update: {
          category_id?: number | null
          created_at?: string
          id?: number
          scholarship_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "category_m2m_scholarships_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "course_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "category_m2m_scholarships_scholarship_id_fkey"
            columns: ["scholarship_id"]
            isOneToOne: false
            referencedRelation: "scholarships"
            referencedColumns: ["id"]
          },
        ]
      }
      course_categories: {
        Row: {
          category_name: string | null
          created_at: string
          id: number
        }
        Insert: {
          category_name?: string | null
          created_at?: string
          id?: number
        }
        Update: {
          category_name?: string | null
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      course_m2m_tags: {
        Row: {
          course_id: number | null
          created_at: string
          id: number
          tag_id: number | null
        }
        Insert: {
          course_id?: number | null
          created_at?: string
          id?: number
          tag_id?: number | null
        }
        Update: {
          course_id?: number | null
          created_at?: string
          id?: number
          tag_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "Course m2m Tags_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "Courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Course m2m Tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "course_tags"
            referencedColumns: ["id"]
          },
        ]
      }
      course_tags: {
        Row: {
          created_at: string
          id: number
          tag_name: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          tag_name?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          tag_name?: string | null
        }
        Relationships: []
      }
      Courses: {
        Row: {
          category_id: number | null
          created_at: string
          description: string | null
          id: number
          image: string | null
          institution_id: number | null
          location_id: number | null
          title: string | null
          url: string | null
        }
        Insert: {
          category_id?: number | null
          created_at?: string
          description?: string | null
          id?: number
          image?: string | null
          institution_id?: number | null
          location_id?: number | null
          title?: string | null
          url?: string | null
        }
        Update: {
          category_id?: number | null
          created_at?: string
          description?: string | null
          id?: number
          image?: string | null
          institution_id?: number | null
          location_id?: number | null
          title?: string | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Courses_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "course_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Courses_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "Institution"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Courses_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "destinations"
            referencedColumns: ["id"]
          },
        ]
      }
      destination_m2m_scholarships: {
        Row: {
          created_at: string
          destination_id: number | null
          id: number
          scholarship_id: number | null
        }
        Insert: {
          created_at?: string
          destination_id?: number | null
          id?: number
          scholarship_id?: number | null
        }
        Update: {
          created_at?: string
          destination_id?: number | null
          id?: number
          scholarship_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "destination_m2m_scholarships_scholarship_id_fkey"
            columns: ["scholarship_id"]
            isOneToOne: false
            referencedRelation: "scholarships"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "destination_scholarships_destination_id_fkey"
            columns: ["destination_id"]
            isOneToOne: false
            referencedRelation: "destinations"
            referencedColumns: ["id"]
          },
        ]
      }
      destinations: {
        Row: {
          about: string | null
          country: string | null
          created_at: string
          flag_emoji: string | null
          hero_img_campus_url: string | null
          hero_img_env_url: string | null
          hero_img_student_url: string | null
          id: number
          image_url: string | null
          slug: string | null
        }
        Insert: {
          about?: string | null
          country?: string | null
          created_at?: string
          flag_emoji?: string | null
          hero_img_campus_url?: string | null
          hero_img_env_url?: string | null
          hero_img_student_url?: string | null
          id?: number
          image_url?: string | null
          slug?: string | null
        }
        Update: {
          about?: string | null
          country?: string | null
          created_at?: string
          flag_emoji?: string | null
          hero_img_campus_url?: string | null
          hero_img_env_url?: string | null
          hero_img_student_url?: string | null
          id?: number
          image_url?: string | null
          slug?: string | null
        }
        Relationships: []
      }
      events: {
        Row: {
          country_id: number | null
          course_id: number | null
          created_at: string
          created_by: string | null
          description: string | null
          event_date: string | null
          event_location: string | null
          id: number
          image: string | null
          registration_link: string | null
          title: string | null
          url: string | null
        }
        Insert: {
          country_id?: number | null
          course_id?: number | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          event_date?: string | null
          event_location?: string | null
          id?: number
          image?: string | null
          registration_link?: string | null
          title?: string | null
          url?: string | null
        }
        Update: {
          country_id?: number | null
          course_id?: number | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          event_date?: string | null
          event_location?: string | null
          id?: number
          image?: string | null
          registration_link?: string | null
          title?: string | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "events_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "destinations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "Courses"
            referencedColumns: ["id"]
          },
        ]
      }
      Institution: {
        Row: {
          created_at: string
          description: string | null
          destination_id: number | null
          id: number
          institution_name: string | null
          location: string | null
          logo: string | null
          website: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          destination_id?: number | null
          id?: number
          institution_name?: string | null
          location?: string | null
          logo?: string | null
          website?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          destination_id?: number | null
          id?: number
          institution_name?: string | null
          location?: string | null
          logo?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Institution_destination_id_fkey"
            columns: ["destination_id"]
            isOneToOne: false
            referencedRelation: "destinations"
            referencedColumns: ["id"]
          },
        ]
      }
      institutions_m2m_scholarships: {
        Row: {
          created_at: string
          id: number
          institution_id: number | null
          scholarship_id: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          institution_id?: number | null
          scholarship_id?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          institution_id?: number | null
          scholarship_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "institutions_m2m_scholarships_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "Institution"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "institutions_m2m_scholarships_scholarship_id_fkey"
            columns: ["scholarship_id"]
            isOneToOne: false
            referencedRelation: "scholarships"
            referencedColumns: ["id"]
          },
        ]
      }
      scholarships: {
        Row: {
          created_at: string
          creator_name: string | null
          deadline_date: string | null
          description: string | null
          funding_amount: string | null
          id: number
          image: string | null
          published_date: string | null
          title: string | null
          url: string | null
        }
        Insert: {
          created_at?: string
          creator_name?: string | null
          deadline_date?: string | null
          description?: string | null
          funding_amount?: string | null
          id?: number
          image?: string | null
          published_date?: string | null
          title?: string | null
          url?: string | null
        }
        Update: {
          created_at?: string
          creator_name?: string | null
          deadline_date?: string | null
          description?: string | null
          funding_amount?: string | null
          id?: number
          image?: string | null
          published_date?: string | null
          title?: string | null
          url?: string | null
        }
        Relationships: []
      }
      service_category: {
        Row: {
          created_at: string
          id: number
          name: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      service_provider_m2m_services: {
        Row: {
          affiliate_link: string | null
          commission_rate: string | null
          commission_type: string | null
          created_at: string
          id: number
          provider_id: number | null
          service_id: number | null
        }
        Insert: {
          affiliate_link?: string | null
          commission_rate?: string | null
          commission_type?: string | null
          created_at?: string
          id?: number
          provider_id?: number | null
          service_id?: number | null
        }
        Update: {
          affiliate_link?: string | null
          commission_rate?: string | null
          commission_type?: string | null
          created_at?: string
          id?: number
          provider_id?: number | null
          service_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "service_provider_m2m_services_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "service_providers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_provider_m2m_services_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      service_providers: {
        Row: {
          company_name: string | null
          created_at: string
          description: string | null
          id: number
          logo: string | null
          status: boolean | null
          website: string | null
        }
        Insert: {
          company_name?: string | null
          created_at?: string
          description?: string | null
          id?: number
          logo?: string | null
          status?: boolean | null
          website?: string | null
        }
        Update: {
          company_name?: string | null
          created_at?: string
          description?: string | null
          id?: number
          logo?: string | null
          status?: boolean | null
          website?: string | null
        }
        Relationships: []
      }
      services: {
        Row: {
          created_at: string
          description: string | null
          id: number
          image: string | null
          service_category_id: number | null
          status: boolean | null
          title: string | null
          url: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          image?: string | null
          service_category_id?: number | null
          status?: boolean | null
          title?: string | null
          url?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          image?: string | null
          service_category_id?: number | null
          status?: boolean | null
          title?: string | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "services_service_category_fkey"
            columns: ["service_category_id"]
            isOneToOne: false
            referencedRelation: "service_category"
            referencedColumns: ["id"]
          },
        ]
      }
      study_abroad_steps: {
        Row: {
          created_at: string
          description: string | null
          destination_id: number | null
          id: number
          step_number: string | null
          title: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          destination_id?: number | null
          id?: number
          step_number?: string | null
          title?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          destination_id?: number | null
          id?: number
          step_number?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "study_abroad_steps_destination_id_fkey"
            columns: ["destination_id"]
            isOneToOne: false
            referencedRelation: "destinations"
            referencedColumns: ["id"]
          },
        ]
      }
      tag_m2m_scholarships: {
        Row: {
          created_at: string
          id: number
          scholarship_id: number | null
          tag_id: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          scholarship_id?: number | null
          tag_id?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          scholarship_id?: number | null
          tag_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "tag_m2m_scholarships_scholarship_id_fkey"
            columns: ["scholarship_id"]
            isOneToOne: false
            referencedRelation: "scholarships"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tag_m2m_scholarships_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "course_tags"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
