"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ImageUploader from "@/components/admin/ImageUploader";

interface ServiceOption { id: string; title: string; }

export default function CreateProjectPage() {
  const router = useRouter();
  const [services, setServices] = useState<ServiceOption[]>([]);
  const [form, setForm] = useState({
    title: "", slug: "", description: "", serviceId: "",
    image: "", isFeatured: false, sortOrder: 0, isActive: true,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("/api/admin/services?limit=100", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((d) => { if (d.success) setServices(d.data.services); });
  }, []);

  const generateSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const token = localStorage.getItem("token");
    const res = await fetch("/api/admin/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ ...form, sortOrder: Number(form.sortOrder) }),
    });
    const data = await res.json();

    if (!res.ok || !data.success) {
      setError(data.error || "Failed to create project");
      setLoading(false);
      return;
    }

    router.push("/admin/projects");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link href="/admin/projects" className="text-sm text-gray-400 hover:text-gray-300 transition">← Back to Projects</Link>
        <h1 className="text-2xl font-bold text-white mt-2">Create Project</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-5">
        {error && <div className="bg-red-900/30 border border-red-800 rounded-lg p-3 text-sm text-red-400">{error}</div>}

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
          <input type="text" value={form.title} required
            onChange={(e) => setForm({ ...form, title: e.target.value, slug: generateSlug(e.target.value) })}
            className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Slug</label>
          <input type="text" value={form.slug} required
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-mono"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Service</label>
          <select value={form.serviceId} required
            onChange={(e) => setForm({ ...form, serviceId: e.target.value })}
            className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
            <option value="">Select a service</option>
            {services.map((s) => <option key={s.id} value={s.id}>{s.title}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
          <textarea value={form.description} required rows={4}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
          />
        </div>

        <ImageUploader
          value={form.image}
          onChange={(url) => setForm({ ...form, image: url })}
          folder="meer-engineering/projects"
          label="Project Image"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Sort Order</label>
            <input type="number" value={form.sortOrder}
              onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Featured</label>
            <select value={form.isFeatured ? "yes" : "no"}
              onChange={(e) => setForm({ ...form, isFeatured: e.target.value === "yes" })}
              className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={loading}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition disabled:opacity-50 text-sm">
            {loading ? "Creating..." : "Create Project"}
          </button>
          <Link href="/admin/projects"
            className="px-6 py-2.5 bg-gray-700 hover:bg-gray-600 text-gray-300 font-medium rounded-lg transition text-sm">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
