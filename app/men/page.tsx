import Image from "next/image";
import Link from "next/link";

const looks = [
  {
    name: "Modern classics",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=900&q=85",
    alt: "Man wearing a tailored dark suit",
  },
  {
    name: "Streetwear",
    image:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=85",
    alt: "Man wearing a relaxed street-style outfit",
  },
  {
    name: "Casual layers",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85",
    alt: "Casual clothing essentials",
  },
];

export default function Men() {
  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 py-12 md:px-10 md:py-16">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#a9503d]">
        The latest looks
      </p>
      <h1 className="mt-3 text-4xl font-bold text-[#3f342b] md:text-5xl">
        Men&apos;s Collection
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-[#6f6257]">
        Easy-to-wear staples and standout pieces to make getting dressed feel
        effortless.
      </p>
      <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {looks.map((look, index) => (
          <article
            key={look.name}
            className="overflow-hidden rounded-3xl border border-[#70533d]/20 bg-[#fffaf4]/70 shadow-lg shadow-[#604b38]/10"
          >
            <div className="relative aspect-[4/5]">
              <Image
                src={look.image}
                alt={look.alt}
                fill
                loading={index === 0 ? "eager" : "lazy"}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
            <h2 className="px-5 py-4 text-xl font-semibold text-[#3f342b]">
              {look.name}
            </h2>
          </article>
        ))}
      </div>
      <Link
        href="/marketplace"
        className="mt-9 inline-block rounded-xl bg-[#a9503d] px-6 py-3 font-semibold !text-[#fffaf4] shadow-lg transition hover:-translate-y-0.5"
      >
        Shop men&apos;s styles
      </Link>
    </main>
  );
}
