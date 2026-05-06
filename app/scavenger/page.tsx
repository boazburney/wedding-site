"use client";

import { useState } from "react";

type Challenge = {
  id: number;
  title: string;
  points: number;
};

const challenges: Challenge[] = [
  { id: 1, title: "Take a photo with someone from another table", points: 5 },
  { id: 2, title: "Take a dance floor selfie", points: 5 },
  { id: 3, title: "Take a photo outside in the chill area", points: 10 },
  { id: 4, title: "Take a photo with someone married 20+ years", points: 10 },
  { id: 5, title: "Recreate a famous movie scene", points: 15 },
];

export default function Scavenger() {
  const [teamName, setTeamName] = useState("");
  const [selectedChallenge, setSelectedChallenge] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async () => {
    if (!teamName || !selectedChallenge || !file) {
      setMessage("Please enter a team name, choose a challenge, and upload a photo.");
      return;
    }

    setUploading(true);
    setMessage("Submitting...");

    const challenge = challenges.find(
      (c) => c.id === Number(selectedChallenge)
    );

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "wedding_uploads");
    formData.append("folder", "scavenger-submissions");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/di2sfqdey/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) throw new Error("Upload failed");

      const existingScore = Number(localStorage.getItem(teamName) || 0);
      const newScore = existingScore + (challenge?.points || 0);

      localStorage.setItem(teamName, String(newScore));

      setMessage(
        `Submitted! ${teamName} earned ${challenge?.points} points. Total: ${newScore}`
      );

      setSelectedChallenge("");
      setFile(null);
    } catch {
      setMessage("Submission failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <main className="min-h-screen bg-stone-100 text-stone-900 px-6 py-10">
      <section className="mx-auto max-w-xl text-center">
        <h1 className="text-4xl font-bold">Scavenger Hunt</h1>

        <p className="mt-4 text-stone-600">
          Complete a challenge, upload a photo, and earn points.
        </p>

        <input
          type="text"
          placeholder="Team name"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          className="mt-6 w-full rounded-xl border px-4 py-3 text-lg"
        />

        <select
          value={selectedChallenge}
          onChange={(e) => setSelectedChallenge(e.target.value)}
          className="mt-4 w-full rounded-xl border px-4 py-3 text-lg"
        >
          <option value="">Choose a challenge</option>
          {challenges.map((challenge) => (
            <option key={challenge.id} value={challenge.id}>
              {challenge.title} - {challenge.points} points
            </option>
          ))}
        </select>

        <div className="mt-4">
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setFile(e.target.files ? e.target.files[0] : null)
            }
            className="w-full rounded-xl border bg-white px-4 py-3"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={uploading}
          className="mt-4 w-full rounded-xl bg-stone-900 text-white py-3 text-lg font-semibold disabled:opacity-50"
        >
          {uploading ? "Submitting..." : "Submit Challenge"}
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