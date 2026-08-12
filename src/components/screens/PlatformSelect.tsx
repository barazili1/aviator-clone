import { motion } from "motion/react";
import { ChevronLeft, ShieldCheck, Zap, Users } from "lucide-react";
import { IMAGE_URLS } from "@/lib/imageUrls";
import { WinnersList } from "./WinnersList";

export type Platform = "Coldbet" | "Greenbet";

const platforms: { name: Platform; logo: string; tag: string; accent: string }[] = [
  { name: "Coldbet", logo: IMAGE_URLS.coldbetLogo, tag: "تفعيل فوري · دعم 24/7", accent: "97.4%" },
  { name: "Greenbet", logo: IMAGE_URLS.greenbetLogo, tag: "سحب سريع · موثوقة", accent: "96.1%" },
];

const stats = [
  { icon: Zap, label: "دقة التوقع", value: "97%" },
  { icon: Users, label: "مستخدم نشط", value: "12K" },
  { icon: ShieldCheck, label: "أمان", value: "100%" },
];

export function PlatformSelect({ onSelect }: { onSelect: (p: Platform) => void }) {
  return (
    <div
      dir="rtl"
      className="relative mx-auto flex min-h-dvh w-full max-w-md flex-col overflow-hidden bg-background px-5 pb-10 pt-8"
    >
      <img
        src={IMAGE_URLS.heroBg}
        alt=""
        aria-hidden
        loading="eager"
        width={1024}
        height={1280}
        className="pointer-events-none absolute inset-x-0 top-0 h-[38vh] w-full object-cover opacity-55"
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent_4%,var(--background)_42%)]" />

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative text-center"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card/80 px-3 py-1 text-[0.62rem] uppercase tracking-[0.25em] text-primary backdrop-blur">
          <span className="relative flex h-1.5 w-1.5">
            <span className="ring-pulse absolute inset-0 rounded-full bg-primary" />
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          </span>
          Step 01
        </span>
        <h1 className="mt-4 font-display text-[2rem] font-extrabold leading-tight text-foreground">
          اختر المنصة
        </h1>
        <p className="mx-auto mt-2 max-w-[18rem] text-sm leading-relaxed text-muted-foreground">
          فعّل السكريبت على منصتك المفضلة وابدأ استقبال التوقعات فوراً
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12 }}
        className="relative mt-5 grid grid-cols-3 gap-2"
      >
        {stats.map((s) => (
          <div
            key={s.label}
            className="glass-card flex flex-col items-center gap-1 rounded-2xl px-2 py-3"
          >
            <s.icon className="h-4 w-4 text-primary" />
            <span className="font-display text-base font-extrabold tabular-nums text-foreground">
              {s.value}
            </span>
            <span className="text-[0.58rem] text-muted-foreground">{s.label}</span>
          </div>
        ))}
      </motion.div>

      {/* Platform cards */}
      <div className="relative mt-5 flex flex-col gap-3.5">
        {platforms.map((p, i) => (
          <motion.button
            key={p.name}
            type="button"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1], duration: 0.6 }}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(p.name)}
            className="group relative flex items-center gap-4 overflow-hidden rounded-3xl border border-primary/12 bg-card p-4 text-right shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-lift)]"
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(100deg,transparent,color-mix(in_oklab,var(--primary)_14%,transparent),transparent)] transition-transform duration-700 group-hover:translate-x-full" />
            <span className="absolute inset-y-0 right-0 w-1 bg-[image:var(--gradient-accent)] opacity-0 transition-opacity group-hover:opacity-100" />
            <span className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-2xl border border-primary/12 bg-card shadow-[var(--shadow-card)] transition-transform duration-500 group-hover:scale-105">
              <img src={p.logo} alt={p.name} className="h-full w-full object-contain" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-display text-xl font-extrabold text-foreground">
                {p.name}
              </span>
              <span className="mt-0.5 block text-[0.7rem] text-muted-foreground">{p.tag}</span>
              <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-success/12 px-2 py-0.5 text-[0.62rem] font-bold text-success">
                نسبة نجاح {p.accent}
              </span>
            </span>
            <ChevronLeft className="h-5 w-5 shrink-0 text-primary transition-transform duration-300 group-hover:-translate-x-1" />
          </motion.button>
        ))}
      </div>

      {/* Live winners */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="relative mt-7"
      >
        <WinnersList />
      </motion.div>

      <div className="relative mt-7 overflow-hidden">
        <div className="flex w-max animate-marquee gap-6 text-[0.62rem] uppercase tracking-[0.3em] text-muted-foreground">
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k} className="flex gap-6">
              <span>Live signals</span>
              <span>·</span>
              <span>Instant activation</span>
              <span>·</span>
              <span>Secure</span>
              <span>·</span>
              <span>Aviator predictor</span>
              <span>·</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
