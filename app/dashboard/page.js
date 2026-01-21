import Link from "next/link";
import ButtonLogout from "@/components/ButtonLogout";
import { auth } from "@/auth";
import DashboardHeader from "@/components/DashboardHeader";

export default async function Dashboard() {
  const session = await auth();

  return (
    <div>
      <DashboardHeader />
    </div>
  );
}
