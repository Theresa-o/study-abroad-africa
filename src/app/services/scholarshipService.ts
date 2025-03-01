import supabase from "../../../utils/supabase/supaBaseClient";
import { createScholarshipDTO } from "../types/scholarships/scholarships";

export const scholarshipService = {
    async createScholarship (scholarshipData: createScholarshipDTO) {
        const {data: scholarship, error: scholarshipError} = await supabase
            .from("scholarships")
            .insert({
                created_at: scholarshipData.created_at,
                creator_name: scholarshipData.creator_name,
                deadline_date: scholarshipData.deadline_date,
                funding_amount: scholarshipData. funding_amount,
                id: scholarshipData.id,
                image: scholarshipData.image,
                published_date: scholarshipData.published_date,
                scholarship_description: scholarshipData.scholarship_description,
                scholarship_name: scholarshipData.scholarship_name,
                website: scholarshipData.website
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

        return scholarship

    },

    async getScholarship() {
        const { data, error } = await supabase
          .from('scholarships')
          .select(`
            *,
            scholarship_destination:destination_m2m_scholarships(destination_id),
            scholarship_categories:category_m2m_scholarships(category_id, categories:category_id(category_name))
          `);
    
        if (error) throw error;
        return data;
      }
}