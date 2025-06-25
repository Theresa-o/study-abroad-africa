import { ReactNode } from "react";
import { Database } from "../../../../utils/supabase/database.types";

export interface CustomCardProps {
    school_name?: string;
    id: number;
    image: string ;
    title: string;
    description: string;
    url: string;
  }

  export type ArticleTagType =
    Database["public"]["Tables"]["articles_m2m_articles_tags"]["Row"];

  export type ArticleType =
    Database["public"]["Tables"]["articles"]["Row"];

export type Eventype =
    Database["public"]["Tables"]["events"]["Row"];

  export type ArticleInsertDataDTO = Database['public']['Tables']['articles']['Insert'];

  export interface BlogLayoutProps {
    children: ReactNode;
  }

  export type TabType = "tips" | "news" | "events";

  export interface ArticleCardProps {
    id: number;
    description: string | null;
    created_at: string | null;
    image: string | null;
    title: string | null;
    slug: string | null;
    type: TabType
  }
