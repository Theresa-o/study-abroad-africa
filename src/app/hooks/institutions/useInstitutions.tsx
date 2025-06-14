import { institutionService } from "@/app/services/institutionService";
import { useQuery } from "@tanstack/react-query";

export function useInstitutions() {
  return useQuery({
    queryKey: ["institutions"],
    queryFn: institutionService.getInstitutions,
  });
}
