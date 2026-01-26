import Link from "next/link";
import ButtonLogout from "@/components/ButtonLogout";
import { auth } from "@/auth";
import DashboardHeader from "@/components/DashboardHeader";
import FilterPanel from "@/components/FilterPanel";
import MobileFilterPopup from "@/components/MobileFilterPopup";
import connectMongo from "@/libs/mongoose";
import User from "@/models/User";
import Sub from "@/models/Sub";

async function getUser() {
  const session = await auth();

  await connectMongo();

  return await User.findById(session.user.id).populate("subs");
}

export default async function Dashboard() {
  const user = await getUser();

  return (
    <>
      <DashboardHeader />
      <div className="px-5 md:px-10 lg:px-15">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[minmax(248px,248px)_1fr] items-stretch gap-4">
          <aside className="relative hidden md:block">
            <FilterPanel />
          </aside>

          <main>
            <MobileFilterPopup />
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {user.subs.map((sub) => {
                // 1. Вычисляем дату следующего списания
                const createdAt = new Date(sub.createdAt);
                const nextChargeDate = new Date(createdAt);

                if (sub.unit === "/mo")
                  nextChargeDate.setMonth(createdAt.getMonth() + 1);
                else if (sub.unit === "/y")
                  nextChargeDate.setFullYear(createdAt.getFullYear() + 1);
                else if (sub.unit === "/wk")
                  nextChargeDate.setDate(createdAt.getDate() + 7);

                // 2. Считаем разницу в днях
                const today = new Date();
                const diffTime = nextChargeDate - today;
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                // 3. Определяем статус бейджа
                let badgeText = "Active";
                let badgeClass = "bg-success/20 text-success border-success/20"; // Зеленый

                if (diffDays <= 3) {
                  badgeText = "Warning";
                  badgeClass = "bg-error/20 text-error border-error/20"; // Красный
                } else if (diffDays <= 7) {
                  badgeText = "Upcoming";
                  badgeClass = "bg-warning/20 text-warning border-warning/20"; // Желтый
                }

                // Обрезаем название:
                const isLongName = sub.name.length > 8;
                const displayName = isLongName
                  ? sub.name.slice(0, 8) + "..."
                  : sub.name;

                // Форматируем дату для вывода (например, "Sep 20")
                const formattedDate = nextChargeDate.toLocaleDateString(
                  "en-US",
                  {
                    month: "short",
                    day: "numeric",
                  },
                );
                return (
                  <li
                    key={sub._id}
                    className="group relative bg-base-100 px-6 pb-6 pt-3 rounded-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                  >
                    {/* Верхняя часть: Иконка, Заголовок и Бейдж */}
                    <div className="flex justify-between flex-wrap items-center mb-6">
                      <div className="flex items-center gap-1">
                        <span className="text-[40px] leading-tight -ml-1">
                          {sub.icon}
                        </span>
                        {isLongName ? (
                          <div
                            className="tooltip tooltip-top before:text-xs before:max-w-[200px]"
                            data-tip={sub.name}
                          >
                            <h3 className="text-xl font-bold text-white leading-tight">
                              {displayName}
                            </h3>
                          </div>
                        ) : (
                          <h3 className="text-xl font-bold text-white leading-tight">
                            {sub.name}
                          </h3>
                        )}
                      </div>

                      <span
                        className={`px-1.5 py-0.5 text-sm font-medium ${badgeClass} rounded-lg`}
                      >
                        {badgeText}
                      </span>
                    </div>

                    {/* Нижняя часть: Цена и Дата */}
                    <div className="flex flex-col">
                      <p className="text-lg font-bold text-white">
                        ${sub.price} {sub.unit}
                      </p>
                      <p className="text-sm font-normal text-base-content/70">
                        Next charge: {formattedDate}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </main>
        </div>
      </div>
    </>
  );
}
