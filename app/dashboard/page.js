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

async function getUser() {
  const session = await auth();
  await connectMongo();

  return await User.findById(session.user.id)
    .populate("subs")
    .populate("categories")
    .lean();
}

export default async function Dashboard() {
  const user = await getUser();

  const initialSubs = JSON.parse(JSON.stringify(user.subs));
  const allUsedCategories = [
    ...new Set(initialSubs.flatMap((s) => s.categories || [])),
  ];

  return (
    <>
      <DashboardHeader />
      <div className="px-5 md:px-10 lg:px-15">
        <SubscriptionList
          initialSubs={initialSubs}
          availableCategories={allUsedCategories}
        />
      </div>
    </>
  );
}
