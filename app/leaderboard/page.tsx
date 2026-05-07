"use client";

import { useEffect, useState } from "react";
import { getLeaderboard } from "../lib/leaderboard";

type Score = {
  id: number;
  name: string;
  score: number;
};

export default function LeaderboardPage() {
  const [scores, setScores] = useState<Score[]>([]);

  useEffect(() => {
    async function loadScores() {
      const data = await getLeaderboard();
      setScores(data || []);
    }

    loadScores();
  }, []);

  return (
    <main className="min-h-screen bg-stone-100 px-6 py-12 text-stone-900">
      <section className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow">
        <h1 className="text-4xl font-bold text-center">
          Live Leaderboard
        </h1>

        <p className="mt-3 text-center text-stone-600">
          Scavenger Hunt Rankings
        </p>

        <div className="mt-8 space-y-4">
          {scores.map((player, index) => (
            <div
              key={player.id}
              className="flex items-center justify-between rounded-xl bg-stone-100 px-5 py-4"
            >
              <div>
                <p className="font-semibold">
                  #{index + 1} • {player.name}
                </p>
              </div>

              <p className="text-lg font-bold">
                {player.score} pts
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a href="/" className="text-sm underline">
            Back to Home
          </a>
        </div>
      </section>
    </main>
  );
}