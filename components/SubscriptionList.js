"use client";
import { useState, useMemo } from "react";
import FilterPanel from "./FilterPanel";
import SubscriptionCard from "./SubscriptionCard";
import MobileFilterPopup from "./MobileFilterPopup";

export default function SubscriptionList({ initialSubs, availableCategories }) {
  const [activeCategories, setActiveCategories] = useState([]);
  const [activeStatuses, setActiveStatuses] = useState([]);
  const [sortOrder, setSortOrder] = useState("recent");

  // ФУНКЦИЯ ФИЛЬТРАЦИИ
  const filteredSubs = useMemo(() => {
    let result = [...initialSubs];

    // 1. Фильтр по статусам (нужно вычислить статус для каждой подписки)
    if (activeStatuses.length > 0) {
      result = result.filter((sub) => {
        const status = calculateStatus(sub); // Функция ниже
        return activeStatuses.includes(status);
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

  // const allCategories = useMemo(() => {
  //   return [...new Set(initialSubs.flatMap((s) => s.categories || []))];
  // }, [initialSubs]);

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[minmax(248px,248px)_1fr] items-stretch gap-4">
      <aside className="relative hidden md:block">
        <FilterPanel
          subscriptions={initialSubs}
          activeCategories={activeCategories}
          setActiveCategories={setActiveCategories}
          activeStatuses={activeStatuses}
          setActiveStatuses={setActiveStatuses}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          allCategories={availableCategories}
        />
      </aside>
      <main>
        <MobileFilterPopup
          subscriptions={initialSubs}
          activeCategories={activeCategories}
          setActiveCategories={setActiveCategories}
          activeStatuses={activeStatuses}
          setActiveStatuses={setActiveStatuses}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          allCategories={availableCategories}
        />
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSubs.map((sub) => (
            <SubscriptionCard key={sub._id} sub={sub} />
          ))}
        </ul>
      </main>
    </div>
  );
}

// Вспомогательная функция для расчета статуса (та же логика, что была в Dashboard)
function calculateStatus(sub) {
  const createdAt = new Date(sub.createdAt);
  const nextChargeDate = new Date(sub.nextCharge || sub.createdAt); // Используем сохраненную дату или расчетную

  // (Логика расчета diffDays...)
  const diffDays = Math.ceil(
    (nextChargeDate - new Date()) / (1000 * 60 * 60 * 24),
  );

  if (diffDays <= 3) return "Warning";
  if (diffDays <= 7) return "Upcoming";
  return "Active";
}
