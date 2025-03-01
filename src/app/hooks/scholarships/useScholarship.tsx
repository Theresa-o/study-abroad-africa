import { scholarshipService } from "@/app/services/scholarshipService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useScholarship() {
  return useQuery({
    queryKey: ["scholarship"],
    queryFn: scholarshipService.getScholarship,
  });
}

export function useCreateScholarship() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: scholarshipService.createScholarship,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scholarship"] });
    },
    onError: () => {
      let errorMessage = "An error occurred. Please try again.";
      toast.error(errorMessage);
    },
  });
}
