import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Youtube } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="relative bg-ink text-cream pt-24 pb-10 overflow-hidden">
      <div className="absolute inset-x-0 top-0 gold-line" />
      <div className="absolute -top-40 -right-20 h-96 w-96 rounded-full blur-3xl opacity-20"
        style={{ background: "var(--gradient-gold)" }} />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 grid gap-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <h3 className="font-display text-4xl tracking-[0.2em]">
            LUMI<span className="text-gradient-gold">È</span>RE
          </h3>
          <p className="mt-6 max-w-sm text-sm text-cream/70 leading-relaxed">
            Maison de beauté, founded in Paris. Artisanal formulas, cinematic
            color, and a confidence that lingers long after the last brushstroke.
          </p>
          <div className="mt-8 flex gap-4">
            {[Instagram, Facebook, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="h-10 w-10 rounded-full border border-cream/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-[10px] uppercase tracking-[0.3em] text-gold mb-5">
            Maison
          </h4>
          <ul className="space-y-3 text-sm text-cream/70">
            <li><Link to="/about" className="hover:text-gold">Our Atelier</Link></li>
            <li><Link to="/shop" className="hover:text-gold">Collections</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Concierge</Link></li>
            <li><a href="#" className="hover:text-gold">Sustainability</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] uppercase tracking-[0.3em] text-gold mb-5">
            Stay close
          </h4>
          <p className="text-sm text-cream/70 mb-4">
            Private invitations, new collections, rituals.
          </p>
          <form className="flex border-b border-cream/30 focus-within:border-gold transition-colors">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 bg-transparent py-3 text-sm placeholder:text-cream/40 focus:outline-none"
            />
            <button className="text-[10px] uppercase tracking-[0.3em] text-gold hover:text-cream">
              Join →
            </button>
          </form>
        </div>
      </div>

      <div className="relative mt-20 pt-8 border-t border-cream/10 mx-auto max-w-7xl px-6 lg:px-10 flex flex-col md:flex-row gap-4 justify-between text-[11px] tracking-[0.2em] uppercase text-cream/40">
        <span>© 2026 Lumière Maison · Paris</span>
        <span>Crafted with intention</span>
      </div>
    </footer>
  );
}
