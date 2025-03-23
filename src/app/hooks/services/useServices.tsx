import { servicesService } from "@/app/services/servicesService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useService() {
  return useQuery({
    queryKey: ["services"],
    queryFn: servicesService.getServices,
  });
}

export function useCreateServices() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: servicesService.createServices,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
    onError: () => {
      const errorMessage = "An error occurred. Please try again.";
      toast.error(errorMessage);
    },
  });
}
