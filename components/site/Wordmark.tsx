import Image from "next/image";

/**
 * Logo Selekt officiel — monogramme S + wordmark (fichiers client).
 * accent="brass" → version noire pour fonds clairs ;
 * accent="sand" → version blanche pour fonds sombres.
 * La hauteur suit le font-size hérité (em) : les call-sites gardent
 * leurs classes text-[…rem] historiques.
 */
export function Wordmark({
  className = "",
  accent = "sand",
}: {
  className?: string;
  accent?: "sand" | "brass";
}) {
  return (
    <span className={`inline-flex items-center leading-none ${className}`}>
      <Image
        src={accent === "brass" ? "/logo-selekt-noir.png" : "/logo-selekt-blanc.png"}
        alt="Selekt"
        width={420}
        height={130}
        className="w-auto"
        style={{ height: "1.2em" }}
      />
    </span>
  );
}
