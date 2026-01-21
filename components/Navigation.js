import Link from "next/link";
import { usePathname } from "next/navigation";

const Navigation = ({ extraStyles }) => {
  const pathname = usePathname();

  const links = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/statistic", label: "Statistic" },
  ];

  return (
    <nav className={`flex gap-2 items-center ${extraStyles}`}>
      {links.map(({ href, label }) => {
        const isActive = pathname === href || pathname.startsWith(href + "/");

        return (
          <Link
            key={href}
            href={href}
            className={`text-sm rounded-xl px-6 py-2 transition-colors ${
              isActive
                ? "bg-base-100 text-base-content"
                : "text-base-content/70 hover:bg-base-100"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
};

export default Navigation;
