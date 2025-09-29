import Link from "next/link";

const ButtonLogin = ({ isLoggedIn, name, children, className = "" }) => {
  const baseClasses =
    "btn btn-primary rounded-lg shadow-none py-1.5 px-6 sm:py-5.5 sm:px-8.5 font-normal text-base-content text-base sm:text-lg transition";

  const hoverEffect = "hover:opacity-70";

  if (isLoggedIn) {
    return (
      <Link
        href="/dashboard"
        className={`${baseClasses} ${hoverEffect} ${className}`}
      >
        Welcome back {name}
      </Link>
    );
  } else {
    return (
      <button
        className={`${baseClasses} bg-primary ${hoverEffect} ${className}`}
      >
        {children}
      </button>
    );
  }
};

export default ButtonLogin;
