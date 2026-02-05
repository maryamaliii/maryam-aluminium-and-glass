"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

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
        className={`absolute right-0 top-12 w-48 rounded-lg bg-white/10 backdrop-blur-md shadow-lg border border-white/20 transition-all duration-300
        md:static md:flex md:w-auto md:shadow-none md:bg-transparent md:border-0
        ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 md:opacity-100 md:translate-y-0"}
        `}
      >
        {links.map(link => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`block px-4 py-2 transition-colors
              ${pathname === link.href ? "text-white font-semibold" : "text-gray-200 hover:text-white"}
              `}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
