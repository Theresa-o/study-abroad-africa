"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ArticleCard from "./ArticleCard";
import { useBlogTabs } from "@/app/hooks/blogTabs/useBlogTabs";
import { useEvents } from "@/app/hooks/events/useEvents";


const BlogTabs = () => {
  const { data: articles = [] } = useBlogTabs();
  const { data: events } = useEvents();

  const tips = articles.filter((article) =>
    article.articles_tags?.some(
      (tag: any) => tag.articles_tags_id === 1
    )
  );
  
  const news = articles.filter((article) =>
    article.articles_tags?.some(
      (tag: any) => tag.articles_tags_id === 2
    )
  );

  console.log("events", events)

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
            <TabsTrigger
              value="tips"
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
            >
              Tips
            </TabsTrigger>
            <TabsTrigger
              value="news"
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
            >
              News
            </TabsTrigger>
            <TabsTrigger
              value="events"
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
            >
              Events
            </TabsTrigger>
          </TabsList>
          <TabsContent value="tips" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tips?.map((article) => (
                <ArticleCard key={article.id} {...article} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="news" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {news?.map((article) => (
                <ArticleCard key={article.id} {...article} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="events" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events?.map((event) => (
                <ArticleCard key={event.id} {...event} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default BlogTabs;
