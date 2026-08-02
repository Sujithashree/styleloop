export default function Men() {
  return (
    <div className="min-h-screen p-10 bg-black text-white">

      <h1 className="text-4xl font-bold">
        Men&apos;s Collection
      </h1>

      <ul className="mt-8 space-y-3 text-pink-200">

        <li>Traditional Wear</li>

        <li>Western Wear</li>

        <li>Formal Wear</li>

        <li>Casual Wear</li>

        <li>Footwear</li>

      </ul>

      <Link href="/marketplace" className="inline-block mt-8 rounded bg-pink-500 px-5 py-3">Shop men&apos;s styles</Link>

    </div>
  );
}
import Link from "next/link";
