const ServicesSectionSkeleton = () => {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <div className="h-8 w-2/3 mx-auto bg-gray-200 rounded-md animate-pulse" />
          <div className="h-5 w-1/2 mx-auto bg-gray-200 rounded-md animate-pulse" />
        </div>

        <div className="grid grid-cols-3 gap-4 max-w-[600px] mx-auto">
          {[
            "Financial Services",
            "Visa Services",
            "Language Test Services",
          ].map((_, i) => (
            <div
              key={i}
              className="h-10 bg-gray-200 rounded-md animate-pulse"
            />
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-[300px] w-full rounded-lg border border-gray-200 p-6 space-y-4 animate-pulse bg-white"
            >
              <div className="h-24 w-full bg-gray-200 rounded-md" />
              <div className="h-5 w-3/4 bg-gray-200 rounded-md" />
              <div className="h-4 w-full bg-gray-200 rounded-md" />
              <div className="h-4 w-5/6 bg-gray-200 rounded-md" />
              <div className="h-4 w-1/2 bg-gray-200 rounded-md" />
              <div className="mt-4 h-5 w-24 bg-gray-200 rounded-md" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSectionSkeleton;
