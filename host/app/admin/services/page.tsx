"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import DataTable from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import { MdAdd, MdEdit, MdDelete } from "react-icons/md";
import type { ServiceResponse } from "@/types";

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceResponse[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();
  const limit = 20;

  const fetchServices = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) { router.push("/admin/login"); return; }

    const params = new URLSearchParams({ page: String(page), limit: String(limit) });
    if (search) params.set("search", search);

    const res = await fetch(`/api/admin/services?${params}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (data.success) {
      setServices(data.data.services);
      setTotal(data.data.total);
    }
    setLoading(false);
  }, [page, search, router]);

  useEffect(() => { fetchServices(); }, [fetchServices]); // eslint-disable-line react-hooks/set-state-in-effect

  useEffect(() => {
    const timer = setTimeout(() => { setPage(1); fetchServices(); }, 300);
    return () => clearTimeout(timer);
  }, [search]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    const token = localStorage.getItem("token");
    const res = await fetch(`/api/admin/services/${deleteId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (data.success) {
      setDeleteId(null);
      fetchServices();
    }
    setDeleting(false);
  };

  const columns = [
    { key: "title", label: "Title", render: (s: ServiceResponse) => (
      <Link href={`/admin/services/edit/${s.id}`} className="text-blue-400 hover:text-blue-300 font-medium">
        {s.title}
      </Link>
    )},
    { key: "slug", label: "Slug" },
    { key: "category", label: "Category" },
    { key: "sortOrder", label: "Order" },
    { key: "isActive", label: "Status", render: (s: ServiceResponse) => (
      <StatusBadge status={s.isActive ? "ACTIVE" : "INACTIVE"} />
    )},
    { key: "images", label: "Images", render: (s: ServiceResponse) => (
      <span className="text-gray-400">{s.images?.length || 0}</span>
    )},
    { key: "actions", label: "Actions", render: (s: ServiceResponse) => (
      <div className="flex gap-2">
        <Link href={`/admin/services/edit/${s.id}`}
          className="p-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 transition">
          <MdEdit size={16} />
        </Link>
        <button onClick={() => setDeleteId(s.id)}
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
          <h1 className="text-2xl font-bold text-white">Services</h1>
          <p className="text-gray-400 text-sm mt-1">Manage your services</p>
        </div>
        <Link href="/admin/services/create"
          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition text-sm font-medium shrink-0">
          <MdAdd size={18} /> Add Service
        </Link>
      </div>

      <DataTable
        columns={columns}
        data={services}
        total={total}
        page={page}
        limit={limit}
        onPageChange={setPage}
        search={search}
        onSearchChange={setSearch}
        loading={loading}
        keyExtractor={(s: ServiceResponse) => s.id}
      />

      <ConfirmDialog
        open={!!deleteId}
        title="Delete Service"
        message="Are you sure you want to delete this service? This action cannot be undone."
        confirmLabel="Delete"
        variant="danger"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        loading={deleting}
      />
    </div>
  );
}
