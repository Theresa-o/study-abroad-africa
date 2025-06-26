import { institutionService } from "@/app/services/institutionService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateInstitutionss() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: institutionService.createInstitution,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["institution"] });
    },
    onError: () => {
      const errorMessage = "An error occurred. Please try again.";
      toast.error(errorMessage);
    },
  });
}
