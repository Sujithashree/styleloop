import Link from "next/link";

export default function Collections() {
  return (
    <div className="min-h-screen p-10 bg-black text-white">

      <h1 className="text-4xl font-bold">
        Collections
      </h1>

      <div className="mt-8 space-y-4">

        <Link href="/women" className="block bg-zinc-900 p-5 rounded hover:bg-zinc-800">New Arrivals — Women&apos;s styles</Link>

        <Link href="/men" className="block bg-zinc-900 p-5 rounded hover:bg-zinc-800">Trending — Men&apos;s styles</Link>

        <Link href="/explore" className="block bg-zinc-900 p-5 rounded hover:bg-zinc-800">Seasonal — Explore styles</Link>

      </div>

    </div>
  );
}
