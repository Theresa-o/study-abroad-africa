import React from "react";
import { useCourses } from "@/app/hooks/courses/useCourses";
import { useScholarship } from "@/app/hooks/scholarships/useScholarship";
import { useBlogTabs } from "@/app/hooks/blogTabs/useBlogTabs";
import { useEvents } from "@/app/hooks/events/useEvents";
import { useService } from "@/app/hooks/services/useServices";
import SearchSection from "./searchSection";

const SearchResults = ({
  searchParams,
}: {
  searchParams?: { query?: string };
}) => {
  const query = searchParams?.query || "";

  const { data: programs } = useCourses();
  const { data: scholarships } = useScholarship();
  const { data: articles } = useBlogTabs();
  const { data: events } = useEvents();
  const { data: services } = useService();

  const filteredPrograms =
    programs?.filter((course) =>
      course.title?.toLowerCase().includes(query.toLowerCase())
    ) ?? [];

  const filteredScholarships =
    scholarships?.filter((scholarship) =>
      scholarship.title?.toLowerCase().includes(query.toLowerCase())
    ) ?? [];

  const filteredEvents =
    events?.filter((article) =>
      article.title?.toLowerCase().includes(query.toLowerCase())
    ) ?? [];

  const filteredArticles =
    articles?.filter((article) =>
      article.title?.toLowerCase().includes(query.toLowerCase())
    ) ?? [];

  const filteredServices =
    services?.filter((service) =>
      service.title?.toLowerCase().includes(query.toLowerCase())
    ) ?? [];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">
        {query ? `Results for "${query}"` : "All Results"}
      </h1>

      {/* Programs Section */}
      {filteredPrograms?.length > 0 && (
        <SearchSection title="Programs" results={filteredPrograms} />
      )}

      {/* Scholarships Section */}
      {filteredScholarships?.length > 0 && (
        <SearchSection title="Scholarships" results={filteredScholarships} />
      )}

      {/* Articles & News Section */}
      {filteredArticles?.length > 0 && (
        <SearchSection title="Blog Articles" results={filteredArticles} />
      )}

      {/* Events Section */}
      {filteredEvents?.length > 0 && (
        <SearchSection title="Events" results={filteredEvents} />
      )}

      {/* Services Section */}
      {filteredServices?.length > 0 && (
        <SearchSection title="Services" results={filteredServices} />
      )}

      {filteredPrograms?.length === 0 &&
        filteredScholarships?.length === 0 &&
        filteredArticles?.length === 0 &&
        filteredEvents?.length === 0 &&
        filteredServices?.length === 0 && (
          <p className="text-center text-gray-500">No results found.</p>
        )}
    </div>
  );
};

export default SearchResults;
