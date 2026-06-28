"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/admin/LoadingSpinner";

interface ContentItem { id: string; key: string; value: string; }

export default function AdminContentPage() {
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<ContentItem | null>(null);
  const [editValue, setEditValue] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { router.push("/admin/login"); return; }

    fetch("/api/admin/content", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((d) => { if (d.success) setContents(d.data); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [router]);

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    setMessage("");

    const token = localStorage.getItem("token");
    const res = await fetch("/api/admin/content", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ key: editing.key, value: editValue }),
    });
    const data = await res.json();

    if (data.success) {
      setContents(contents.map((c) => c.id === editing.id ? { ...c, value: editValue } : c));
      setEditing(null);
      setMessage("Content updated successfully!");
      setTimeout(() => setMessage(""), 3000);
    } else {
      setMessage(data.error || "Failed to update");
    }
    setSaving(false);
  };

  const formatKey = (key: string) => key.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Site Content</h1>
        <p className="text-gray-400 text-sm mt-1">Manage dynamic content across your site</p>
      </div>

      {message && (
        <div className={`mb-4 px-4 py-3 rounded-lg text-sm ${
          message.includes("success") ? "bg-green-900/30 text-green-400 border border-green-800" : "bg-red-900/30 text-red-400 border border-red-800"
        }`}>
          {message}
        </div>
      )}

      <div className="grid gap-4">
        {contents.map((item) => (
          <div key={item.id} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-base font-semibold text-white">{formatKey(item.key)}</h3>
              <button
                onClick={() => {
                  setEditing(item);
                  setEditValue(item.value);
                }}
                className="text-sm text-blue-400 hover:text-blue-300 transition"
              >
                Edit
              </button>
            </div>

            {editing?.id === item.id ? (
              <div className="space-y-3">
                <textarea
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  rows={10}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex gap-2">
                  <button onClick={handleSave} disabled={saving}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition disabled:opacity-50">
                    {saving ? "Saving..." : "Save"}
                  </button>
                  <button onClick={() => setEditing(null)}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg text-sm transition">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <pre className="text-gray-400 text-sm whitespace-pre-wrap font-mono bg-gray-950 rounded-lg p-3 max-h-48 overflow-y-auto">
                {(() => {
                  try { return JSON.stringify(JSON.parse(item.value), null, 2); }
                  catch { return item.value; }
                })()}
              </pre>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
