import { Database } from "../../../utils/supabase/database.types";
import supabase from "../../../utils/supabase/supaBaseClient";

type EventInsertDataDTO = Database['public']['Tables']['events']['Insert'];

export const eventsService = {
    async createEvents (EventData: EventInsertDataDTO) {
        const {data, error} = await supabase
            .from('events')
            .insert({
                country_id: EventData.country_id,
                course_id: EventData.course_id,
                created_at: EventData.created_at,
                created_by: EventData.created_by,
                content: EventData.content,
                event_date: EventData.event_date,
                event_location: EventData.event_location,
                id: EventData.id,
                image_url: EventData.image_url,
                registration_link: EventData.registration_link,
                title: EventData.title,
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