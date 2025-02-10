import supabase from "../../../utils/supabase/supaBaseClient";

export const destinationService = {
    async getDestinations() {
        const {data, error} = await supabase.from('destinations').select("*")
        if (error) throw error;
        return data;
    }
 }