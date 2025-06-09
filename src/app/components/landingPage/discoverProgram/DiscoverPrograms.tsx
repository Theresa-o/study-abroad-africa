"use client";

import { Card } from "@/components/ui/card";
import FilterTags from "./FilterTags";
import SchoolCards from "./SchoolCards";
import EduNavTabs from "./EduNavTabs";
import { useCourses, useCoursesByTag } from "@/app/hooks/courses/useCourses";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Course } from "@/app/types/courses/courses";

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

  const resetFilters = () => {
    setSelectedTagId(null);
    setSelectedCategoryId(null);
  };

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
        <EduNavTabs
          onCategorySelect={setSelectedCategoryId}
          selectedCategoryId={selectedCategoryId}
        />
        <FilterTags
          onTagSelect={setSelectedTagId}
          selectedTagId={selectedTagId}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedCourses?.slice(0, 4).map((course) => (
            <SchoolCards
              key={course?.id}
              title={course?.title}
              institution={course.institution?.institution_name}
              imageUrl={course.image}
              category={course.category?.category_name}
              slug={course.slug}
            />
          ))}
        </div>
        {displayedCourses?.length === 0 && (
          <div className="text-center mt-10">
            <p className="text-gray-600 mb-4">
              No courses found for the selected filters.
            </p>
            <Button onClick={resetFilters} className="bg-primary text-white">
              Reset Filters
            </Button>
          </div>
        )}
      </Card>
    </section>
  );
};

export default DiscoverPrograms;
