import {
  articleService,
  articleTagService,
} from "@/app/services/articlesService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useArticles() {
  return useQuery({
    queryKey: ["articles"],
    queryFn: articleService.getArticles,
  });
}

export function useCreateArticles() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: articleService.createArticles,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
    onError: () => {
      const errorMessage = "An error occurred. Please try again.";
      toast.error(errorMessage);
    },
  });
}

export function useArticleTags() {
  return useQuery({
    queryKey: ["articleTags"],
    queryFn: articleTagService.getTags,
  });
}
