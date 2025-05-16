"use client";
import ArticleCard from "@/app/components/landingPage/tipsNewsEvents/ArticleCard";
import { useArticles } from "@/app/hooks/blogTabs/useArticles";
import { useEvents } from "@/app/hooks/events/useEvents";
import { ArticleTagType, TabType } from "@/app/types/articles/articles";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const BlogPage = () => {
  const searchParams = useSearchParams();

  const rawType = searchParams.get("type") || "tips";
  const isValidTab = ["tips", "news", "events"].includes(rawType);
  const type = isValidTab ? (rawType as TabType) : "tips";
  const [activeTab, setActiveTab] = useState<TabType>(type);

  const { data: articles = [] } = useArticles();
  const { data: events = [] } = useEvents();

  // Update active tab when URL param changes
  useEffect(() => {
    setActiveTab(type);
  }, [type]);

  const tips = articles.filter((article) =>
    article.articles_tags?.some(
      (tag: ArticleTagType) => tag.articles_tags_id === 1
    )
  );

  const news = articles.filter((article) =>
    article.articles_tags?.some(
      (tag: ArticleTagType) => tag.articles_tags_id === 2
    )
  );

  // Content mapping based on active tab
  const contentMap: Record<TabType, any[]> = {
    tips: tips,
    news: news,
    events: events,
  };

  // Title mapping for page heading
  const titleMap: Record<TabType, string> = {
    tips: "Study Abroad Tips",
    news: "Latest Study Abroad News",
    events: "Upcoming Study Abroad Events",
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">
        {titleMap[activeTab]}
      </h1>

      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as TabType)}
        className="w-full mb-10"
      >
        <TabsList className="grid w-full grid-cols-3 max-w-[400px] mx-auto">
          <TabsTrigger
            value="tips"
            className="data-[state=active]:bg-secondary-foreground data-[state=active]:text-secondary"
            onClick={() => window.history.pushState({}, "", "/blog?type=tips")}
          >
            Tips
          </TabsTrigger>
          <TabsTrigger
            value="news"
            className="data-[state=active]:bg-secondary-foreground data-[state=active]:text-secondary"
            onClick={() => window.history.pushState({}, "", "/blog?type=news")}
          >
            News
          </TabsTrigger>
          <TabsTrigger
            value="events"
            className="data-[state=active]:bg-secondary-foreground data-[state=active]:text-secondary"
            onClick={() =>
              window.history.pushState({}, "", "/blog?type=events")
            }
          >
            Events
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {contentMap[activeTab]?.map((item) => (
          <ArticleCard key={item.id} {...item} />
        ))}
      </div>

      {contentMap[activeTab]?.length === 0 && (
        <div className="text-center py-16">
          <p className="text-xl text-gray-500">No {activeTab} found</p>
        </div>
      )}
    </div>
  );
};

export default BlogPage;
