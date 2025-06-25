import { ReactNode } from "react";
import { Database } from "../../../../utils/supabase/database.types";

export interface CustomCardProps {
    school_name?: string;
    id: number;
    image: string;
    title: string;
    description: string;
    url: string;
  }

  export type ArticleTagType =
    Database["public"]["Tables"]["articles_m2m_articles_tags"]["Row"];


  export interface ArticleType {            
          author: string
          category_id: number
          country_id: number
          created_at: string
          description: string
          id: number
          image: string
          slug: string
          title: string
          url: string
  }

    export interface Eventype {            
          country_id: number
          course_id: number
          created_at: string
          created_by: string
          description: string
          event_date: string
          event_location: string
          id: number
          image: string
          registration_link: string
          slug: string
          title: string
          url: string
  }

  export type ArticleInsertDataDTO = Database['public']['Tables']['articles']['Insert'];

  export interface BlogLayoutProps {
    children: ReactNode;
  }

  export type TabType = "tips" | "news" | "events";

  export interface ArticleCardProps {
    id: number;
    description: string;
    created_at: string;
    image: string;
    title: string;
    slug: string ;
    type: TabType
  }
