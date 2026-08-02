const features = [
  {
  title: "Smart AI Styling",
  description: "Receive personalized outfit recommendations based on your unique style.",
  icon: "🤖",
},
  {
    title: "Share Your Style",
    description: "Upload your outfits and inspire the community.",
    icon: "👗",
  },
  {
    title: "Fashion Community",
    description: "Follow creators, like posts, and discover new trends.",
    icon: "❤️",
  },
];

export default function Features() {
  return (
    <section className="bg-black py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-white">
          Why Choose Aurevia?
        </h2>

        <p className="text-center text-gray-400 mt-4">
          Everything you need to discover, create, and share fashion.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-14">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-zinc-900 rounded-2xl p-8 hover:bg-zinc-800 transition"
            >
              <div className="text-5xl">{feature.icon}</div>

              <h3 className="text-2xl font-semibold text-white mt-6">
                {feature.title}
              </h3>

              <p className="text-gray-400 mt-4">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}