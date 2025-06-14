import {
  scholarshipService,
  tagScholarshipService,
} from "@/app/services/scholarshipService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useMemo } from "react";
import { CourseTagRelation } from "@/app/types/courses/courses";
import {
  CourseCategoryRelation,
  DestinationRelation,
  InstitutionRelation,
} from "@/app/types/scholarships/scholarships";
import { useCategories } from "../shared/useCategories";
import { useTags } from "../shared/useTags";
import { useInstitutions } from "../institutions/useInstitutions";
import { useStudyDestinations } from "../studyDestination/useStudyDestination";

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
      const errorMessage = "An error occurred. Please try again.";
      toast.error(errorMessage);
    },
  });
}

export function useFilteredScholarships(
  activeFilters: { id: string; value: string }[]
) {
  const { data: allScholarships, isLoading } = useScholarship();
  const { data: categories } = useCategories();
  const { data: tags } = useTags();
  const { data: destinations } = useStudyDestinations();
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
  const filteredScholarships = useMemo(() => {
    if (!allScholarships || activeFilters.length === 0) {
      return allScholarships || [];
    }

    return allScholarships.filter((scholarship) => {
      // Check degree type (category)
      if (groupedFilters["degree-type"].length > 0) {
        const degreeTypes =
          scholarship.scholarship_categories
            ?.map(
              (categoryRelation: CourseCategoryRelation) =>
                categories?.find((c) => c.id === categoryRelation.category_id)
                  ?.category_name
            )
            .filter(Boolean) || [];

        // Check if there's an overlap between selected fields and course cat
        const hasMatchingDegree = degreeTypes.some(
          (cat: string) => cat && groupedFilters["degree-type"].includes(cat)
        );

        if (!hasMatchingDegree) {
          return false;
        }
      }

      // Check fields of study (tags)
      if (groupedFilters["fields-of-study"].length > 0) {
        // Get course tags
        const courseTags =
          scholarship.scholarship_tags
            ?.map(
              (tagRelation: CourseTagRelation) =>
                tags?.find((t) => t.id === tagRelation.tag_id)?.tag_name
            )
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
        // Get institutions
        const institutionNames =
          scholarship.scholarship_institution
            ?.map(
              (institutionRelation: InstitutionRelation) =>
                institutions?.find(
                  (i) => i.id === institutionRelation.institution_id
                )?.institution_name
            )
            .filter(Boolean) || [];

        // Check if there's an overlap between selected fields and institution
        const hasMatchingInstitution = institutionNames.some(
          (institution: string) =>
            institution && groupedFilters["institution"].includes(institution)
        );

        if (!hasMatchingInstitution) {
          return false;
        }
      }

      if (groupedFilters["locations"].length > 0) {
        // Get institutions
        const destinationNames =
          scholarship.scholarship_destination
            ?.map(
              (destinationRelation: DestinationRelation) =>
                destinations?.find(
                  (d) => d.id === destinationRelation.destination_id
                )?.country
            )
            .filter(Boolean) || [];

        // Check if there's an overlap between selected fields and institution
        const hasMatchingDestination = destinationNames.some(
          (locations: string) =>
            locations && groupedFilters["locations"].includes(locations)
        );

        if (!hasMatchingDestination) {
          return false;
        }
      }

      return true;
    });
  }, [
    allScholarships,
    activeFilters,
    categories,
    tags,
    institutions,
    destinations,
    groupedFilters,
  ]);

  return { filteredScholarships, isLoading };
}

export function useScholarshipByTag(tagId: number | null) {
  return useQuery({
    queryKey: ["scholarships", "byTag", tagId],
    queryFn: () =>
      tagId ? tagScholarshipService.getScholarshipsByTag(tagId) : [],
    enabled: !!tagId,
  });
}
