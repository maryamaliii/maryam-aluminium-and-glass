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

  useEffect(() => { fetchSubmissions(); }, [fetchSubmissions]); // eslint-disable-line react-hooks/set-state-in-effect

  useEffect(() => {
    const timer = setTimeout(() => { setPage(1); fetchSubmissions(); }, 300);
    return () => clearTimeout(timer);
  }, [search]); // eslint-disable-line react-hooks/exhaustive-deps

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

  const openDetails = useCallback(async (s: ContactSubmissionResponse) => {
    setSelected(s);
    setNewStatus(s.status);
    setNewNotes(s.notes || "");
    if (s.status === "NEW") {
      const token = localStorage.getItem("token");
      try {
        await fetch("/api/admin/contact", {
          method: "PATCH",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ id: s.id, status: "READ" }),
        });
      } catch { /* ignore */ }
      fetchSubmissions();
    }
  }, [fetchSubmissions]);

  const columns = [
    { key: "name", label: "Name", render: (s: ContactSubmissionResponse) => (
      <span className="font-medium text-white">{s.name}</span>
    )},
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "message", label: "Message", render: (s: ContactSubmissionResponse) => {
      const preview = s.message.length > 80 ? s.message.substring(0, 80) + "..." : s.message;
      return <span className="text-gray-400 text-sm">{preview}</span>;
    }},
    { key: "status", label: "Status", render: (s: ContactSubmissionResponse) => (
      <StatusBadge status={s.status} />
    )},
    { key: "createdAt", label: "Date", render: (s: ContactSubmissionResponse) => (
      <span className="text-gray-400 text-sm">{new Date(s.createdAt).toLocaleDateString()}</span>
    )},
    { key: "actions", label: "", render: (s: ContactSubmissionResponse) => (
      <button onClick={() => openDetails(s)}
        className="px-3 py-2.5 sm:py-1.5 bg-blue-600/20 text-blue-400 border border-blue-800/50 hover:bg-blue-600/30 rounded-lg text-xs font-medium transition min-h-[44px] sm:min-h-0">
        View
      </button>
    )},
  ];

  const renderCard = (s: ContactSubmissionResponse) => {
    const msgPreview = s.message.length > 80 ? s.message.substring(0, 80) + "..." : s.message;
    return (
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5 space-y-4 active:bg-gray-800 transition">
        <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-2.5 text-sm">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider leading-snug pt-px">Name</span>
          <span className="text-white font-medium break-words min-w-0 leading-snug">{s.name}</span>

          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider leading-snug pt-px">Email</span>
          <span className="text-blue-400 break-all min-w-0 leading-snug">{s.email}</span>

          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider leading-snug pt-px">Phone</span>
          <span className="text-gray-200 break-all min-w-0 leading-snug">{s.phone}</span>

          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider leading-snug pt-px">Message</span>
          <span className="text-gray-400 break-words min-w-0 leading-relaxed">{msgPreview}</span>

          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider leading-snug pt-px">Status</span>
          <span className="min-w-0"><StatusBadge status={s.status} /></span>

          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider leading-snug pt-px">Date</span>
          <span className="text-gray-400 break-words min-w-0 leading-snug">{new Date(s.createdAt).toLocaleDateString()}</span>
        </div>

        <button
          onClick={() => openDetails(s)}
          className="w-full py-3 bg-blue-600/20 text-blue-400 border border-blue-800/50 hover:bg-blue-600/30 rounded-lg text-sm font-medium transition min-h-[48px]"
        >
          View Details
        </button>
      </div>
    );
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Contact Submissions</h1>
        <p className="text-gray-400 text-sm mt-1">Manage inquiries from your website</p>
      </div>

      <div className="flex gap-1.5 sm:gap-2 mb-2 flex-wrap items-center">
        {statusFilters.map((s) => (
          <button key={s}
            onClick={() => { setStatusFilter(s); setPage(1); }}
            className={`px-2.5 sm:px-3 py-2.5 sm:py-1.5 rounded-lg text-xs sm:text-sm font-medium transition border min-h-[44px] sm:min-h-0 ${
              statusFilter === s
                ? "bg-blue-600/20 text-blue-400 border-blue-800"
                : "bg-gray-800 text-gray-400 border-gray-700 hover:border-gray-600"
            }`}>
            {s || "All"}
          </button>
        ))}
      </div>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => {
            const token = localStorage.getItem("token");
            if (!token) return;
            const params = new URLSearchParams({ format: "csv" });
            if (statusFilter) params.set("status", statusFilter);
            fetch(`/api/admin/contact?${params}`, { headers: { Authorization: `Bearer ${token}` } })
              .then((r) => r.blob())
              .then((blob) => {
                const a = document.createElement("a");
                a.href = URL.createObjectURL(blob);
                a.download = `contact-submissions-${new Date().toISOString().split("T")[0]}.csv`;
                a.click();
                URL.revokeObjectURL(a.href);
              });
          }}
          className="w-full sm:w-auto px-3 py-2.5 sm:py-1.5 rounded-lg text-xs sm:text-sm font-medium transition border bg-gray-800 text-gray-400 border-gray-700 hover:border-gray-600 hover:text-gray-200 min-h-[44px] sm:min-h-0"
        >
          Export CSV
        </button>
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
        onRowClick={openDetails}
        renderCard={renderCard}
      />

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-gray-800 rounded-xl border border-gray-700 w-full max-w-lg max-h-[80vh] overflow-y-auto p-4 sm:p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Submission Details</h3>

            <div className="space-y-3 text-sm mb-6">
              <div className="flex items-start gap-2">
                <span className="text-gray-400 shrink-0">Name:</span>
                <span className="text-white break-words min-w-0">{selected.name}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gray-400 shrink-0">Email:</span>
                <span className="text-white break-all min-w-0">{selected.email}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gray-400 shrink-0">Phone:</span>
                <span className="text-white break-all min-w-0">{selected.phone}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gray-400 shrink-0">Date:</span>
                <span className="text-white break-words min-w-0">{new Date(selected.createdAt).toLocaleString()}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gray-400 shrink-0">Status:</span>
                <span className="min-w-0"><StatusBadge status={selected.status} /></span>
              </div>
              <div className="pt-2 border-t border-gray-700">
                <p className="text-gray-400 mb-1">Message:</p>
                <p className="text-white bg-gray-900 rounded-lg p-3 break-words whitespace-pre-wrap">{selected.message}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              <a href={`mailto:${selected.email}?subject=Re: Meer Engineering Inquiry`}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2.5 sm:py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-medium transition min-h-[44px] sm:min-h-0">
                Email
              </a>
              <a href={`tel:${selected.phone}`}
                className="inline-flex items-center gap-1.5 px-3 py-2.5 sm:py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium transition min-h-[44px] sm:min-h-0">
                Call
              </a>
              <a href={`https://wa.me/${selected.phone.replace(/[^0-9]/g, '')}`}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2.5 sm:py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-medium transition min-h-[44px] sm:min-h-0">
                WhatsApp
              </a>
              {selected.status === "REPLIED" && (
                <span className="inline-flex items-center px-3 py-2.5 sm:py-1.5 bg-green-900/50 text-green-300 rounded-lg text-xs font-medium min-h-[44px] sm:min-h-0">
                  Replied
                </span>
              )}
            </div>

            {selected.notes ? (
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-300 mb-1">Notes</p>
                <p className="text-gray-200 bg-gray-900 rounded-lg p-3 text-sm whitespace-pre-wrap">{selected.notes}</p>
              </div>
            ) : null}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Update Status</label>
                <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full px-4 py-2.5 sm:py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm min-h-[44px] sm:min-h-0">
                  <option value="NEW">NEW</option>
                  <option value="READ">READ</option>
                  <option value="REPLIED">REPLIED</option>
                  <option value="ARCHIVED">ARCHIVED</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Internal Notes {selected.notes ? "(edit)" : ""}</label>
                <textarea value={newNotes} onChange={(e) => setNewNotes(e.target.value)} rows={3}
                  placeholder="Add internal notes about this inquiry..."
                  className="w-full px-4 py-2.5 sm:py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm resize-none min-h-[44px] sm:min-h-0" />
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t border-gray-700">
              <button onClick={handleUpdate}
                className="flex-1 sm:flex-none px-4 py-2.5 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition min-h-[44px] sm:min-h-0">
                Update
              </button>
              <button onClick={() => setSelected(null)}
                className="flex-1 sm:flex-none px-4 py-2.5 sm:py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg text-sm transition min-h-[44px] sm:min-h-0">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
