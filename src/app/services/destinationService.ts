import supabase from "../../../utils/supabase/supaBaseClient";

export const destinationService = {
    async getDestinations() {
        const {data, error} = await supabase.from('destinations').select("id, country, image_url, slug, flag_emoji, hero_img_student_url, hero_img_campus_url, hero_img_env_url, about")
        if (error) throw error;
        return data;
    }
 }