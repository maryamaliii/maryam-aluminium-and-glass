"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import DataTable from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import type { ContactSubmissionResponse } from "@/types";

const statusFilters = ["", "NEW", "READ", "REPLIED", "ARCHIVED"];

export default function AdminContactPage() {
  const [submissions, setSubmissions] = useState<ContactSubmissionResponse[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<ContactSubmissionResponse | null>(null);
  const [newStatus, setNewStatus] = useState("");
  const [newNotes, setNewNotes] = useState("");
  const router = useRouter();
  const limit = 20;

  const fetchSubmissions = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) { router.push("/admin/login"); return; }

    const params = new URLSearchParams({ page: String(page), limit: String(limit) });
    if (search) params.set("search", search);
    if (statusFilter) params.set("status", statusFilter);

    const res = await fetch(`/api/admin/contact?${params}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (data.success) {
      setSubmissions(data.data.submissions);
      setTotal(data.data.total);
    }
    setLoading(false);
  }, [page, search, statusFilter, router]);

  useEffect(() => { fetchSubmissions(); }, [fetchSubmissions]);

  useEffect(() => {
    const timer = setTimeout(() => { setPage(1); fetchSubmissions(); }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
    if (!selected || !newStatus) return;

    const res = await fetch("/api/admin/contact", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ id: selected.id, status: newStatus, notes: newNotes }),
    });
    const data = await res.json();
    if (data.success) {
      setSelected(null);
      fetchSubmissions();
    }
  };

  const columns = [
    { key: "name", label: "Name", render: (s: ContactSubmissionResponse) => (
      <button onClick={() => { setSelected(s); setNewStatus(s.status); setNewNotes(s.notes || ""); }}
        className="text-blue-400 hover:text-blue-300 font-medium text-left">
        {s.name}
      </button>
    )},
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "status", label: "Status", render: (s: ContactSubmissionResponse) => (
      <StatusBadge status={s.status} />
    )},
    { key: "createdAt", label: "Date", render: (s: ContactSubmissionResponse) => (
      <span className="text-gray-400 text-sm">{new Date(s.createdAt).toLocaleDateString()}</span>
    )},
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Contact Submissions</h1>
        <p className="text-gray-400 text-sm mt-1">Manage inquiries from your website</p>
      </div>

      <div className="flex gap-2 mb-4 flex-wrap">
        {statusFilters.map((s) => (
          <button key={s}
            onClick={() => { setStatusFilter(s); setPage(1); }}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition border ${
              statusFilter === s
                ? "bg-blue-600/20 text-blue-400 border-blue-800"
                : "bg-gray-800 text-gray-400 border-gray-700 hover:border-gray-600"
            }`}>
            {s || "All"}
          </button>
        ))}
      </div>

      <DataTable
        columns={columns}
        data={submissions}
        total={total}
        page={page}
        limit={limit}
        onPageChange={setPage}
        search={search}
        onSearchChange={setSearch}
        loading={loading}
        keyExtractor={(s: ContactSubmissionResponse) => s.id}
      />

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-gray-800 rounded-xl border border-gray-700 w-full max-w-lg max-h-[80vh] overflow-y-auto p-4 sm:p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Submission Details</h3>

            <div className="space-y-3 text-sm mb-6">
              <div><span className="text-gray-400">Name:</span> <span className="text-white ml-2">{selected.name}</span></div>
              <div><span className="text-gray-400">Email:</span> <span className="text-white ml-2">{selected.email}</span></div>
              <div><span className="text-gray-400">Phone:</span> <span className="text-white ml-2">{selected.phone}</span></div>
              <div><span className="text-gray-400">Date:</span> <span className="text-white ml-2">{new Date(selected.createdAt).toLocaleString()}</span></div>
              <div><span className="text-gray-400">Status:</span> <span className="ml-2"><StatusBadge status={selected.status} /></span></div>
              <div className="pt-2 border-t border-gray-700">
                <p className="text-gray-400 mb-1">Message:</p>
                <p className="text-white bg-gray-900 rounded-lg p-3">{selected.message}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Update Status</label>
                <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm">
                  <option value="NEW">NEW</option>
                  <option value="READ">READ</option>
                  <option value="REPLIED">REPLIED</option>
                  <option value="ARCHIVED">ARCHIVED</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Notes</label>
                <textarea value={newNotes} onChange={(e) => setNewNotes(e.target.value)} rows={3}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm resize-none" />
              </div>
            </div>

            <div className="flex gap-3 mt-6 pt-4 border-t border-gray-700">
              <button onClick={handleUpdate}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition">
                Update
              </button>
              <button onClick={() => setSelected(null)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg text-sm transition">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
