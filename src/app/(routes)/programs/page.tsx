"use client";

import CustomCard from "@/app/components/shared/cardDesign/customCard";
import { FilterSidebar } from "@/app/components/shared/Sidebar/FilterSidebar";
import { useCourses } from "@/app/hooks/courses/useCourses";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Home() {
  const { data: programs } = useCourses();
  return (
    <div className="flex flex-col my-6">
      <SidebarProvider>
        <FilterSidebar />
      </SidebarProvider>
      <main className="md:w-[76%] md:ml-auto pl-6 md:mr-4 mx-2">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">All Programs</h1>
        </div>

        {/* Explore chips */}
        <div className="mb-6 flex flex-wrap gap-2">
          <span className="text-lg font-medium">Explore</span>
          {[
            "Masters of Science",
            "Master Degrees",
            "Bachelors of Science",
            "Bachelor Degrees",
            "Courses",
            "Summer Courses",
          ].map((item) => (
            <button
              key={item}
              className="rounded-full border bg-background px-4 py-1 text-sm hover:bg-muted"
            >
              {item}
            </button>
          ))}
        </div>

        {/* degree cards */}
        <div className="my-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs?.map((program) => (
            <CustomCard key={program.id} {...program} />
          ))}
        </div>
      </main>
    </div>
  );
}
