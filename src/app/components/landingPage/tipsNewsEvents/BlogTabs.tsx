import { ArticleTagType } from "@/app/types/articles/articles";
import { articleService } from "@/app/services/articlesService";
import { eventsService } from "@/app/services/eventsService";
import BlogTabsClient from "./BlogTabsClient";

const BlogTabs = async () => {
  const articles = ([] = await articleService.getArticles());
  const events = await eventsService.getEvents();

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

  return <BlogTabsClient tips={tips} news={news} events={events} />;
};

export default BlogTabs;
