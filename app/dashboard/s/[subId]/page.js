import { redirect } from "next/navigation";
import connectMongo from "@/libs/mongoose";
import Sub from "@/models/Sub";
import { auth } from "@/auth";

const getSub = async (subId) => {
  const session = await auth();

  await connectMongo();

  const sub = await Sub.findOne({
    _id: subId,
    userId: session?.user?.id,
  });

  if (!sub) {
    redirect("/dashboard");
  }

  return sub;
};

export default async function SubAdminPage({ params }) {
  const { subId } = params;

  const sub = await getSub(subId);

  return <main>{sub.name}</main>;
}
