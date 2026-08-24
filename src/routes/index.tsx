import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { LuxButton } from "@/components/LuxButton";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";
import { Reviews } from "@/components/Reviews";
import { ContactCTA } from "@/components/ContactCTA";
import lipstickVideo from "@/assets/Lipstick.mp4";
import blushVideo from "@/assets/Blush.mp4";
import makeupVideo from "@/assets/Makeup.mp4";

const heroVideo = { url: "/videos/hero-kit.mp4" };
const LIPSTICK_END_TRIM_SECONDS = 2;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lumière — Maison de Beauté · Cinematic Luxury Makeup" },
      {
        name: "description",
        content:
          "Lumière is a Parisian beauty maison crafting cinematic, luxurious makeup. Velvet lipsticks, eternal creams, and golden palettes for the modern woman.",
      },
      { property: "og:title", content: "Lumière — Maison de Beauté" },
      {
        property: "og:description",
        content: "Cinematic luxury makeup, founded in Paris.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const heroSectionRef = useRef<HTMLElement | null>(null);
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);
  const wasHeroVisibleRef = useRef(false);

  useEffect(() => {
    const sectionEl = heroSectionRef.current;
    const videoEl = heroVideoRef.current;

    if (!sectionEl || !videoEl) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry?.isIntersecting ?? false;

        if (isVisible && !wasHeroVisibleRef.current) {
          videoEl.currentTime = 0;
          void videoEl.play().catch(() => {
            // Ignore autoplay rejection when browser policies block playback.
          });
        }

        wasHeroVisibleRef.current = isVisible;
      },
      { threshold: 0.55 },
    );

    observer.observe(sectionEl);

    return () => observer.disconnect();
  }, []);

  const handleLipstickTimeUpdate = (event: React.SyntheticEvent<HTMLVideoElement>) => {
    const videoEl = event.currentTarget;

    if (!Number.isFinite(videoEl.duration) || videoEl.duration <= LIPSTICK_END_TRIM_SECONDS) {
      return;
    }

    const loopCutoff = videoEl.duration - LIPSTICK_END_TRIM_SECONDS;

    if (videoEl.currentTime >= loopCutoff) {
      videoEl.currentTime = 0;
      void videoEl.play().catch(() => {
        // Ignore autoplay rejection when browser policies block playback.
      });
    }
  };

  return (
    <SiteLayout>
      {/* HERO — pure cinematic video, plays once */}
      <section ref={heroSectionRef} className="relative h-screen min-h-[640px] w-full overflow-hidden bg-ink">
        <video
          ref={heroVideoRef}
          src={heroVideo.url}
          autoPlay
          muted
          playsInline
          preload="auto"
          className="video-smooth absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, oklch(0.985 0.008 30) 100%)",
          }}
        />
        <div className="absolute bottom-10 right-10 hidden md:flex items-center gap-3 text-cream/80 text-[10px] uppercase tracking-[0.4em]">
          <Sparkles className="h-3 w-3 text-gold pulse-glow rounded-full" />
          Scroll to explore
        </div>
      </section>

      {/* EDITORIAL INTRO */}
      <section className="py-24 md:py-32 grain">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 text-center">
          <p className="text-[10px] uppercase tracking-[0.5em] text-rose">
            — Chapter One
          </p>
          <h2 className="mt-8 font-display text-5xl md:text-7xl text-balance leading-[1.05] text-ink">
            Beauty as a{" "}
            <span className="italic text-gradient-gold">cinematic</span>
            <br />
            act of devotion.
          </h2>
          <div className="mt-10 mx-auto w-16 gold-line" />
          <p className="mt-10 text-lg text-ink/65 leading-relaxed max-w-2xl mx-auto font-light">
            Each formula is composed like a film score — layered, deliberate,
            unforgettable. Pigments are refined for months. Textures are
            sculpted by hand. The result: makeup that feels less like cosmetics
            and more like ceremony.
          </p>
        </div>
      </section>

      {/* LIPSTICK CINEMATIC */}
      <section className="relative">
        <div className="grid lg:grid-cols-12 gap-0">
          <div className="lg:col-span-7 lg:ml-3 relative aspect-video lg:aspect-auto lg:min-h-[640px] overflow-hidden">
            <video
              src={lipstickVideo}
              autoPlay
              muted
              playsInline
              preload="auto"
              onTimeUpdate={handleLipstickTimeUpdate}
              className="video-smooth absolute inset-0 h-full w-full object-cover object-center md:object-[50%_38%]"
            />
          </div>
          <div className="lg:col-span-5 bg-blush flex items-center px-8 lg:pl-24 lg:pr-16 py-20">
            <div>
              <p className="text-[10px] uppercase tracking-[0.5em] text-rose">
                The Lip Edit
              </p>
              <h2 className="mt-6 font-display text-5xl md:text-6xl text-ink leading-[1.05]">
                Velours
                <br />
                <span className="italic">Rouge</span>
              </h2>
              <div className="mt-6 w-12 gold-line" />
              <p className="mt-8 text-base text-ink/70 leading-relaxed font-light">
                Six hours of wear. Twelve grams of pigment per bullet. A satin
                finish that shifts with the light — built to be photographed,
                made to be remembered.
              </p>
              <div className="mt-10 flex items-center gap-6">
                <Link to="/shop" search={{ category: "All" }}>
                  <LuxButton variant="outline">Shop the lip</LuxButton>
                </Link>
                <span className="font-display text-2xl text-ink">€48</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BLUSH CINEMATIC */}
      <section className="relative py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <p className="text-[10px] uppercase tracking-[0.5em] text-rose">Atelier Flush</p>
            <h2 className="mt-5 font-display text-5xl md:text-6xl leading-[1.05] text-ink">
              Nuage
              <br />
              <span className="italic text-gradient-gold">Blush</span>
            </h2>
            <div className="mt-6 w-12 gold-line" />
            <p className="mt-8 text-base text-ink/70 leading-relaxed font-light max-w-md">
              A cloud-light veil of color that melts into skin. Silky diffusion,
              cinematic glow, and a soft-focus finish designed for daylight and flash.
            </p>
            <div className="mt-10">
              <Link to="/shop" search={{ category: "Blushes" }}>
                <LuxButton variant="outline">Discover blushes</LuxButton>
              </Link>
            </div>
          </div>
          <div className="lg:col-span-7 order-1 lg:order-2 relative aspect-video overflow-hidden rounded-sm shadow-luxe">
            <video
              src={blushVideo}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="video-smooth absolute inset-0 h-full w-full object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            <div>
              <p className="text-[10px] uppercase tracking-[0.5em] text-rose">
                The Collection
              </p>
              <h2 className="mt-6 font-display text-5xl md:text-6xl text-ink leading-[1] text-balance">
                Six pieces.
                <br />
                <span className="italic text-gradient-gold">Infinite rituals.</span>
              </h2>
            </div>
            <Link
              to="/shop"
              search={{ category: "All" }}
              className="group inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-ink hover:text-rose transition-colors"
            >
              View all
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {products.slice(0, 6).map((p) => (
              <ProductCard key={p.id} {...p} />
            ))}
          </div>
        </div>
      </section>

      {/* MAKEUP CINEMATIC */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="relative aspect-video rounded-sm overflow-hidden shadow-luxe">
            <video
              src={makeupVideo}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="video-smooth absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-ink/50 via-ink/10 to-transparent" />
            <div className="absolute left-6 bottom-6 md:left-10 md:bottom-10 text-cream">
              <p className="text-[10px] uppercase tracking-[0.45em] text-gold">Makeup Atelier</p>
              <h2 className="mt-3 font-display text-4xl md:text-5xl leading-none">
                Lumière
                <span className="italic text-gradient-gold"> Makeup</span>
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-[10px] uppercase tracking-[0.5em] text-rose mb-10">
            — Vogue Paris
          </p>
          <blockquote className="font-display text-3xl md:text-5xl italic text-ink leading-tight text-balance">
            "Lumière doesn't sell makeup. It sells the seven seconds before you
            walk into a room and{" "}
            <span className="text-gradient-gold not-italic">change it.</span>"
          </blockquote>
        </div>
      </section>

      <Reviews />
      <ContactCTA />
    </SiteLayout>
  );
}
