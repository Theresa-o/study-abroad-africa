"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";

const TipsPage = () => {
  useEffect(() => {
    redirect("/blog?type=tips");
  }, []);

  return null;
};

export default TipsPage;
