import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function LayoutPrivate({ children }) {
  const session = await auth();
  // if person didn't signUp or session expired, it will be undefined
  if (!session) {
    // redirect person
    redirect("/");
  }

  return children;
}
