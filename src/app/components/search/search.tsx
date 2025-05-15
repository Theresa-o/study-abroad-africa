"use client";

import React, { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import MagnifyingGlassIcon from "../shared/icons/magnifyingGlassIcon";

// https://nextjs.org/learn/dashboard-app/adding-search-and-pagination
const Search = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("query") || "");

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const params = new URLSearchParams(searchParams);
    // changing the path name to the users input
    if (searchTerm) {
      params.set("query", searchTerm);
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
  };

  return (
    <div className="flex justify-center">
      <form
        onSubmit={handleSearch}
        className="relative w-full text-black px-5 my-1 md:w-5/6 font-sans "
      >
        <MagnifyingGlassIcon className="absolute left-8 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        <input
          type="search"
          name="search"
          placeholder="Search for programs, scholarships, news..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          defaultValue={searchParams.get("query")?.toString()}
          className=" h-12 md:h-14 px-10 pr-10 w-full rounded-full focus:outline-none text-xs md:text-sm"
        />
        <button
          type="submit"
          className="absolute right-6 top-2 md:right-8 py-1 md:py-2 px-4 md:px-6 bg-secondary text-white hover:bg-secondary-dark rounded-full"
        >
          <span className="text-xs md:text-sm">Search</span>
        </button>
      </form>
    </div>
  );
};

export default Search;
