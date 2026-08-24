import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "gold" | "outline" | "ghost";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export const LuxButton = forwardRef<HTMLButtonElement, Props>(
  ({ className, variant = "gold", children, ...props }, ref) => {
    const base =
      "group relative inline-flex items-center justify-center gap-3 rounded-full px-9 py-4 text-[11px] uppercase tracking-[0.3em] font-medium transition-all duration-500 overflow-hidden";

    const variants: Record<Variant, string> = {
      gold:
        "text-ink shadow-luxe hover:scale-[1.03] hover:shadow-glow before:absolute before:inset-0 before:gradient-gold before:transition-transform before:duration-700 hover:before:scale-110",
      outline:
        "border border-ink/40 text-ink hover:border-ink hover:bg-ink hover:text-cream",
      ghost:
        "text-ink/80 hover:text-ink",
    };

    return (
      <button ref={ref} className={cn(base, variants[variant], className)} {...props}>
        <span className="relative z-10 flex items-center gap-3">{children}</span>
      </button>
    );
  }
);
LuxButton.displayName = "LuxButton";
