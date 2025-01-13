const FilterTags = () => {
  const tags = [
    "Popular",
    "AI & Digital Transformation",
    "Business & Economics",
    "Data Science & Analysis",
    "Education",
    "Finance, Investment & Banking",
    "Healthcare",
    "HR & operations",
    "Information technology and cybersecurity",
    "Computer science",
    "Marketing, sales & design",
  ];

  return (
    <div className="flex whitespace-nowrap gap-2 py-6 overflow-x-auto ">
      {tags.map((tag) => (
        <button
          key={tag}
          className="px-4 py-2 rounded-full bg-slate-100 border border-gray-300 hover:bg-[#2d4a43] hover:text-white text-sm transition-colors"
        >
          {tag}
        </button>
      ))}
    </div>
  );
};
export default FilterTags;
