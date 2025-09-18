const Footer = () => {
  return (
    <footer className="bg-base-200 border-t border-base-300 rounded-t px-4 py-8 text-center">
      <div className="max-w-5xl mx-auto text-base-content/70">
        <p>© {new Date().getFullYear()} SubStop. All rights reserved.</p>
        <div className="mt-2 space-x-4">
          <a href="#hero" className="hover:text-primary transition-colors">
            Home
          </a>
          <a href="#pricing" className="hover:text-primary transition-colors">
            Pricing
          </a>
          <a href="#faq" className="hover:text-primary transition-colors">
            FAQ
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
