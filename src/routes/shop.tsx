import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ProductCard } from "@/components/ProductCard";
import { blushProducts, products } from "@/lib/products";

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>) => ({
    category: typeof search.category === "string" ? search.category : "All",
  }),
  head: () => ({
    meta: [
      { title: "Shop the Collection — Lumière Maison" },
      {
        name: "description",
        content:
          "Discover Lumière's full collection of luxury makeup and skincare. Velvet lipsticks, gold palettes, eternal creams — handcrafted in Paris.",
      },
      { property: "og:title", content: "Shop — Lumière Maison" },
      {
        property: "og:description",
        content: "Luxury cinematic makeup, handcrafted in Paris.",
      },
    ],
  }),
  component: ShopPage,
});

const categories = ["All", "Lipstick", "Skincare", "Eyes", "Fragrance", "Blushes"];

function ShopPage() {
  const { category } = Route.useSearch();
  const allProducts = [...products, ...blushProducts];
  const filteredProducts = category === "All"
    ? allProducts
    : allProducts.filter((p) => p.category === category);

  return (
    <SiteLayout>
      <section className="pt-40 pb-16 grain">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 text-center">
          <p className="text-[10px] uppercase tracking-[0.5em] text-rose">
            — The Collection
          </p>
          <h1 className="mt-6 font-display text-6xl md:text-8xl text-ink leading-[1] text-balance">
            Maison
            <br />
            <span className="italic text-gradient-gold">Lumière</span>
          </h1>
          <div className="mt-8 mx-auto w-16 gold-line" />
          <p className="mt-8 max-w-xl mx-auto text-ink/65 font-light text-lg">
            Twelve pieces. Composed in Paris. Built for the woman who arrives
            knowing.
          </p>

          <div className="mt-14 flex flex-wrap items-center justify-center gap-3">
            {categories.map((c) => (
              <Link
                key={c}
                to="/shop"
                search={{ category: c }}
                className={`px-6 py-2.5 rounded-full text-[10px] uppercase tracking-[0.3em] transition-all ${
                  category === c
                    ? "bg-ink text-cream"
                    : "border border-ink/20 text-ink/60 hover:border-ink hover:text-ink"
                }`}
              >
                {c}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} {...p} />
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
