import supabase from "../../../utils/supabase/supaBaseClient";
import { InstitutionInsertDataDTO } from "../types/institution/institution";

export const institutionService = {
  async getInstitutions() {
    const {data, error } = await supabase.from('Institution').select('*')
    if (error) throw error;
    return data;
  },

    async createInstitution (institutionInsertData: InstitutionInsertDataDTO) {
        const {data, error: InstitutionError} = await supabase
            .from("Institution")
            .insert({
              created_at: institutionInsertData.created_at,
              description: institutionInsertData.description,
              destination_id: institutionInsertData.destination_id,
              id: institutionInsertData.id,
              institution_name: institutionInsertData.institution_name,
              location: institutionInsertData.location,
              logo: institutionInsertData.logo,
              website: institutionInsertData.website
            })
            .select()
            .single()

            if (InstitutionError) throw InstitutionError

            return data

    },
}