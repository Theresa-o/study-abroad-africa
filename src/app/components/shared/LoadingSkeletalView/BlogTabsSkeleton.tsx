const BlogTabsSkeleton = () => {
  return (
    <section className="py-16 px-4 bg-gray-50 animate-pulse">
      <div className="max-w-7xl mx-auto space-y-4">
        <div className="text-center space-y-2">
          <div className="h-6 w-1/2 bg-gray-300 mx-auto rounded" />
          <div className="h-4 w-2/3 bg-gray-200 mx-auto rounded" />
        </div>
        <div className="grid grid-cols-3 gap-4 max-w-[400px] mx-auto mt-4">
          {[...Array(3)].map((_, idx) => (
            <div key={idx} className="h-10 bg-gray-300 rounded" />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {[...Array(3)].map((_, idx) => (
            <div key={idx} className="h-40 bg-gray-200 rounded-lg" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogTabsSkeleton;
