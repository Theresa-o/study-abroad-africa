"use client";

import { Card } from "@/components/ui/card";
import FilterTags from "./FilterTags";
import SchoolCards from "./SchoolCards";
import EduNavTabs from "./EduNavTabs";
import { useCourses, useCoursesByTag } from "@/app/hooks/courses/useCourses";
import { useState } from "react";
import { Tables } from "../../../../../utils/supabase/database.types";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Course = Tables<"Courses"> & {
  course_m2m_tags?: Tables<"course_m2m_tags">[];
  category?: Tables<"course_categories">;
  institution?: Tables<"Institution">;
};

const DiscoverPrograms = () => {
  const [selectedTagId, setSelectedTagId] = useState<number | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );

  const { data: allCourses } = useCourses();
  const { data: filteredCourses } = useCoursesByTag(selectedTagId);

  const displayedCourses = (
    selectedTagId ? filteredCourses : allCourses
  )?.filter((course: Course) => {
    const matchesTag = selectedTagId
      ? course.course_m2m_tags?.some((tag) => tag.tag_id === selectedTagId)
      : true;
    const matchesCategory = selectedCategoryId
      ? course.category_id === selectedCategoryId
      : true;
    return matchesTag && matchesCategory;
  });

  return (
    <section className="max-w-7xl mx-auto px-4 py-8 my-4">
      <Card className="p-4 md:py-12 md:px-4 ">
        <div className="flex justify-between items-center mb-8">
          <div className="space-y-2 ">
            <h1 className="text-lg md:text-4xl font-bold font-heading">
              Discover Programs by Category
            </h1>
          </div>
          <Button
            asChild
            variant="secondary"
            className="text-white hover:bg-white hover:border-secondary border border-secondary hover:text-secondary"
          >
            <Link href="/programs">View all</Link>
          </Button>
        </div>
        <EduNavTabs onCategorySelect={setSelectedCategoryId} />
        <FilterTags onTagSelect={setSelectedTagId} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedCourses?.map((course) => (
            <SchoolCards
              key={course?.id}
              title={course?.title}
              institution={course.institution?.institution_name}
              imageUrl={course.image}
              category={course.category?.category_name}
            />
          ))}
        </div>
      </Card>
    </section>
  );
};

export default DiscoverPrograms;
