import {
  categoryService,
  courseService,
  institutionService,
  tagService,
} from "@/app/services/courseService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// hooks/useCategories.ts
export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: categoryService.getCategories,
  });
}

// hooks/useTags.ts
export function useTags() {
  return useQuery({
    queryKey: ["tags"],
    queryFn: tagService.getTags,
  });
}

// hooks/useInstitutions.ts
export function useInstitutions() {
  return useQuery({
    queryKey: ["institutions"],
    queryFn: institutionService.getInstitutions,
  });
}

// hooks/useCreateCourse.ts
export function useCreateCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: courseService.createCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
    onError: (error: any) => {
      let errorMessage = "An error occurred. Please try again.";
      toast.error(errorMessage);
    },
  });
}
