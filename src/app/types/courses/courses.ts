import { Tables } from "../../../../utils/supabase/database.types";

// types/category.ts
export interface Category {
    id: number;
    category_name: string;
    created_at: string;
  }
  
  // types/tag.ts
  export interface Tag {
    id: number;
    tag_name: string;
    created_at: string;
  }
  
  // types/institution.ts
  export interface Institution {
    id: number;
    institution_name: string;
    description: string | null;
    location: string | null;
    logo: string | null;
    website: string | null;
    created_at: string;
  }
  
  // types/course.ts
  export interface CreateCourseDTO {
    title: string;
    slug: string;
    description: string;
    image: string;
    category_id: number;
    institution_id: number;
    tags: number[];
    url: string;
    location_id: number
  }

 export type CourseTagRelation = {
    tag_id: number;
  };

export type Course = Tables<"Courses"> & {
    course_m2m_tags?: Tables<"course_m2m_tags">[];
    category?: Tables<"course_categories">;
    institution?: Tables<"Institution">;
  };
  