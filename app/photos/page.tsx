"use client";

import { useState } from "react";

export default function Photos() {
  const [files, setFiles] = useState<File[]>([]);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (files.length === 0) {
      setMessage("Please select at least one photo first.");
      return;
    }

    setUploading(true);
    setMessage("Uploading...");

    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "wedding_uploads");
        formData.append("folder", "wedding-uploads");

        const res = await fetch(
          "https://api.cloudinary.com/v1_1/di2sfqdey/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!res.ok) {
          throw new Error("Upload failed");
        }
      }

      setMessage("Photos uploaded successfully!");
      setFiles([]);
    } catch (err) {
      setMessage("One or more photos failed to upload. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <main className="min-h-screen bg-stone-100 text-stone-900 px-6 py-10">
      <section className="mx-auto max-w-xl text-center">
        <h1 className="text-4xl font-bold">Upload Photos</h1>

        <p className="mt-4 text-stone-600">
          Share your photos from our special day.
        </p>

        <div className="mt-8">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) =>
              setFiles(e.target.files ? Array.from(e.target.files) : [])
            }
            className="w-full border rounded-xl px-4 py-3 bg-white"
          />
        </div>

        {files.length > 0 && (
          <p className="mt-3 text-sm text-stone-600">
            {files.length} photo{files.length > 1 ? "s" : ""} selected
          </p>
        )}

        <button
          onClick={handleUpload}
          disabled={uploading}
          className="mt-4 w-full rounded-xl bg-stone-900 text-white py-3 text-lg font-semibold disabled:opacity-50"
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>

        {message && (
          <div className="mt-6 rounded-xl bg-white px-4 py-3 text-sm font-medium shadow">
            {message}
          </div>
        )}

        <div className="mt-6">
          <a href="/" className="text-sm underline">
            Back to Home
          </a>
        </div>
      </section>
    </main>
  );
}