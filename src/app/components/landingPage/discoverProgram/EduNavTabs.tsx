"use client";

import { useCategories } from "@/app/hooks/shared/useCategories";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowRightLeft,
  FolderSync,
  LandmarkIcon,
  ReceiptText,
  Rotate3D,
} from "lucide-react";
import EduNavTabsSkeleton from "../../shared/LoadingSkeletalView/EduNavTabsSkeleton";

const categoryIcons = {
  undergraduate: Rotate3D,
  masters: LandmarkIcon,
  phd: FolderSync,
  mba: ArrowRightLeft,
  online: ReceiptText,
};

type CategoryId = keyof typeof categoryIcons;

interface EduNavTabsProps {
  onCategorySelect: (id: number | null) => void;
  selectedCategoryId: number | null;
}

const EduNavTabs = ({
  onCategorySelect,
  selectedCategoryId,
}: EduNavTabsProps) => {
  const { data, isLoading: categoriesLoading } = useCategories();

  const handleCategoryClick = (categoryId: number) => {
    const newCategoryId = selectedCategoryId === categoryId ? null : categoryId;
    onCategorySelect(newCategoryId);
  };

  return (
    <>
      {categoriesLoading ? (
        <EduNavTabsSkeleton />
      ) : (
        <Tabs defaultValue="undergraduate" className="w-full">
          <TabsList className="w-full grid grid-cols-2 gap-2 md:gap-0 md:grid-cols-5 h-auto bg-white">
            {/* <TabsTrigger
          value="all"
          onClick={() => onCategorySelect(null)}
          className="data-[state=active]:bg-[#2d4a43] data-[state=active]:text-white py-6 border"
        >
          All Categories
        </TabsTrigger> */}
            {data?.map((category) => {
              const categoryId =
                category.category_name.toLowerCase() as CategoryId;
              const Icon = categoryIcons[categoryId] || Rotate3D;
              return (
                <TabsTrigger
                  key={`${category.id}-${category.category_name}`}
                  value={category.id.toString()}
                  onClick={() => handleCategoryClick(category.id)}
                  className={`py-6 border transition-all duration-300 ease-in-out  ${
                    selectedCategoryId === category.id
                      ? "data-[state=active]:bg-primary  data-[state=active]:text-white"
                      : "hover:bg-secondary hover:text-white"
                  }`}
                >
                  <Icon className="pr-1" />
                  <span>{category.category_name}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>
      )}
    </>
  );
};

export default EduNavTabs;
