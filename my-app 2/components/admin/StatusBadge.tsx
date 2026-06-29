"use client";

const statusStyles: Record<string, string> = {
  NEW: "bg-blue-900/50 text-blue-300 border-blue-700",
  READ: "bg-yellow-900/50 text-yellow-300 border-yellow-700",
  REPLIED: "bg-green-900/50 text-green-300 border-green-700",
  ARCHIVED: "bg-gray-700 text-gray-300 border-gray-600",
  ACTIVE: "bg-green-900/50 text-green-300 border-green-700",
  INACTIVE: "bg-red-900/50 text-red-300 border-red-700",
  SUPER_ADMIN: "bg-purple-900/50 text-purple-300 border-purple-700",
  ADMIN: "bg-blue-900/50 text-blue-300 border-blue-700",
};

export default function StatusBadge({ status }: { status: string }) {
  const style = statusStyles[status] || "bg-gray-700 text-gray-300 border-gray-600";
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${style}`}>
      {status.replace("_", " ")}
    </span>
  );
}
