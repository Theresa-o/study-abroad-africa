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

export function useCoursesByTag(tagId: number | null) {
  return useQuery({
    queryKey: ["courses", "byTag", tagId],
    queryFn: () => (tagId ? tagService.getCoursesByTag(tagId) : []),
    enabled: !!tagId,
  });
}

// hooks/useInstitutions.ts
export function useInstitutions() {
  return useQuery({
    queryKey: ["institutions"],
    queryFn: institutionService.getInstitutions,
  });
}

export function useCourses() {
  return useQuery({
    queryKey: ["courses"],
    queryFn: courseService.getCourses,
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
    onError: () => {
      const errorMessage = "An error occurred. Please try again.";
      toast.error(errorMessage);
    },
  });
}
