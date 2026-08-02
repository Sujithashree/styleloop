import Link from "next/link";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center">

      <div className="text-center">

        <h1 className="text-7xl font-bold bg-gradient-to-r from-[#9a4e3c] via-[#d77a50] to-[#6f9570] bg-clip-text text-transparent">
  StyleLoop
</h1>

<h2 className="mt-6 text-4xl text-[#6b594a]">
  Discover • Share • Inspire
</h2>

        <div className="mt-10 flex justify-center gap-6">

          <Link href="/register" className="bg-[#9b4d70] !text-white rounded-xl px-6 py-3 shadow-lg shadow-pink-200">
            Get Started
          </Link>

          <Link href="/explore" className="border border-[#8b6b51] rounded-xl px-6 py-3 text-[#563f32]">
            Explore
          </Link>

        </div>

      </div>

    </section>
  );
}
