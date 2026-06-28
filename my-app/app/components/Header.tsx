"use client";

import { useState, useEffect } from "react";
import Logo from "./Logo";
import Navbar from "./Navbar";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-gray-900/90 shadow-lg shadow-black/10 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="relative z-10 mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
        <Logo />
        <Navbar />
      </div>
    </header>
  );
}
