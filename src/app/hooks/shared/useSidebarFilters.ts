import React, { useEffect, useState } from 'react'

const useSidebarFilters = () => {
      const [selectedTagId, setSelectedTagId] = useState<number | null>(null);
      const [activeFilters, setActiveFilters] = useState<
        { id: string; value: string }[]
      >([]);

        // Reset tag filter when sidebar filters are applied
        useEffect(() => {
          if (activeFilters.length > 0) {
            setSelectedTagId(null);
          }
        }, [activeFilters]);
      
        // Function to toggle filters, to be passed to FilterSidebar
        const toggleFilter = (id: string, value: string) => {
          setActiveFilters((prev) => {
            const exists = prev.some((f) => f.id === id && f.value === value);
            if (exists) {
              return prev.filter((f) => !(f.id === id && f.value === value));
            } else {
              return [...prev, { id, value }];
            }
          });
        };
      
        // Reset all filters
        const resetFilters = () => {
          setActiveFilters([]);
          setSelectedTagId(null);
        };
  return {
    activeFilters,
    selectedTagId,
    setSelectedTagId,
    toggleFilter,
    resetFilters,
  }
}

export default useSidebarFilters
