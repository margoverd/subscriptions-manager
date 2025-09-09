import ButtonLogin from "./ButtonLogin";

const Header = () => {
  return (
    <header className="navbar bg-base-100 shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Лого */}
        <a href="#" className="text-2xl font-bold text-primary">
          SubStop
        </a>

        {/* Навигация */}
        <nav className="hidden md:flex gap-6 font-regular">
          <a
            href="#features"
            className="text-white hover:opacity-80 transition-opacity opacity-50"
          >
            Features
          </a>
          <a
            href="#benefits"
            className="text-white hover:opacity-80 transition-opacity opacity-50"
          >
            Benefits
          </a>
          <a
            href="#testimonials"
            className="text-white hover:opacity-80 transition-opacity opacity-50"
          >
            Testimonials
          </a>
          <a
            href="#cta"
            className="text-white hover:opacity-80 transition-opacity opacity-50"
          >
            Get Started
          </a>
        </nav>

        {/* Кнопка войти */}
        <div>
          <ButtonLogin className="btn btn-primary rounded-lg shadow-md hover:shadow-lg transition-all">
            Get Started
          </ButtonLogin>
        </div>
      </div>
    </header>
  );
};

export default Header;
