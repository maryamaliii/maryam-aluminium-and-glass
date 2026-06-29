"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import DataTable from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import { MdAdd, MdEdit, MdDelete, MdStar } from "react-icons/md";
import type { ProjectResponse } from "@/types";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectResponse[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();
  const limit = 20;

  const fetchProjects = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) { router.push("/admin/login"); return; }

    const params = new URLSearchParams({ page: String(page), limit: String(limit) });
    if (search) params.set("search", search);

    const res = await fetch(`/api/admin/projects?${params}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (data.success) {
      setProjects(data.data.projects);
      setTotal(data.data.total);
    }
    setLoading(false);
  }, [page, search, router]);

  useEffect(() => { fetchProjects(); }, [fetchProjects]);

  useEffect(() => {
    const timer = setTimeout(() => { setPage(1); fetchProjects(); }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    const token = localStorage.getItem("token");
    await fetch(`/api/admin/projects/${deleteId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setDeleteId(null);
    fetchProjects();
    setDeleting(false);
  };

  const columns = [
    { key: "title", label: "Title", render: (p: ProjectResponse) => (
      <Link href={`/admin/projects/edit/${p.id}`} className="text-blue-400 hover:text-blue-300 font-medium">
        {p.title}
      </Link>
    )},
    { key: "service", label: "Service", render: (p: ProjectResponse) => (
      <span className="text-gray-400">{p.service.title}</span>
    )},
    { key: "isFeatured", label: "Featured", render: (p: ProjectResponse) => (
      p.isFeatured ? <MdStar className="text-yellow-400" size={18} /> : null
    )},
    { key: "isActive", label: "Status", render: (p: ProjectResponse) => (
      <StatusBadge status={p.isActive ? "ACTIVE" : "INACTIVE"} />
    )},
    { key: "sortOrder", label: "Order" },
    { key: "actions", label: "Actions", render: (p: ProjectResponse) => (
      <div className="flex gap-2">
        <Link href={`/admin/projects/edit/${p.id}`}
          className="p-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 transition">
          <MdEdit size={16} />
        </Link>
        <button onClick={() => setDeleteId(p.id)}
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
          <h1 className="text-2xl font-bold text-white">Projects</h1>
          <p className="text-gray-400 text-sm mt-1">Manage your projects</p>
        </div>
        <Link href="/admin/projects/create"
          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition text-sm font-medium shrink-0">
          <MdAdd size={18} /> Add Project
        </Link>
      </div>

      <DataTable
        columns={columns}
        data={projects}
        total={total}
        page={page}
        limit={limit}
        onPageChange={setPage}
        search={search}
        onSearchChange={setSearch}
        loading={loading}
        keyExtractor={(p: ProjectResponse) => p.id}
      />

      <ConfirmDialog
        open={!!deleteId}
        title="Delete Project"
        message="Are you sure you want to delete this project?"
        confirmLabel="Delete"
        variant="danger"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        loading={deleting}
      />
    </div>
  );
}
