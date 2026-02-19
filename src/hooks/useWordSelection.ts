// hooks/useSelection.ts
import { useState, useCallback } from 'react';

export const useWordSelection = (allIds: string[]) => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const toggle = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const selectAll = useCallback(() => {
    setSelectedIds(new Set(allIds));
  }, [allIds]);

  const clear = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  return {
    selectedIds,
    toggle,
    selectAll,
    clear,
    isAllSelected: selectedIds.size === allIds.length,
  };
};
