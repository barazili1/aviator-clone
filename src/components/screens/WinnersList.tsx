import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { TrendingUp, Trophy } from "lucide-react";

const NAMES = [
  "Ahmed_M",
  "سارة ع.",
  "Khaled99",
  "Mohamed_Ali",
  "نور الدين",
  "Youssef_T",
  "Rania.K",
  "Omar_7",
  "مصطفى ح.",
  "Salma_92",
  "Bilal.dz",
  "Hassan_M",
  "أمينة ر.",
  "Tarek_04",
  "Zeyad.G",
];

export type Winner = {
  id: number;
  name: string;
  amount: number;
  odd: number;
  game: string;
};

let seq = 0;
function makeWinner(): Winner {
  const odd = 1.2 + Math.random() * 4.6;
  const stakes = [250, 300, 500, 750, 1000, 1500];
  const stake = stakes[Math.floor(Math.random() * stakes.length)] ?? 250;
  return {
    id: seq++,
    name: NAMES[Math.floor(Math.random() * NAMES.length)] ?? "Player",
    amount: Math.round(stake * odd),
    odd,
    game: Math.random() > 0.45 ? "Crash" : "Apple",
  };

}

const initials = (n: string) => n.replace(/[^\p{L}\p{N}]/gu, "").slice(0, 2).toUpperCase();

export function WinnersList({ compact = false }: { compact?: boolean }) {
  const [rows, setRows] = useState<Winner[]>(() => Array.from({ length: 5 }, makeWinner));

  useEffect(() => {
    const id = setInterval(
      () => setRows((r) => [makeWinner(), ...r].slice(0, compact ? 4 : 6)),
      2600 + Math.random() * 1800,
    );
    return () => clearInterval(id);
  }, [compact]);

  return (
    <section dir="rtl" className="relative">
      <div className="mb-2.5 flex items-center justify-between">
        <h2 className="flex items-center gap-2 font-display text-sm font-extrabold text-foreground">
          <Trophy className="h-4 w-4 text-primary" />
          الرابحون الآن
        </h2>
        <span className="flex items-center gap-1.5 text-[0.6rem] uppercase tracking-[0.25em] text-muted-foreground">
          <span className="relative flex h-1.5 w-1.5">
            <span className="ring-pulse absolute inset-0 rounded-full bg-success" />
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
          </span>
          Live
        </span>
      </div>

      <ul className="flex flex-col gap-2">
        <AnimatePresence initial={false}>
          {rows.map((w) => (
            <motion.li
              key={w.id}
              layout
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.45 }}
              className="glass-card flex items-center gap-3 rounded-2xl px-3 py-2.5"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[image:var(--gradient-accent)] font-display text-[0.68rem] font-bold text-primary-foreground">
                {initials(w.name)}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[0.8rem] font-bold text-foreground">
                  {w.name}
                </span>
                <span className="text-[0.62rem] text-muted-foreground">{w.game}</span>
              </span>
              <span className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[0.66rem] font-bold tabular-nums text-primary">
                <TrendingUp className="h-3 w-3" />
                {w.odd.toFixed(2)}x
              </span>
              <span className="shrink-0 font-display text-[0.85rem] font-extrabold tabular-nums text-success">
                +{w.amount.toLocaleString("en-US")}
              </span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </section>
  );
}
