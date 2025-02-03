"use client";

import { Card } from "@/components/ui/card";
import FilterTags from "./FilterTags";
import SchoolCards from "./SchoolCards";
import EduNavTabs from "./EduNavTabs";
import { useCourses, useCoursesByTag } from "@/app/hooks/courses/useCourses";
import { useState } from "react";

const courses = [
  {
    title: "Oxford Artificial Intelligence Programme",
    institution: "Oxford Said",
    imageUrl: "/placeholder.svg?height=192&width=384",
    category: "Executive Education",
  },
  {
    title: "MBA Essentials",
    institution: "LSE",
    imageUrl: "/placeholder.svg?height=192&width=384",
    category: "Executive Education",
  },
  {
    title: "Artificial Intelligence: Implications for Business Strategy",
    institution: "MIT Sloan School of Management",
    imageUrl: "/placeholder.svg?height=192&width=384",
    category: "Executive Education",
  },
  {
    title: "Oxford Executive Leadership Programme",
    institution: "Oxford Said",
    imageUrl: "/placeholder.svg?height=192&width=384",
    category: "Executive Education",
  },
];

const DiscoverPrograms = () => {
  const [selectedTagId, setSelectedTagId] = useState<number | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );

  const { data: allCourses } = useCourses();
  const { data: filteredCourses } = useCoursesByTag(selectedTagId);

  const displayedCourses = (
    selectedTagId ? filteredCourses : allCourses
  )?.filter((course) => {
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
        <h1 className="text-lg md:text-4xl font-bold mb-8 text-[#2d4a43">
          Discover Programs by Category
        </h1>

        <EduNavTabs onCategorySelect={setSelectedCategoryId} />
        <FilterTags onTagSelect={setSelectedTagId} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedCourses?.map((course) => (
            <SchoolCards
              key={course?.id}
              title={course?.title}
              // institution={course?.institution.name}
              // imageUrl={course?.imageUrl}
              // category={course?.category.name}
              institution={course.institution?.institution_name} // Updated to match API response
              imageUrl={course.image} // Updated to match API response
              category={course.category?.category_name} // Updated to match API response
            />
          ))}
        </div>

        <div className="text-center mt-8">
          <a href="#" className="text-lg text-gray-900 hover:underline">
            View more options
          </a>
        </div>
      </Card>
    </section>
  );
};

export default DiscoverPrograms;
