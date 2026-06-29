"use client";

interface StatCardProps {
  label: string;
  value: number | string;
  icon?: React.ReactNode;
  color?: string;
}

export default function StatCard({ label, value, icon, color = "blue" }: StatCardProps) {
  const colors: Record<string, string> = {
    blue: "from-blue-600 to-blue-800",
    green: "from-green-600 to-green-800",
    purple: "from-purple-600 to-purple-800",
    yellow: "from-yellow-600 to-yellow-800",
    red: "from-red-600 to-red-800",
    indigo: "from-indigo-600 to-indigo-800",
  };
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6 hover:border-gray-600 transition">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400 mb-1">{label}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
        </div>
        {icon && (
          <div className={`p-3 rounded-lg bg-gradient-to-br ${colors[color] || colors.blue}`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
