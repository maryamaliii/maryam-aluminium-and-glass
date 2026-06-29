"use client";

import { useState, useEffect } from "react";
import LoadingSpinner from "@/components/admin/LoadingSpinner";

export default function AdminSettingsPage() {
  const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try { setUser(JSON.parse(stored)); }
      catch { /* ignore */ }
    }
    setLoading(false);
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-gray-400 text-sm mt-1">Your account information</p>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 max-w-2xl">
        {user && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
              <p className="text-white">{user.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
              <p className="text-white">{user.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Role</label>
              <p className="text-white">{user.role}</p>
            </div>
            <div className="pt-4 border-t border-gray-800">
              <p className="text-gray-500 text-sm">
                Password changes and other settings can be managed by a Super Admin.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
