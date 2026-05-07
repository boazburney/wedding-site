"use client";

export default function HomePage() {
  return (
    <main
      style={{
        maxWidth: "700px",
        margin: "0 auto",
        padding: "40px 20px",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontSize: "48px",
          fontWeight: "bold",
          lineHeight: "1.1",
          marginBottom: "10px",
        }}
      >
        Welcome to the Wedding of
        <br />
        Megan & Boaz
      </h1>

      <p
        style={{
          marginBottom: "40px",
          color: "#666",
        }}
      >
        Scan, explore, and enjoy the celebration.
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <a
          href="/seating"
          style={buttonStyleDark}
        >
          Find My Seat
        </a>

        <a
          href="/story"
          style={buttonStyle}
        >
          Our Story
        </a>

        <a
          href="/advice"
          style={buttonStyle}
        >
          Give Advice to the Couple
        </a>

        <a
          href="/photos"
          style={buttonStyle}
        >
          Upload Photos
        </a>

        <a
          href="/scavenger"
          style={buttonStyle}
        >
          Scavenger Hunt
        </a>

        <a
          href="/leaderboard"
          style={buttonStyle}
        >
          Live Leaderboard
        </a>
      </div>
    </main>
  );
}

const buttonStyle: React.CSSProperties = {
  display: "block",
  padding: "16px",
  borderRadius: "14px",
  backgroundColor: "#ffffff",
  color: "#000000",
  textDecoration: "none",
  fontWeight: "600",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
};

const buttonStyleDark: React.CSSProperties = {
  ...buttonStyle,
  backgroundColor: "#1f1815",
  color: "#ffffff",
};