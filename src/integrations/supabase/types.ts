export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      chapters: {
        Row: {
          chapter_number: number | null
          created_at: string
          description: string | null
          difficulty: string | null
          id: string
          name: string
          slug: string
          subject_id: string
          weightage: number | null
        }
        Insert: {
          chapter_number?: number | null
          created_at?: string
          description?: string | null
          difficulty?: string | null
          id?: string
          name: string
          slug: string
          subject_id: string
          weightage?: number | null
        }
        Update: {
          chapter_number?: number | null
          created_at?: string
          description?: string | null
          difficulty?: string | null
          id?: string
          name?: string
          slug?: string
          subject_id?: string
          weightage?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "chapters_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      daily_streaks: {
        Row: {
          current_streak: number | null
          id: string
          last_practice_date: string | null
          longest_streak: number | null
          total_practice_days: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          current_streak?: number | null
          id?: string
          last_practice_date?: string | null
          longest_streak?: number | null
          total_practice_days?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          current_streak?: number | null
          id?: string
          last_practice_date?: string | null
          longest_streak?: number | null
          total_practice_days?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      doubt_conversations: {
        Row: {
          created_at: string
          id: string
          subject: string | null
          title: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          subject?: string | null
          title?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          subject?: string | null
          title?: string | null
          user_id?: string
        }
        Relationships: []
      }
      doubt_messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string
          id: string
          image_url: string | null
          role: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string
          id?: string
          image_url?: string | null
          role: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string
          id?: string
          image_url?: string | null
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "doubt_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "doubt_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          exam_type: string | null
          full_name: string | null
          id: string
          target_year: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          exam_type?: string | null
          full_name?: string | null
          id?: string
          target_year?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          exam_type?: string | null
          full_name?: string | null
          id?: string
          target_year?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      questions: {
        Row: {
          chapter_id: string
          correct_option: number
          created_at: string
          difficulty: string | null
          exam_type: string | null
          explanation: string | null
          id: string
          is_pyq: boolean | null
          options: Json
          question_image_url: string | null
          question_text: string
          tags: string[] | null
          topic_id: string | null
          year: number | null
        }
        Insert: {
          chapter_id: string
          correct_option: number
          created_at?: string
          difficulty?: string | null
          exam_type?: string | null
          explanation?: string | null
          id?: string
          is_pyq?: boolean | null
          options: Json
          question_image_url?: string | null
          question_text: string
          tags?: string[] | null
          topic_id?: string | null
          year?: number | null
        }
        Update: {
          chapter_id?: string
          correct_option?: number
          created_at?: string
          difficulty?: string | null
          exam_type?: string | null
          explanation?: string | null
          id?: string
          is_pyq?: boolean | null
          options?: Json
          question_image_url?: string | null
          question_text?: string
          tags?: string[] | null
          topic_id?: string | null
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "questions_chapter_id_fkey"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "chapters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "questions_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "topics"
            referencedColumns: ["id"]
          },
        ]
      }
      subjects: {
        Row: {
          color: string | null
          created_at: string
          description: string | null
          display_order: number | null
          exam_types: string[] | null
          icon: string | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          description?: string | null
          display_order?: number | null
          exam_types?: string[] | null
          icon?: string | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          color?: string | null
          created_at?: string
          description?: string | null
          display_order?: number | null
          exam_types?: string[] | null
          icon?: string | null
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      test_attempts: {
        Row: {
          answers: Json | null
          completed_at: string | null
          id: string
          score: number | null
          started_at: string
          status: string | null
          test_id: string
          time_taken_seconds: number | null
          total_marks: number | null
          user_id: string
        }
        Insert: {
          answers?: Json | null
          completed_at?: string | null
          id?: string
          score?: number | null
          started_at?: string
          status?: string | null
          test_id: string
          time_taken_seconds?: number | null
          total_marks?: number | null
          user_id: string
        }
        Update: {
          answers?: Json | null
          completed_at?: string | null
          id?: string
          score?: number | null
          started_at?: string
          status?: string | null
          test_id?: string
          time_taken_seconds?: number | null
          total_marks?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "test_attempts_test_id_fkey"
            columns: ["test_id"]
            isOneToOne: false
            referencedRelation: "tests"
            referencedColumns: ["id"]
          },
        ]
      }
      test_questions: {
        Row: {
          id: string
          marks: number | null
          question_id: string
          question_number: number
          section_name: string | null
          test_id: string
        }
        Insert: {
          id?: string
          marks?: number | null
          question_id: string
          question_number: number
          section_name?: string | null
          test_id: string
        }
        Update: {
          id?: string
          marks?: number | null
          question_id?: string
          question_number?: number
          section_name?: string | null
          test_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "test_questions_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "test_questions_test_id_fkey"
            columns: ["test_id"]
            isOneToOne: false
            referencedRelation: "tests"
            referencedColumns: ["id"]
          },
        ]
      }
      tests: {
        Row: {
          created_at: string
          description: string | null
          duration_minutes: number
          exam_type: string | null
          id: string
          is_published: boolean | null
          negative_marking: number | null
          scheduled_at: string | null
          test_type: string
          title: string
          total_marks: number
        }
        Insert: {
          created_at?: string
          description?: string | null
          duration_minutes: number
          exam_type?: string | null
          id?: string
          is_published?: boolean | null
          negative_marking?: number | null
          scheduled_at?: string | null
          test_type: string
          title: string
          total_marks: number
        }
        Update: {
          created_at?: string
          description?: string | null
          duration_minutes?: number
          exam_type?: string | null
          id?: string
          is_published?: boolean | null
          negative_marking?: number | null
          scheduled_at?: string | null
          test_type?: string
          title?: string
          total_marks?: number
        }
        Relationships: []
      }
      topics: {
        Row: {
          chapter_id: string
          content: string | null
          created_at: string
          display_order: number | null
          formulas: string[] | null
          id: string
          key_points: string[] | null
          name: string
          slug: string
        }
        Insert: {
          chapter_id: string
          content?: string | null
          created_at?: string
          display_order?: number | null
          formulas?: string[] | null
          id?: string
          key_points?: string[] | null
          name: string
          slug: string
        }
        Update: {
          chapter_id?: string
          content?: string | null
          created_at?: string
          display_order?: number | null
          formulas?: string[] | null
          id?: string
          key_points?: string[] | null
          name?: string
          slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "topics_chapter_id_fkey"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "chapters"
            referencedColumns: ["id"]
          },
        ]
      }
      user_progress: {
        Row: {
          chapter_id: string
          created_at: string
          id: string
          last_practiced_at: string | null
          questions_attempted: number | null
          questions_correct: number | null
          time_spent_seconds: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          chapter_id: string
          created_at?: string
          id?: string
          last_practiced_at?: string | null
          questions_attempted?: number | null
          questions_correct?: number | null
          time_spent_seconds?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          chapter_id?: string
          created_at?: string
          id?: string
          last_practiced_at?: string | null
          questions_attempted?: number | null
          questions_correct?: number | null
          time_spent_seconds?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_progress_chapter_id_fkey"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "chapters"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "student"
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
      app_role: ["admin", "student"],
    },
  },
} as const
