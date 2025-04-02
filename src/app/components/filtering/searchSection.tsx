import React from "react";
import SearchCard from "./searchCard";

const searchSection = ({
  title,
  results,
}: {
  title: string;
  results: any[];
}) => {
  return (
    <section className="py-6 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xl md:text-2xl font-bold mb-4">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {results.map((item) => (
            <SearchCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default searchSection;
