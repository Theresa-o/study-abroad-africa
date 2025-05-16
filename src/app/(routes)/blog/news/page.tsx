"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";

const NewsPage = () => {
  useEffect(() => {
    redirect("/blog?type=news");
  }, []);

  return null;
};

export default NewsPage;
