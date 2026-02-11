export const dynamic = "force-dynamic";

import Link from "next/link";
import { auth } from "@/auth";
import DashboardHeader from "@/components/DashboardHeader";
import FilterPanel from "@/components/FilterPanel";
import MobileFilterPopup from "@/components/MobileFilterPopup";
import connectMongo from "@/libs/mongoose";
import User from "@/models/User";
import Sub from "@/models/Sub";
import SubscriptionList from "@/components/SubscriptionList";
import Category from "@/models/Category";

async function getUser() {
  const session = await auth();
  await connectMongo();

  return await User.findById(session.user.id)
    .populate("subs")
    .populate("categories")
    .lean();
}

export default async function Dashboard() {
  // const user = await getUser();
  const session = await auth();
  await connectMongo();

  // 1. Загружаем подписки
  const subs = await Sub.find({ userId: session.user.id }).lean();

  // 2. Загружаем ВСЕ категории этого пользователя из базы
  const categories = await Category.find({ userId: session.user.id }).lean();

  // Превращаем в чистый JSON для клиентских компонентов
  const initialSubs = JSON.parse(JSON.stringify(subs));
  const availableCategories = JSON.parse(JSON.stringify(categories));

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />
      <div className="px-5 md:px-10 lg:px-15   flex-1 pb-20 mt-2">
        <SubscriptionList
          initialSubs={initialSubs}
          availableCategories={availableCategories}
        />
      </div>
    </div>
  );
}
