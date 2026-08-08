import { motion } from "motion/react";
import { Apple, Plane, ChevronLeft } from "lucide-react";

export type GameKind = "crash" | "apple";

const games: { kind: GameKind; title: string; sub: string; icon: typeof Apple }[] = [
  { kind: "apple", title: "Apple of Fortune", sub: "توقعات التفاحة · 5 مستويات", icon: Apple },
  { kind: "crash", title: "Crash", sub: "لعبة الطيارة · توقع نقطة السحب", icon: Plane },
];

export function GameSelectDialog({ onPick }: { onPick: (g: GameKind) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      dir="rtl"
      className="fixed inset-0 z-50 grid place-items-center bg-background/75 p-6 backdrop-blur-md"
    >
      <motion.div
        initial={{ scale: 0.92, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-sm overflow-hidden rounded-3xl border border-primary/15 bg-card shadow-[var(--shadow-lift)]"
      >
        <div className="bg-[image:var(--gradient-accent)] px-6 py-4 text-center">
          <p className="text-[0.6rem] uppercase tracking-[0.32em] text-primary-foreground/85">
            Choose game
          </p>
          <h2 className="mt-1 font-display text-lg font-extrabold text-primary-foreground">
            اختر اللعبة
          </h2>
        </div>
        <div className="flex flex-col gap-3 p-5">
          {games.map((g, i) => (
            <motion.button
              key={g.kind}
              type="button"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 + i * 0.08 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onPick(g.kind)}
              className="group flex items-center gap-3 rounded-2xl border border-primary/12 bg-secondary/50 p-3.5 text-right transition-colors hover:bg-secondary"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[image:var(--gradient-accent)] text-primary-foreground shadow-[var(--shadow-glow)]">
                <g.icon className="h-5 w-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-display text-base font-extrabold text-foreground">
                  {g.title}
                </span>
                <span className="mt-0.5 block text-[0.7rem] text-muted-foreground">{g.sub}</span>
              </span>
              <ChevronLeft className="h-5 w-5 shrink-0 text-primary transition-transform group-hover:-translate-x-1" />
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
