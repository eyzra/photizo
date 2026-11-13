"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { Button } from "./Button";
import { joinCommunityHref, primaryNav, site } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1] as const;

export function Nav() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > 420 && y > prev + 4 && !open);
    if (y < prev - 4) setHidden(false);
  });

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname?.startsWith(href.replace(/\/$/, "")));
  const darkHero = pathname === "/immersion" || pathname === "/immersion/";
  const onDark = open || (darkHero && !scrolled);

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-navy focus:px-4 focus:py-2 focus:text-white">
        Skip to content
      </a>
      <motion.header
        initial={false}
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.5, ease }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div className={`transition-all duration-500 ${scrolled && !open ? "bg-white/75 shadow-[0_1px_0_rgb(7_29_73_/_0.06)] backdrop-blur-xl backdrop-saturate-150" : "bg-transparent"}`}>
          <nav aria-label="Main" className="container-x flex h-[4.5rem] items-center justify-between gap-6 md:h-20">
            <Link href="/" className="group relative z-[60] rounded-md" aria-label={`${site.name} home`}>
              <Logo tone={onDark ? "white" : "navy"} />
            </Link>

            <ul className="hidden items-center gap-1 lg:flex">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`group relative rounded-full px-3.5 py-2 font-display text-[0.92rem] font-medium transition-colors ${onDark ? "text-white/75 hover:text-white aria-[current=page]:text-white" : "text-navy/80 hover:text-navy aria-[current=page]:text-navy"}`}
                  >
                    {item.label}
                    <span className={`absolute inset-x-3.5 -bottom-0.5 h-[2px] origin-left rounded-full bg-orange transition-transform duration-500 ease-out-soft ${isActive(item.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3">
              <div className="hidden sm:block">
                <Button href={joinCommunityHref} variant={onDark ? "light" : "dark"} className="!py-2.5 !text-[0.88rem]">
                  Join the Community
                </Button>
              </div>
              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? "Close menu" : "Open menu"}
                className={`relative z-[60] grid size-11 place-items-center rounded-full border transition-colors lg:hidden ${onDark ? "border-white/30 text-white" : "border-navy/15 text-navy"}`}
              >
                {open ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ clipPath: "circle(0% at calc(100% - 3rem) 2.5rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 3rem) 2.5rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 3rem) 2.5rem)" }}
            transition={{ duration: 0.75, ease }}
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-navy text-white lg:hidden"
          >
            <div className="grain pointer-events-none absolute inset-0 opacity-20" />
            <div className="pointer-events-none absolute -right-40 top-1/3 size-[30rem] rounded-full bg-cyan/20 blur-3xl" />
            <div className="container-x relative flex flex-1 flex-col justify-between pb-10 pt-28">
              <ul className="space-y-1">
                {[{ label: "Home", href: "/" }, ...primaryNav, { label: "Give", href: "/give/" }].map((item, i) => (
                  <motion.li key={item.href} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.05, duration: 0.6, ease }}>
                    <Link href={item.href} aria-current={isActive(item.href) ? "page" : undefined} className="group flex items-baseline gap-4 py-1.5 font-display text-[2.4rem] font-bold leading-tight tracking-[-0.04em] text-white/85 hover:text-white aria-[current=page]:text-orange sm:text-5xl">
                      <span className="w-7 font-display text-xs font-medium tracking-[0.2em] text-cyan/80">{String(i + 1).padStart(2, "0")}</span>
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-10 space-y-5">
                <Button href={joinCommunityHref} variant="primary">Join the Community</Button>
                <div className="flex flex-col gap-1 font-display text-sm text-white/70">
                  <a href={site.phoneHref} className="hover:text-white">{site.phoneDisplay}</a>
                  <a href={site.emailHref} className="hover:text-white">{site.email}</a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
