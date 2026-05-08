"use client";

export default function HomePage() {
  const buttonStyle = {
    display: "block",
    width: "100%",
    padding: "24px",
    marginBottom: "16px",
    borderRadius: "20px",
    backgroundColor: "#ffffff",
    color: "#2b2824",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "20px",
    textAlign: "center" as const,
    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
    border: "1px solid #e8c8bf",
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "40px 20px",
        backgroundColor: "#f6f2ec",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "72px",
            fontWeight: "bold",
            lineHeight: "1.05",
            marginBottom: "20px",
            color: "#2b2824",
          }}
        >
          Welcome to the Wedding of
          <br />
          Megan &amp; Boaz
        </h1>

        <p
          style={{
            fontSize: "32px",
            marginBottom: "50px",
            color: "#626f5f",
          }}
        >
          Scan, explore, and enjoy the celebration.
        </p>

        <a
          href="/seating"
          style={{
            ...buttonStyle,
            backgroundColor: "#626f5f",
            color: "white",
            border: "1px solid #626f5f",
          }}
        >
          Find My Seat
        </a>

        <a href="/story" style={buttonStyle}>
          Our Story
        </a>

        <a href="/photos" style={buttonStyle}>
          Upload Photos
        </a>

        <a
          href="/scavenger"
          style={{
            ...buttonStyle,
            backgroundColor: "#7f93a6",
            color: "white",
            border: "1px solid #7f93a6",
          }}
        >
          Scavenger Hunt
        </a>

        <a href="/leaderboard" style={buttonStyle}>
          Live Leaderboard
        </a>

        <a
          href="/advice"
          style={{
            ...buttonStyle,
            backgroundColor: "#c18477",
            color: "white",
            border: "1px solid #c18477",
          }}
        >
          Give Advice to the Couple
        </a>
      </div>
    </main>
  );
}