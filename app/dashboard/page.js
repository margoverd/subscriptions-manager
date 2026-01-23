import Link from "next/link";
import ButtonLogout from "@/components/ButtonLogout";
import { auth } from "@/auth";
import DashboardHeader from "@/components/DashboardHeader";
import FilterPanel from "@/components/FilterPanel";
import MobileFilterPopup from "@/components/MobileFilterPopup";

export default async function Dashboard() {
  const session = await auth();

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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="group relative bg-base-100 px-6 pb-6 pt-3 rounded-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer">
                {/* Верхняя часть: Иконка, Заголовок и Бейдж */}
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-1">
                    <span className="text-[40px] leading-tight">☁️</span>
                    <h3 className="text-xl font-bold text-white leading-tight">
                      Dropbox
                    </h3>
                  </div>

                  <span className="px-1.5 py-0.5 text-sm font-medium bg-secondary color-base-content rounded-lg">
                    Warning
                  </span>
                </div>

                {/* Нижняя часть: Цена и Дата */}
                <div className="flex flex-col">
                  <p className="text-lg font-bold text-white">$9 / mo</p>
                  <p className="text-sm font-normal text-base-content/70">
                    Next charge: Sep 20
                  </p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
