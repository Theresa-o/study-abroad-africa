import { Database } from "../../../utils/supabase/database.types";
import supabase from "../../../utils/supabase/supaBaseClient";

type POFInsertDataDTO = Database['public']['Tables']['proof_of_funds']['Insert'];


export const POFService = {
  async createPOF(POFInsert: POFInsertDataDTO) {
    const { data, error } = await supabase
      .from("proof_of_funds")
      .insert({
        first_name: POFInsert.first_name,
        last_name: POFInsert.last_name,
        email: POFInsert.email,
        phone_no: POFInsert.phone_no,
        pof_interest: POFInsert.pof_interest,
      })
      .select("*");

    if (error) throw error;

    return data;
  },
};