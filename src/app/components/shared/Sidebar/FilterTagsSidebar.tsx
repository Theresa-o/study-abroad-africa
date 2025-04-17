"use client";

import { useTags } from "@/app/hooks/courses/useCourses";
import { Button } from "@/components/ui/button";

interface FilterTagSidebarProps {
  onTagSelect: (tagId: number | null) => void;
  selectedTagId?: number | null;
  disabled?: boolean;
}

const FilterTagsSidebar = ({
  onTagSelect,
  selectedTagId,
  disabled = false,
}: FilterTagSidebarProps) => {
  const { data: tags } = useTags();

  const handleClick = (tagId: number) => {
    if (disabled) return;
    onTagSelect(selectedTagId === tagId ? null : tagId);
  };
  if (!tags) return null;

  return (
    <div className="flex whitespace-nowrap gap-2 py-6 overflow-x-auto ">
      {tags.map((tag) => (
        <Button
          key={tag.id}
          className={`px-4 py-2 rounded-full border border-gray-300 text-sm transition-colors ${
            selectedTagId === tag.id
              ? "bg-primary text-white"
              : "bg-slate-100 hover:bg-secondary hover:text-white"
          }`}
          onClick={() => handleClick(tag.id)}
          disabled={disabled}
        >
          {tag.tag_name}
        </Button>
      ))}

      {disabled && (
        <div className="text-xs text-muted-foreground ml-2">
          (Clear sidebar filters to use tag filters)
        </div>
      )}
    </div>
  );
};
export default FilterTagsSidebar;
