"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useSyncExternalStore } from "react";

const links = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Projects", href: "/projects" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const isAdmin = useSyncExternalStore(() => () => {}, () => !!localStorage.getItem("token"), () => false);

  return (
    <nav className="relative">
      <button
        aria-label="Toggle menu"
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden focus:outline-none focus-visible:ring-2 ring-white text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
      >
        ☰
      </button>

      <ul
        className={`absolute right-0 top-14 w-56 rounded-xl bg-gray-900/95 backdrop-blur-md shadow-xl border border-white/10 transition-all duration-300 py-2
        md:static md:flex md:w-auto md:shadow-none md:bg-transparent md:border-0 md:py-0 md:space-y-0
        ${isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none md:opacity-100 md:translate-y-0 md:pointer-events-auto"}
        `}
      >
        {links.map(link => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`block px-4 py-2.5 mx-2 rounded-lg text-sm transition-colors
              ${pathname === link.href ? "text-white font-semibold bg-white/10" : "text-gray-300 hover:text-white hover:bg-white/5"}
              `}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          </li>
        ))}
        {isAdmin && (
          <li>
            <Link
              href="/admin/dashboard"
              className="block px-4 py-2.5 mx-2 rounded-lg text-sm text-blue-300 hover:text-blue-200 hover:bg-white/5 font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Admin
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
