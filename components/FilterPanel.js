"use client";

import { ALL_STATUSES } from "@/libs/constants";
import { useState } from "react";

const FilterPanel = ({ extraStyle }) => {
  const [activeProjects, setActiveProjects] = useState([]);
  const [activeStatuses, setActiveStatuses] = useState([]);
  const [sortOrder, setSortOrder] = useState("recent");

  // Переключение проектов (множественный выбор)
  const toggleProject = (projectName) => {
    setActiveProjects(
      (prev) =>
        prev.includes(projectName)
          ? prev.filter((p) => p !== projectName) // Удаляем, если уже выбран
          : [...prev, projectName], // Добавляем, если не выбран
    );
  };

  // Переключение статусов (множественный выбор)
  const toggleStatus = (statusLabel) => {
    setActiveStatuses((prev) =>
      prev.includes(statusLabel)
        ? prev.filter((s) => s !== statusLabel)
        : [...prev, statusLabel],
    );
  };

  // Полная очистка
  const clearAll = () => {
    setActiveProjects([]);
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
                  className={`absolute w-2 h-2 rounded-full top-0 right-0 ${st.color}`}
                ></span>
              </span>
            </div>
            <span className="text-sm text-base-content/70">(0)</span>
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
        Projects
      </p>

      <div className="max-w-screen-xl mx-auto flex flex-wrap gap-2 mb-4">
        {["Project 1", "Project 2", "Project 3"].map((cat) => {
          // Проверяем, включен ли конкретный проект в массив выбранных
          const isActive = activeProjects.includes(cat);

          return (
            <button
              key={cat}
              onClick={() => toggleProject(cat)}
              className={`relative text-sm px-1.5 py-0.5 rounded-lg transition-all border cursor-pointer
                ${
                  isActive
                    ? "bg-base-200 border-base-content text-base-content font-medium"
                    : "bg-base-200 border-base-300 text-base-content/70"
                }
              `}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FilterPanel;
