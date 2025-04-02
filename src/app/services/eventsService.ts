import { Database } from "../../../utils/supabase/database.types";
import supabase from "../../../utils/supabase/supaBaseClient";

type EventInsertDataDTO = Database['public']['Tables']['events']['Insert'];

export const eventsService = {
    async createEvents (eventData: EventInsertDataDTO) {
        const {data, error} = await supabase
            .from('events')
            .insert({
                country_id: eventData.country_id,
                course_id: eventData.course_id,
                created_at: eventData.created_at,
                created_by: eventData.created_by,
                description: eventData.description,
                event_date: eventData.event_date,
                event_location: eventData.event_location,
                id: eventData.id,
                image: eventData.image,
                registration_link: eventData.registration_link,
                title: eventData.title,
                url: eventData.url,
            })
            .select()
            .single()

        if (error) throw error;

        return data
    },

    async getEvents() {
        const {data, error} = await supabase    
            .from("events")
            .select(`*,
                country:country_id(country),
                course:course_id(title)
                `
            );
        if (error) throw error
        return data
    },
}