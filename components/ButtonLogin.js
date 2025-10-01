import Link from "next/link";

const ButtonLogin = ({ session, children, className = "" }) => {
  const baseClasses =
    "btn btn-primary bg-primary rounded-lg shadow-none py-1.5 px-6 sm:py-5.5 sm:px-8.5 font-normal text-base-content text-base sm:text-lg transition hover:opacity-70 active:scale-95";

  if (session) {
    return (
      <Link href="/dashboard" className={`${baseClasses} ${className}`}>
        You’re in, {session.user.name || "friend"}!
      </Link>
    );
  }

  return <button className={`${baseClasses} ${className}`}>{children}</button>;
};

export default ButtonLogin;
