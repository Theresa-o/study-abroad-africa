"use client";

import { useArticles } from "@/app/hooks/blogTabs/useArticles";
import React from "react";
import ChoosingUniversity from "./ChoosingUniversity";
import { ArticleTagType } from "@/app/types/articles/articles";
import ApplicationProcess from "./ApplicationProcess";
import RequiredTests from "./RequiredTests";
import FinancingProgram from "./FinancingProgram";
import StudentVisaGuide from "./StudentVisaGuide";
import StudentLife from "./StudentLife";
import PostStudyOptions from "./PostStudyOptions";
import ScholarshipsByDestination from "./ScholarshipsByDestination";

const CountryArticlesBySection = ({
  destinationId,
  countryName,
}: {
  destinationId: number;
  countryName: string;
}) => {
  const { data: articles = [] } = useArticles();

  const filterByTag = (tagId: number) =>
    articles.filter((article) =>
      article.articles_tags?.some(
        (tag: ArticleTagType) => tag.articles_tags_id === tagId
      )
    );

  return (
    <>
      <ChoosingUniversity articles={filterByTag(3)} />
      <ApplicationProcess articles={filterByTag(4)} />
      <RequiredTests articles={filterByTag(5)} />
      <FinancingProgram articles={filterByTag(6)} />
      <ScholarshipsByDestination
        destinationId={destinationId}
        countryName={countryName}
      />
      <StudentVisaGuide articles={filterByTag(7)} />
      <StudentLife articles={filterByTag(8)} />
      <PostStudyOptions articles={filterByTag(9)} />
    </>
  );
};

export default CountryArticlesBySection;
