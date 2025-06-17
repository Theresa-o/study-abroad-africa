import { consultationService } from "@/app/services/consultationService";
import { useMutation } from "@tanstack/react-query";
import { Database } from "../../../../utils/supabase/database.types";

type ConsultationInsertDataDTO =
  Database["public"]["Tables"]["consultation"]["Insert"];

export function useConsultation() {
  return useMutation({
    mutationFn: (consults: ConsultationInsertDataDTO) =>
      consultationService.createConsultation(consults),
  });
}
