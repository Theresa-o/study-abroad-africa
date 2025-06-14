export interface Category {
  category_name: string;
}

interface Categories {
  category_id: number;
  categories: {
    category_name: string;
  };
}

export interface ScholarshipCardProps {
  title: string;
  id: number;
  image: string;
  published_date: string;
  deadline_date: string;
  type: string;
  slug: string;
  description: string;
  scholarship_categories: Categories;
}

export interface CourseCategoryRelation {
  category_id: string;
}
      
export interface InstitutionRelation {
  institution_id: string;
}
      
export interface DestinationRelation {
  destination_id: string;
}

export interface CreateScholarshipDTO {
  title: string;
  description: string;
  image: string; 
  url: string;
  slug: string;
  deadline_date: string | null; 
  funding_amount: string | null; 
  creator_name: string | null; 
  categories: number[]; 
  tags: number[];
  institutions: number[]; 
  destinations: number[]; 
}

export interface TransformedScholarship {
  id: number;
  title: string;
  description: string;
  slug: string;
  image: string;
  url: string;
  deadline_date: string | null;
  funding_amount: string | null;
  creator_name: string | null;
  published_date?: string;

  tags: {
    id: number;
    tag_name: string;
  }[];

  categories: {
    id: number;
    category_name: string;
  }[];

  destinations: {
    id: number;
    slug: string;
    country: string;
  }[];

  institutions: {
    id: number;
    institution_name: string;
  }[];
}

