"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { MdCloudUpload, MdClose } from "react-icons/md";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  label?: string;
}

export default function ImageUploader({ value, onChange, folder, label }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setError("");

    const allowed = ["image/jpeg", "image/png", "image/webp", "image/avif"];
    if (!allowed.includes(file.type)) {
      setError("Invalid file type. Use JPEG, PNG, WebP, or AVIF.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("File too large (max 10MB).");
      return;
    }

    setUploading(true);

    const token = localStorage.getItem("token");
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

      if (!res.ok || !data.success) {
        setError(data.error || "Upload failed");
        return;
      }

      onChange(data.data.url);
    } catch {
      setError("Network error during upload");
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = "";
  };

  return (
    <div>
      {label && <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>}

      {value ? (
        <div className="relative w-full h-48 rounded-xl overflow-hidden border border-gray-700 bg-gray-900 group">
          <Image src={value} alt="Uploaded preview" fill className="object-contain" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => onChange("")}
                className="p-2 bg-red-600 rounded-lg hover:bg-red-700 transition"
                title="Remove image"
              >
                <MdClose size={20} className="text-white" />
              </button>
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="p-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                title="Replace image"
              >
                <MdCloudUpload size={20} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          className="w-full h-48 rounded-xl border-2 border-dashed border-gray-700 hover:border-blue-500 bg-gray-900/50 cursor-pointer flex flex-col items-center justify-center gap-2 transition group"
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <div className="h-8 w-8 animate-spin rounded-full border-3 border-blue-600 border-t-transparent" />
              <span className="text-sm text-gray-400">Uploading...</span>
            </div>
          ) : (
            <>
              <MdCloudUpload size={36} className="text-gray-500 group-hover:text-blue-400 transition" />
              <p className="text-sm text-gray-400 group-hover:text-gray-300 transition">
                Click or drag an image here
              </p>
              <p className="text-xs text-gray-600">JPEG, PNG, WebP, AVIF (max 10MB)</p>
            </>
          )}
        </div>
      )}

      <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp,image/avif" onChange={handleChange} className="hidden" />

      {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
    </div>
  );
}
