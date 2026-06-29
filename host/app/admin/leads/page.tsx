"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import StatusBadge from "@/components/admin/StatusBadge";

interface Lead {
  id: string;
  type: "Contact" | "Quote";
  name: string;
  email: string;
  phone: string;
  service?: string;
  message?: string;
  projectScope?: string;
  timeline?: string;
  location?: string;
  budget?: string;
  status: string;
  notes?: string;
  createdAt: string;
  read?: boolean;
}

const typeFilters = ["", "Contact", "Quote"];
const statusFilters = ["", "NEW", "READ", "REPLIED", "ARCHIVED", "QUOTE_SENT", "NEGOTIATING", "WON", "LOST"];

function getWhatsAppLink(phone: string) {
  const digits = phone.replace(/[^0-9]/g, "");
  return `https://wa.me/${digits}`;
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selected, setSelected] = useState<Lead | null>(null);
  const [newNotes, setNewNotes] = useState("");
  const router = useRouter();

  const fetchAll = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) { router.push("/admin/login"); return; }

    try {
      const [contactsRes, quotesRes] = await Promise.all([
        fetch("/api/admin/contact?limit=1000", { headers: { Authorization: `Bearer ${token}` } }),
        fetch("/api/admin/quote-requests?limit=1000", { headers: { Authorization: `Bearer ${token}` } }),
      ]);

      const contacts = await contactsRes.json();
      const quotes = await quotesRes.json();

      const mappedContacts: Lead[] = (contacts.data?.submissions || []).map((s: Record<string, unknown>) => ({
        id: s.id as string,
        type: "Contact" as const,
        name: s.name as string,
        email: s.email as string,
        phone: s.phone as string,
        service: (s.service as string) || "",
        message: s.message as string,
        status: s.status as string,
        notes: s.notes as string,
        createdAt: s.createdAt as string,
      }));

      const mappedQuotes: Lead[] = (quotes.data?.quotes || []).map((q: Record<string, unknown>) => ({
        id: q.id as string,
        type: "Quote" as const,
        name: q.clientName as string,
        email: q.email as string,
        phone: q.phone as string,
        service: ((q.service as Record<string, unknown>)?.title as string) || "",
        projectScope: q.projectScope as string,
        timeline: q.timeline as string,
        location: q.location as string,
        budget: q.budget as string,
        status: q.status as string,
        notes: q.notes as string,
        createdAt: q.createdAt as string,
      }));

      const allLeads = [...mappedContacts, ...mappedQuotes].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setLeads(allLeads);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }, [router]);

  useEffect(() => { fetchAll(); }, [fetchAll]); // eslint-disable-line react-hooks/set-state-in-effect

  const openDetails = useCallback((lead: Lead) => {
    setSelected(lead);
    setNewNotes(lead.notes || "");
  }, []);

  const filtered = leads.filter((l) => {
    if (typeFilter && l.type !== typeFilter) return false;
    if (statusFilter && l.status !== statusFilter) return false;
    if (search) {
      const s = search.toLowerCase();
      return l.name.toLowerCase().includes(s) || l.email.toLowerCase().includes(s) || l.phone.includes(s);
    }
    return true;
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">All Leads</h1>
        <p className="text-gray-400 text-sm mt-1">Combined view of contact inquiries and quote requests</p>
      </div>

      <div className="flex gap-1.5 sm:gap-2 mb-4 flex-wrap items-center">
        <span className="text-xs text-gray-500 font-medium uppercase tracking-wider mr-0.5 sm:mr-1">Type:</span>
        {typeFilters.map((t) => (
          <button key={t}
            onClick={() => { setTypeFilter(t); }}
            className={`px-2.5 sm:px-3 py-2.5 sm:py-1.5 rounded-lg text-xs sm:text-sm font-medium transition border min-h-[44px] sm:min-h-0 ${
              typeFilter === t
                ? "bg-blue-600/20 text-blue-400 border-blue-800"
                : "bg-gray-800 text-gray-400 border-gray-700 hover:border-gray-600"
            }`}>
            {t || "All"}
          </button>
        ))}
        <div className="hidden sm:block w-px h-6 bg-gray-700 mx-1" />
        <span className="text-xs text-gray-500 font-medium uppercase tracking-wider mr-0.5 sm:mr-1">Status:</span>
        {statusFilters.slice(0, 5).map((s) => (
          <button key={s}
            onClick={() => { setStatusFilter(s); }}
            className={`px-2.5 sm:px-3 py-2.5 sm:py-1.5 rounded-lg text-xs sm:text-sm font-medium transition border min-h-[44px] sm:min-h-0 ${
              statusFilter === s
                ? "bg-blue-600/20 text-blue-400 border-blue-800"
                : "bg-gray-800 text-gray-400 border-gray-700 hover:border-gray-600"
            }`}>
            {s || "All"}
          </button>
        ))}
      </div>

      <div className="relative mb-4">
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, email, or phone..."
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
      </div>

      {loading ? (
        <div className="text-center py-16 text-gray-500">Loading...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-500">No leads found</div>
      ) : (
        <>
          <div className="hidden sm:block overflow-x-auto rounded-xl border border-gray-700">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-800/80">
                  <th className="px-4 py-3 text-left font-medium text-gray-400">Type</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-400">Name</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-400">Contact</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-400">Service</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-400">Status</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-400">Date</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filtered.map((lead) => (
                  <tr key={`${lead.type}-${lead.id}`} className="hover:bg-gray-800/50 transition cursor-pointer" onClick={() => openDetails(lead)}>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        lead.type === "Contact" ? "bg-blue-900/50 text-blue-300" : "bg-purple-900/50 text-purple-300"
                      }`}>
                        {lead.type}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-blue-400 font-medium">{lead.name}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-300">
                      <div>{lead.email}</div>
                      <div className="text-gray-500 text-xs">{lead.phone}</div>
                    </td>
                    <td className="px-4 py-3 text-gray-400">{lead.service || "-"}</td>
                    <td className="px-4 py-3"><StatusBadge status={lead.status} /></td>
                    <td className="px-4 py-3 text-gray-400 text-sm">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1.5" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => openDetails(lead)}
                          className="px-2.5 py-1.5 bg-blue-600/20 text-blue-400 border border-blue-800/50 hover:bg-blue-600/30 rounded text-xs font-medium transition">
                          View
                        </button>
                        <a href={`mailto:${lead.email}`} target="_blank" rel="noopener noreferrer"
                          className="px-2 py-1 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded text-xs transition">
                          Email
                        </a>
                        <a href={`tel:${lead.phone}`}
                          className="px-2 py-1 bg-blue-700 hover:bg-blue-600 text-blue-200 rounded text-xs transition">
                          Call
                        </a>
                        <a href={getWhatsAppLink(lead.phone)} target="_blank" rel="noopener noreferrer"
                          className="px-2 py-1 bg-green-700 hover:bg-green-600 text-green-200 rounded text-xs transition">
                          WhatsApp
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="sm:hidden space-y-3">
            {filtered.map((lead) => (
              <div key={`${lead.type}-${lead.id}`} className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                    lead.type === "Contact" ? "bg-blue-900/50 text-blue-300" : "bg-purple-900/50 text-purple-300"
                  }`}>{lead.type}</span>
                  <StatusBadge status={lead.status} />
                </div>
                <div className="space-y-1">
                  <div className="font-medium text-white">{lead.name}</div>
                  <div className="text-xs text-gray-400">{lead.email} • {lead.phone}</div>
                </div>
                <button onClick={() => openDetails(lead)}
                  className="w-full py-2.5 bg-blue-600/20 text-blue-400 border border-blue-800/50 hover:bg-blue-600/30 rounded-lg text-xs font-medium transition min-h-[44px]">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-gray-800 rounded-xl border border-gray-700 w-full max-w-lg max-h-[80vh] overflow-y-auto p-4 sm:p-6">
            <h3 className="text-lg font-semibold text-white mb-4">{selected.type} Details</h3>

            <div className="space-y-3 text-sm mb-6">
              <div><span className="text-gray-400">Name:</span> <span className="text-white ml-2">{selected.name}</span></div>
              <div><span className="text-gray-400">Email:</span> <span className="text-white ml-2">{selected.email}</span></div>
              <div><span className="text-gray-400">Phone:</span> <span className="text-white ml-2">{selected.phone}</span></div>
              {selected.service && <div><span className="text-gray-400">Service:</span> <span className="text-white ml-2">{selected.service}</span></div>}
              {selected.location && <div><span className="text-gray-400">Location:</span> <span className="text-white ml-2">{selected.location}</span></div>}
              {selected.timeline && <div><span className="text-gray-400">Timeline:</span> <span className="text-white ml-2">{selected.timeline}</span></div>}
              {selected.budget && <div><span className="text-gray-400">Budget:</span> <span className="text-white ml-2">{selected.budget}</span></div>}
              <div><span className="text-gray-400">Date:</span> <span className="text-white ml-2">{new Date(selected.createdAt).toLocaleString()}</span></div>
              <div><span className="text-gray-400">Status:</span> <span className="ml-2"><StatusBadge status={selected.status} /></span></div>
              <div className="pt-2 border-t border-gray-700">
                <p className="text-gray-400 mb-1">{selected.type === "Contact" ? "Message:" : "Project Scope:"}</p>
                <p className="text-white bg-gray-900 rounded-lg p-3 whitespace-pre-wrap">
                  {selected.message || selected.projectScope || "N/A"}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              <a href={`mailto:${selected.email}?subject=Re: ${selected.type} - Meer Engineering`}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2.5 sm:py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-medium transition min-h-[44px] sm:min-h-0">
                Reply via Email
              </a>
              <a href={getWhatsAppLink(selected.phone)}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2.5 sm:py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-medium transition min-h-[44px] sm:min-h-0">
                Reply via WhatsApp
              </a>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Internal Notes</label>
                <textarea value={newNotes} onChange={(e) => setNewNotes(e.target.value)} rows={3}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm resize-none" />
              </div>
            </div>

            <div className="flex gap-3 mt-6 pt-4 border-t border-gray-700">
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
