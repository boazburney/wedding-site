export default function Home() {
  return (
    <main className="min-h-screen bg-stone-100 text-stone-900 px-6 py-12">
      <section className="mx-auto max-w-3xl text-center">

        <h1 className="text-5xl font-bold tracking-tight">
          Welcome to the Wedding of
          <br />
          Megan &amp; Boaz
        </h1>

        <p className="mt-4 text-lg text-stone-700">
          Scan, explore, and enjoy the celebration.
        </p>

        <div className="mt-10 grid gap-4">

          <a
            href="/seating"
            className="rounded-2xl bg-stone-900 px-6 py-4 text-white text-lg font-semibold"
          >
            Find My Seat
          </a>

          <a
            href="/story"
            className="rounded-2xl bg-white px-6 py-4 text-lg font-semibold shadow"
          >
            Our Story
          </a>

          <a
            href="/photos"
            className="rounded-2xl bg-white px-6 py-4 text-lg font-semibold shadow"
          >
            Upload Photos
          </a>

          <a
            href="/scavenger"
            className="rounded-2xl bg-white px-6 py-4 text-lg font-semibold shadow"
          >
            Scavenger Hunt
          </a>

          <a
            href="/leaderboard"
            className="rounded-2xl bg-white px-6 py-4 text-lg font-semibold shadow"
          >
            Live Leaderboard
          </a>

        </div>

      </section>
    </main>
  );
}