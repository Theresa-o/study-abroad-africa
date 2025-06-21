import React from "react";
import CustomCard from "../shared/cardDesign/customCard";
import { ArticleType } from "@/app/types/articles/articles";

const FinancingProgram = ({ articles }: { articles: ArticleType[] }) => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="space-y-2">
            <h2 className="text-xl md:text-3xl font-bold flex items-center gap-2 font-heading">
              Financing Your Program
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 font-sans">
          {articles.map((article) => (
            <CustomCard
              key={article.id}
              id={article.id}
              //   coalescence added because of supabase type "string | null clashing with Nextjs image, link type expectation"
              image={article.image ?? ""}
              title={article.title ?? ""}
              description={article.description ?? ""}
              url={`/articles/${article.slug}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FinancingProgram;
