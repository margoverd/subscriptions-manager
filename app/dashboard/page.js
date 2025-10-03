import Link from "next/link";
import ButtonLogout from "@/components/ButtonLogout";
import { auth } from "@/auth";

export default async function Dashboard() {
  const session = await auth();

  return (
    <main className="bg-custom-gradient min-h-screen flex flex-col items-center justify-center text-center px-5 sm:px-14 lg:px-20 relative">
      <ButtonLogout className="absolute top-5 left-5">Sign Out</ButtonLogout>

      <div className="max-w-2xl w-full">
        <h1 className="font-bold text-[clamp(38px,4.6vw,42px)] sm:text-[clamp(48px,4.6vw,60px)] leading-[1.2] mb-6 text-base-content">
          Thanks for joining the waitlist, {session?.user?.name || "friend"}!
        </h1>
        <p className="font-primary text-base-content/70 lg:text-xl sm:text-lg text-base mb-12 max-w-lg mx-auto">
          Your dashboard is in progress. Everything will be ready for you before
          launch!
        </p>

        <div className="w-full bg-base-100 rounded-full h-2 sm:h-4 mb-4 overflow-hidden relative">
          <div
            className="h-full w-1/4 transition-all duration-500 rounded-full"
            style={{ background: "linear-gradient(90deg, #F43098, #4D4ACC)" }}
          ></div>
        </div>
        <p className="text-base-content/50 mb-8 text-sm sm:text-base">
          Progress: 25% completed
        </p>

        <Link
          href="/"
          className="btn btn-primary rounded-lg shadow-none py-2 px-6 sm:py-3 sm:px-8 bg-primary hover:opacity-70 transition font-normal text-base-content text-base sm:text-lg"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
