"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ArticleCard from "./ArticleCard";
import { ArticleType, Eventype, TabType } from "@/app/types/articles/articles";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

interface BlogTabsClientProps {
  tips: ArticleType[];
  news: ArticleType[];
  events: Eventype[];
}

const BlogTabsClient = ({ tips, news, events }: BlogTabsClientProps) => {
  const [activeTab, setActiveTab] = useState<TabType>("tips");

  // Map to store the relationship between tab values and their respective routes
  const tabRoutes = {
    tips: "/blog/tips",
    news: "/blog/news",
    events: "/blog/events",
  };
  const handleTabChange = (value: string) => {
    setActiveTab(value as TabType);
  };

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold font-heading">
            Tips, News & Events
          </h2>
          <p className="text-muted-foreground font-heading">
            Stay updated with the latest information about studying abroad
          </p>
        </div>

        <Tabs
          defaultValue="tips"
          className="w-full font-sans"
          onValueChange={handleTabChange}
        >
          <TabsList className="grid w-full grid-cols-3 max-w-[400px] mx-auto">
            <TabsTrigger
              value="tips"
              className="data-[state=active]:bg-secondary-foreground data-[state=active]:text-secondary"
            >
              Tips
            </TabsTrigger>
            <TabsTrigger
              value="news"
              className="data-[state=active]:bg-secondary-foreground data-[state=active]:text-secondary"
            >
              News
            </TabsTrigger>
            <TabsTrigger
              value="events"
              className="data-[state=active]:bg-secondary-foreground data-[state=active]:text-secondary"
            >
              Events
            </TabsTrigger>
          </TabsList>
          <TabsContent value="tips" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tips?.slice(0, 3).map((article) => (
                <ArticleCard key={article.id} {...article} type="tips" />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="news" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {news?.slice(0, 3).map((article) => (
                <ArticleCard key={article.id} {...article} type="news" />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="events" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events?.slice(0, 3).map((event) => (
                <ArticleCard key={event.id} {...event} type="events" />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <div className="text-center my-8 text-lg">
        <Button
          asChild
          variant="secondary"
          className="text-white hover:bg-white hover:border-secondary border border-secondary hover:text-secondary rounded-full px-6"
        >
          <Link href={tabRoutes[activeTab]}>View more {activeTab}</Link>
        </Button>
      </div>
    </section>
  );
};

export default BlogTabsClient;
