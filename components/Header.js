import Link from "next/link";
import ButtonLogin from "./ButtonLogin";

const Header = () => {
  return (
    <header
      className="
        absolute top-6 left-1/2 -translate-x-1/2
        max-w-[1200px] w-full
        bg-base-100/30 border border-base-content/20 rounded-xl
        px-5 sm:px-8 lg:px-12
        py-3.5
        flex items-center justify-between
        backdrop-blur-md
      "
    >
      <div className="text-2xl text-base-content font-['K2D'] font-normal">
        SubStop
      </div>

      <nav className="hidden md:flex gap-12 text-xl font-inter">
        <Link
          href="#pricing"
          className="text-base-content/60 hover:text-base-content transition-colors"
        >
          Pricing
        </Link>
        <Link
          href="#faq"
          className="text-base-content/60 hover:text-base-content transition-colors"
        >
          FAQ
        </Link>
      </nav>

      <ButtonLogin
        className="text-base-content text-base
          px-6 py-1.5 
          rounded-lg 
          bg-primary 
          hover:opacity-90 transition
          font-normal
        "
      >
        Get Started
      </ButtonLogin>
    </header>
  );
};

export default Header;
