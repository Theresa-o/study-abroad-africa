import { Database } from "../../../../utils/supabase/database.types";

export type ServiceInsertDataDTO = Database['public']['Tables']['services']['Insert'];

export interface Service {
  id: number;
  title: string;
  description: string;
  url: string;
  image: string;
  slug: string;
  status: boolean;
  created_at: string;
  service_category_id: number;
  service_category?: {
    id: number;
    name: string;
  };
}

export const VALID_CATEGORIES = ['financial', 'visa', 'test'] as const;
export type ServiceCategory = typeof VALID_CATEGORIES[number];

export interface Service {
  id: number;
  title: string;
  description: string;
  url: string;
  image: string;
  slug: string;
  status: boolean;
  created_at: string;
  service_category_id: number;
  service_category?: {
    id: number;
    name: string;
  };
}

// Content structure types
export interface TabContent {
  id: string;
  label: string;
  content: React.ReactNode;
}

export interface Lender {
  id: string;
  name: string;
  logo: string;
  description: string;
  interestRate: string;
  maxAmount: string;
  processingTime: string;
  requirements: string[];
  website: string;
}

export interface PaymentProvider {
  id: string;
  name: string;
  logo: string;
  description: string;
  fees: string;
  processingTime: string;
  supportedCountries: string[];
  website: string;
}

export interface Testimonial {
  id: string;
  name: string;
  avatar?: string;
  role: string;
  content: string;
  rating: number;
}

export interface ServiceContentConfig {
  slug: string;
  layoutType: 'tabs' | 'simple' | 'custom';
  customContent?: {
    overview?: string;
    lenders?: Lender[];
    paymentProviders?: PaymentProvider[];
    testimonials?: Testimonial[];
    guides?: {
      title: string;
      steps: string[];
    };
    faqs?: {
      question: string;
      answer: string;
    }[];
  };
}
