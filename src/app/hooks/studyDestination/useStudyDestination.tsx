import { destinationService } from "@/app/services/destinationService";
import { useQuery } from "@tanstack/react-query";

export function useStudyDestinations() {
  return useQuery({
    queryKey: ["destinations"],
    queryFn: destinationService.getDestinations,
  });
}
