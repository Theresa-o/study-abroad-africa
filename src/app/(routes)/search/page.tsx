import SearchClientWrapper from "@/app/components/search/searchClientWrapper";
import SearchResults from "../../components/search/searchResults";


export default function SearchPage({
  searchParams,
}: {
  searchParams?: { query?: string };
}) {
  const query = searchParams?.query || "";  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-center pb-4">
        <div className="w-full max-w-2xl">
          
        <SearchClientWrapper />

        </div>
      </div>
        <SearchResults searchParams={{ query }} />
    </div>
  );
}
