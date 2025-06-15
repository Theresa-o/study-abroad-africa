import { Breadcrumbs } from "@/app/components/shared/Breadcrumb/Breadcrumb";
import { BasicPage } from "@/app/components/shared/sharedPages/BasicPage";
import { articleService } from "@/app/services/articlesService";
import { Button } from "@/components/ui/button";
import { DateTime } from "luxon";
import React from "react";

type Props = {
  params: {
    slug: string;
  };
};

const page = async ({ params }: Props) => {
  const slug = params.slug;

  const article = await articleService.getArticleBySlug(slug);

  const breadcrumbItems = [
    {
      label: "Tips",
      href: "/blog?type=tips",
    },
    {
      label: article.title,
    },
  ];

  const additionalContent = (
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <h3 className="text-xl font-semibold mb-3">Article Details</h3>
        <div className="space-y-2">
          {article.author && (
            <p>
              <strong>Author:</strong> {article.author}
            </p>
          )}
          {article.created_at && (
            <p>
              <strong>Published:</strong>{" "}
              {DateTime.fromISO(article.created_at).toFormat("MMM d, yyyy")}
            </p>
          )}
          {article.category?.category_name && (
            <p>
              <strong>Category:</strong> {article.category.category_name}
            </p>
          )}

          {article?.country?.country && (
            <p>
              <strong>Country:</strong> {article.country.country}
            </p>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-3">Quick Actions</h3>
        {article.url && (
          <Button
            className="bg-secondary text-white hover:bg-white hover:text-secondary font-sans"
            size="lg"
          >
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              Read Full Article
            </a>
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={breadcrumbItems} />

      <BasicPage
        title={article.title ?? ""}
        description={article.description ?? ""}
        imageUrl={article.image ?? ""}
        additionalContent={additionalContent}
      />
    </div>
  );
};

export default page;
