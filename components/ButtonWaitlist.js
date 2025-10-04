"use client";
import Link from "next/link";

const ButtonWaitlist = ({ session, children, className = "" }) => {
  const baseClasses =
    "btn btn-primary bg-primary rounded-lg shadow-none py-1.5 px-6 sm:py-5.5 sm:px-8.5 font-normal text-base-content text-base sm:text-lg transition hover:opacity-70 active:scale-95";

  const dashboardUrl = "/dashboard";

  return (
    <Link href={"/waitlist"} className={`${baseClasses} ${className}`}>
      {"Join the Waitlist" || $(children)}
    </Link>
  );
};

export default ButtonWaitlist;
