"use client";
import { useState, useMemo } from "react";
import FilterPanel from "./FilterPanel";
import SubscriptionCard from "./SubscriptionCard";
import MobileFilterPopup from "./MobileFilterPopup";
import { getSubData } from "@/libs/constants";

export default function SubscriptionList({ initialSubs, availableCategories }) {
  const [activeCategories, setActiveCategories] = useState([]);
  const [activeStatuses, setActiveStatuses] = useState([]);
  const [sortOrder, setSortOrder] = useState("recent");

  // Функция сброса (такая же, как в FilterPanel)
  const clearAll = () => {
    setActiveCategories([]);
    setActiveStatuses([]);
    setSortOrder("recent");
  };

  const filterProps = {
    subscriptions: initialSubs,
    activeCategories,
    setActiveCategories,
    activeStatuses,
    setActiveStatuses,
    sortOrder,
    setSortOrder,
    allCategories: availableCategories,
    clearAll,
  };

  // ФУНКЦИЯ ФИЛЬТРАЦИИ
  const filteredSubs = useMemo(() => {
    let result = [...initialSubs];

    // 1. Используем getSubData для фильтрации
    if (activeStatuses.length > 0) {
      result = result.filter((sub) => {
        const { badge } = getSubData(sub);
        return activeStatuses.includes(badge.text);
      });
    }

    // 2. Фильтр по проектам (категориям)
    if (activeCategories.length > 0) {
      result = result.filter((sub) =>
        sub.categories?.some((catId) =>
          // Приводим всё к строке на случай, если где-то затесался объект ObjectId
          activeCategories.includes(catId.toString()),
        ),
      );
    }

    // 3. Сортировка
    if (sortOrder === "expensive") result.sort((a, b) => b.price - a.price);
    if (sortOrder === "cheap") result.sort((a, b) => a.price - b.price);
    if (sortOrder === "recent")
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return result;
  }, [initialSubs, activeCategories, activeStatuses, sortOrder]);

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[minmax(248px,248px)_1fr] items-stretch gap-4">
      <aside className="relative hidden md:block">
        <FilterPanel {...filterProps} />
      </aside>
      <main>
        <MobileFilterPopup {...filterProps} />
        {/* Проверяем, есть ли подписки после фильтрации */}
        {filteredSubs.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSubs.map((sub) => (
              <SubscriptionCard key={sub._id} sub={sub} />
            ))}
          </ul>
        ) : (
          /* Сообщение, если ничего не найдено */
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-base-content/50 mb-4">
              No subscriptions found with these filters.
            </p>
            <button
              onClick={clearAll}
              className="btn btn-primary btn-sm shadow-none font-normal"
            >
              Clear all filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
