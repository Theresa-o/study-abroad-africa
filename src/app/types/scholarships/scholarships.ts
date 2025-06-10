export interface createScholarshipDTO {
        created_at: string;
        creator_name: string;
        deadline_date: string;
        funding_amount: string;
        id: number;
        image: string;
        published_date: string;
        description: string;
        title: string;
        url: string;
        destinations: number[];
        categories: number[];
        institutions: number[];
        tags: number[];
}

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