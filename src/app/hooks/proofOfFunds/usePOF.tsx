import { useMutation } from "@tanstack/react-query";
import { Database } from "../../../../utils/supabase/database.types";
import { POFService } from "@/app/services/proofOfFundsService";

type POFInsertDataDTO =
  Database["public"]["Tables"]["proof_of_funds"]["Insert"];

export function usePOF() {
  return useMutation({
    mutationFn: (consults: POFInsertDataDTO) => POFService.createPOF(consults),
  });
}
