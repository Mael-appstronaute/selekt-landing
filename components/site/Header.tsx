"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { NAV, navHref, type NavEntry } from "@/content/nav";
import { PHOTOS } from "@/lib/photos";
import { pageKeyFromPath, pagePath, type Locale } from "@/lib/routes";
import { ThreadsBackground } from "../fx/ThreadsBackground";
import { Wordmark } from "./Wordmark";
import { Arrow } from "../ui/Button";

const EASE_LUX = [0.22, 1, 0.36, 1] as const;
type MenuId = "platform" | "capabilities";

export function Header({ locale }: { locale: Locale }) {
  const nav = NAV[locale];
  const pathname = usePathname();
  const reduced = useReducedMotion();

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<MenuId | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  /* Portal du drawer : document.body n'existe qu'au client */
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const headerRef = useRef<HTMLElement>(null);
  const triggerRefs = useRef<Record<MenuId, HTMLButtonElement | null>>({
    platform: null,
    capabilities: null,
  });
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Header condensé au scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Fermeture au changement de page + verrou de scroll du drawer mobile */
  useEffect(() => {
    setOpen(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [mobileOpen]);

  /* Survol avec délai anti-flicker */
  const clearTimers = () => {
    if (openTimer.current) clearTimeout(openTimer.current);
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };
  const scheduleOpen = (id: MenuId) => {
    clearTimers();
    openTimer.current = setTimeout(() => setOpen(id), 110);
  };
  const scheduleClose = () => {
    clearTimers();
    closeTimer.current = setTimeout(() => setOpen(null), 220);
  };

  const closeAndFocus = useCallback((id: MenuId) => {
    setOpen(null);
    triggerRefs.current[id]?.focus();
  }, []);

  /* Escape global + clic extérieur */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAndFocus(open);
    };
    const onClick = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, [open, closeAndFocus]);

  /* Ferme quand le focus clavier quitte le header */
  const onBlurCapture = (e: React.FocusEvent) => {
    if (headerRef.current && !headerRef.current.contains(e.relatedTarget as Node)) {
      setOpen(null);
    }
  };

  /* Sélecteur de langue — pointe vers la même page dans l'autre langue */
  const currentKey = pageKeyFromPath(pathname) ?? "home";
  const otherLocale: Locale = locale === "fr" ? "en" : "fr";
  const otherPath = pagePath(currentKey, otherLocale);

  const demoHref = pagePath("demo", locale);
  const homeHref = pagePath("home", locale);

  return (
    <header
      ref={headerRef}
      onBlurCapture={onBlurCapture}
      className={`fixed inset-x-0 top-0 z-50 bg-cream/95 text-ink backdrop-blur-md transition-[border-color,height] duration-300 ease-(--ease-lux) ${
        scrolled || open ? "border-b border-gold/30" : "border-b border-transparent"
      }`}
    >
      <div
        className={`mx-auto flex max-w-[1200px] items-center justify-between px-6 transition-[height] duration-300 ease-(--ease-lux) md:px-10 ${
          scrolled ? "h-[58px]" : "h-[76px]"
        }`}
      >
        <Link href={homeHref as "/"} className="no-underline" aria-label="Selekt Retail OS">
          <Wordmark className="text-ink text-[1.55rem]" accent="brass" />
        </Link>

        {/* ——— Navigation desktop ——— */}
        <nav aria-label={nav.menuLabel} className="hidden items-center gap-1 lg:flex">
          {(["platform", "capabilities"] as MenuId[]).map((id) => (
            <div
              key={id}
              onMouseEnter={() => scheduleOpen(id)}
              onMouseLeave={scheduleClose}
            >
              <button
                ref={(el) => {
                  triggerRefs.current[id] = el;
                }}
                aria-expanded={open === id}
                aria-haspopup="true"
                onClick={() => setOpen(open === id ? null : id)}
                className={`flex cursor-pointer items-center gap-2 px-4 py-2 text-[0.92rem] transition-colors duration-150 ease-(--ease-lux) ${
                  open === id ? "text-ink" : "text-ink/65 hover:text-ink"
                }`}
              >
                {id === "platform" ? nav.platformLabel : nav.capabilitiesLabel}
                <svg
                  aria-hidden
                  viewBox="0 0 10 6"
                  className={`h-1.5 w-2.5 transition-transform duration-300 ease-(--ease-lux) ${
                    open === id ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                >
                  <path d="m1 1 4 4 4-4" />
                </svg>
              </button>
            </div>
          ))}
          {nav.directLinks.map((entry) => (
            <Link
              key={entry.key}
              href={navHref(entry, locale) as "/"}
              className="px-4 py-2 text-[0.92rem] text-ink/65 no-underline transition-colors duration-150 ease-(--ease-lux) hover:text-ink"
            >
              {entry.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <a
            href={otherPath}
            className="kicker text-ink/45 no-underline transition-colors duration-150 ease-(--ease-lux) hover:text-ink"
            aria-label={locale === "fr" ? "Switch to English" : "Passer en français"}
          >
            <span className={locale === "fr" ? "text-ink" : ""}>FR</span>
            <span className="px-1.5 text-sand-muted">/</span>
            <span className={locale === "en" ? "text-ink" : ""}>EN</span>
          </a>
          <Link
            href={demoHref as "/"}
            className="inline-flex h-10 items-center rounded-full bg-ink px-5 text-[0.88rem] font-medium text-cream-2 no-underline transition-[background-color,transform,box-shadow] duration-300 ease-(--ease-lux) hover:-translate-y-0.5 hover:bg-void hover:shadow-[0_12px_24px_-10px_rgba(16,15,13,0.45)] active:translate-y-0 active:scale-[0.98] active:duration-100"
          >
            {nav.demoCta}
          </Link>
        </div>

        {/* ——— Burger mobile ——— */}
        <button
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? nav.closeLabel : nav.menuLabel}
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-10 w-10 cursor-pointer flex-col items-center justify-center gap-[5px] lg:hidden"
        >
          <span
            className={`h-px w-5 bg-ink transition-transform duration-300 ease-(--ease-lux) ${
              mobileOpen ? "translate-y-[3px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-5 bg-ink transition-transform duration-300 ease-(--ease-lux) ${
              mobileOpen ? "-translate-y-[3px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* ——— Méga-menu desktop — panneau flottant à vignettes photo ——— */}
      <AnimatePresence>
        {open && (
          <motion.div
            key={open}
            initial={reduced ? false : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: EASE_LUX }}
            onMouseEnter={clearTimers}
            onMouseLeave={scheduleClose}
            className="absolute inset-x-0 top-full hidden lg:block"
          >
            <div className="mx-auto max-w-[1272px] px-4 pb-6 pt-3 md:px-8">
              <div className="overflow-hidden rounded-[24px] border border-ink/10 bg-card">
                {open === "platform" ? (
                  <div className="grid lg:grid-cols-[2.55fr_1fr]">
                    <div className="p-5 md:p-6">
                      <p className="kicker px-2 pb-4 pt-1 text-sand-muted">
                        {nav.platformColumns[0].heading}
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        {nav.platformColumns[0].entries.map((entry) => (
                          <PhotoMenuCard key={entry.key} entry={entry} locale={locale} />
                        ))}
                      </div>
                    </div>
                    {/* Colonne sombre — la signature fils */}
                    <Link
                      href={pagePath(nav.spotlight.key, locale) as "/"}
                      className="group relative flex flex-col justify-end overflow-hidden bg-void-2 p-6 no-underline"
                    >
                      <div className="absolute inset-0">
                        <ThreadsBackground />
                      </div>
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-t from-void/75 via-void/25 to-transparent"
                      />
                      <p className="kicker relative text-sand-muted">{nav.spotlight.kicker}</p>
                      <p className="relative mt-3 font-serif text-[1.3rem] leading-snug text-on-void">
                        {nav.spotlight.title}
                      </p>
                      <span className="link-quiet relative mt-6 text-gold">
                        {nav.spotlight.cta}
                        <Arrow className="transition-transform duration-300 ease-(--ease-lux) group-hover:translate-x-1" />
                      </span>
                    </Link>
                  </div>
                ) : (
                  <div className="p-5 md:p-6">
                    <p className="kicker px-2 pb-4 pt-1 text-sand-muted">
                      {nav.capabilitiesColumns[0].heading}
                    </p>
                    <div className="grid grid-cols-4 gap-2">
                      {nav.capabilitiesColumns[0].entries.map((entry) => (
                        <PhotoMenuCard key={entry.key} entry={entry} locale={locale} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Filet de pied — lien d'ensemble + langues */}
                <div className="flex items-center justify-between border-t border-ink/10 px-7 py-3.5">
                  <Link
                    href={
                      navHref(
                        open === "platform"
                          ? nav.platformColumns[1].entries[0]
                          : nav.directLinks[0],
                        locale,
                      ) as "/"
                    }
                    className="link-quiet text-brass"
                  >
                    {open === "platform"
                      ? nav.platformColumns[1].entries[0].label
                      : nav.directLinks[0].label}{" "}
                    <Arrow />
                  </Link>
                  <p className="kicker text-[0.6rem] text-sand-muted">
                    Français · English · Español · 中文
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ——— Drawer mobile plein écran — porté dans <body> : le backdrop-blur
          du header fait de lui le containing block des descendants fixed,
          ce qui réduisait le drawer à une lamelle de 18 px ——— */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduced ? undefined : { opacity: 0 }}
                transition={{ duration: 0.3, ease: EASE_LUX }}
                className="fixed inset-x-0 bottom-0 top-[58px] z-40 flex flex-col overflow-y-auto bg-cream lg:hidden"
              >
            <nav aria-label={nav.menuLabel} className="flex-1 px-6 py-8">
              <MobileGroup heading={nav.platformLabel} columns={nav.platformColumns} locale={locale} />
              <MobileGroup
                heading={nav.capabilitiesLabel}
                columns={nav.capabilitiesColumns}
                locale={locale}
              />
              <ul className="mt-2 border-t border-ink/10 pt-6">
                {nav.directLinks.map((entry) => (
                  <li key={entry.key}>
                    <Link
                      href={navHref(entry, locale) as "/"}
                      className="block py-2.5 font-serif text-[1.5rem] text-ink no-underline"
                    >
                      {entry.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <a href={otherPath} className="kicker mt-8 inline-block text-brass no-underline">
                {locale === "fr" ? "English version" : "Version française"}
              </a>
            </nav>
            <div className="sticky bottom-0 border-t border-ink/10 bg-cream px-6 py-4">
              <Link
                href={demoHref as "/"}
                className="flex h-12 items-center justify-center rounded-full bg-ink text-[0.95rem] font-medium text-cream-2 no-underline transition-[background-color,transform] duration-300 ease-(--ease-lux) hover:bg-void active:scale-[0.98] active:duration-100"
              >
                {nav.demoCta}
              </Link>
            </div>
          </motion.div>
        )}
          </AnimatePresence>,
          document.body,
        )}
    </header>
  );
}

/** Carte de menu à vignette photo — la photo démontre la destination. */
function PhotoMenuCard({ entry, locale }: { entry: NavEntry; locale: Locale }) {
  return (
    <Link
      href={navHref(entry, locale) as "/"}
      className="group block rounded-2xl p-2.5 no-underline transition-colors duration-150 ease-(--ease-lux) hover:bg-cream-2"
    >
      {entry.photo && (
        <div className="relative h-24 overflow-hidden rounded-xl">
          <Image
            src={PHOTOS[entry.photo]}
            alt=""
            fill
            sizes="280px"
            className="photo-warm object-cover transition-transform duration-600 ease-(--ease-lux) group-hover:scale-[1.05]"
          />
          <div aria-hidden className="absolute inset-0 bg-void/15" />
        </div>
      )}
      <span className="mt-3 flex items-center gap-2 px-1 font-serif text-[1.1rem] leading-snug text-ink">
        {entry.label}
        <Arrow className="shrink-0 text-brass opacity-0 transition-opacity duration-300 ease-(--ease-lux) group-hover:opacity-100" />
      </span>
      {entry.desc && (
        <span className="mt-1 block px-1 pb-1 text-[0.82rem] leading-snug muted">
          {entry.desc}
        </span>
      )}
    </Link>
  );
}

function MobileGroup({
  heading,
  columns,
  locale,
}: {
  heading: string;
  columns: { heading: string; entries: NavEntry[] }[];
  locale: Locale;
}) {
  const [expanded, setExpanded] = useState(true);
  const entries = columns.flatMap((c) => c.entries);
  return (
    <div className="border-t border-ink/10 py-4 first:border-t-0">
      <button
        aria-expanded={expanded}
        onClick={() => setExpanded(!expanded)}
        className="flex w-full cursor-pointer items-center justify-between py-2"
      >
        <span className="kicker text-sand-muted">{heading}</span>
        <svg
          aria-hidden
          viewBox="0 0 10 6"
          className={`h-1.5 w-2.5 text-brass transition-transform duration-300 ease-(--ease-lux) ${
            expanded ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        >
          <path d="m1 1 4 4 4-4" />
        </svg>
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-(--ease-lux)"
        style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
      >
        <ul className="overflow-hidden">
          {entries.map((entry) => (
            <li key={entry.key}>
              <Link
                href={navHref(entry, locale) as "/"}
                className="block py-2.5 no-underline"
              >
                <span className="font-serif text-[1.5rem] text-ink">{entry.label}</span>
                {entry.desc && (
                  <span className="mt-0.5 block text-[0.86rem] muted">{entry.desc}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
