import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex flex-wrap justify-between items-center gap-4 px-6 py-5 md:px-10">

      <Link href="/" className="text-2xl font-bold">StyleLoop</Link>

      <div className="flex flex-wrap items-center gap-4 text-sm md:gap-6 md:text-base">

        <Link href="/explore">Explore</Link>

        <Link href="/collections">Collections</Link>

        <Link href="/marketplace">Marketplace</Link>

        <Link href="/cart">Cart</Link>

        <Link href="/feed">Feed</Link>

        <Link href="/profile">Profile</Link>

        <Link href="/login" className="rounded-lg border border-white/40 px-3 py-1.5 hover:bg-white hover:text-black">Login</Link>

      </div>

    </nav>
  );
}
