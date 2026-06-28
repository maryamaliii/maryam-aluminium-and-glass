import Link from "next/link";
import LogoIcon from "./LogoIcon";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3 group">
      <LogoIcon size={36} className="text-white shrink-0 group-hover:text-gray-300 transition-colors" />
      <span className="text-xl text-white group-hover:text-gray-300 font-semibold tracking-wide transition-colors">
        Meer Engineering
      </span>
    </Link>
  );
}
