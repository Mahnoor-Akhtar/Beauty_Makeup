import { useEffect, useState } from "react";
import { Heart, ShoppingBag } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/use-wishlist";

interface Props {
  id: string;
  name: string;
  category: string;
  price: string;
  image: string;
}

export function ProductCard({ id, name, category, price, image }: Props) {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [imageScale, setImageScale] = useState(1);
  const [imageOrigin, setImageOrigin] = useState("50% 50%");
  const liked = isWishlisted(id);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (!open) {
      setImageScale(1);
      setImageOrigin("50% 50%");
    }
  }, [open]);

  const details = `${name} is one of our signature ${category.toLowerCase()} pieces, crafted for a couture finish with high-impact color and a smooth, camera-ready texture.`;

  const handleAddWithQuantity = () => {
    for (let i = 0; i < quantity; i += 1) {
      addToCart({ id, name, price, image });
    }
    setOpen(false);
    setQuantity(1);
  };

  const decreaseQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));
  const increaseQuantity = () => setQuantity((prev) => Math.min(20, prev + 1));
  const zoomOut = () => setImageScale((prev) => Math.max(1, Number((prev - 0.25).toFixed(2))));
  const zoomIn = () => setImageScale((prev) => Math.min(3, Number((prev + 0.25).toFixed(2))));
  const resetZoom = () => {
    setImageScale(1);
    setImageOrigin("50% 50%");
  };

  return (
    <>
      <div
        className="group card-luxe shine-sweep rounded-sm bg-cream overflow-hidden cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <div className="relative aspect-4/5 overflow-hidden bg-blush/30">
          <img
            src={image}
            alt={name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-1200 group-hover:scale-110"
          />
          <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-cream/90 backdrop-blur text-[9px] uppercase tracking-[0.2em] text-ink/70">
            New
          </div>

          <div className="absolute inset-x-3 bottom-3 z-10 opacity-0 translate-y-3 scale-95 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 transition-all duration-500">
            <div className="rounded-2xl border border-cream/60 bg-cream/78 backdrop-blur-md p-2 shadow-soft">
              <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  toggleWishlist({ id, name, category, price, image });
                }}
                className={`h-10 w-10 rounded-full border backdrop-blur flex items-center justify-center transition-all duration-300 ${
                  liked
                    ? "border-rose/50 bg-rose/15 text-rose scale-105"
                    : "border-ink/15 bg-cream/90 text-ink/70 hover:text-ink hover:-translate-y-0.5"
                }`}
                aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
              </button>

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setOpen(true);
                }}
                className="flex-1 h-10 rounded-full border border-ink/15 bg-cream/92 backdrop-blur px-4 text-[10px] uppercase tracking-[0.22em] text-ink/80 hover:text-ink hover:border-ink hover:-translate-y-0.5 transition-all duration-300"
              >
                <span className="inline-flex items-center gap-2">
                  <ShoppingBag className="h-3.5 w-3.5" />
                  Add to cart
                </span>
              </button>
              </div>
            </div>
          </div>
        </div>
        <div className="p-6 text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-rose mb-2">
            {category}
          </p>
          <h3 className="font-display text-2xl text-ink leading-tight">{name}</h3>
          <div className="mt-3 inline-block w-10 gold-line" />
          <p className="mt-3 font-display text-lg text-ink/80">{price}</p>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-80 flex items-center justify-center p-4 sm:p-6">
          <button
            type="button"
            className="absolute inset-0 bg-ink/45 backdrop-blur-sm"
            aria-label="Close product details"
            onClick={() => setOpen(false)}
          />

          <div className="relative z-10 w-full max-w-4xl rounded-3xl bg-cream shadow-luxe overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div
                className="relative aspect-4/5 md:aspect-auto md:min-h-140 bg-blush/30 overflow-hidden"
                onMouseMove={(event) => {
                  const rect = event.currentTarget.getBoundingClientRect();
                  const x = ((event.clientX - rect.left) / rect.width) * 100;
                  const y = ((event.clientY - rect.top) / rect.height) * 100;
                  setImageOrigin(`${x}% ${y}%`);
                }}
                onMouseLeave={() => {
                  setImageOrigin("50% 50%");
                }}
                onWheel={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  setImageScale((prev) => {
                    const next = prev - event.deltaY * 0.002;
                    return Math.max(1, Math.min(3, Number(next.toFixed(2))));
                  });
                }}
              >
                <div className="absolute left-3 top-3 z-20 flex items-center gap-1.5 rounded-full border border-ink/15 bg-cream/85 px-2 py-1 backdrop-blur">
                  <button
                    type="button"
                    onClick={zoomOut}
                    className="h-7 w-7 rounded-full border border-ink/20 text-ink hover:bg-ink/5"
                    aria-label="Zoom out"
                  >
                    -
                  </button>
                  <span className="text-[10px] uppercase tracking-[0.15em] text-ink/75 min-w-10 text-center">
                    {Math.round(imageScale * 100)}%
                  </span>
                  <button
                    type="button"
                    onClick={zoomIn}
                    className="h-7 w-7 rounded-full border border-ink/20 text-ink hover:bg-ink/5"
                    aria-label="Zoom in"
                  >
                    +
                  </button>
                  <button
                    type="button"
                    onClick={resetZoom}
                    className="rounded-full border border-ink/20 px-2 py-1 text-[9px] uppercase tracking-[0.12em] text-ink/70 hover:text-ink"
                  >
                    Reset
                  </button>
                </div>
                <img
                  src={image}
                  alt={name}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-150 cursor-zoom-in"
                  style={{ transform: `scale(${imageScale})`, transformOrigin: imageOrigin }}
                  title="Move cursor to inspect, scroll to zoom"
                />
              </div>

              <div className="p-7 sm:p-10 flex flex-col">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="self-end h-9 w-9 rounded-full border border-ink/15 text-ink hover:bg-ink/5"
                  aria-label="Close"
                >
                  ✕
                </button>

                <p className="mt-2 text-[10px] uppercase tracking-[0.35em] text-rose">{category}</p>
                <h3 className="mt-4 font-display text-5xl text-ink leading-[1.05]">{name}</h3>
                <p className="mt-4 font-display text-3xl text-ink">{price}</p>
                <div className="mt-5 w-14 gold-line" />
                <p className="mt-6 text-ink/70 leading-relaxed font-light">{details}</p>

                <div className="mt-8 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={decreaseQuantity}
                    className="h-10 w-10 rounded-full border border-ink/20 text-xl text-ink"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-lg text-ink">{quantity}</span>
                  <button
                    type="button"
                    onClick={increaseQuantity}
                    className="h-10 w-10 rounded-full border border-ink/20 text-xl text-ink"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAddWithQuantity}
                  className="mt-8 rounded-full gradient-gold px-7 py-3 text-[11px] uppercase tracking-[0.25em] text-ink"
                >
                  Add {quantity} to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
