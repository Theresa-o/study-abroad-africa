import { Database } from "../../../utils/supabase/database.types";
import supabase from "../../../utils/supabase/supaBaseClient";

type ConsultationInsertDataDTO = Database['public']['Tables']['consultation']['Insert'];


export const consultationService = {
  async createConsultation(consultationInsert: ConsultationInsertDataDTO) {
    const { data, error } = await supabase
      .from("consultation")
      .insert({
        first_name: consultationInsert.first_name,
        last_name: consultationInsert.last_name,
        email: consultationInsert.email,
        phone_no: consultationInsert.phone_no,
        pr_interest: consultationInsert.pr_interest,
      })
      .select("*");

    if (error) throw error;

    return data;
  },
};