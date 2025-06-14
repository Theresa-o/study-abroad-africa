import supabase from "../../../utils/supabase/supaBaseClient";

export const institutionService = {
  async getInstitutions() {
    const {data, error } = await supabase.from('Institution').select('*')
    if (error) throw error;
    return data;
  }
}