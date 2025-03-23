import { blogTabService } from "@/app/services/blogTabsService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useBlogTabs() {
  return useQuery({
    queryKey: ["articles"],
    queryFn: blogTabService.getBlogTabs,
  });
}

export function useCreateBlogTabs() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: blogTabService.createBlogTab,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
    onError: () => {
      const errorMessage = "An error occurred. Please try again.";
      toast.error(errorMessage);
    },
  });
}
