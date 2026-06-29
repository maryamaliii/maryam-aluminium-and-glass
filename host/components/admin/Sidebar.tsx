"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoIcon from "@/app/components/LogoIcon";
import {
  MdDashboard, MdDesignServices, MdBuild, MdMailOutline,
  MdSettings, MdPeople, MdArticle, MdChevronLeft, MdMenu,
  MdStar, MdHelpOutline, MdRequestQuote, MdPeopleOutline,
} from "react-icons/md";

interface SidebarProps {
  role: string;
  isOpen: boolean;
  onToggle: () => void;
}

const navItems = [
  { href: "/admin/leads", label: "Leads", icon: MdPeopleOutline, roles: ["SUPER_ADMIN", "ADMIN"] },
  { href: "/admin/dashboard", label: "Dashboard", icon: MdDashboard, roles: ["SUPER_ADMIN", "ADMIN"] },
  { href: "/admin/services", label: "Services", icon: MdDesignServices, roles: ["SUPER_ADMIN", "ADMIN"] },
  { href: "/admin/projects", label: "Projects", icon: MdBuild, roles: ["SUPER_ADMIN", "ADMIN"] },
  { href: "/admin/testimonials", label: "Testimonials", icon: MdStar, roles: ["SUPER_ADMIN", "ADMIN"] },
  { href: "/admin/faq", label: "FAQ", icon: MdHelpOutline, roles: ["SUPER_ADMIN", "ADMIN"] },
  { href: "/admin/quote-requests", label: "Quotes", icon: MdRequestQuote, roles: ["SUPER_ADMIN", "ADMIN"] },
  { href: "/admin/contact", label: "Contact", icon: MdMailOutline, roles: ["SUPER_ADMIN", "ADMIN"] },
  { href: "/admin/content", label: "Content", icon: MdArticle, roles: ["SUPER_ADMIN", "ADMIN"] },
  { href: "/admin/admins", label: "Admins", icon: MdPeople, roles: ["SUPER_ADMIN"] },
  { href: "/admin/settings", label: "Settings", icon: MdSettings, roles: ["SUPER_ADMIN", "ADMIN"] },
];

export default function Sidebar({ role, isOpen, onToggle }: SidebarProps) {
  const pathname = usePathname();

  const visibleItems = navItems.filter((item) => item.roles.includes(role));

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onToggle} />
      )}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gray-900 border-r border-gray-800 transform transition-transform duration-200 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } flex flex-col`}
      >
        <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-800 min-h-[56px]">
          <Link href="/admin/dashboard" className="flex items-center gap-2.5">
            <LogoIcon size={28} className="text-white shrink-0" />
            <span className="text-base sm:text-lg font-bold text-white">Meer Admin</span>
          </Link>
          <button onClick={onToggle} className="text-gray-400 hover:text-white lg:hidden p-2">
            <MdChevronLeft size={24} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-2 sm:p-3 space-y-1">
          {visibleItems.map((item) => {
            const Icon = item.icon;
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => { if (window.innerWidth < 1024) onToggle(); }}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition min-h-[44px] ${
                  active
                    ? "bg-blue-600/20 text-blue-400 border border-blue-800/50"
                    : "text-gray-400 hover:text-white hover:bg-gray-800 border border-transparent"
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-gray-800">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800 transition min-h-[44px]"
          >
            <MdMenu size={20} />
            <span>View Site</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
