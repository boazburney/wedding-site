export default function Story() {
  return (
    <main className="min-h-screen bg-stone-100 text-stone-900 px-6 py-12">
      <section className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold">Our Story</h1>

        <p className="mt-6 text-lg text-stone-700">
          Every great story starts somewhere…
        </p>

        {/* SECTION 1 */}
        <div className="mt-10 text-left space-y-4">
          <h2 className="text-2xl font-semibold">How We Met</h2>
          <p>
            Replace this with your real story. Talk about how you met, what your
            first impression was, and anything funny or memorable from that time.
          </p>
        </div>

        {/* SECTION 2 */}
        <div className="mt-10 text-left space-y-4">
          <h2 className="text-2xl font-semibold">The Journey</h2>
          <p>
            Add milestones here. Trips, big moments, challenges, or things that
            made your relationship grow.
          </p>
        </div>

        {/* SECTION 3 */}
        <div className="mt-10 text-left space-y-4">
          <h2 className="text-2xl font-semibold">The Proposal</h2>
          <p>
            Tell the proposal story. Where it happened, who cried, who knew
            beforehand, and any funny details.
          </p>
        </div>

        {/* SECTION 4 */}
        <div className="mt-10 text-left space-y-4">
          <h2 className="text-2xl font-semibold">Today</h2>
          <p>
            Wrap it up. Why you're excited, what this day means, and a short note
            to your guests.
          </p>
        </div>

        {/* BACK BUTTON */}
        <div className="mt-12">
          <a href="/" className="text-sm underline">
            Back to Home
          </a>
        </div>
      </section>
    </main>
  );
}