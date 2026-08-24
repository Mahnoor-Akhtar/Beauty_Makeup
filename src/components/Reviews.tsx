import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Camille R.",
    role: "Vogue Paris contributor",
    rating: 5,
    text: "I have worn every prestige lipstick made in the last decade. Velours Rouge is the first that genuinely surprised me. The wear, the finish, the weight of the bullet — it's couture.",
  },
  {
    name: "Anaïs D.",
    role: "Verified client",
    rating: 5,
    text: "The Crème Éternelle changed my morning. Three weeks in and my skin has a quiet glow that no serum has ever given me. Worth every euro.",
  },
  {
    name: "Sofia L.",
    role: "Verified client",
    rating: 5,
    text: "Lumière feels like a love letter to women who take their beauty seriously. Every detail — the box, the click of the lid, the scent — is intentional.",
  },
  {
    name: "Mira K.",
    role: "Beauty editor, Numéro",
    rating: 5,
    text: "Finally, a French maison that doesn't lean on heritage as a crutch. The pigments are calibrated like nothing else I've tested this year.",
  },
];

export function Reviews() {
  return (
    <section className="py-32 md:py-44 bg-blush/50 grain overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="text-center mb-20">
          <p className="text-[10px] uppercase tracking-[0.5em] text-rose">
            — Whispered, never shouted
          </p>
          <h2 className="mt-6 font-display text-5xl md:text-7xl text-ink leading-[1] text-balance">
            What women are <span className="italic text-gradient-gold">saying.</span>
          </h2>
          <div className="mt-8 mx-auto w-16 gold-line" />
          <div className="mt-10 flex items-center justify-center gap-2 text-gold">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-current" />
            ))}
            <span className="ml-3 text-sm uppercase tracking-[0.25em] text-ink/70">
              4.9 · 2,847 reviews
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-7">
          {reviews.map((r, i) => (
            <article
              key={r.name}
              className={`group relative bg-cream rounded-sm p-10 md:p-12 shadow-soft hover:shadow-luxe transition-all duration-700 ${
                i % 2 === 1 ? "md:translate-y-10" : ""
              }`}
            >
              <Quote
                className="absolute top-8 right-8 h-12 w-12 text-gold/20"
                strokeWidth={1}
              />
              <div className="flex gap-1 text-gold mb-6">
                {Array.from({ length: r.rating }).map((_, k) => (
                  <Star key={k} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <p className="font-display text-xl md:text-2xl italic text-ink/85 leading-snug">
                "{r.text}"
              </p>
              <div className="mt-8 pt-6 border-t border-ink/10 flex items-center gap-4">
                <div className="h-10 w-10 rounded-full gradient-gold flex items-center justify-center font-display text-ink text-lg">
                  {r.name[0]}
                </div>
                <div>
                  <p className="font-display text-lg text-ink leading-none">
                    {r.name}
                  </p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-rose">
                    {r.role}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
