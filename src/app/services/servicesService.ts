import supabase from "../../../utils/supabase/supaBaseClient";
import { Service, ServiceCategory, ServiceInsertDataDTO, VALID_CATEGORIES } from "../types/services/services";



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
                    status: serviceInsertData.status,
                    image: serviceInsertData.image, 
                    url: serviceInsertData.url 
            })
            .select()
            .single()

            if (servicesError) throw servicesError

            if (serviceInsertData.serviceProviderIds && serviceInsertData.serviceProviderIds.length > 0){
            const serviceProviderRelations = serviceInsertData.serviceProviderIds.map(serviceProviderIds => ({
                service_id: data.id,
                provider_id: serviceProviderIds
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
            )
            .order('created_at', { ascending: false });
        if (error) throw error
        return data
    },
}

export const servicesCategoryService = {
  async getServicesCategories() {
    const { data, error } = await supabase
      .from('service_category')
      .select('*');
    if (error) throw error;
    return data;
  }
};

export const getServicesByProvider = {
    async getProviders() {
        const { data, error } = await supabase
        .from('service_providers')
        .select('*')
    if (error) throw error;
    return data;
      }
};


export const getServiceBySlug = async (category: string, slug: string): Promise<Service | null> => {
  try {
    const { data, error } = await supabase
      .from('services')
      .select(`
        *,
        service_category:service_category(*)
      `)
      
      .eq('slug', slug)
      .eq('service_category.name', category)
      .eq('status', true) // Only get active services
      .single();

    if (error) {
      console.error('Error fetching service:', error);
      return null;
    }
    return data;
  } catch (error) {
    console.error('Error in getServiceBySlug:', error);
    return null;
  }
};

export const isValidCategory = (category: string): category is ServiceCategory => {
  return VALID_CATEGORIES.includes(category as ServiceCategory);
};