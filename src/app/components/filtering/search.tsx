"use client";

import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import MagnifyingGlassIcon from "../common/icons/magnifyingGlassIcon";

// https://nextjs.org/learn/dashboard-app/adding-search-and-pagination
const Search = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    // changing the path name to the users input
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    // Always use push when coming from homepage
    if (pathname !== "/search") {
      router.push(`/search?${params.toString()}`);
    }
    // Use replace for subsequent searches on the search page
    else {
      router.replace(`/search?${params.toString()}`);
    }
  }, 400);

  return (
    <div className="flex justify-center">
      <div className="relative w-full text-black px-5 my-1 md:w-5/6 font-sans">
        <MagnifyingGlassIcon className="absolute left-8 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        <input
          type="search"
          name="search"
          placeholder="Search by programs, universities, countries..."
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          defaultValue={searchParams.get("query")?.toString()}
          className=" h-12 md:h-14 px-10 pr-10 w-full rounded-full text-sm focus:outline-none "
        />
      </div>
    </div>
  );
};

export default Search;
