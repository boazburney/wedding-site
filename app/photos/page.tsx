"use client";

import { useState } from "react";

async function compressImage(file: File): Promise<File> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = () => {
      img.src = reader.result as string;
    };

    img.onload = () => {
      const maxWidth = 1600;
      const scale = Math.min(1, maxWidth / img.width);

      const canvas = document.createElement("canvas");
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;

      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject(new Error("Could not compress image."));
        return;
      }

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Compression failed."));
            return;
          }

          const compressedFile = new File(
            [blob],
            file.name.replace(/\.[^/.]+$/, ".jpg"),
            {
              type: "image/jpeg",
              lastModified: Date.now(),
            }
          );

          resolve(compressedFile);
        },
        "image/jpeg",
        0.75
      );
    };

    img.onerror = () => reject(new Error("Image load failed."));
    reader.onerror = () => reject(new Error("File read failed."));

    reader.readAsDataURL(file);
  });
}

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
        const compressedFile = await compressImage(file);

        const formData = new FormData();
        formData.append("file", compressedFile);
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
    } catch {
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
          {uploading ? "Compressing & Uploading..." : "Upload"}
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