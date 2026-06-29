"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import DataTable from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import { MdAdd, MdEdit, MdDelete } from "react-icons/md";
import type { FAQResponse } from "@/types";

export default function AdminFAQPage() {
  const [faqs, setFaqs] = useState<FAQResponse[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();
  const limit = 20;

  const fetchFaqs = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) { router.push("/admin/login"); return; }

    const res = await fetch(`/api/admin/faq?page=${page}&limit=${limit}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (data.success) {
      setFaqs(data.data.faqs);
      setTotal(data.data.total);
    }
    setLoading(false);
  }, [page, router]);

  useEffect(() => { fetchFaqs(); }, [fetchFaqs]); // eslint-disable-line react-hooks/set-state-in-effect

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    const token = localStorage.getItem("token");
    await fetch(`/api/admin/faq/${deleteId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setDeleteId(null);
    fetchFaqs();
    setDeleting(false);
  };

  const columns = [
    { key: "question", label: "Question", render: (f: FAQResponse) => (
      <Link href={`/admin/faq/edit/${f.id}`} className="text-blue-400 hover:text-blue-300 font-medium">
        {f.question}
      </Link>
    )},
    { key: "category", label: "Category" },
    { key: "isActive", label: "Status", render: (f: FAQResponse) => (
      <StatusBadge status={f.isActive ? "ACTIVE" : "INACTIVE"} />
    )},
    { key: "sortOrder", label: "Order" },
    { key: "actions", label: "Actions", render: (f: FAQResponse) => (
      <div className="flex gap-2">
        <Link href={`/admin/faq/edit/${f.id}`}
          className="p-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 transition">
          <MdEdit size={16} />
        </Link>
        <button onClick={() => setDeleteId(f.id)}
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
          <h1 className="text-2xl font-bold text-white">FAQ</h1>
          <p className="text-gray-400 text-sm mt-1">Manage frequently asked questions</p>
        </div>
        <Link href="/admin/faq/create"
          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition text-sm font-medium shrink-0">
          <MdAdd size={18} /> Add FAQ
        </Link>
      </div>

      <DataTable
        columns={columns}
        data={faqs}
        total={total}
        page={page}
        limit={limit}
        onPageChange={setPage}
        loading={loading}
        keyExtractor={(f: FAQResponse) => f.id}
      />

      <ConfirmDialog
        open={!!deleteId}
        title="Delete FAQ"
        message="Are you sure you want to delete this FAQ?"
        confirmLabel="Delete"
        variant="danger"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        loading={deleting}
      />
    </div>
  );
}
