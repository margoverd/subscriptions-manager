import Link from "next/link";

const ButtonLogin = ({ isLoggedIn, name, children, className }) => {
  if (isLoggedIn) {
    return (
      <Link href="/dashboard" className="btn btn-primary">
        Welcome back {name}
      </Link>
    );
  } else {
    return (
      <button className={`btn btn-primary ${className ? className : ""}`}>
        {children}
      </button>
    );
  }
};
export default ButtonLogin;
