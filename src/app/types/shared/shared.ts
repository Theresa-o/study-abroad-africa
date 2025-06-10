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

interface Category {
  id: number;
  category_name: string;
  slug?: string;
}

interface Tag {
  id: number;
  tag_name: string;
}

interface Destination {
  id: number;
  name: string;
  slug?: string;
}

interface Institution {
  id: number;
  name: string;
  slug?: string;
}