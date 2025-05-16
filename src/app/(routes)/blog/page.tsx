import { Suspense } from "react";
import BlogPageClient from "./BlogPageClient";

const BlogPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogPageClient />
    </Suspense>
  );
};

export default BlogPage;
