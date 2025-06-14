import supabase from "../../../utils/supabase/supaBaseClient";
import { CreateScholarshipDTO } from "../types/scholarships/scholarships";

export const scholarshipService = {
    async createScholarship (scholarshipData: CreateScholarshipDTO) {
        const {data: scholarship, error: scholarshipError} = await supabase
            .from("scholarships")
            .insert({
                creator_name: scholarshipData.creator_name,
                deadline_date: scholarshipData.deadline_date,
                funding_amount: scholarshipData. funding_amount,
                image: scholarshipData.image,
                description: scholarshipData.description,
                title: scholarshipData.title,
                url: scholarshipData.url,
                slug: scholarshipData.slug,
            })
            .select()
            .single() 
            
        if (scholarshipError) throw scholarshipError;

        const destinationRelation = scholarshipData.destinations.map(destinationId => ({
            destination_id: destinationId,
            scholarship_id: scholarship.id
        }))

        const {error: destinationError} = await supabase
            .from("destination_m2m_scholarships")
            .insert(destinationRelation)

        if (destinationError) throw destinationError

        const categoryRelation = scholarshipData.categories.map(categoryId => ({
            category_id: categoryId,
            scholarship_id: scholarship.id
        }))

        const {error: categoryError} = await supabase
            .from("category_m2m_scholarships")
            .insert(categoryRelation)

        if (categoryError) throw categoryError

        const institutionsRelation = scholarshipData.institutions.map(institutionId => ({
            institution_id: institutionId,
            scholarship_id: scholarship.id
        }))

        const {error: institutionError} = await supabase
            .from("institutions_m2m_scholarships")
            .insert(institutionsRelation)

        if (institutionError) throw institutionError

        const tagsRelation = scholarshipData.tags.map(tagId => ({
            tag_id: tagId,
            scholarship_id: scholarship.id
        }))

        const {error: tagError} = await supabase
            .from("tag_m2m_scholarships")
            .insert(tagsRelation)

        if (tagError) throw tagError

        return scholarship

    },

    async getScholarship() {
        const { data, error } = await supabase
          .from('scholarships')
          .select(`
            *,
            scholarship_destination:destination_m2m_scholarships(destination_id),
            scholarship_categories:category_m2m_scholarships(category_id),
            scholarship_institution:institutions_m2m_scholarships(institution_id),
            scholarship_tags:tag_m2m_scholarships(tag_id)
          `);
    
        if (error) throw error;
        return data;
      },

      async getScholarshipbySlug(slug: string) {
        const { data, error } = await supabase
          .from('scholarships')
          .select(`
            *,
            scholarship_destination:destination_m2m_scholarships(
                destinations:destinations(id, country, slug)
              ),
              scholarship_categories:category_m2m_scholarships(
                course_categories:course_categories(id, category_name)
              ),
              scholarship_institution:institutions_m2m_scholarships(
                Institution:Institution(id, institution_name)
              ),
              scholarship_tags:tag_m2m_scholarships(
                course_tags:course_tags(id, tag_name)
              )
          `)
          .eq('slug', slug)
          .single();
    
        if (error)  {    
          // If no scholarship found, Supabase returns an error
      if (error.code === 'PGRST116') {
        return null; 
      } throw error;
    }
        return data;
      }
}


  export const tagScholarshipService = {
    async getTags() {
      const { data, error } = await supabase
        .from('course_tags')
        .select('*');
      if (error) throw error;
      return data;
    },
  
    async getScholarshipsByTag(tagId: number) {
      const { data, error } = await supabase
        .from('scholarships')
        .select(`
          *,
          tag_m2m_scholarships!inner(tag_id)
        `)
        .eq('tag_m2m_scholarships.tag_id', tagId);
  
      if (error) throw error;
      return data;
    }
  };