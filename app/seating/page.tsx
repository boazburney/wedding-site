'use client';

import { useEffect, useState } from "react";

type Guest = {
  name: string;
  table: string;
  group?: string;
};

export default function Seating() {
  const [name, setName] = useState("");
  const [result, setResult] = useState("");
  const [guests, setGuests] = useState<Guest[]>([]);
  const [matches, setMatches] = useState<Guest[]>([]);

  const sheetUrl =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vTdgh-r0U592BPrBKHecgXTZPUr0AqXVSLZin7MMwz8Yo1W_AKwGz11Icat6faz3UYAXEZmwD-uEcYj/pub?gid=700879561&single=true&output=csv";

  useEffect(() => {
    const fetchGuests = async () => {
      const response = await fetch(`${sheetUrl}&cacheBust=${Date.now()}`, {
        cache: "no-store",
      });

      const text = await response.text();
      const rows = text.split("\n").slice(1);

      const parsedGuests = rows
        .map((row) => {
          const columns = row.split(",");

          return {
            name: columns[0]?.trim(),
            table: columns[1]?.trim(),
            group: columns[2]?.trim(),
          };
        })
        .filter((guest) => guest.name && guest.table);

      setGuests(parsedGuests);
    };

    fetchGuests();
  }, []);

  const resetSearch = () => {
    setName("");
    setResult("");
    setMatches([]);
  };

  const showGuestResult = (guest: Guest) => {
    setResult(`${guest.name} is seated at Table ${guest.table}`);
    setMatches([]);
  };

  const handleSearch = () => {
    const searchName = name.toLowerCase().trim();

    if (!searchName) {
      setResult("Please enter your first name.");
      setMatches([]);
      return;
    }

    const foundMatches = guests.filter((guest) => {
      const firstName = guest.name.split(" ")[0].toLowerCase();
      return firstName === searchName;
    });

    if (foundMatches.length === 0) {
      setResult("Name not found. Please check spelling.");
      setMatches([]);
      return;
    }

    if (foundMatches.length === 1) {
      showGuestResult(foundMatches[0]);
      return;
    }

    setResult("Multiple guests found. Please choose your name:");
    setMatches(foundMatches);
  };

  return (
    <main className="min-h-screen bg-stone-100 text-stone-900 px-6 py-10">
      <section className="mx-auto max-w-xl text-center">
        <h1 className="text-4xl font-bold">Find Your Seat</h1>

        <p className="mt-4 text-stone-600">
          Enter your first name to find your table.
        </p>

        <input
          type="text"
          placeholder="Enter your first name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          className="mt-6 w-full rounded-xl border px-4 py-3 text-lg"
        />

        <button
          onClick={handleSearch}
          className="mt-4 w-full rounded-xl bg-stone-900 text-white py-3 text-lg font-semibold"
        >
          Search
        </button>

        {result && (
          <div className="mt-8 rounded-2xl bg-white px-6 py-5 text-2xl font-bold shadow">
            {result}
          </div>
        )}

        {matches.length > 0 && (
          <div className="mt-6 grid gap-3">
            {matches.map((guest, index) => (
              <button
                key={`${guest.name}-${index}`}
                onClick={() => showGuestResult(guest)}
                className="rounded-xl bg-white px-4 py-3 text-lg font-semibold shadow"
              >
                {guest.name}
              </button>
            ))}
          </div>
        )}

        {(result || matches.length > 0) && (
          <button onClick={resetSearch} className="mt-5 text-sm underline">
            Search another name
          </button>
        )}

        <div className="mt-8">
          <a href="/" className="text-sm underline">
            Back to Home
          </a>
        </div>
      </section>
    </main>
  );
}