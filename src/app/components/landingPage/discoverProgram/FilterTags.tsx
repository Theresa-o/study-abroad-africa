"use client";

import { useTags } from "@/app/hooks/courses/useCourses";
import { useState } from "react";

const FilterTags = ({
  onTagSelect,
}: {
  onTagSelect: (tagId: number | null) => void;
}) => {
  const [selectedTagId, setSelectedTagId] = useState<number | null>(null);

  const { data } = useTags();

  const handleTagClick = (tagId: number) => {
    const newTagId = selectedTagId === tagId ? null : tagId;
    setSelectedTagId(newTagId);
    onTagSelect(newTagId);
  };

  return (
    <div className="flex whitespace-nowrap gap-2 py-6 overflow-x-auto ">
      {data?.map((tag) => (
        <button
          key={tag.id}
          className={`px-4 py-2 rounded-full border border-gray-300 text-sm transition-colors ${
            selectedTagId === tag.id
              ? "bg-primary text-white"
              : "bg-slate-100 hover:bg-secondary hover:text-white"
          }`}
          onClick={() => handleTagClick(tag.id)}
        >
          {tag.tag_name}
        </button>
      ))}
    </div>
  );
};
export default FilterTags;
