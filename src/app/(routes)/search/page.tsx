"use client";

import { Suspense } from "react";
import SearchResults from "../../components/filtering/searchResults";
import { useSearchParams } from "next/navigation";
import Search from "@/app/components/filtering/search";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-center pb-4">
        <div className="w-full max-w-2xl">
          <Search />
        </div>
      </div>
      <Suspense fallback={<div>Loading results...</div>}>
        <SearchResults searchParams={{ query }} />
      </Suspense>
    </div>
  );
}
