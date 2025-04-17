import {
  categoryService,
  courseService,
  destinationsService,
  institutionService,
  tagService,
} from "@/app/services/courseService";
import { CourseTagRelation } from "@/app/types/courses/courses";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
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

export function useDestinations() {
  return useQuery({
    queryKey: ["destinations"],
    queryFn: destinationsService.getDestinations,
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

export function useFilteredCourses(
  activeFilters: { id: string; value: string }[]
) {
  const { data: allCourses, isLoading } = useCourses();
  const { data: categories } = useCategories();
  const { data: tags } = useTags();
  const { data: destinations } = useDestinations();
  const { data: institutions } = useInstitutions();

  // Group filters by their category
  const groupedFilters = useMemo(() => {
    const grouped = {
      "degree-type": [] as string[],
      "fields-of-study": [] as string[],
      locations: [] as string[],
      institution: [] as string[],
    };

    activeFilters.forEach((filter) => {
      if (filter.id in grouped) {
        grouped[filter.id as keyof typeof grouped].push(filter.value);
      }
    });

    return grouped;
  }, [activeFilters]);

  // Filter courses based on selected criteria
  const filteredCourses = useMemo(() => {
    if (!allCourses || activeFilters.length === 0) {
      return allCourses || [];
    }

    return allCourses.filter((course) => {
      // Check degree type (category)
      if (groupedFilters["degree-type"].length > 0) {
        const categoryName = categories?.find(
          (c) => c.id === course.category_id
        )?.category_name;
        if (
          !categoryName ||
          !groupedFilters["degree-type"].includes(categoryName)
        ) {
          return false;
        }
      }

      // Check fields of study (tags)
      if (groupedFilters["fields-of-study"].length > 0) {
        // Get course tags
        const courseTags =
          course.course_tags
            ?.map((tagRelation: CourseTagRelation) => {
              const tagId = tagRelation.tag_id;
              return tags?.find((t) => t.id === tagId)?.tag_name;
            })
            .filter(Boolean) || [];

        // Check if there's an overlap between selected fields and course tags
        const hasMatchingTag = courseTags.some(
          (tag: string) =>
            tag && groupedFilters["fields-of-study"].includes(tag)
        );

        if (!hasMatchingTag) {
          return false;
        }
      }

      // Check institution
      if (groupedFilters["institution"].length > 0) {
        const institutionName = institutions?.find(
          (i) => i.id === course.institution_id
        )?.institution_name;
        if (
          !institutionName ||
          !groupedFilters["institution"].includes(institutionName)
        ) {
          return false;
        }
      }

      // Check location (destination)
      if (groupedFilters["locations"].length > 0) {
        const destinationName = destinations?.find(
          (i) => i.id === course.location_id
        )?.country;
        if (
          !destinationName ||
          !groupedFilters["locations"].includes(destinationName)
        ) {
          return false;
        }
      }

      return true;
    });
  }, [
    allCourses,
    activeFilters,
    categories,
    tags,
    institutions,
    destinations,
    groupedFilters,
  ]);

  return { filteredCourses, isLoading };
}
