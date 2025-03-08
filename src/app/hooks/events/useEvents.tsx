import { eventsService } from "@/app/services/eventsService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useEvents() {
    return useQuery({
      queryKey: ["events"],
      queryFn: eventsService.getEvents,
    });
  }
  
  export function createEvents() {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: eventsService.createEvents,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["events"] });
      },
      onError: () => {
        const errorMessage = "An error occurred. Please try again.";
        toast.error(errorMessage);
      },
    });
  }
  