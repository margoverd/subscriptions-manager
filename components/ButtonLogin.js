"use client";
import Link from "next/link";
import { signIn } from "next-auth/react";

const ButtonLogin = ({ session, children, className = "" }) => {
  const baseClasses =
    "btn btn-primary bg-primary rounded-lg shadow-none py-1.5 px-6 sm:py-5.5 sm:px-8.5 font-normal text-base-content text-base sm:text-lg transition hover:opacity-70 active:scale-95";

  const dashboardUrl = "/dashboard";

  if (session) {
    return (
      <Link href={dashboardUrl} className={`${baseClasses} ${className}`}>
        You’re in, {session.user.name || "friend"}!
      </Link>
    );
  }

  return (
    <button
      className={`${baseClasses} ${className}`}
      // signIn method takes two params - provider "Google" and object
      // undefined will open the page with list of providers
      // object is used to customize what happens during singIn process
      onClick={() => signIn(undefined, { callbackUrl: dashboardUrl })}
    >
      {"Get started" || $(children)}
    </button>
  );
};

export default ButtonLogin;
