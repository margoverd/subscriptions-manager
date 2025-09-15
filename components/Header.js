import ButtonLogin from "./ButtonLogin";

const Header = () => {
  return (
    <header className="navbar bg-base-100 shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="#" className="text-2xl font-bold text-primary">
          SubStop
        </a>

        <nav className="hidden md:flex gap-6 font-regular">
          <a
            href="#features"
            className="text-primary hover:opacity-80 transition-opacity opacity-70"
          >
            Features
          </a>
          <a
            href="#benefits"
            className="text-primary hover:opacity-80 transition-opacity opacity-70"
          >
            Benefits
          </a>
          <a
            href="#testimonials"
            className="text-primary hover:opacity-80 transition-opacity opacity-70"
          >
            Testimonials
          </a>
          <a
            href="#cta"
            className="text-primary hover:opacity-80 transition-opacity opacity-70"
          >
            Get Started
          </a>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <ButtonLogin
            isLoggedIn={true}
            name="Marc"
            className="btn btn-primary shadow-md hover:shadow-lg transition-all"
          />
        </div>

        {/* Burger menu (mobile) */}
        <div className="dropdown dropdown-end md:hidden">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-4 shadow bg-base-100 rounded-box w-52 flex flex-col gap-3"
          >
            <li>
              <a
                href="#features"
                className="text-primary opacity-80 hover:opacity-100"
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="#benefits"
                className="text-primary opacity-80 hover:opacity-100"
              >
                Benefits
              </a>
            </li>
            <li>
              <a
                href="#testimonials"
                className="text-primary opacity-80 hover:opacity-100"
              >
                Testimonials
              </a>
            </li>
            <li>
              <a
                href="#cta"
                className="text-primary opacity-80 hover:opacity-100"
              >
                Get Started
              </a>
            </li>
            <div className="pt-3 border-t border-base-300">
              <ButtonLogin className="btn btn-primary w-full mt-2">
                Get Started
              </ButtonLogin>
            </div>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
