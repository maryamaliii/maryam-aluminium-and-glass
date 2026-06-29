import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="group">
      <span className="text-lg md:text-xl font-bold text-white group-hover:text-blue-500 transition-colors">
        Meer <span className="text-blue-500">Architectural</span>
      </span>
      <span className="block text-xs text-gray-400 font-medium -mt-0.5">Glass & Aluminium</span>
    </Link>
  );
}
