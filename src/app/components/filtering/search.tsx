"use client";

import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

// https://nextjs.org/learn/dashboard-app/adding-search-and-pagination
const Search = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    // user types a new search query, you want to reset the page number to 1.
    params.set("page", "1");
    // changing the path name to the users input
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="flex justify-center">
      <div className="relative w-full text-gray-600 px-5 my-1 md:w-5/6">
        <input
          type="search"
          name="search"
          placeholder="Search by programs, universities, countries..."
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          defaultValue={searchParams.get("query")?.toString()}
          className="bg-purple-100 h-12 md:h-14 px-4 pr-10 w-full rounded-full text-sm focus:outline-none "
        />
      </div>
    </div>
  );
};

export default Search;
