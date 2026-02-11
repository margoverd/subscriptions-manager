"use client";

import { ALL_STATUSES, getSubData } from "@/libs/constants";
import { useState } from "react";
import Icon from "./Icon";

const FilterPanel = ({
  subscriptions = [],
  activeCategories = [],
  setActiveCategories,
  activeStatuses = [],
  setActiveStatuses,
  sortOrder,
  setSortOrder,
  allCategories = [],
  extraStyle,
}) => {
  const getCountByStatus = (statusLabel) => {
    return subscriptions.filter((sub) => {
      const { badge } = getSubData(sub);
      return badge.text === statusLabel;
    }).length;
  };

  const toggleCategory = (id) => {
    setActiveCategories((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    );
  };

  const toggleStatus = (label) => {
    setActiveStatuses((prev) =>
      prev.includes(label) ? prev.filter((s) => s !== label) : [...prev, label],
    );
  };

  const clearAll = () => {
    setActiveCategories([]);
    setActiveStatuses([]);
    setSortOrder("recent");
  };

  return (
    <div
      className={`sticky top-4 h-auto bg-base-100 rounded-xl p-4 ${extraStyle}`}
    >
      <div className="flex justify-between items-baseline mb-6">
        <h2 className="text-lg">Filters</h2>
        <button
          className="text-xs underline text-base-content/70 cursor-pointer hover:text-primary transition-all"
          onClick={clearAll}
        >
          clear all
        </button>
      </div>

      <p className="text-xs text-base-content/70 font-normal mb-3">Status</p>

      {ALL_STATUSES.map((st, index) => (
        <div key={`status-item-${index}`} className="form-control mb-2">
          <label className="label cursor-pointer flex justify-between items-center">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="checkbox checkbox-sm rounded-md"
                checked={activeStatuses.includes(st.label)}
                onChange={() => toggleStatus(st.label)}
              />
              <span className="relative text-sm text-base-content pr-3">
                {st.label}
                <span
                  className={`flex items-center justify-center w-3.5 h-3.5 rounded-full border text-[10px] font-bold cursor-help ${st.color} text-base-300 absolute top-0 -right-1 tooltip tooltip-${st.label} tooltip-top before:max-w-40 before:text-sm before:font-normal`}
                  data-tip={st.description}
                >
                  ?
                </span>
              </span>
            </div>
            <span className="text-sm text-base-content/70">
              ({getCountByStatus(st.label)})
            </span>
          </label>
        </div>
      ))}

      <div className="form-control mt-4 mb-3">
        <p className="text-xs text-base-content/70 text-normal mb-3 mt-6">
          Sorting
        </p>

        {[
          { value: "recent", label: "Recent" },
          { value: "expensive", label: "Most expensive" },
          { value: "cheap", label: "Cheapest" },
        ].map((option, index) => (
          <label
            key={`sort-option-${index}`}
            className="label cursor-pointer gap-2 mb-2 block"
          >
            <input
              type="radio"
              name="sort"
              className="radio radio-sm mr-1.5"
              value={option.value}
              checked={sortOrder === option.value}
              onChange={(e) => setSortOrder(e.target.value)}
            />
            <span className="text-sm text-base-content">{option.label}</span>
          </label>
        ))}
      </div>

      <p className="text-xs text-base-content/70 text-normal mb-3 mt-6">
        Categories
      </p>

      <div className="max-w-7xl mx-auto flex flex-wrap gap-2 mb-4">
        {allCategories.map((cat) => {
          // Проверка: если cat вдруг undefined или у него нет _id, пропускаем его
          if (!cat || !cat._id) return null;
          // Проверяем, включен ли конкретный проект в массив выбранных
          const isActive = activeCategories.includes(cat._id);
          return (
            <button
              key={cat._id}
              onClick={() => toggleCategory(cat._id)}
              className={`relative text-sm px-1.5 py-0.5 rounded-lg transition-all border cursor-pointer
                ${
                  isActive
                    ? "bg-base-200 border-base-content text-base-content font-medium"
                    : "bg-base-200 border-base-300 text-base-content/70"
                }
              `}
            >
              {cat.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FilterPanel;
