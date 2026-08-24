import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { LuxButton } from "@/components/LuxButton";
import { ArrowRight } from "lucide-react";
import powder from "@/assets/powder-explosion.jpg";
import brushes from "@/assets/product-brushes.jpg";
import cream from "@/assets/product-cream.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "The Atelier — Lumière Maison de Beauté" },
      {
        name: "description",
        content:
          "Inside Lumière's Parisian atelier — where formulas are composed by hand and beauty is built like cinema.",
      },
      { property: "og:title", content: "The Atelier — Lumière" },
      {
        property: "og:description",
        content: "A Parisian maison crafting cinematic luxury beauty.",
      },
    ],
  }),
  component: AboutPage,
});

const pillars = [
  {
    no: "01",
    title: "Composed by hand",
    text: "Every formula begins on paper, then travels through our Marais atelier where it is mixed, tested, and refined for an average of fourteen months.",
  },
  {
    no: "02",
    title: "Cinematic pigments",
    text: "Color is treated like cinematography. Each shade is calibrated to read true under candlelight, daylight, and the unforgiving glare of a flashbulb.",
  },
  {
    no: "03",
    title: "Slowly, on purpose",
    text: "We release one collection per year. Twelve pieces. No more. The discipline of restraint is what allows luxury to remain luxurious.",
  },
];

function AboutPage() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="pt-40 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 gradient-blush opacity-60" />
        <div className="relative mx-auto max-w-5xl px-6 lg:px-10 text-center">
          <p className="text-[10px] uppercase tracking-[0.5em] text-rose">
            — The Atelier
          </p>
          <h1 className="mt-8 font-display text-6xl md:text-8xl text-ink leading-[1] text-balance">
            Founded in
            <br />
            <span className="italic text-gradient-gold">Paris, 2018.</span>
          </h1>
          <div className="mt-10 mx-auto w-16 gold-line" />
          <p className="mt-10 max-w-2xl mx-auto text-lg text-ink/70 leading-relaxed font-light">
            Lumière began as a single lipstick mixed in a sixth-floor apartment
            in the Marais. Today, it is a maison — but the obsession with the
            single, perfect bullet has not changed.
          </p>
        </div>
      </section>

      {/* Editorial split */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[4/5] rounded-sm overflow-hidden shadow-luxe">
            <img
              src={brushes}
              alt="Lumière atelier brushes"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.5em] text-rose">
              The Founder
            </p>
            <h2 className="mt-6 font-display text-5xl md:text-6xl text-ink leading-[1.05]">
              Élise
              <br />
              <span className="italic">Marchand</span>
            </h2>
            <div className="mt-6 w-12 gold-line" />
            <p className="mt-8 text-ink/70 leading-relaxed font-light text-lg">
              Trained at Guerlain, raised in Provence, restless by nature.
              Élise founded Lumière after a decade of formulating for other
              maisons — convinced that beauty had become too loud, too fast,
              too eager.
            </p>
            <p className="mt-5 text-ink/70 leading-relaxed font-light text-lg">
              "Luxury is not what you can see," she likes to say. "It is what
              you feel three hours after you've left the room."
            </p>
          </div>
        </div>
      </section>

      {/* Three pillars */}
      <section className="py-24 bg-cream">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="text-center mb-20">
            <p className="text-[10px] uppercase tracking-[0.5em] text-rose">
              — Our Philosophy
            </p>
            <h2 className="mt-6 font-display text-5xl md:text-6xl text-ink text-balance">
              Three quiet <span className="italic text-gradient-gold">obsessions.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {pillars.map((p) => (
              <div key={p.no} className="group">
                <p className="font-display text-7xl text-gradient-gold">{p.no}</p>
                <div className="my-6 w-10 gold-line" />
                <h3 className="font-display text-3xl text-ink mb-4">{p.title}</h3>
                <p className="text-ink/65 leading-relaxed font-light">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Atelier image strip */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid grid-cols-2 gap-4 md:gap-7">
          <div className="aspect-square overflow-hidden rounded-sm shine-sweep">
            <img src={cream} alt="" loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div className="aspect-square overflow-hidden rounded-sm shine-sweep">
            <img src={powder} alt="" loading="lazy" className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="font-display text-5xl md:text-6xl text-ink text-balance">
            Step inside the <span className="italic text-gradient-gold">maison.</span>
          </h2>
          <div className="mt-10">
            <Link to="/shop">
              <LuxButton>
                Explore the collection <ArrowRight className="h-4 w-4" />
              </LuxButton>
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
