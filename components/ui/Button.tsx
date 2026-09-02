import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant =
  | "primary"
  | "primary-inverse"
  | "outline-dark"
  | "outline-light"
  | "ghost-dark"
  | "ghost-light";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2.5 rounded-full font-sans font-medium " +
  "transition-[background-color,border-color,color,transform,box-shadow] duration-300 ease-(--ease-lux) " +
  // Retour tactile : la pilule se soulève au survol et s'enfonce au clic
  "hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] active:duration-100 " +
  "focus-visible:outline focus-visible:outline-1 focus-visible:outline-gold focus-visible:outline-offset-3";

const variants: Record<Variant, string> = {
  // Pilule sombre compacte (famille bspk), en chaud : encre, jamais de noir froid
  primary:
    "bg-ink text-cream-2 hover:bg-void hover:shadow-[0_14px_28px_-12px_rgba(16,15,13,0.5)]",
  // Sur panneau sombre : pilule crème
  "primary-inverse":
    "bg-cream-2 text-ink hover:bg-paper hover:shadow-[0_16px_30px_-12px_rgba(10,8,6,0.65)]",
  // Secondaire sur fond sombre — filet sable, se remplit d'un voile au survol
  "outline-dark":
    "border border-sand/40 text-on-void hover:border-sand/80 hover:bg-sand/10 hover:text-cream-2",
  // Secondaire sur fond clair — filet encre
  "outline-light": "border border-ink/25 text-ink hover:border-ink/60 hover:bg-ink/5",
  "ghost-dark": "text-on-void/80 hover:text-on-void",
  "ghost-light": "text-ink/80 hover:text-ink",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-6 text-[0.9rem]",
  lg: "h-12 px-7 text-[0.95rem]",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
};

type ButtonAsLink = CommonProps & { href: string } & Omit<
    ComponentProps<typeof Link>,
    "href" | "className" | "children"
  >;
type ButtonAsButton = CommonProps & { href?: undefined } & Omit<
    ComponentProps<"button">,
    "className" | "children"
  >;

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = "primary", size = "md", children, className = "" } = props;
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (props.href !== undefined) {
    const { href, variant: _v, size: _s, className: _c, ...rest } = props;
    return (
      <Link href={href as ComponentProps<typeof Link>["href"]} className={cls} {...rest}>
        {children}
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, ...rest } = props;
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}

/** Flèche fine, dessinée au trait — pas d'icône de bibliothèque. */
export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      className={`h-3.5 w-3.5 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
    >
      <path d="M1.5 8h12M9 3.5 13.5 8 9 12.5" />
    </svg>
  );
}
