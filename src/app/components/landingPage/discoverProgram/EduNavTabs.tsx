"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowRightLeft,
  FolderSync,
  LandmarkIcon,
  ReceiptText,
  Rotate3D,
} from "lucide-react";

const EduNavTabs = () => {
  return (
    <Tabs defaultValue="all-programs" className="w-full">
      <TabsList className="w-full grid grid-cols-1 md:grid-cols-5 h-auto bg-white">
        <TabsTrigger
          value="all-programs"
          className="data-[state=active]:bg-[#2d4a43] data-[state=active]:text-white py-6 border"
        >
          <Rotate3D className="pr-1" />
          <span>All Programs</span>
        </TabsTrigger>
        <TabsTrigger
          value="masters"
          className="data-[state=active]:bg-[#2d4a43] data-[state=active]:text-white py-6 border"
        >
          <LandmarkIcon className="pr-1" />
          <span>Masters</span>
        </TabsTrigger>
        <TabsTrigger
          value="phd"
          className="data-[state=active]:bg-[#2d4a43] data-[state=active]:text-white py-6 border"
        >
          <FolderSync className="pr-1" />
          <span>PhD</span>
        </TabsTrigger>
        <TabsTrigger
          value="mba"
          className="data-[state=active]:bg-[#2d4a43] data-[state=active]:text-white py-6 border"
        >
          <ArrowRightLeft className="pr-1" />
          <span>MBA</span>
        </TabsTrigger>
        <TabsTrigger
          value="online"
          className="data-[state=active]:bg-[#2d4a43] data-[state=active]:text-white py-6 border"
        >
          <ReceiptText className="pr-1" />
          <span>Online</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default EduNavTabs;
