export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center px-6">

      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

      <div className="relative z-10 text-center">
        <h1 className="font-[family:var(--font-bodoni)] text-7xl font-bold tracking-wide md:text-9xl">
       Aurevia
       </h1>

    

        <h2 className="mt-4 bg-gradient-to-r from-pink-400 via-violet-300 to-cyan-300 bg-clip-text text-4xl font-bold text-transparent md:text-6xl">
          Fashion Meets AI
        </h2>

        <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-zinc-200 md:text-xl">
          Share outfits, discover trends, connect with creators,
          and receive AI-powered style recommendations.
        </p>

        <div className="mt-12 flex justify-center gap-6">

          <button className="rounded-xl bg-white px-8 py-4 font-semibold text-black transition hover:scale-105">
            Get Started
          </button>

          <button className="rounded-xl border border-white/40 bg-white/10 px-8 py-4 backdrop-blur-lg transition hover:bg-white/20">
            Explore
          </button>

        </div>

      </div>

    </section>
  );
}