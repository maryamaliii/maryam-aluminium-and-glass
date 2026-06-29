"use client";

import { useState, useEffect } from "react";
import StatCard from "@/components/admin/StatCard";
import LoadingSpinner from "@/components/admin/LoadingSpinner";
import { MdDesignServices, MdBuild, MdMailOutline, MdPeople, MdStar, MdNotifications } from "react-icons/md";
import type { DashboardStats } from "@/types";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("/api/admin/dashboard", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setStats(data.data);
        else setError(data.error || "Failed to load");
      })
      .catch(() => setError("Failed to load dashboard"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner size="lg" />;

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-red-400 mb-4">{error}</p>
        <button onClick={() => window.location.reload()} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">
          Retry
        </button>
      </div>
    );
  }

  if (!stats) return null;

  const cards = [
    { label: "Total Services", value: stats.totalServices, icon: <MdDesignServices size={24} className="text-white" />, color: "blue" as const },
    { label: "Total Projects", value: stats.totalProjects, icon: <MdBuild size={24} className="text-white" />, color: "green" as const },
    { label: "Total Contacts", value: stats.totalContacts, icon: <MdMailOutline size={24} className="text-white" />, color: "purple" as const },
    { label: "New Contacts", value: stats.newContacts, icon: <MdNotifications size={24} className="text-white" />, color: "yellow" as const },
    { label: "Featured Projects", value: stats.featuredProjects, icon: <MdStar size={24} className="text-white" />, color: "red" as const },
    { label: "Active Admins", value: stats.activeAdmins, icon: <MdPeople size={24} className="text-white" />, color: "indigo" as const },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">Overview of your application</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </div>
    </div>
  );
}
