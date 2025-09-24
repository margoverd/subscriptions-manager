import Link from "next/link";
import ButtonLogin from "./ButtonLogin";

const Header = () => {
  return (
    <header className="absolute top-6 left-1/2 -translate-x-1/2 w-full max-w-[1320px] mx-auto px-5 sm:px-14 lg:px-20 z-100">
      {/* wrapper — фон, бордер, скругления и внутренние паддинги */}
      <div className="w-full bg-base-100/30 border border-base-content/20 rounded-xl py-3.5 px-4 md:px-12 flex items-center justify-between">
        <div className="text-2xl text-base-content font-primary font-normal">
          <Link href="/">
            Sub<span className="text-primary">Stop</span>
          </Link>
        </div>

        <nav className="hidden md:flex gap-12 text-xl font-inter mx-auto">
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

        <div>
          <ButtonLogin className="text-[16px] px-[24px] py-[6px]">
            Get Started
          </ButtonLogin>
        </div>
      </div>
    </header>
  );
};

export default Header;
