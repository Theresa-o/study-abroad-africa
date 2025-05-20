import { Database } from "../../../utils/supabase/database.types";
import supabase from "../../../utils/supabase/supaBaseClient";

type SubscribersInsertDataDTO = Database['public']['Tables']['subscribers']['Insert'];


export const subscribersService = {
    async createSubscribers (subscriberInsert: SubscribersInsertDataDTO) {
        const { data, error } = await supabase
            .from('subscribers')
            .insert({
                    consent: subscriberInsert.consent,
                    email: subscriberInsert.email,
    })
            .select("*")

            if (error) throw error
            
            return data
    }
}

export async function checkIfEmailExists(email: string) {
  const { data, error } = await supabase
    .from("subscribers")
    .select("*")
    .eq("email", email)
    .single();

  if (error && error.code !== "PGRST116") throw error;
  return !!data;
}
