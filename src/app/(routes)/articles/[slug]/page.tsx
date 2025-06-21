import { BasicPage } from "@/app/components/shared/sharedPages/BasicPage";
import { articleService } from "@/app/services/articlesService";
import { notFound } from "next/dist/client/components/not-found";

export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = await articleService.getArticleBySlug(params.slug);

  if (!article) return notFound();

  return (
    <BasicPage
      title={article.title ?? ""}
      description={article.description ?? ""}
      category={article.category?.category_name ?? ""}
      imageUrl={article.image ?? ""}
      categories={article.categories}
      tags={article.tags}
    />
  );
}
