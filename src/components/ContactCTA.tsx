import { Link } from "@tanstack/react-router";
import { Mail, MapPin, ArrowRight } from "lucide-react";
import { LuxButton } from "./LuxButton";

export function ContactCTA() {
  return (
    <section className="relative py-32 md:py-40 bg-ink text-cream overflow-hidden">
      {/* glowing orb */}
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full blur-3xl opacity-30 pointer-events-none"
        style={{ background: "var(--gradient-gold)" }}
      />
      <div
        className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: "var(--gradient-blush)" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-12 gap-16 items-center">
        <div className="lg:col-span-7">
          <p className="text-[10px] uppercase tracking-[0.5em] text-gold">
            — Private Concierge
          </p>
          <h2 className="mt-6 font-display text-5xl md:text-7xl leading-[1] text-balance">
            A real human,
            <br />
            <span className="italic text-gradient-gold">at your service.</span>
          </h2>
          <p className="mt-8 max-w-lg text-cream/70 text-lg font-light leading-relaxed">
            Shade matching, gifting, atelier visits, custom rituals — write to
            our concierge and receive a personal response within 24 hours.
          </p>
          <div className="mt-12 flex flex-wrap items-center gap-6">
            <Link to="/contact">
              <LuxButton>
                Speak with the concierge <ArrowRight className="h-4 w-4" />
              </LuxButton>
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <a
            href="mailto:concierge@lumiere-maison.fr"
            className="group block bg-cream/[0.04] border border-cream/10 hover:border-gold/40 backdrop-blur-sm rounded-sm p-8 transition-all duration-500 hover:translate-x-2"
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="h-10 w-10 rounded-full border border-gold/40 flex items-center justify-center text-gold">
                <Mail className="h-4 w-4" />
              </span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-gold">
                Concierge
              </span>
            </div>
            <p className="font-display text-2xl text-cream group-hover:text-gold transition-colors">
              concierge@lumiere-maison.fr
            </p>
          </a>

          <div className="bg-cream/[0.04] border border-cream/10 backdrop-blur-sm rounded-sm p-8">
            <div className="flex items-center gap-4 mb-4">
              <span className="h-10 w-10 rounded-full border border-gold/40 flex items-center justify-center text-gold">
                <MapPin className="h-4 w-4" />
              </span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-gold">
                Atelier
              </span>
            </div>
            <p className="font-display text-2xl text-cream leading-snug">
              12 Rue des Rosiers
              <br />
              <span className="italic">Paris, France</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
