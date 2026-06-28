"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import DataTable from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import { MdAdd, MdEdit, MdDelete } from "react-icons/md";
import type { AdminUserResponse } from "@/types";

export default function AdminAdminsPage() {
  const [admins, setAdmins] = useState<AdminUserResponse[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteName, setDeleteName] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const limit = 20;

  const fetchAdmins = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) { router.push("/admin/login"); return; }

    const res = await fetch(`/api/admin/admins?page=${page}&limit=${limit}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();

    if (!data.success && data.error === "Forbidden: Insufficient permissions") {
      setError("You don't have permission to access this page.");
    } else if (data.success) {
      setAdmins(data.data.admins);
      setTotal(data.data.total);
    }
    setLoading(false);
  }, [page, router]);

  useEffect(() => { fetchAdmins(); }, [fetchAdmins]); // eslint-disable-line react-hooks/set-state-in-effect

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    const token = localStorage.getItem("token");
    const res = await fetch(`/api/admin/admins/${deleteId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();

    if (!data.success) {
      setError(data.error || "Failed to delete");
      setDeleting(false);
      return;
    }

    setDeleteId(null);
    fetchAdmins();
    setDeleting(false);
  };

  const handleToggleActive = async (admin: AdminUserResponse) => {
    const token = localStorage.getItem("token");
    await fetch(`/api/admin/admins/${admin.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ isActive: !admin.isActive }),
    });
    fetchAdmins();
  };

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-red-400 mb-4">{error}</p>
        <Link href="/admin/dashboard" className="text-blue-400 hover:text-blue-300">← Back to Dashboard</Link>
      </div>
    );
  }

  const columns = [
    { key: "name", label: "Name", render: (a: AdminUserResponse) => (
      <Link href={`/admin/admins/edit/${a.id}`} className="text-blue-400 hover:text-blue-300 font-medium">{a.name}</Link>
    )},
    { key: "email", label: "Email" },
    { key: "role", label: "Role", render: (a: AdminUserResponse) => <StatusBadge status={a.role} /> },
    { key: "isActive", label: "Status", render: (a: AdminUserResponse) => (
      <button onClick={() => handleToggleActive(a)}
        className={`px-2 py-0.5 rounded text-xs font-medium border transition ${
          a.isActive ? "bg-green-900/50 text-green-300 border-green-700 hover:bg-green-800" : "bg-red-900/50 text-red-300 border-red-700 hover:bg-red-800"
        }`}>
        {a.isActive ? "Active" : "Inactive"}
      </button>
    )},
    { key: "createdAt", label: "Created", render: (a: AdminUserResponse) => (
      <span className="text-gray-400 text-sm">{new Date(a.createdAt).toLocaleDateString()}</span>
    )},
    { key: "actions", label: "Actions", render: (a: AdminUserResponse) => (
      <div className="flex gap-2">
        <Link href={`/admin/admins/edit/${a.id}`}
          className="p-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 transition">
          <MdEdit size={16} />
        </Link>
        <button onClick={() => { setDeleteId(a.id); setDeleteName(a.name); }}
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
          <h1 className="text-2xl font-bold text-white">Admins</h1>
          <p className="text-gray-400 text-sm mt-1">Manage admin users (Super Admin only)</p>
        </div>
        <Link href="/admin/admins/create"
          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition text-sm font-medium shrink-0">
          <MdAdd size={18} /> Add Admin
        </Link>
      </div>

      <DataTable
        columns={columns}
        data={admins}
        total={total}
        page={page}
        limit={limit}
        onPageChange={setPage}
        loading={loading}
        keyExtractor={(a: AdminUserResponse) => a.id}
      />

      <ConfirmDialog
        open={!!deleteId}
        title="Delete Admin"
        message={`Are you sure you want to delete "${deleteName}"? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="danger"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        loading={deleting}
      />
    </div>
  );
}
