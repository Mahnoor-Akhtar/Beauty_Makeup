import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { LuxButton } from "@/components/LuxButton";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Concierge — Contact Lumière Maison" },
      {
        name: "description",
        content:
          "Speak with the Lumière concierge. Personal beauty consultations, press inquiries, and visits to the Paris atelier.",
      },
      { property: "og:title", content: "Concierge — Lumière" },
      {
        property: "og:description",
        content: "Personal beauty concierge from our Paris atelier.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <SiteLayout>
      <section className="pt-40 pb-16 grain">
        <div className="mx-auto max-w-4xl px-6 lg:px-10 text-center">
          <p className="text-[10px] uppercase tracking-[0.5em] text-rose">
            — Concierge
          </p>
          <h1 className="mt-6 font-display text-6xl md:text-8xl text-ink leading-[1] text-balance">
            We listen
            <br />
            <span className="italic text-gradient-gold">closely.</span>
          </h1>
          <div className="mt-8 mx-auto w-16 gold-line" />
          <p className="mt-8 max-w-xl mx-auto text-ink/65 font-light text-lg">
            For private consultations, press, partnerships, or simply to find
            your perfect shade — write to us. A real human responds within 24
            hours.
          </p>
        </div>
      </section>

      <section className="pb-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-10 grid lg:grid-cols-5 gap-12">
          {/* Form */}
          <div className="lg:col-span-3 bg-cream rounded-sm shadow-soft p-10 md:p-14">
            <h2 className="font-display text-3xl text-ink mb-8">
              Write to the maison
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="space-y-7"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <Field label="First name" name="firstName" />
                <Field label="Last name" name="lastName" />
              </div>
              <Field label="Email" name="email" type="email" />
              <Field label="Subject" name="subject" />
              <div>
                <label className="text-[10px] uppercase tracking-[0.3em] text-ink/60">
                  Message
                </label>
                <textarea
                  rows={5}
                  required
                  className="mt-2 w-full bg-transparent border-b border-ink/20 focus:border-gold py-3 text-ink placeholder:text-ink/30 focus:outline-none transition-colors resize-none"
                  placeholder="Tell us what you're looking for…"
                />
              </div>

              {sent ? (
                <p className="text-rose font-display text-lg italic">
                  Thank you. The concierge will respond shortly.
                </p>
              ) : (
                <LuxButton type="submit">
                  Send message <Send className="h-4 w-4" />
                </LuxButton>
              )}
            </form>
          </div>

          {/* Info */}
          <div className="lg:col-span-2 space-y-10">
            <Info
              icon={<MapPin className="h-4 w-4" />}
              label="Atelier"
              lines={["12 Rue des Rosiers", "75004 Paris, France"]}
            />
            <Info
              icon={<Mail className="h-4 w-4" />}
              label="Email"
              lines={["concierge@lumiere-maison.fr"]}
            />
            <Info
              icon={<Phone className="h-4 w-4" />}
              label="Téléphone"
              lines={["+33 1 42 76 88 00", "Tue – Sat · 11h – 19h"]}
            />
            <div className="pt-8 border-t border-ink/10">
              <p className="text-[10px] uppercase tracking-[0.3em] text-rose mb-3">
                Press
              </p>
              <p className="text-ink/70 font-light">
                For interviews and editorial features:{" "}
                <a href="#" className="text-ink underline underline-offset-4 decoration-gold">
                  press@lumiere-maison.fr
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Field({
  label,
  name,
  type = "text",
}: {
  label: string;
  name: string;
  type?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-[10px] uppercase tracking-[0.3em] text-ink/60">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        className="mt-2 w-full bg-transparent border-b border-ink/20 focus:border-gold py-3 text-ink placeholder:text-ink/30 focus:outline-none transition-colors"
      />
    </div>
  );
}

function Info({
  icon,
  label,
  lines,
}: {
  icon: React.ReactNode;
  label: string;
  lines: string[];
}) {
  return (
    <div>
      <div className="flex items-center gap-3 text-rose mb-3">
        <span className="h-8 w-8 rounded-full border border-rose/30 flex items-center justify-center">
          {icon}
        </span>
        <span className="text-[10px] uppercase tracking-[0.3em]">{label}</span>
      </div>
      {lines.map((l) => (
        <p key={l} className="text-ink/75 font-light leading-relaxed">
          {l}
        </p>
      ))}
    </div>
  );
}
