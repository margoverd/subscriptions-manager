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
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[minmax(248px,248px)_1fr] items-stretch gap-6">
          <aside className="relative hidden md:block">
            <FilterPanel />
          </aside>

          <main>
            <MobileFilterPopup />
            <p>Future Content</p>
          </main>
        </div>
      </div>
    </>
  );
}
