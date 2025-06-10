"use client";

import CustomCard from "@/app/components/shared/cardDesign/customCard";
import { FilterSidebar } from "@/app/components/shared/filterSidebar/FilterSidebar";
import {
  useCourses,
  useCoursesByTag,
  useFilteredCourses,
} from "@/app/hooks/courses/useCourses";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import FilterTagsSidebar from "@/app/components/shared/filterSidebar/FilterTagsSidebar";
import useSidebarFilters from "@/app/hooks/shared/useSidebarFilters";

export default function Home() {
  const {
    activeFilters,
    selectedTagId,
    setSelectedTagId,
    toggleFilter,
    resetFilters,
  } = useSidebarFilters();
  const { data: allCourses } = useCourses();
  const { data: tagFilteredCourses } = useCoursesByTag(selectedTagId);
  // Get filtered courses based on the sidebar filters
  const { filteredCourses } = useFilteredCourses(activeFilters);

  // Choose which courses to display
  // Priority: 1. Tag filter, 2. Sidebar filters, 3. All courses
  const displayedCourses = selectedTagId
    ? tagFilteredCourses
    : activeFilters.length > 0
    ? filteredCourses
    : allCourses;

  return (
    <div className="flex flex-col my-6">
      <SidebarProvider>
        <FilterSidebar
          activeFilters={activeFilters}
          toggleFilter={toggleFilter}
          resetFilters={resetFilters}
        />
      </SidebarProvider>
      <main className="md:w-[76%] md:ml-auto md:pl-6 md:mr-4 mx-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Showing {displayedCourses?.length || 0} programs
        </h1>

        {/* Explore chips */}
        <div className="mb-6 flex flex-wrap gap-2">
          <FilterTagsSidebar
            onTagSelect={setSelectedTagId}
            selectedTagId={selectedTagId}
            disabled={activeFilters.length > 0}
          />
        </div>

        {/* degree cards */}
        <div className="my-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedCourses?.map((program) => (
            <CustomCard
              key={program.id}
              {...program}
              url={`/programs/courses/${program.slug}`}
            />
          ))}
          {/* Show message when no results */}
          {(!displayedCourses || displayedCourses.length === 0) && (
            <div className="col-span-full text-center py-8 my-auto">
              <p className="text-lg text-muted-foreground">
                No programs match your filters
              </p>
              <Button variant="outline" className="mt-4" onClick={resetFilters}>
                Reset filters
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
