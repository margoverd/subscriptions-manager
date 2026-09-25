import Link from "next/link";
import Contact from "./Contacts";

const Footer = () => {
  return (
    <footer className="relative z-[100] max-w-[1320px] w-full px-5 sm:px-14 lg:px-20 mx-auto text-lg text-base-content/70 font-primary z-100">
      <div className="pt-12 pb-34.5 grid lg:grid-cols-[1.2fr_.8fr_.8fr_.6fr] grid-row-3 grid-cols-[.9fr_1fr] sm:grid-cols-3 lg:gap-6 gap-8 gap-y-14 border-t-1 border-base-100">
        <div className="col-span-2 sm:col-span-3 lg:col-span-1">
          <Link
            href="/"
            className="text-base-content pb-6 inline-block text-2xl"
          >
            Sub<span className="text-primary">Stop</span>
          </Link>
          <p className="pb-3 max-w-90">
            A free tool for keeping your subscriptions under control
          </p>
          <p className="text-base-content/40">
            © 2025 SubStop. All rights reserved.
          </p>
        </div>
        <div>
          <h6 className="uppercase text-xl mb-6">Links</h6>
          <ul>
            <li>
              <a
                href="#about"
                className="mb-4 sm:mb-2 inline-block hover:text-base-content transition-colors"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#pricing"
                className="mb-4 sm:mb-2 inline-block hover:text-base-content transition-colors"
              >
                Pricing
              </a>
            </li>
            <li>
              <a
                href="#faq"
                className="hover:text-base-content transition-colors inline-block"
              >
                FAQ
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h6 className="uppercase text-xl mb-6">legal</h6>
          <ul>
            <li>
              <Link
                href="terms-of-services"
                className="mb-4 sm:mb-2 inline-block hover:text-base-content transition-colors"
              >
                Terms of Services
              </Link>
            </li>
            <li>
              <Link
                href="privacy-policy"
                className="inline-block hover:text-base-content transition-colors"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <h6 className="uppercase text-xl mb-6">Got questions?</h6>
          <a
            href="mailto:margarita0work@gmail.com"
            className="btn rounded-lg font-intser"
          >
            <svg
              width="20"
              height="17"
              viewBox="0 0 20 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17 0.5H3C2.20435 0.5 1.44129 0.816071 0.87868 1.37868C0.316071 1.94129 0 2.70435 0 3.5V13.5C0 14.2956 0.316071 15.0587 0.87868 15.6213C1.44129 16.1839 2.20435 16.5 3 16.5H17C17.7956 16.5 18.5587 16.1839 19.1213 15.6213C19.6839 15.0587 20 14.2956 20 13.5V3.5C20 2.70435 19.6839 1.94129 19.1213 1.37868C18.5587 0.816071 17.7956 0.5 17 0.5ZM3 2.5H17C17.2652 2.5 17.5196 2.60536 17.7071 2.79289C17.8946 2.98043 18 3.23478 18 3.5L10 8.38L2 3.5C2 3.23478 2.10536 2.98043 2.29289 2.79289C2.48043 2.60536 2.73478 2.5 3 2.5ZM18 13.5C18 13.7652 17.8946 14.0196 17.7071 14.2071C17.5196 14.3946 17.2652 14.5 17 14.5H3C2.73478 14.5 2.48043 14.3946 2.29289 14.2071C2.10536 14.0196 2 13.7652 2 13.5V5.78L9.48 10.35C9.63202 10.4378 9.80446 10.484 9.98 10.484C10.1555 10.484 10.328 10.4378 10.48 10.35L18 5.78V13.5Z"
                fill="#ECF9FF"
              />
            </svg>
            Contact me
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
