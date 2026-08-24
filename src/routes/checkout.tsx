import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { useCart } from "@/hooks/use-cart";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Lumière Maison" },
      {
        name: "description",
        content: "Securely complete your Lumière order with delivery and payment details.",
      },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { items, itemCount, addToCart, decrementFromCart, removeFromCart, clearCart } = useCart();
  const [ordered, setOrdered] = useState(false);

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => {
      const amount = Number(item.price.replace(/[^\d.]/g, "")) || 0;
      return sum + amount * item.quantity;
    }, 0);
  }, [items]);

  const shipping = itemCount > 0 ? 9 : 0;
  const total = subtotal + shipping;

  const onSubmitOrder = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (itemCount === 0) {
      return;
    }

    clearCart();
    setOrdered(true);
  };

  return (
    <SiteLayout>
      <section className="pt-36 pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7">
            <p className="text-[10px] uppercase tracking-[0.45em] text-rose">Checkout</p>
            <h1 className="mt-5 font-display text-5xl md:text-6xl text-ink leading-none">
              Finalize your
              <span className="italic text-gradient-gold"> order</span>
            </h1>

            {ordered ? (
              <div className="mt-10 rounded-2xl border border-gold/40 bg-gold/10 p-6">
                <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Order confirmed</p>
                <h2 className="mt-3 font-display text-3xl text-ink">Merci. Your order is placed.</h2>
                <p className="mt-4 text-ink/70 leading-relaxed">
                  A confirmation email is on its way. Your pieces are being prepared at the atelier.
                </p>
                <Link
                  to="/shop"
                  search={{ category: "All" }}
                  className="mt-6 inline-flex rounded-full border border-ink/20 px-5 py-2 text-[10px] uppercase tracking-[0.22em] text-ink/80 hover:text-ink"
                >
                  Continue shopping
                </Link>
              </div>
            ) : (
              <form className="mt-10 space-y-6" onSubmit={onSubmitOrder}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input required placeholder="First name" className="h-12 rounded-xl border border-ink/15 bg-cream px-4 text-ink" />
                  <input required placeholder="Last name" className="h-12 rounded-xl border border-ink/15 bg-cream px-4 text-ink" />
                </div>
                <input required type="email" placeholder="Email" className="h-12 w-full rounded-xl border border-ink/15 bg-cream px-4 text-ink" />
                <input required placeholder="Address" className="h-12 w-full rounded-xl border border-ink/15 bg-cream px-4 text-ink" />
                <div className="grid sm:grid-cols-3 gap-4">
                  <input required placeholder="City" className="h-12 rounded-xl border border-ink/15 bg-cream px-4 text-ink" />
                  <input required placeholder="Postal code" className="h-12 rounded-xl border border-ink/15 bg-cream px-4 text-ink" />
                  <input required placeholder="Country" className="h-12 rounded-xl border border-ink/15 bg-cream px-4 text-ink" />
                </div>
                <button
                  type="submit"
                  disabled={itemCount === 0}
                  className="w-full rounded-full gradient-gold px-6 py-3 text-[11px] uppercase tracking-[0.24em] text-ink disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Place order
                </button>
              </form>
            )}
          </div>

          <aside className="lg:col-span-5 rounded-2xl border border-ink/10 bg-cream/80 p-6 h-fit">
            <p className="text-[10px] uppercase tracking-[0.35em] text-rose">Order summary</p>
            <div className="mt-6 space-y-4 max-h-96 overflow-y-auto pr-1">
              {items.length === 0 ? (
                <p className="text-sm text-ink/60">Your cart is empty.</p>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="rounded-xl border border-ink/10 p-3 bg-cream">
                    <div className="flex gap-3">
                      <img src={item.image} alt={item.name} className="h-14 w-14 rounded-lg object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="font-display text-xl text-ink truncate leading-none">{item.name}</p>
                        <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-rose">{item.price}</p>
                        <div className="mt-2 flex items-center gap-2">
                          <button type="button" onClick={() => decrementFromCart(item.id)} className="h-7 w-7 rounded-full border border-ink/20 text-ink">-</button>
                          <span className="w-6 text-center text-sm text-ink">{item.quantity}</span>
                          <button type="button" onClick={() => addToCart(item)} className="h-7 w-7 rounded-full border border-ink/20 text-ink">+</button>
                          <button type="button" onClick={() => removeFromCart(item.id)} className="ml-auto text-[10px] uppercase tracking-[0.18em] text-ink/60 hover:text-ink">Remove</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-6 border-t border-ink/10 pt-4 space-y-2 text-sm text-ink/70">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span>€{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Shipping</span>
                <span>€{shipping.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between pt-2 text-ink">
                <span className="text-[11px] uppercase tracking-[0.22em]">Total</span>
                <span className="font-display text-2xl">€{total.toFixed(2)}</span>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </SiteLayout>
  );
}
