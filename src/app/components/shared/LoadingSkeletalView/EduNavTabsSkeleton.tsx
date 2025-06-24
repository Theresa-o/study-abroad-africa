const EduNavTabsSkeleton = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 py-4">
      {[1, 2, 3, 4, 5].map((_, idx) => (
        <div
          key={idx}
          className="h-16 py-10 bg-gray-200 rounded-md animate-pulse"
        />
      ))}
    </div>
  );
};
export default EduNavTabsSkeleton;
