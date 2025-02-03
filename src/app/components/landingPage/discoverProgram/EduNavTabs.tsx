"use client";

import { useCategories } from "@/app/hooks/courses/useCourses";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowRightLeft,
  FolderSync,
  LandmarkIcon,
  ReceiptText,
  Rotate3D,
} from "lucide-react";

const categoryIcons = {
  undergraduate: Rotate3D,
  masters: LandmarkIcon,
  phd: FolderSync,
  mba: ArrowRightLeft,
  online: ReceiptText,
};

type CategoryId = keyof typeof categoryIcons;

const EduNavTabs = ({
  onCategorySelect,
}: {
  onCategorySelect: (id: number | null) => void;
}) => {
  const { data, error, isLoading } = useCategories();

  return (
    <Tabs defaultValue="undergraduate" className="w-full">
      <TabsList className="w-full grid grid-cols-1 md:grid-cols-5 h-auto bg-white">
        {/* <TabsTrigger
          value="all"
          onClick={() => onCategorySelect(null)}
          className="data-[state=active]:bg-[#2d4a43] data-[state=active]:text-white py-6 border"
        >
          All Categories
        </TabsTrigger> */}
        {data?.map((category) => {
          const categoryId = category.category_name.toLowerCase() as CategoryId;
          const Icon = categoryIcons[categoryId] || Rotate3D;
          return (
            <TabsTrigger
              // key={category.id}
              key={`${category.id}-${category.category_name}`}
              value={category.id.toString()}
              onClick={() => onCategorySelect(category.id)}
              className="data-[state=active]:bg-[#085145] data-[state=active]:text-white py-6 border"
            >
              <Icon className="pr-1" />
              <span>{category.category_name}</span>
            </TabsTrigger>
          );
        })}
      </TabsList>
    </Tabs>
  );
};

export default EduNavTabs;
