"use client";

import { useTags } from "@/app/hooks/shared/useTags";
import { Button } from "@/components/ui/button";
import FilterTagsSkeleton from "../../shared/LoadingSkeletalView/FilterTagsSkeleton";

interface FilterTagsProps {
  onTagSelect: (tagId: number | null) => void;
  selectedTagId: number | null;
}

const FilterTags = ({ onTagSelect, selectedTagId }: FilterTagsProps) => {
  const { data: tags, isLoading: tagsLoading } = useTags();

  const handleTagClick = (tagId: number) => {
    const newTagId = selectedTagId === tagId ? null : tagId;
    onTagSelect(newTagId);
  };

  return (
    <>
      {tagsLoading ? (
        <FilterTagsSkeleton />
      ) : (
        <div className="flex whitespace-nowrap gap-2 py-6 overflow-x-auto ">
          {tags?.map((tag) => (
            <Button
              key={tag.id}
              className={`px-4 py-2 rounded-full border border-gray-300 text-sm transition-colors ${
                selectedTagId === tag.id
                  ? "bg-primary text-white"
                  : "bg-slate-100 text-black hover:bg-secondary hover:text-white"
              }`}
              onClick={() => handleTagClick(tag.id)}
            >
              {tag.tag_name}
            </Button>
          ))}
        </div>
      )}
    </>
  );
};
export default FilterTags;
