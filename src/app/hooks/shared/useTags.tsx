import { tagService } from "@/app/services/sharedService";
import { useQuery } from "@tanstack/react-query";

export function useTags() {
  return useQuery({
    queryKey: ["tags"],
    queryFn: tagService.getTags,
  });
}
