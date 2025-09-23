import Link from "next/link";

const ButtonLogin = ({ isLoggedIn, name, children, className = "" }) => {
  if (isLoggedIn) {
    return (
      <Link href="/dashboard" className={`btn btn-primary ${className}`}>
        Welcome back {name}
      </Link>
    );
  } else {
    return (
      <button
        className={`btn btn-primary rounded-lg shadow-none py-5.5 px-8.5 bg-primary hover:opacity-90 transition font-normal text-base-content text-lg ${className}`}
      >
        {children}
      </button>
    );
  }
};

export default ButtonLogin;
