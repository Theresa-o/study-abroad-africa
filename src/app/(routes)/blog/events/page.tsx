"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";

const EventsPage = () => {
  useEffect(() => {
    redirect("/blog?type=events");
  }, []);

  return null;
};

export default EventsPage;
