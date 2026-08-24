import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ShoppingBag, Menu, X, Search, Heart } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/use-wishlist";

const leftNav = [
  { to: "/", label: "Maison" },
  { to: "/shop", label: "Boutique" },
] as const;

const rightNav = [
  { to: "/about", label: "Atelier" },
  { to: "/contact", label: "Concierge" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const { items, itemCount, addToCart, decrementFromCart, removeFromCart, clearCart } = useCart();
  const { items: wishlistItems, itemCount: wishlistCount, removeWishlistItem, clearWishlist } = useWishlist();

  const totalPrice = items.reduce((sum, item) => {
    const amount = Number(item.price.replace(/[^\d.]/g, "")) || 0;
    return sum + amount * item.quantity;
  }, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Main floating header */}
      <header className="fixed inset-x-0 z-50 top-3 transition-all duration-500">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <div
            className={`nav-shell relative overflow-hidden transition-all duration-500 ${
              scrolled
                ? "rounded-[1.6rem] bg-cream/92 border border-ink/10 shadow-luxe px-4 py-2.5"
                : "rounded-[2rem] bg-cream/72 border border-cream/40 shadow-soft px-5 py-3"
            }`}
          >
            <div aria-hidden className="pointer-events-none absolute inset-0 nav-aurora opacity-65" />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gold/85 to-transparent nav-sheen"
            />

            <div className="relative z-10 flex items-center justify-between gap-3 md:gap-6">
              {/* LEFT NAV */}
              <nav className="hidden md:flex items-center gap-2.5 flex-1">
                {leftNav.map((item, index) => (
                  <NavLink key={item.to} to={item.to} label={item.label} index={index} />
                ))}
              </nav>

              {/* CENTER LOGO */}
              <Link to="/" className="group relative flex items-center gap-3 shrink-0 px-2">
                <span className="hidden sm:block h-px w-6 bg-linear-to-r from-transparent via-gold/70 to-transparent" />
                <span className="relative font-display text-lg sm:text-xl lg:text-2xl tracking-[0.3em] text-ink leading-none">
                  LUMI<span className="text-gradient-gold italic">è</span>RE
                  <span className="absolute -top-2.5 -right-3 text-[9px] text-gold/80 animate-pulse">✦</span>
                </span>
                <span className="hidden sm:block h-px w-6 bg-linear-to-l from-transparent via-gold/70 to-transparent" />
              </Link>

              {/* RIGHT NAV */}
              <nav className="hidden md:flex items-center gap-2.5 flex-1 justify-end">
                {rightNav.map((item, index) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    label={item.label}
                    index={index + leftNav.length}
                  />
                ))}
              </nav>

              {/* ICONS */}
              <div className="flex items-center gap-1.5 shrink-0 md:ml-2 md:pl-4 md:border-l md:border-ink/10">
                <IconBtn label="Search">
                  <Search className="h-4 w-4" />
                </IconBtn>
                <IconBtn
                  label="Wishlist"
                  badge={wishlistCount > 0 ? `${wishlistCount}` : undefined}
                  onClick={() => {
                    setWishlistOpen(true);
                    setCartOpen(false);
                    setOpen(false);
                  }}
                  className="hidden sm:inline-flex border-rose/25 bg-rose/12 text-rose hover:border-rose/45 hover:bg-rose/20"
                >
                  <Heart className="h-4 w-4" />
                </IconBtn>
                <IconBtn
                  label="Cart"
                  badge={itemCount > 0 ? `${itemCount}` : undefined}
                  onClick={() => {
                    setCartOpen(true);
                    setWishlistOpen(false);
                    setOpen(false);
                  }}
                >
                  <ShoppingBag className="h-4 w-4" />
                </IconBtn>
                <button
                  aria-label="Menu"
                  className="md:hidden h-9 w-9 rounded-2xl border border-ink/15 bg-cream/70 hover:bg-cream text-ink flex items-center justify-center transition-all duration-300"
                  onClick={() => {
                    setOpen((v) => !v);
                    setCartOpen(false);
                    setWishlistOpen(false);
                  }}
                >
                  {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-500 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 h-full w-[85%] max-w-sm bg-cream shadow-luxe transition-transform duration-500 overflow-hidden ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="absolute inset-0 nav-aurora opacity-45" aria-hidden />
          <div className="relative p-8 pt-24">
            <p className="text-[10px] uppercase tracking-[0.4em] text-rose mb-8">
              — Maison Lumière
            </p>
            <nav className="flex flex-col gap-1">
              {[...leftNav, ...rightNav].map((item, i) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="group flex items-baseline gap-4 py-4 border-b border-ink/10"
                >
                  <span className="font-display text-xs text-gold/70 italic">
                    0{i + 1}
                  </span>
                  <span className="font-display text-3xl text-ink group-hover:italic group-hover:text-gradient-gold transition-all">
                    {item.label}
                  </span>
                </Link>
              ))}
            </nav>
            <div className="mt-12 pt-8 border-t border-ink/10">
              <p className="text-[10px] uppercase tracking-[0.3em] text-rose mb-3">
                Concierge
              </p>
              <a
                href="mailto:concierge@lumiere-maison.fr"
                className="font-display text-lg text-ink hover:text-gold"
              >
                concierge@lumiere-maison.fr
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Wishlist drawer */}
      <div
        className={`fixed inset-0 z-69 transition-opacity duration-300 ${
          wishlistOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-ink/30" onClick={() => setWishlistOpen(false)} />
        <aside
          className={`absolute right-0 top-0 h-full w-[90%] max-w-md bg-cream shadow-luxe transition-transform duration-500 ${
            wishlistOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between px-6 py-5 border-b border-rose/20 bg-rose/8">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-rose">Liked Items</p>
                <p className="mt-1 text-sm text-ink/70">{wishlistCount} item(s)</p>
              </div>
              <button
                type="button"
                onClick={() => setWishlistOpen(false)}
                className="h-9 w-9 rounded-full border border-rose/25 text-rose hover:bg-rose/10"
                aria-label="Close wishlist"
              >
                <X className="mx-auto h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
              {wishlistItems.length === 0 ? (
                <p className="text-sm text-ink/60">No liked items yet. Tap hearts on products to save them.</p>
              ) : (
                wishlistItems.map((item) => (
                  <div key={item.id} className="rounded-2xl border border-rose/20 p-3 bg-rose/8">
                    <div className="flex gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-16 w-16 rounded-xl object-cover bg-blush/40"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-display text-xl leading-none text-ink truncate">{item.name}</p>
                        <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-rose">{item.category}</p>
                        <p className="mt-2 text-xs uppercase tracking-[0.2em] text-rose">{item.price}</p>
                        <div className="mt-3 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => addToCart(item)}
                            className="rounded-full border border-rose/30 bg-rose/12 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-rose hover:bg-rose/20"
                          >
                            Add to cart
                          </button>
                          <button
                            type="button"
                            onClick={() => removeWishlistItem(item.id)}
                            className="ml-auto text-[10px] uppercase tracking-[0.2em] text-ink/60 hover:text-ink"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="border-t border-rose/20 px-6 py-5 bg-rose/6">
              <button
                type="button"
                onClick={clearWishlist}
                className="w-full rounded-full border border-rose/25 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-rose hover:bg-rose/10"
              >
                Clear liked items
              </button>
            </div>
          </div>
        </aside>
      </div>

      {/* Cart drawer */}
      <div
        className={`fixed inset-0 z-70 transition-opacity duration-300 ${
          cartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-ink/35" onClick={() => setCartOpen(false)} />
        <aside
          className={`absolute right-0 top-0 h-full w-[90%] max-w-md bg-cream shadow-luxe transition-transform duration-500 ${
            cartOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between px-6 py-5 border-b border-ink/10">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-rose">Your Cart</p>
                <p className="mt-1 text-sm text-ink/70">{itemCount} item(s)</p>
              </div>
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                className="h-9 w-9 rounded-full border border-ink/15 text-ink hover:bg-ink/5"
                aria-label="Close cart"
              >
                <X className="mx-auto h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
              {items.length === 0 ? (
                <p className="text-sm text-ink/60">Your cart is empty. Add products to get started.</p>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="rounded-2xl border border-ink/10 p-3 bg-cream/70">
                    <div className="flex gap-3">
                      <CartZoomImage src={item.image} alt={item.name} />
                      <div className="flex-1 min-w-0">
                        <p className="font-display text-xl leading-none text-ink truncate">{item.name}</p>
                        <p className="mt-2 text-xs uppercase tracking-[0.2em] text-rose">{item.price}</p>
                        <div className="mt-3 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => decrementFromCart(item.id)}
                            className="h-7 w-7 rounded-full border border-ink/20 text-ink"
                            aria-label={`Decrease quantity of ${item.name}`}
                          >
                            -
                          </button>
                          <span className="text-sm text-ink w-6 text-center">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => addToCart(item)}
                            className="h-7 w-7 rounded-full border border-ink/20 text-ink"
                            aria-label={`Increase quantity of ${item.name}`}
                          >
                            +
                          </button>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="ml-auto text-[10px] uppercase tracking-[0.2em] text-ink/60 hover:text-ink"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="border-t border-ink/10 px-6 py-5">
              <div className="flex items-center justify-between mb-4">
                <p className="text-[11px] uppercase tracking-[0.25em] text-ink/70">Subtotal</p>
                <p className="font-display text-2xl text-ink">€{totalPrice.toFixed(2)}</p>
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={clearCart}
                  className="flex-1 rounded-full border border-ink/20 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-ink/70 hover:text-ink"
                >
                  Clear
                </button>
                <Link
                  to="/checkout"
                  onClick={() => setCartOpen(false)}
                  className="flex-1 text-center rounded-full gradient-gold px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-ink"
                >
                  Checkout
                </Link>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

function NavLink({
  to,
  label,
  index,
}: {
  to: "/" | "/shop" | "/about" | "/contact";
  label: string;
  index: number;
}) {
  return (
    <Link
      to={to}
      activeOptions={{ exact: to === "/" }}
      activeProps={{ className: "text-ink bg-cream/90 border-gold/40 -translate-y-0.5" }}
      inactiveProps={{ className: "text-ink/70 hover:text-ink hover:bg-cream/80" }}
      className="nav-link-enter group relative rounded-xl border border-transparent px-3.5 py-2 text-[11px] uppercase tracking-[0.24em] font-medium transition-all duration-300"
      style={{ animationDelay: `${index * 90}ms` }}
    >
      <span className="relative z-10">{label}</span>
      <span className="pointer-events-none absolute inset-x-2 -bottom-px h-px origin-left scale-x-0 bg-linear-to-r from-transparent via-gold to-transparent transition-transform duration-500 group-hover:scale-x-100" />
    </Link>
  );
}

function IconBtn({
  children,
  label,
  badge,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  label: string;
  badge?: string;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`relative h-9 w-9 rounded-xl border border-ink/10 bg-cream/75 text-ink/80 hover:text-ink hover:-translate-y-0.5 hover:border-gold/45 hover:bg-cream flex items-center justify-center transition-all duration-300 ${className}`}
    >
      {children}
      {badge && (
        <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full gradient-gold text-[8px] font-semibold text-ink flex items-center justify-center pulse-glow">
          {badge}
        </span>
      )}
    </button>
  );
}

function CartZoomImage({ src, alt }: { src: string; alt: string }) {
  const [scale, setScale] = useState(1);
  const [origin, setOrigin] = useState("50% 50%");

  return (
    <div
      className="relative h-16 w-16 rounded-xl overflow-hidden bg-blush/40 border border-ink/10 cursor-zoom-in"
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        setOrigin(`${x}% ${y}%`);
      }}
      onMouseLeave={() => {
        setScale(1);
        setOrigin("50% 50%");
      }}
      onWheel={(event) => {
        event.preventDefault();
        setScale((prev) => {
          const next = prev - event.deltaY * 0.002;
          return Math.max(1, Math.min(3, Number(next.toFixed(2))));
        });
      }}
      title="Move cursor to inspect, scroll to zoom"
    >
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover transition-transform duration-150"
        style={{ transform: `scale(${scale})`, transformOrigin: origin }}
      />
    </div>
  );
}
