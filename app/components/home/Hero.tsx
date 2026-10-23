import Image from "next/image";
import Link from "next/link";

const collections = [
  {
    title: "Men's edit",
    detail: "Everyday layers, made sharper",
    href: "/men",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1000&q=85",
    alt: "Man wearing a tailored dark suit",
  },
  {
    title: "Women's edit",
    detail: "New-season looks to love",
    href: "/women",
    image:
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=85",
    alt: "Woman wearing a refined blue coat and dress",
  },
];

export default function Hero() {
  return (
    <section className="px-6 py-14 md:px-10 md:py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="text-center lg:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#a9503d]">
            Your style, on loop
          </p>
          <h1 className="mt-4 bg-gradient-to-r from-[#9a4e3c] via-[#d77a50] to-[#6f9570] bg-clip-text text-6xl font-bold text-transparent md:text-7xl">
            StyleLoop
          </h1>
          <h2 className="mt-5 text-3xl font-semibold text-[#6b594a] md:text-4xl">
            Discover. Share. Inspire.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-[#6f6257] lg:mx-0">
            Find fresh outfit ideas for every day, from thoughtful everyday
            looks to dresses made for a moment.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
            <Link
              href="/register"
              className="rounded-xl bg-[#a9503d] px-6 py-3 font-semibold !text-[#fffaf4] shadow-lg transition hover:-translate-y-0.5"
            >
              Get Started
            </Link>
            <Link
              href="/explore"
              className="rounded-xl border border-[#8b6b51] px-6 py-3 font-semibold text-[#563f32] transition hover:bg-[#f8e6d2]"
            >
              Explore styles
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-6">
          {collections.map((collection) => (
            <Link
              key={collection.title}
              href={collection.href}
              className="group relative isolate aspect-[4/5] overflow-hidden rounded-2xl shadow-xl shadow-[#604b38]/15"
            >
              <Image
                src={collection.image}
                alt={collection.alt}
                fill
                priority
                sizes="(max-width: 768px) 45vw, 28vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#22170f]/75 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] !text-[#fffaf4] sm:text-sm">
                  {collection.detail}
                </p>
                <h3 className="mt-2 text-xl font-bold !text-[#fffaf4] sm:text-2xl">
                  {collection.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
