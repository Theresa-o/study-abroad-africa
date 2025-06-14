"use client";

import * as React from "react";
import { ChevronDown, Filter, Search, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { useMediaQuery } from "@/app/hooks/shared/use-media-query";
import { useMemo, useState } from "react";
import { useCategories } from "@/app/hooks/shared/useCategories";
import { useTags } from "@/app/hooks/shared/useTags";
import { useInstitutions } from "@/app/hooks/institutions/useInstitutions";
import { useStudyDestinations } from "@/app/hooks/studyDestination/useStudyDestination";

interface FilterSidebarProps {
  activeFilters: { id: string; value: string }[];
  toggleFilter: (id: string, value: string) => void;
  resetFilters: () => void;
}

export function FilterSidebar({
  activeFilters,
  toggleFilter,
  resetFilters,
}: FilterSidebarProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);

  const { data: categories } = useCategories();
  const { data: tags } = useTags();
  const { data: destinations } = useStudyDestinations();
  const { data: institutions } = useInstitutions();

  // Group filters by category to calculate counts
  const filterCounts = useMemo(() => {
    const counts = {
      "degree-type": 0,
      "fields-of-study": 0,
      locations: 0,
      institution: 0,
    };

    activeFilters.forEach((filter) => {
      if (filter.id in counts) {
        counts[filter.id as keyof typeof counts]++;
      }
    });

    return counts;
  }, [activeFilters]);

  const filterCategories = useMemo(() => {
    return [
      {
        id: "degree-type",
        label: "Degree type",
        options: categories?.map((cat) => cat.category_name) ?? [],
        count: filterCounts["degree-type"],
      },
      {
        id: "fields-of-study",
        label: "Fields of study",
        options: tags?.map((tag) => tag.tag_name) ?? [],
        count: filterCounts["fields-of-study"],
      },
      {
        id: "locations",
        label: "Locations",
        options: destinations?.map((dest) => dest.country) ?? [],
        count: filterCounts["locations"],
      },
      {
        id: "institution",
        label: "Institution",
        options: institutions?.map((inst) => inst.institution_name) ?? [],
        count: filterCounts["institution"],
      },
    ];
  }, [categories, tags, destinations, institutions, filterCounts]);

  // Function to remove a specific filter
  const removeFilter = (id: string, value: string) => {
    // Since toggleFilter acts as both add and remove
    toggleFilter(id, value);
  };

  // Desktop sidebar view
  if (!isMobile) {
    return (
      <Sidebar className="w-[20%] border mx-4" variant="sidebar">
        <SidebarContent>
          <SidebarGroup>
            <div className="flex items-center justify-between p-4">
              <h2 className="text-xl font-semibold">Filters</h2>
              <Button
                onClick={resetFilters}
                variant="ghost"
                className="h-auto text-muted-foreground hover:text-white hover:bg-secondary"
              >
                Reset
              </Button>
            </div>

            {/* Active filters */}
            {activeFilters.length > 0 && (
              <div className="px-4 pb-4">
                <div className="flex flex-wrap gap-2">
                  {activeFilters.map((filter) => (
                    <Badge
                      key={`${filter.id}-${filter.value}`}
                      variant="secondary"
                      className="gap-1 pr-1.5 text-white"
                    >
                      {filter.value}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 p-0 hover:bg-transparent"
                        onClick={() => removeFilter(filter.id, filter.value)}
                      >
                        <X className="h-3 w-3" />
                        <span className="sr-only">
                          Remove {filter.value} filter
                        </span>
                      </Button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Filter categories */}
            <SidebarGroupContent className="space-y-0">
              {filterCategories.map((category) => (
                <FilterCategory
                  key={category.id}
                  id={category.id}
                  label={category.label}
                  count={category.count}
                  options={category.options}
                  activeFilters={activeFilters}
                  toggleFilter={toggleFilter}
                />
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    );
  }

  // Mobile view with filter button and sheet
  return (
    <div className="w-full">
      <div className="flex w-full items-center gap-2 p-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for subject or location"
            className="pl-8"
          />
        </div>
        <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 hover:bg-secondary hover:text-white"
            >
              <Filter className="h-4 w-4 " />
              <span className="sr-only">Filters</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[90vh] max-w-none p-0">
            <SheetHeader className="border-b p-4">
              <div className="flex items-center justify-between py-4">
                <SheetTitle className="text-xl">Filters</SheetTitle>
                <Button
                  variant="ghost"
                  className="h-auto mx-12 text-muted-foreground hover:text-foreground hover:text-white bg-secondary text-white hover:bg-secondary-dark rounded-full"
                  onClick={resetFilters}
                >
                  Reset all
                </Button>
              </div>

              {/* Active filters */}
              {activeFilters.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2 text-white">
                  {activeFilters.map((filter) => (
                    <Badge
                      key={`${filter.id}-${filter.value}`}
                      variant="secondary"
                      className="gap-1 pr-1.5"
                    >
                      {filter.value}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 p-0 hover:bg-transparent"
                        onClick={() => removeFilter(filter.id, filter.value)}
                      >
                        <X className="h-3 w-3" />
                        <span className="sr-only ">
                          Remove {filter.value} filter
                        </span>
                      </Button>
                    </Badge>
                  ))}
                </div>
              )}
            </SheetHeader>

            <div className="flex flex-col divide-y overflow-auto">
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="-bold mx-auto text-2xl">Sort by</h3>
                </div>
              </div>

              {/* Filter categories */}
              {filterCategories.map((category) => (
                <FilterCategoryMobile
                  key={category.id}
                  id={category.id}
                  label={category.label}
                  count={category.count}
                  options={category.options}
                  activeFilters={activeFilters}
                  toggleFilter={toggleFilter}
                />
              ))}
            </div>

            <div className="sticky bottom-0 border-t bg-background p-4">
              <Button
                className="w-full text-white"
                size="lg"
                onClick={() => setIsFilterOpen(false)}
              >
                Show results
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}

// Desktop filter category component
function FilterCategory({
  id,
  label,
  options,
  count,
  activeFilters,
  toggleFilter,
}: {
  id: string;
  label: string;
  options: string[];
  count?: number;
  activeFilters: { id: string; value: string }[];
  toggleFilter: (id: string, value: string) => void;
}) {
  // const [isOpen, setIsOpen] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(count ? true : false);

  // Check if a specific option is selected
  const isOptionSelected = (value: string) => {
    return activeFilters.some(
      (filter) => filter.id === id && filter.value === value
    );
  };

  return (
    <div className="border-t py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-4 text-left"
      >
        <div className="flex items-center gap-2">
          <span className="font-medium">{label}</span>
          {count !== undefined && count > 0 && (
            <Badge
              variant="secondary"
              className="rounded-full px-2 py-0 text-xs text-white"
            >
              {count}
            </Badge>
          )}
        </div>
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="mt-2 space-y-1 px-4">
          {options.map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={`${label}-${option}`}
                checked={isOptionSelected(option)}
                onChange={() => toggleFilter(id, option)}
                className="h-4 w-4 rounded border-gray-300"
              />
              <label
                htmlFor={`${label}-${option}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {option}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Mobile filter category component
function FilterCategoryMobile({
  id,
  label,
  options,
  count,
  activeFilters,
  toggleFilter,
}: {
  id: string;
  label: string;
  options: string[];
  count?: number;
  activeFilters: { id: string; value: string }[];
  toggleFilter: (id: string, value: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  // Check if a specific option is selected
  const isOptionSelected = (value: string) => {
    return activeFilters.some(
      (filter) => filter.id === id && filter.value === value
    );
  };

  return (
    <div className="py-4">
      <div className="px-4">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center gap-2">
            <span className="font-medium">{label}</span>
            {count !== undefined && count > 0 && (
              <Badge
                variant="secondary"
                className="rounded-full px-2 py-0 text-xs text-white"
              >
                {count}
              </Badge>
            )}
          </div>
          <ChevronDown
            className={`h-4 w-4 text-muted-foreground transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>

      {isOpen && (
        <div className="mt-4 px-4 space-y-2 max-h-60 overflow-y-auto">
          {options.map((option) => (
            <div key={option} className="flex items-center space-x-3">
              <input
                type="checkbox"
                id={`${label}-${option}`}
                checked={isOptionSelected(option)}
                onChange={() => toggleFilter(id, option)}
                className="h-4 w-4 rounded border-gray-300"
              />
              <label
                htmlFor={`mobile-${label}-${option}`}
                className="text-sm font-medium leading-none"
              >
                {option}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
