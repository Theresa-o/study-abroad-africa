const FilterTagsSkeleton = () => {
  return (
    <div className="flex gap-2 py-6 overflow-x-auto">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((_, idx) => (
        <div
          key={idx}
          className="h-10 w-24 bg-gray-200 rounded-full animate-pulse gap-2 "
        />
      ))}
    </div>
  );
};

export default FilterTagsSkeleton;
