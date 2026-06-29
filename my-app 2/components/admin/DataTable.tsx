"use client";

import { MdChevronLeft, MdChevronRight, MdSearch } from "react-icons/md";

interface Column<T> {
  key: string;
  label: string;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  total: number;
  page: number;
  limit: number;
  onPageChange: (page: number) => void;
  search?: string;
  onSearchChange?: (value: string) => void;
  loading?: boolean;
  keyExtractor: (item: T) => string;
}

export default function DataTable<T>({
  columns, data, total, page, limit,
  onPageChange, search, onSearchChange, loading, keyExtractor,
}: DataTableProps<T>) {
  const totalPages = Math.ceil(total / limit);

  return (
    <div>
      {onSearchChange && (
        <div className="relative mb-4">
          <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            value={search || ""}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>
      )}

      {/* Mobile card view */}
      <div className="sm:hidden space-y-3">
        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading...</div>
        ) : data.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No data found</div>
        ) : (
          data.map((item) => (
            <div key={keyExtractor(item)} className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 space-y-2">
              {columns.map((col) => (
                <div key={col.key} className="flex items-center justify-between gap-2">
                  <span className="text-xs font-medium text-gray-500 shrink-0">{col.label}</span>
                  <span className="text-sm text-gray-200 text-right truncate max-w-[60%]">
                    {col.render ? col.render(item) : String((item as Record<string, unknown>)[col.key] ?? "")}
                  </span>
                </div>
              ))}
            </div>
          ))
        )}
      </div>

      {/* Desktop table view */}
      <div className="hidden sm:block overflow-x-auto rounded-xl border border-gray-700">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-800/80">
              {columns.map((col) => (
                <th key={col.key} className="px-4 py-3 text-left font-medium text-gray-400 whitespace-nowrap">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-12 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-12 text-center text-gray-500">
                  No data found
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={keyExtractor(item)} className="hover:bg-gray-800/50 transition">
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3 text-gray-300">
                      {col.render ? col.render(item) : String((item as Record<string, unknown>)[col.key] ?? "")}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 text-sm text-gray-400">
          <span>
            Page {page} of {totalPages} ({total} total)
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => onPageChange(page - 1)}
              disabled={page <= 1}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-800 border border-gray-700 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <MdChevronLeft size={16} /> Prev
            </button>
            <button
              onClick={() => onPageChange(page + 1)}
              disabled={page >= totalPages}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-800 border border-gray-700 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Next <MdChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
