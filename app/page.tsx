import Hero from "./components/home/Hero";
import Features from "./components/home/Features";
import CTA from "./components/home/CTA";

export default function Home() {
  return (
    <main className="bg-black text-white">
      <Hero />
      <Features />
      <CTA />
    </main>
  );
}