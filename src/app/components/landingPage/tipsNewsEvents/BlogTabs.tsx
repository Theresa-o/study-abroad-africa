"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ArticleCard from "./ArticleCard";

const tips = [
  {
    title: "Explore 5 Reasons a Work Visa to Europe Might be Denied",
    excerpt:
      "Understanding common pitfalls in the European work visa application process and how to avoid them.",
    date: "April 12, 2023",
    comments: 3,
    category: "Tips",
    image: "/placeholder.svg?height=200&width=400",
    href: "/blog/work-visa-europe",
  },
  {
    title: "Top 10 Tips for International Student Success",
    excerpt:
      "Essential advice for students studying abroad to make the most of their educational experience.",
    date: "April 15, 2023",
    comments: 5,
    category: "Tips",
    image: "/placeholder.svg?height=200&width=400",
    href: "/blog/student-success",
  },
  {
    title: "Explore 5 Reasons a Work Visa to Europe Might be eee",
    excerpt:
      "Understanding common pitfalls in the European work visa application process and how to avoid them.",
    date: "April 12, 2023",
    comments: 9,
    category: "Tips",
    image: "/placeholder.svg?height=200&width=400",
    href: "/blog/work-visa-europe",
  },
];

const news = [
  {
    title: "New Immigration Policy Changes in 2024",
    excerpt:
      "Recent updates to immigration policies that affect international students and workers.",
    date: "April 10, 2023",
    comments: 8,
    category: "News",
    image: "/placeholder.svg?height=200&width=400",
    href: "/blog/policy-changes",
  },
  {
    title: "Global Education Market Trends Report",
    excerpt:
      "Analysis of current trends in international education and student mobility.",
    date: "April 8, 2023",
    comments: 4,
    category: "News",
    image: "/placeholder.svg?height=200&width=400",
    href: "/blog/education-trends",
  },
  {
    title: "New Immigration Policy Changes in 2027",
    excerpt:
      "Recent updates to immigration policies that affect international students and workers.",
    date: "April 10, 2023",
    comments: 9,
    category: "News",
    image: "/placeholder.svg?height=200&width=400",
    href: "/blog/policy-changes",
  },
];

const events = [
  {
    title: "International Education Fair 2024",
    excerpt:
      "Join us for the largest education fair featuring universities from around the world.",
    date: "April 20, 2023",
    comments: 2,
    category: "Events",
    image: "/placeholder.svg?height=200&width=400",
    href: "/events/education-fair",
  },
  {
    title: "Virtual Career Fair for International Students",
    excerpt:
      "Connect with global employers looking to hire international talent.",
    date: "April 25, 2023",
    comments: 1,
    category: "Events",
    image: "/placeholder.svg?height=200&width=400",
    href: "/events/career-fair",
  },
  {
    title: "International Education Fair 2028",
    excerpt:
      "Join us for the largest education fair featuring universities from around the world.",
    date: "April 20, 2023",
    comments: 2,
    category: "Events",
    image: "/placeholder.svg?height=200&width=400",
    href: "/events/education-fair",
  },
];

const BlogTabs = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold">Tips, News & Events</h2>
          <p className="text-muted-foreground">
            Stay updated with the latest information about studying abroad
          </p>
        </div>

        <Tabs defaultValue="tips" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-[400px] mx-auto">
            <TabsTrigger value="tips">Tips</TabsTrigger>
            <TabsTrigger value="news">News</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
          </TabsList>
          <TabsContent value="tips" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tips.map((article) => (
                <ArticleCard key={article.title} {...article} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="news" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.map((article) => (
                <ArticleCard key={article.title} {...article} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="events" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((article) => (
                <ArticleCard key={article.title} {...article} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default BlogTabs;
