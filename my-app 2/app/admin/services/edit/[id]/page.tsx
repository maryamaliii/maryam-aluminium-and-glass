"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import LoadingSpinner from "@/components/admin/LoadingSpinner";
import MultiImageUploader from "@/components/admin/MultiImageUploader";

const categories = [
  "MIRRORS", "KITCHEN", "WARDROBES", "CUSTOM_FABRICATION",
  "WINDOWS_DOORS", "PARTITIONS", "FIXTURES", "INSTALLATION",
];

interface ServiceImage {
  id: string;
  url: string;
  sortOrder: number;
}

export default function EditServicePage() {
  const router = useRouter();
  const params = useParams();
  const [form, setForm] = useState({
    title: "", slug: "", description: "", category: "MIRRORS",
    icon: "MdBuild", sortOrder: 0, isActive: true,
  });
  const [images, setImages] = useState<{ url: string; sortOrder: number }[]>([]);
  const [originalImages, setOriginalImages] = useState<ServiceImage[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { router.push("/admin/login"); return; }

    fetch(`/api/admin/services/${params.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const s = data.data;
          setForm({
            title: s.title, slug: s.slug, description: s.description,
            category: s.category, icon: s.icon, sortOrder: s.sortOrder, isActive: s.isActive,
          });
          const imgs = (s.images || []).map((img: ServiceImage) => ({
            url: img.url,
            sortOrder: img.sortOrder,
          }));
          setImages(imgs);
          setOriginalImages(s.images || []);
        } else setError(data.error || "Not found");
      })
      .catch(() => setError("Failed to load"))
      .finally(() => setLoading(false));
  }, [params.id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    const token = localStorage.getItem("token");

    const res = await fetch(`/api/admin/services/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ ...form, sortOrder: Number(form.sortOrder) }),
    });
    const data = await res.json();

    if (!res.ok || !data.success) {
      setError(data.error || "Failed to update");
      setSaving(false);
      return;
    }

    await fetch(`/api/admin/services/${params.id}/images`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ images: images.map((img) => ({ url: img.url })) }),
    });

    router.push("/admin/services");
  };

  if (loading) return <LoadingSpinner />;

  if (error && !form.title) {
    return <div className="text-center py-16 text-red-400">{error}</div>;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <Link href="/admin/services" className="text-sm text-gray-400 hover:text-gray-300 transition">← Back to Services</Link>
        <h1 className="text-2xl font-bold text-white mt-2">Edit Service</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-5">
        {error && <div className="bg-red-900/30 border border-red-800 rounded-lg p-3 text-sm text-red-400">{error}</div>}

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
          <input type="text" value={form.title} required
            onChange={(e) => setForm({ ...form, title: e.target.value })}
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
          <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
          <textarea value={form.description} required rows={4}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
            <select value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Icon</label>
            <input type="text" value={form.icon}
              onChange={(e) => setForm({ ...form, icon: e.target.value })}
              className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-mono"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Sort Order</label>
            <input type="number" value={form.sortOrder}
              onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
            <select value={form.isActive ? "active" : "inactive"}
              onChange={(e) => setForm({ ...form, isActive: e.target.value === "active" })}
              className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        <MultiImageUploader
          images={images}
          onChange={setImages}
          folder="maryam-aluminium/services"
          label="Service Images"
        />

        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={saving}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition disabled:opacity-50 text-sm">
            {saving ? "Saving..." : "Save Changes"}
          </button>
          <Link href="/admin/services"
            className="px-6 py-2.5 bg-gray-700 hover:bg-gray-600 text-gray-300 font-medium rounded-lg transition text-sm">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
