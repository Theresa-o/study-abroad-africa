import { Database } from "../../../utils/supabase/database.types";
import supabase from "../../../utils/supabase/supaBaseClient";

type ServiceInsertDataDTO = Database['public']['Tables']['services']['Insert'];


export const servicesService = {
    async createServices (serviceInsertData: ServiceInsertDataDTO & {serviceProviderIds: number[]}) {
        const {data, error: servicesError} = await supabase
            .from("services")
            .insert({
                    created_at: serviceInsertData.created_at,
                    id: serviceInsertData.id,
                    service_category_id: serviceInsertData.service_category_id,
                    description: serviceInsertData.description,
                    title: serviceInsertData.title,
                    status: serviceInsertData.status
            })
            .select()
            .single()

            if (servicesError) throw servicesError

            if (serviceInsertData.serviceProviderIds && serviceInsertData.serviceProviderIds.length > 0){
            const serviceProviderRelations = serviceInsertData.serviceProviderIds.map(serviceProviderIds => ({
                service_id: data.id,
                provider_id:serviceProviderIds

            }))

            const {error} = await supabase
                .from("service_provider_m2m_services")
                .insert(serviceProviderRelations)

            if (error) throw error
            }

            return data

    },

    async getServices() {
        const {data, error} = await supabase    
            .from("services")
            .select(`*,
                service_category:service_category(id, name),
                service_providers:service_provider_m2m_services(provider_id)
                `
            );
        if (error) throw error
        return data
    },
}