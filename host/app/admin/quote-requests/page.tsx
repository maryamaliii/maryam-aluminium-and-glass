"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import DataTable from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import type { QuoteRequestResponse } from "@/types";

const statusFilters = ["", "NEW", "QUOTE_SENT", "NEGOTIATING", "WON", "LOST"];

export default function AdminQuoteRequestsPage() {
  const [quotes, setQuotes] = useState<QuoteRequestResponse[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<QuoteRequestResponse | null>(null);
  const [newStatus, setNewStatus] = useState("");
  const [newNotes, setNewNotes] = useState("");
  const router = useRouter();
  const limit = 20;

  const fetchQuotes = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) { router.push("/admin/login"); return; }

    const params = new URLSearchParams({ page: String(page), limit: String(limit) });
    if (search) params.set("search", search);
    if (statusFilter) params.set("status", statusFilter);

    const res = await fetch(`/api/admin/quote-requests?${params}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (data.success) {
      setQuotes(data.data.quotes);
      setTotal(data.data.total);
    }
    setLoading(false);
  }, [page, search, statusFilter, router]);

  useEffect(() => { fetchQuotes(); }, [fetchQuotes]); // eslint-disable-line react-hooks/set-state-in-effect

  useEffect(() => {
    const timer = setTimeout(() => { setPage(1); fetchQuotes(); }, 300);
    return () => clearTimeout(timer);
  }, [search]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
    if (!selected || !newStatus) return;

    const res = await fetch(`/api/admin/quote-requests/${selected.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status: newStatus, notes: newNotes }),
    });
    const data = await res.json();
    if (data.success) {
      setSelected(null);
      fetchQuotes();
    }
  };

  const openDetails = useCallback((q: QuoteRequestResponse) => {
    setSelected(q);
    setNewStatus(q.status);
    setNewNotes(q.notes || "");
  }, []);

  const columns = [
    { key: "clientName", label: "Client", render: (q: QuoteRequestResponse) => (
      <span className="font-medium text-white">{q.clientName}</span>
    )},
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "service", label: "Service", render: (q: QuoteRequestResponse) => (
      <span className="text-gray-400 text-sm">{q.service?.title || "-"}</span>
    )},
    { key: "status", label: "Status", render: (q: QuoteRequestResponse) => (
      <StatusBadge status={q.status} />
    )},
    { key: "createdAt", label: "Date", render: (q: QuoteRequestResponse) => (
      <span className="text-gray-400 text-sm">{new Date(q.createdAt).toLocaleDateString()}</span>
    )},
    { key: "actions", label: "", render: (q: QuoteRequestResponse) => (
      <button onClick={() => openDetails(q)}
        className="px-3 py-2.5 sm:py-1.5 bg-blue-600/20 text-blue-400 border border-blue-800/50 hover:bg-blue-600/30 rounded-lg text-xs font-medium transition min-h-[44px] sm:min-h-0">
        View
      </button>
    )},
  ];

  const renderCard = (q: QuoteRequestResponse) => {
    return (
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5 space-y-4 active:bg-gray-800 transition">
        <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-2.5 text-sm">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider leading-snug pt-px">Client</span>
          <span className="text-white font-medium break-words min-w-0 leading-snug">{q.clientName}</span>

          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider leading-snug pt-px">Email</span>
          <span className="text-blue-400 break-all min-w-0 leading-snug">{q.email}</span>

          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider leading-snug pt-px">Phone</span>
          <span className="text-gray-200 break-all min-w-0 leading-snug">{q.phone}</span>

          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider leading-snug pt-px">Service</span>
          <span className="text-gray-400 break-words min-w-0 leading-snug">{q.service?.title || "-"}</span>

          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider leading-snug pt-px">Status</span>
          <span className="min-w-0"><StatusBadge status={q.status} /></span>

          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider leading-snug pt-px">Date</span>
          <span className="text-gray-400 break-words min-w-0 leading-snug">{new Date(q.createdAt).toLocaleDateString()}</span>
        </div>

        <button
          onClick={() => openDetails(q)}
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
        <h1 className="text-2xl font-bold text-white">Quote Requests</h1>
        <p className="text-gray-400 text-sm mt-1">Manage incoming quote requests from clients</p>
      </div>

      <div className="flex gap-1.5 sm:gap-2 mb-4 flex-wrap items-center">
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

      <DataTable
        columns={columns}
        data={quotes}
        total={total}
        page={page}
        limit={limit}
        onPageChange={setPage}
        search={search}
        onSearchChange={setSearch}
        loading={loading}
        keyExtractor={(q: QuoteRequestResponse) => q.id}
        onRowClick={openDetails}
        renderCard={renderCard}
      />

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-gray-800 rounded-xl border border-gray-700 w-full max-w-lg max-h-[80vh] overflow-y-auto p-4 sm:p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Quote Request Details</h3>

            <div className="space-y-3 text-sm mb-6">
              <div><span className="text-gray-400">Client:</span> <span className="text-white ml-2">{selected.clientName}</span></div>
              <div><span className="text-gray-400">Email:</span> <span className="text-white ml-2">{selected.email}</span></div>
              <div><span className="text-gray-400">Phone:</span> <span className="text-white ml-2">{selected.phone}</span></div>
              {selected.service && <div><span className="text-gray-400">Service:</span> <span className="text-white ml-2">{selected.service.title}</span></div>}
              {selected.location && <div><span className="text-gray-400">Location:</span> <span className="text-white ml-2">{selected.location}</span></div>}
              {selected.timeline && <div><span className="text-gray-400">Timeline:</span> <span className="text-white ml-2">{selected.timeline}</span></div>}
              {selected.budget && <div><span className="text-gray-400">Budget:</span> <span className="text-white ml-2">{selected.budget}</span></div>}
              <div><span className="text-gray-400">Date:</span> <span className="text-white ml-2">{new Date(selected.createdAt).toLocaleString()}</span></div>
              <div><span className="text-gray-400">Status:</span> <span className="ml-2"><StatusBadge status={selected.status} /></span></div>
              <div className="pt-2 border-t border-gray-700">
                <p className="text-gray-400 mb-1">Project Scope:</p>
                <p className="text-white bg-gray-900 rounded-lg p-3 whitespace-pre-wrap">{selected.projectScope}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              <a href={`mailto:${selected.email}?subject=Re: Quote Request - Meer Engineering`}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2.5 sm:py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-medium transition min-h-[44px] sm:min-h-0">
                Reply via Email
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
              {selected.status === "WON" && (
                <span className="inline-flex items-center px-3 py-2.5 sm:py-1.5 bg-green-900/50 text-green-300 rounded-lg text-xs font-medium min-h-[44px] sm:min-h-0">
                  Won
                </span>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Update Status</label>
                <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm">
                  {statusFilters.filter(Boolean).map((s) => (
                    <option key={s} value={s}>{s.replace("_", " ")}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Internal Notes</label>
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
