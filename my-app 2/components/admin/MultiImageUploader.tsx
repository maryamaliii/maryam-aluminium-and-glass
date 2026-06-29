"use client";

import { useState, useRef } from "react";
import { MdAdd, MdClose, MdDragIndicator } from "react-icons/md";

interface ImageItem {
  id?: string;
  url: string;
  sortOrder: number;
}

interface MultiImageUploaderProps {
  images: ImageItem[];
  onChange: (images: ImageItem[]) => void;
  folder?: string;
  label?: string;
}

export default function MultiImageUploader({ images, onChange, folder, label }: MultiImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState("");

  const handleUpload = async (files: FileList) => {
    setUploading(true);
    setError("");
    const token = localStorage.getItem("token");

    const uploadPromises = Array.from(files).map(async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      if (folder) formData.append("folder", folder);

      try {
        const res = await fetch("/api/admin/upload", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });
        const data = await res.json();
        if (data.success) {
          return { url: data.data.url, sortOrder: images.length + Math.random() };
        }
      } catch {
        // network error handled below
      }
      return null;
    });

    const results = await Promise.all(uploadPromises);
    const valid = results.filter((r): r is ImageItem => r !== null);
    if (valid.length === 0) {
      setError("Upload failed. Check your connection and try again.");
    } else {
      onChange([...images, ...valid]);
    }
    setUploading(false);
  };

  const handleRemove = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const next = [...images];
    [next[index - 1], next[index]] = [next[index], next[index - 1]];
    onChange(next.map((img, i) => ({ ...img, sortOrder: i })));
  };

  const handleMoveDown = (index: number) => {
    if (index === images.length - 1) return;
    const next = [...images];
    [next[index], next[index + 1]] = [next[index + 1], next[index]];
    onChange(next.map((img, i) => ({ ...img, sortOrder: i })));
  };

  return (
    <div>
      {label && <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-3">
        {images.map((img, index) => (
          <div key={index} className="relative group aspect-square rounded-xl overflow-hidden border border-gray-700 bg-gray-900">
            <img src={img.url} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="flex gap-1">
                {index > 0 && (
                  <button type="button" onClick={() => handleMoveUp(index)}
                    className="p-1.5 bg-gray-700 rounded hover:bg-gray-600 transition">
                    <MdDragIndicator size={16} className="text-white rotate-90" />
                  </button>
                )}
                <button type="button" onClick={() => handleRemove(index)}
                  className="p-1.5 bg-red-600 rounded hover:bg-red-700 transition">
                  <MdClose size={16} className="text-white" />
                </button>
              </div>
            </div>
            <span className="absolute bottom-1 right-1 text-xs bg-black/60 text-white px-1.5 py-0.5 rounded">
              {index + 1}
            </span>
          </div>
        ))}

        <label className="aspect-square rounded-xl border-2 border-dashed border-gray-700 hover:border-blue-500 bg-gray-900/50 cursor-pointer flex flex-col items-center justify-center gap-1 transition group">
          {uploading ? (
            <div className="h-6 w-6 animate-spin rounded-full border-3 border-blue-600 border-t-transparent" />
          ) : (
            <>
              <MdAdd size={28} className="text-gray-500 group-hover:text-blue-400 transition" />
              <span className="text-xs text-gray-500 group-hover:text-gray-400 transition">Add</span>
            </>
          )}
          <input
            ref={inputRef}
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp,image/avif"
            onChange={(e) => { if (e.target.files?.length) handleUpload(e.target.files); }}
            className="hidden"
          />
        </label>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}
      <p className="text-xs text-gray-500">Click "Add" to upload images. Drag to reorder once uploaded.</p>
    </div>
  );
}
