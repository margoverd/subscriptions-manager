import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { SessionProvider } from "@/components/SessionProvider";

export default async function LayoutPrivate({ children }) {
  const session = await auth();
  // if person didn't signUp or session expired, it will be undefined
  if (!session) {
    // redirect person
    redirect("/");
  }

  return (
    <SessionProvider value={session}>
      <div className="bg-base-200 min-h-screen relative overflow-hidden">{children}</div>
    </SessionProvider>
  );
}
