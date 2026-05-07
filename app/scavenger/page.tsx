"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";
import { addScore } from "../lib/leaderboard";

type Challenge = {
  id: number;
  title: string;
  points: number;
};

const challenges: Challenge[] = [
  { id: 1, title: "Take a picture with the bride", points: 5 },
  { id: 2, title: "Take a picture with the groom", points: 5 },
  { id: 3, title: "Take a picture with someone that lives outside of Missouri", points: 5 },
  { id: 4, title: "Take a picture with someone wearing blue", points: 5 },
  { id: 5, title: "Find a guest wearing glasses", points: 5 },
  { id: 6, title: "Take a photo with a couple married 20+ years", points: 5 },
  { id: 7, title: "Take a group picture at your table", points: 5 },
  { id: 8, title: "Find someone taller than you", points: 5 },
  { id: 9, title: "Capture the bride dancing", points: 5 },
  { id: 10, title: "Capture the groom dancing", points: 5 },
  { id: 11, title: "Take a photo of someone singing along loudly", points: 5 },
  { id: 12, title: "Take a selfie on the dance floor", points: 5 },
  { id: 13, title: "Capture a picture of your favorite dessert", points: 5 },
  { id: 14, title: "Take a picure playing of a round of mini golf", points: 5 },
  { id: 15, title: "Find the most energetic guest", points: 5 },
  { id: 16, title: "Capture a candid moment between the couple", points: 5 },
  { id: 17, title: "Take a picture with someone who knew the couple before they dated", points: 5 },
  { id: 18, title: 'Take a picture with "LOVE"', points: 5 },

  { id: 19, title: "Find the best mustache/beard", points: 10 },
  { id: 20, title: "Photo of the rings", points: 10 },
  { id: 21, title: "Take a picture with a twin", points: 10 },
  { id: 22, title: "Take a picture the same birth day and month as you or someone on your team", points: 10 },
  { id: 23, title: 'Take a picture of someone wearing "Mahomes" socks', points: 10 },
  { id: 24, title: "Take a picture with a left-handed guest", points: 10 },

  { id: 25, title: "Take a picture with a set of twins", points: 25 },
  { id: 26, title: "Take a picture with an Ace of Hearts", points: 25 },
  { id: 27, title: "Take a picture with the person who played the largest role in the couple meeting", points: 25 },

  { id: 28, title: "Take a picture with a hidden dinosaur toy", points: 50 },
  { id: 29, title: "Take a picture with a hidden LEGO figurine", points: 50 },

  { id: 30, title: "Take a picture with the answer to the riddle found on the hidden QR code", points: 75 },
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

    const challenge = challenges.find(
      (item) => item.id === Number(selectedChallenge)
    );

    if (!challenge) {
      setMessage("Please choose a valid challenge.");
      return;
    }

    setUploading(true);
    setMessage("Submitting...");

    try {
      const cleanTeamName = teamName.trim();

      const { data: existingSubmission, error: checkError } = await supabase
        .from("submissions")
        .select("*")
        .eq("team_name", cleanTeamName)
        .eq("challenge_id", challenge.id);

      if (checkError) {
        throw new Error("Could not check previous submissions.");
      }

      if (existingSubmission && existingSubmission.length > 0) {
        setMessage("This team already completed that challenge.");
        setUploading(false);
        return;
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "wedding_uploads");
      formData.append("folder", "scavenger-submissions");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/di2sfqdey/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) {
        throw new Error("Photo upload failed.");
      }

      const uploadedPhoto = await res.json();

      const { error: insertError } = await supabase
        .from("submissions")
        .insert([
          {
            team_name: cleanTeamName,
            challenge_id: challenge.id,
            challenge_title: challenge.title,
            points: challenge.points,
            photo_url: uploadedPhoto.secure_url,
          },
        ]);

      if (insertError) {
        throw new Error("Could not save submission.");
      }

      await addScore(cleanTeamName, challenge.points);

      setMessage(
        `Submitted! ${cleanTeamName} earned ${challenge.points} points.`
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
          <a href="/leaderboard" className="text-sm underline">
            View Leaderboard
          </a>
        </div>

        <div className="mt-3">
          <a href="/" className="text-sm underline">
            Back to Home
          </a>
        </div>
      </section>
    </main>
  );
}