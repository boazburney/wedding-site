"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function AdvicePage() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!message) return;

    const { error } = await supabase.from("advice").insert([
      {
        name,
        message,
      },
    ]);

    if (error) {
      console.error(error);
      alert("Error submitting advice.");
      return;
    }

    setSubmitted(true);
    setName("");
    setMessage("");
  }

  return (
    <main
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "40px 20px",
        textAlign: "center",
      }}
    >
      <h1>Give Advice to the Couple</h1>

      <p style={{ marginBottom: "30px" }}>
        Leave us your best marriage advice, life advice, or a funny message for
        the future.
      </p>

      {submitted ? (
        <div>
          <h2>Thank you!</h2>
          <p>Your advice has been submitted.</p>

          <button
            onClick={() => setSubmitted(false)}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              cursor: "pointer",
            }}
          >
            Submit Another
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <input
            type="text"
            placeholder="Your Name (Optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              padding: "12px",
              fontSize: "16px",
            }}
          />

          <textarea
            placeholder="Write your advice here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={6}
            style={{
              padding: "12px",
              fontSize: "16px",
              resize: "vertical",
            }}
          />

          <button
            type="submit"
            style={{
              padding: "12px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Submit Advice
          </button>
        </form>
      )}

      <div style={{ marginTop: "40px" }}>
        <a href="/">Back to Home</a>
      </div>
    </main>
  );
}