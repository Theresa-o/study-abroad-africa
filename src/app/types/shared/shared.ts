export interface BasicPageProps {
  title: string;
  description: string;
  category?: string;
  imageUrl?: string;
  additionalContent?: React.ReactNode;
  categories?: Category[];
  tags?: Tag[];
  destinations?: Destination[];
  institutions?: Institution[];

}

export interface Category {
  id: number;
  category_name: string;
  slug?: string;
}

export interface Tag {
  id: number;
  tag_name: string;
}

export interface Destination {
  id: number;
  country: string;
  slug?: string;
}

export interface Institution {
  id: number;
  institution_name: string;
  slug?: string;
}

export interface ScholarshipTag {
  course_tags: Tag;
}

export interface ScholarshipCategory {
  course_categories: Category;
}

export interface ScholarshipDestination {
  destinations: Destination;
}

export interface ScholarshipInstitution {
  Institution: Institution;
}