"use client";

import { useEffect, useRef, useState } from "react";
import FilterPanel from "@/components/FilterPanel";
import Icon from "./Icon";

export default function MobileFilterPopup({
  activeCategories,
  setActiveCategories,
  activeStatuses,
  setActiveStatuses,
  sortOrder,
  setSortOrder,
  allCategories,
}) {
  const [open, setOpen] = useState(false);
  const popoverRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="relative flex justify-end md:hidden" ref={popoverRef}>
      <button
        onClick={() => setOpen(true)}
        className="p-2 rounded-md hover:bg-base-200 flex items-center gap-2"
        aria-label="Open filters"
      >
        <span className="text-sm text-base-content">Filters</span>

        <Icon name="filter" className="fill-white w-6 h-6" />
      </button>

      {open && (
        <>
          <div className="absolute top-full right-0 mt-2 w-70 z-100 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="bg-base-100 rounded-2xl shadow-2xl border border-white/10 overflow-hidden relative">
              {/* Кнопка закрытия */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 z-120 btn btn-circle btn-sm btn-ghost"
              >
                ✕
              </button>

              {/* Сама панель */}
              <FilterPanel
                activeCategories={activeCategories}
                setActiveCategories={setActiveCategories}
                activeStatuses={activeStatuses}
                setActiveStatuses={setActiveStatuses}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
                allCategories={allCategories}
                extraStyle="pt-10 pb-6 shadow-none" // Убираем лишние тени внутри
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
