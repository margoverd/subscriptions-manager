"use client";

import { useState } from "react";
import FilterPanel from "@/components/FilterPanel";

export default function MobileFilterPopup() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex justify-end md:hidden">
      <button
        onClick={() => setOpen(true)}
        className="p-2 rounded-md hover:bg-base-200 flex items-center gap-2"
        aria-label="Open filters"
      >
        <span className="text-sm text-base-content">Filters</span>

        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V6.17C1.99986 6.58294 2.08497 6.99147 2.25 7.37V7.43C2.39128 7.75097 2.59139 8.04266 2.84 8.29L9 14.41V21C8.99966 21.1699 9.04264 21.3372 9.12487 21.4859C9.20711 21.6346 9.32589 21.7599 9.47 21.85C9.62914 21.9486 9.81277 22.0006 10 22C10.1565 21.9991 10.3107 21.9614 10.45 21.89L14.45 19.89C14.6149 19.8069 14.7536 19.6798 14.8507 19.5227C14.9478 19.3656 14.9994 19.1847 15 19V14.41L21.12 8.29C21.3686 8.04266 21.5687 7.75097 21.71 7.43V7.37C21.8888 6.99443 21.9876 6.58578 22 6.17V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2Z"
            className="fill-base-content"
          />
        </svg>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />

          <div className="">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-3 z-55"
            >
              ✕
            </button>

            <FilterPanel extraStyle="pt-8" />
          </div>
        </>
      )}
    </div>
  );
}
