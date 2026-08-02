export default function CTA() {
  return (
    <section className="bg-gradient-to-r from-[#dba275] via-[#d8b278] to-[#aac49d] py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-5xl font-bold !text-[#3f342b]">
  Join the StyleLoop Community
</h2>

<p className="mt-6 text-xl !text-[#5f4e40]">
  Share your outfits, discover new trends, and get AI-powered fashion recommendations.
</p>

        <div className="mt-10 flex justify-center gap-6 flex-wrap">
          <Link href="/register" className="bg-[#a8513d] !text-[#fff3e5] px-8 py-4 rounded-xl font-semibold hover:scale-105 transition shadow-xl shadow-black/20">
            Get Started
          </Link>

          <Link href="/collections" className="border !border-[#5f4e40] !text-[#3f342b] px-8 py-4 rounded-xl hover:bg-[#f8e6d2] transition">
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}
import Link from "next/link";
