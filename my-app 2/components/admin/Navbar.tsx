"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MdMenu, MdLogout, MdPerson, MdArrowDropDown } from "react-icons/md";

interface NavbarProps {
  onMenuToggle: () => void;
  user: { name: string; email: string; role: string };
}

export default function Navbar({ onMenuToggle, user }: NavbarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/admin/login");
  };

  return (
    <header className="sticky top-0 z-30 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
      <div className="flex items-center justify-between px-4 h-16">
        <button onClick={onMenuToggle} className="text-gray-400 hover:text-white lg:hidden">
          <MdMenu size={24} />
        </button>

        <div className="hidden lg:block" />

        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-gray-800 transition"
          >
            <MdPerson size={20} />
            <span className="hidden sm:inline">{user.name}</span>
            <MdArrowDropDown size={18} />
          </button>

          {dropdownOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />
              <div className="absolute right-0 top-full mt-1 w-56 bg-gray-800 rounded-xl border border-gray-700 shadow-xl z-20 py-2">
                <div className="px-4 py-2 border-b border-gray-700">
                  <p className="text-sm font-medium text-white">{user.name}</p>
                  <p className="text-xs text-gray-400">{user.email}</p>
                  <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium rounded bg-blue-900/50 text-blue-300">
                    {user.role}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-400 hover:bg-gray-700 transition"
                >
                  <MdLogout size={18} />
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
