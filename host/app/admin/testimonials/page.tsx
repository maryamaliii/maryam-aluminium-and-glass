"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import DataTable from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import { MdAdd, MdEdit, MdDelete, MdStar } from "react-icons/md";
import type { TestimonialResponse } from "@/types";

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<TestimonialResponse[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();
  const limit = 20;

  const fetchTestimonials = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) { router.push("/admin/login"); return; }

    const res = await fetch(`/api/admin/testimonials?page=${page}&limit=${limit}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (data.success) {
      setTestimonials(data.data.testimonials);
      setTotal(data.data.total);
    }
    setLoading(false);
  }, [page, router]);

  useEffect(() => { fetchTestimonials(); }, [fetchTestimonials]); // eslint-disable-line react-hooks/set-state-in-effect

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    const token = localStorage.getItem("token");
    await fetch(`/api/admin/testimonials/${deleteId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setDeleteId(null);
    fetchTestimonials();
    setDeleting(false);
  };

  const columns = [
    { key: "clientName", label: "Client", render: (t: TestimonialResponse) => (
      <Link href={`/admin/testimonials/edit/${t.id}`} className="text-blue-400 hover:text-blue-300 font-medium">
        {t.clientName}
      </Link>
    )},
    { key: "company", label: "Company", render: (t: TestimonialResponse) => (
      <span className="text-gray-400">{t.company || "-"}</span>
    )},
    { key: "rating", label: "Rating", render: (t: TestimonialResponse) => (
      <div className="flex items-center gap-0.5">
        {Array.from({ length: t.rating }).map((_, i) => (
          <MdStar key={i} className="text-yellow-400" size={14} />
        ))}
      </div>
    )},
    { key: "isActive", label: "Status", render: (t: TestimonialResponse) => (
      <StatusBadge status={t.isActive ? "ACTIVE" : "INACTIVE"} />
    )},
    { key: "sortOrder", label: "Order" },
    { key: "actions", label: "Actions", render: (t: TestimonialResponse) => (
      <div className="flex gap-2">
        <Link href={`/admin/testimonials/edit/${t.id}`}
          className="p-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 transition">
          <MdEdit size={16} />
        </Link>
        <button onClick={() => setDeleteId(t.id)}
          className="p-1.5 rounded-lg bg-red-900/50 hover:bg-red-800 text-red-400 transition">
          <MdDelete size={16} />
        </button>
      </div>
    )},
  ];

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Testimonials</h1>
          <p className="text-gray-400 text-sm mt-1">Manage client testimonials</p>
        </div>
        <Link href="/admin/testimonials/create"
          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition text-sm font-medium shrink-0">
          <MdAdd size={18} /> Add Testimonial
        </Link>
      </div>

      <DataTable
        columns={columns}
        data={testimonials}
        total={total}
        page={page}
        limit={limit}
        onPageChange={setPage}
        loading={loading}
        keyExtractor={(t: TestimonialResponse) => t.id}
      />

      <ConfirmDialog
        open={!!deleteId}
        title="Delete Testimonial"
        message="Are you sure you want to delete this testimonial?"
        confirmLabel="Delete"
        variant="danger"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        loading={deleting}
      />
    </div>
  );
}
