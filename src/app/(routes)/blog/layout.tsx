"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { BlogLayoutProps } from "@/app/types/articles/articles";

const BlogLayout = ({ children }: BlogLayoutProps) => {
  const pathname = usePathname();

  // Determine current page from pathname
  let currentPage = "tips";
  if (pathname.includes("news")) {
    currentPage = "news";
  } else if (pathname.includes("events")) {
    currentPage = "events";
  }

  // Create dynamic breadcrumb data
  const pageTitle = {
    tips: "Study Tips",
    news: "News",
    events: "Events",
  }[currentPage];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto py-4 px-4">
          <div className="flex items-center text-sm text-gray-500">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link
              href="/blog?type=tips"
              className="hover:text-primary transition-colors"
            >
              Blog
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-primary font-medium">{pageTitle}</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="container mx-auto py-8 px-4">{children}</main>
    </div>
  );
};

export default BlogLayout;
