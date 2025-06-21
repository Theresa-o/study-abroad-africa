import { contactUsService } from "@/app/services/contactUsService";
import { useMutation } from "@tanstack/react-query";
import { Database } from "../../../../utils/supabase/database.types";

type ContactUsInsertDataDTO =
  Database["public"]["Tables"]["contact_us"]["Insert"];

export function useContactUs() {
  return useMutation({
    mutationFn: (contact: ContactUsInsertDataDTO) =>
      contactUsService.createContactUs(contact),
  });
}
