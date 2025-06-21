import { Database } from "../../../utils/supabase/database.types";
import supabase from "../../../utils/supabase/supaBaseClient";

type ContactUsInsertDataDTO = Database['public']['Tables']['contact_us']['Insert'];


export const contactUsService = {
  async createContactUs(contactUsInsert: ContactUsInsertDataDTO) {
    const { data, error } = await supabase
      .from("contact_us")
      .insert({
        full_name: contactUsInsert.full_name,
        email: contactUsInsert.email,
        phone_no: contactUsInsert.phone_no,
        subject: contactUsInsert.subject,
        message: contactUsInsert.message,
      })
      .select("*");

    if (error) throw error;

    return data;
  },
};