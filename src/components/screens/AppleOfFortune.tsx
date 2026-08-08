import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Apple, ArrowRight, Bomb, Loader2, Play, RotateCcw, Sparkles } from "lucide-react";
import { WinnersList } from "./WinnersList";
import {
  APPLE_COLS,
  APPLE_ROWS,
  fetchAppleMatrix,
  generateAppleMatrix,
  saveAppleMatrix,
  VIP_ID,
  type AppleMatrix,
} from "@/lib/predictions";

const COEF = [1.23, 1.54, 1.93, 2.41, 4.02, 6.71, 11.18, 27.97, 69.93, 349.68];

export function AppleOfFortune({ platform, userId, onBack }: { platform: string; userId?: string; onBack?: () => void }) {
  const [grid, setGrid] = useState<AppleMatrix | null>(null);
  const [revealed, setRevealed] = useState(0);
  const [running, setRunning] = useState(false);
  const [loading, setLoading] = useState(false);
  const timers = useRef<number[]>([]);
  const isVip = userId === VIP_ID;

  const clear = useCallback(() => {
    timers.current.forEach((t) => clearTimeout(t));
    timers.current = [];
  }, []);

  useEffect(() => clear, [clear]);

  const runReveal = (g: AppleMatrix) => {
    clear();
    setGrid(g);
    setRevealed(0);
    setRunning(true);
    for (let i = 1; i <= APPLE_ROWS; i++) {
      timers.current.push(
        window.setTimeout(() => {
          setRevealed(i);
          if (i === APPLE_ROWS) setRunning(false);
        }, i * 320),
      );
    }
  };

  const start = async () => {
    clear();
    setRevealed(0);
    if (isVip) {
      setLoading(true);
      const remote = await fetchAppleMatrix();
      setLoading(false);
      runReveal(remote ?? generateAppleMatrix());
      return;
    }
    runReveal(generateAppleMatrix());
  };

  const restart = async () => {
    clear();
    setRunning(false);
    setRevealed(0);
    setGrid(null);
    const next = generateAppleMatrix();
    if (isVip) {
      setLoading(true);
      await saveAppleMatrix(next);
      setLoading(false);
    }
  };

  return (
    <div
      dir="rtl"
      className="mx-auto flex min-h-dvh w-full max-w-md flex-col bg-[image:var(--gradient-page)] px-5 pb-10 pt-8"
    >
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          aria-label="رجوع"
          className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-secondary px-3.5 py-2 text-xs font-semibold text-foreground transition hover:bg-secondary/70"
        >
          <ArrowRight className="h-4 w-4" /> رجوع
        </button>
      )}
      <header className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="flex items-center gap-1.5 text-[0.6rem] uppercase tracking-[0.35em] text-primary">
            <Sparkles className="h-3 w-3" /> Predictor
          </p>
          <h1 className="mt-1 truncate font-display text-[1.6rem] font-extrabold text-foreground">
            Apple of Fortune
          </h1>
        </div>
        <span className="shrink-0 rounded-full border border-primary/20 bg-card px-3.5 py-1.5 text-xs font-bold text-primary shadow-[var(--shadow-card)]">
          {platform}
        </span>
      </header>

      {/* Board */}
      <div className="mt-5 overflow-hidden rounded-[1.75rem] border border-primary/15 bg-card p-2.5 shadow-[var(--shadow-lift)]">
        <div className="flex flex-col-reverse gap-1.5">
          {Array.from({ length: APPLE_ROWS }).map((_, r) => {
            const open = revealed > r;
            const active = running && revealed === r;
            return (
              <div key={r} className="flex items-center gap-1.5">
                <span
                  className={`w-[3.5rem] shrink-0 rounded-lg px-1 py-1.5 text-center font-display text-[0.6rem] font-extrabold tabular-nums ${
                    open ? "bg-success/12 text-success" : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {COEF[r]?.toFixed(2)}x
                </span>
                <div className="grid flex-1 grid-cols-5 gap-1.5">
                  {Array.from({ length: APPLE_COLS }).map((_, c) => {
                    const rotten = grid?.[r]?.[c] === true;
                    const isSafe = open && !rotten;
                    return (
                      <motion.div
                        key={c}
                        animate={
                          active
                            ? { opacity: [0.4, 1, 0.4] }
                            : { opacity: 1, scale: isSafe ? [0.85, 1.06, 1] : 1 }
                        }
                        transition={
                          active ? { duration: 0.6, repeat: Infinity } : { duration: 0.35 }
                        }
                        className={`grid h-8 place-items-center rounded-lg border transition-colors ${
                          !open
                            ? "border-primary/10 bg-secondary/70 text-muted-foreground"
                            : isSafe
                              ? "border-success/40 bg-success/12 text-success shadow-[var(--shadow-glow)]"
                              : "border-destructive/25 bg-destructive/10 text-destructive/70"
                        }`}
                      >
                        {open ? (
                          isSafe ? (
                            <Apple className="h-4 w-4" />
                          ) : (
                            <Bomb className="h-4 w-4 opacity-70" />
                          )
                        ) : (
                          <span className="h-2 w-2 rounded-full bg-primary/25" />
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-5 grid grid-cols-[1.4fr_1fr] gap-3">
        <motion.button
          type="button"
          whileTap={{ scale: 0.98 }}
          onClick={start}
          disabled={running || loading}
          className="flex items-center justify-center gap-2 rounded-2xl bg-[image:var(--gradient-accent)] px-4 py-4 font-display text-base font-bold text-primary-foreground shadow-[var(--shadow-glow)] transition-all hover:brightness-110 disabled:bg-none disabled:bg-secondary disabled:text-muted-foreground disabled:shadow-none"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}{" "}
          Start
        </motion.button>
        <motion.button
          type="button"
          whileTap={{ scale: 0.98 }}
          onClick={restart}
          disabled={loading}
          className="glass-card flex items-center justify-center gap-2 rounded-2xl px-4 py-4 font-display text-base font-bold text-foreground transition-colors hover:bg-secondary disabled:text-muted-foreground disabled:opacity-60"
        >
          <RotateCcw className="h-4 w-4" /> Restart
        </motion.button>
      </div>

      <div className="mt-7">
        <WinnersList compact />
      </div>
    </div>
  );
}
