"use client";

import * as React from "react";
import { ChevronDown, Filter, Search, X } from "lucide-react";
import { useIsMobile } from "@/app/hooks/shared/use-mobile";

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

// Filter categories with their options
const filterCategories = [
  {
    id: "degree-type",
    label: "Degree type",
    options: ["Bachelor's", "Master's", "PhD", "Certificate", "Diploma"],
  },
  {
    id: "fields-of-study",
    label: "Fields of study",
    count: 1,
    options: [
      "Computer Science",
      "Data Science",
      "Machine Learning",
      "Robotics",
    ],
  },
  {
    id: "locations",
    label: "Locations",
    options: [
      "United States",
      "United Kingdom",
      "Canada",
      "Australia",
      "Germany",
      "Spain",
      "Portugal",
    ],
  },
  {
    id: "duration",
    label: "Duration",
    options: ["1 year", "2 years", "3 years", "4 years", "5+ years"],
  },
  {
    id: "study-pace",
    label: "Study pace",
    options: ["Full-time", "Part-time", "Self-paced"],
  },
  {
    id: "language",
    label: "Language",
    options: ["English", "Spanish", "Portuguese", "German", "French"],
  },
  {
    id: "study-format",
    label: "Study format",
    options: ["On-campus", "Online", "Hybrid"],
  },
  {
    id: "application-deadline",
    label: "Application deadline",
    options: ["Rolling", "Fall 2025", "Spring 2026", "Summer 2026"],
  },
];

// Active filters
const activeFilters = [
  { category: "Technology Studies", value: "Technology Studies" },
  { category: "Artificial Intelligence", value: "Artificial Intelligence" },
];

export function FilterSidebar() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);

  // Desktop sidebar view
  if (!isMobile) {
    return (
      <Sidebar className="w-[20%] border mx-4" variant="sidebar">
        <SidebarContent>
          <SidebarGroup>
            <div className="flex items-center justify-between p-4">
              <h2 className="text-xl font-semibold">Filters</h2>
              <Button
                variant="ghost"
                className="h-auto p-0 text-muted-foreground hover:text-foreground"
              >
                Reset
              </Button>
            </div>

            {/* Active filters */}
            <div className="px-4 pb-4">
              <div className="flex flex-wrap gap-2">
                {activeFilters.map((filter) => (
                  <Badge
                    key={filter.value}
                    variant="secondary"
                    className="gap-1 pr-1.5"
                  >
                    {filter.value}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 p-0 hover:bg-transparent"
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

            {/* Filter categories */}
            <SidebarGroupContent className="space-y-0">
              {filterCategories.map((category) => (
                <FilterCategory
                  key={category.id}
                  label={category.label}
                  count={category.count}
                  options={category.options}
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
            <Button variant="outline" size="icon" className="shrink-0">
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filters</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[90vh] max-w-none p-0">
            <SheetHeader className="border-b p-4">
              <div className="flex items-center justify-between">
                <SheetTitle className="text-xl">Filters</SheetTitle>
                <Button
                  variant="ghost"
                  className="h-auto p-0 text-muted-foreground hover:text-foreground"
                >
                  Reset all
                </Button>
              </div>

              {/* Active filters */}
              <div className="mt-4 flex flex-wrap gap-2">
                {activeFilters.map((filter) => (
                  <Badge
                    key={filter.value}
                    variant="secondary"
                    className="gap-1 pr-1.5"
                  >
                    {filter.value}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 p-0 hover:bg-transparent"
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">
                        Remove {filter.value} filter
                      </span>
                    </Button>
                  </Badge>
                ))}
              </div>
            </SheetHeader>

            <div className="flex flex-col divide-y overflow-auto">
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Sort by</h3>
                </div>
                <div className="mt-2">
                  <Button variant="outline" className="w-full justify-between">
                    Recommended
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Filter categories */}
              {filterCategories.map((category) => (
                <FilterCategoryMobile
                  key={category.id}
                  label={category.label}
                  count={category.count}
                />
              ))}
            </div>

            <div className="sticky bottom-0 border-t bg-background p-4">
              <Button className="w-full" size="lg">
                Show 552 results
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
  label,
  options,
  count,
}: {
  label: string;
  options: string[];
  count?: number;
}) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="border-t py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-4 text-left"
      >
        <div className="flex items-center gap-2">
          <span className="font-medium">{label}</span>
          {count && (
            <Badge
              variant="secondary"
              className="rounded-full px-2 py-0 text-xs"
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

// Mobile filter category component (just the header, content is in a separate view)
function FilterCategoryMobile({
  label,
  count,
}: {
  label: string;
  count?: number;
}) {
  return (
    <div className="p-4">
      <button className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-medium">{label}</span>
          {count && (
            <Badge
              variant="secondary"
              className="rounded-full px-2 py-0 text-xs"
            >
              {count}
            </Badge>
          )}
        </div>
        <ChevronDown className="h-4 w-4 text-muted-foreground" />
      </button>
    </div>
  );
}
