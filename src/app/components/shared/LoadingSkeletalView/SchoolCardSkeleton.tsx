const SchoolCardSkeleton = () => {
  return (
    <div className="overflow-hidden relative animate-pulse bg-white border rounded-md shadow">
      <div className="relative h-48 w-full bg-gray-200 rounded-md" />

      <div className="p-6">
        <div className="h-5 bg-gray-200 rounded w-3/4 mb-4" />
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-10" />
        <div className="absolute bottom-4 left-4">
          <div className="inline-block h-6 w-24 bg-gray-200 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default SchoolCardSkeleton;
