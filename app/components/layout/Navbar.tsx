export default function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-white/5 backdrop-blur-xl">

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-8">

        <h1 className="font-[family:var(--font-bodoni)] bg-gradient-to-r from-pink-400 via-violet-300 to-cyan-300 bg-clip-text text-4xl font-bold tracking-wide text-transparent">
       Aurevia
       </h1>

        <div className="flex gap-4">

          <button className="rounded-lg px-5 py-2 text-white hover:bg-white/10">
            Login
          </button>

          <button className="rounded-xl bg-white px-6 py-2 font-semibold text-black transition hover:scale-105">
            Join
          </button>

        </div>

      </div>

    </nav>
  );
}